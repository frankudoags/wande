import { useState, useEffect } from "react";
import { Slide } from "react-reveal";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis"
import { stakingContractAddress, nftContractAddress } from '../constants/stakingContractAddress'
import nftAbi from '../constants/nftAbi.json'
import stakingAbi from '../constants/stakingAbi.json'
import { Network, Alchemy } from "alchemy-sdk";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/staking.css'



const Staking = () => {



  const settings = {
    apiKey: "0AhEi7ZgISHTLrreg8I-AxOfdmhLzRhC", // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };
  const alchemy = new Alchemy(settings);
  const { isWeb3Enabled, account } = useMoralis();
  const [balance, setBalance] = useState(0)
  const [availableRewards, setAvailableRewards] = useState()
  const [tokenStaked, setTokenStaked] = useState();
  const [arrOfStakedTokens, setArrOfStakedTokens] = useState([]);
  const [userNfts, setUserNfts] = useState([])
  const { ethereum } = window;

  const stakingContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const staking = new ethers.Contract(stakingContractAddress, stakingAbi.abi, signer);

    return staking;
  };
  const nftContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(nftContractAddress, nftAbi.abi, signer);

    return nftContract;
  }
  /**Global declaration of staking contract and nft contract */
  const STKContract = stakingContract();
  const NFTContract = nftContract();

  //cart functionality
  const [cart, setCart] = useState([]);
  //push to cart function
  const pushToCart = (tokenId) => {
    setCart([...cart, tokenId])
  }
  //stake all in cart function
  const stakeAllinCart = async () => {
    if (cart.length < 1) {
      toast.error('Cart is Empty, Stake an NFT', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    try {
      let tx = await STKContract.stake(cart);
      let receipt = await tx.wait()

      if (receipt.status === 1) {

        toast.success('NFT unstaked successfully!', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

        getAllUserNft();
      }
    } catch (error) {
      console.log(error);
    }
  }
  //set Approval for all NFTs
  const setApprovalForAll = async () => {
    try {
      await NFTContract.setApprovalForAll(stakingContractAddress, true);
    } catch (error) {
      console.log(error);
    }
  }


  //Wrapper function for get user NFTs function & get staked tokens and available rewards function
  const getUsersNFTandRewardsInfo = async () => {

    try {
      getAllUserNft();
      userStakedNftsInfo();
    } catch (err) {
      console.log(err)
    }

  }

  //get all user staked NFTs and available rewards
  const userStakedNftsInfo = async () => {

    try {
      const result = await STKContract.userStakeInfo(account);
      const [_tokenStaked, _availableRewards] = result;
      if (_tokenStaked) {
        const tokensStaked = _tokenStaked.toNumber();
        setTokenStaked(tokensStaked);
      } else {
        setTokenStaked(0);
      }
      if (_availableRewards) {
        const availableRewards = _availableRewards.toNumber();
        setAvailableRewards(availableRewards);
      }
      else {
        setAvailableRewards(0);
      }
    }
    catch (error) {
      console.log(error)

    }

  }
  // Get all user NFTs, filter out the Legendary Owl NFTs and push them to the userNfts state
  const getAllUserNft = async () => {
    const nfts = (await alchemy.nft.getNftsForOwner(account)).ownedNfts
    const userNft = nfts.filter(obj => obj.contract.address === '0x6928d682911c068fbbcaeb1a409b9ab34fabfb91')
    setUserNfts(userNft);
    setBalance(userNft.length)

  }

  // Asynchronous functions inside useEffect to fetch user's NFTs
  useEffect(async () => {
    if (account) {
      getUsersNFTandRewardsInfo();
      getUserStakedNft();
    }

  }, [account])




  //check all usernfts tokenID in the stakerAddress mapping to check if they're staked
  //if they are, push them to the arrOfStakedTokens state
  const getUserStakedNft = async () => {
    const cleanNft = [];

    try {
      for (let i = 0; i < userNfts; i++) {
        const result = await STKContract.stakerAddress(userNfts[i].tokenId)
        if (result === account) {
          cleanNft.push(userNfts[i].tokenId);
        }
      };

      setArrOfStakedTokens(cleanNft);


    }
    catch (error) {
      console.log(error);
      setArrOfStakedTokens([]);
    }
  }
  /**Function to stake a single nft, push token id into an array, check if approved, then stake */
  const stakeNft = async (tokenId) => {
    let approvedToken = []
    approvedToken.push(tokenId);
    try {
      let tx = await STKContract.stake(approvedToken);
      let receipt = await tx.wait()

      if (receipt.status === 1) {
        toast.success('NFT staked successfully!', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

    }
    catch (error) {
      console.log(error)

      toast.error('Failed to stake token', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  //function to unstake a single nft, push token id into an array, then unstake
  const withdrawStake = async (id) => {
    let unstaked = [];
    unstaked.push(id);
    try {
      await STKContract.withdraw(unstaked);
      toast.success('NFT unstaked successfully!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    catch (error) {
      console.log(error);

      toast.error('Request Failed', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }
  //function to claim rewards
  const getReward = async () => {

    try {
      let tx = await STKContract.claimRewards();
      let receipt = await tx.wait()
      if (receipt) {
        toast.success('Rewards Claimed successfully!', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }

    }
    catch (error) {
      console.log(error)

      toast.error('Request Failed!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }




  return (
    <section className="faq sections" id="staking">
      <div className="container">
        <Slide bottom>
          <h2>STAKING DASHBOARD</h2>
        </Slide>
        {balance ?
          <>
            <div className="staking--page">
              <nav className="staking--nav">
                <ul className="staking-list">
                  <li className="staking-listitems">
                    <h3>Total NFTs</h3>
                    {balance}
                  </li>
                  <li className="staking-listitems">
                    <h3>Staked NFTs</h3>
                    {tokenStaked}
                  </li>

                  <li className="staking-listitems">
                    <h3>Available tokens for claim</h3>
                    {availableRewards}
                  </li >
                  <button className="staking--btn" onClick={() => getReward()} >
                    <h3>
                      Claim Rewards
                    </h3>
                  </button>

                </ul>
                <ul className="staking-list-2">
                  <li className="staking-listitems">
                    <h3>Tokens in Cart</h3>
                    {cart.length}
                  </li >
                  <button className="staking--btn" onClick={() => stakeAllinCart()} >
                    <h3>
                      Stake all in cart
                    </h3>
                  </button>
                  <button className="staking--btn" onClick={() => setApprovalForAll()} >
                    <h3>
                      Approve NFTS for Staking
                    </h3>
                  </button>
                </ul>
              </nav>
            </div>
            <div className="row">
              <div className="heading">
                <h3>Staked and Unstaked NFTS</h3>
              </div>
              {/* Div that displays all nfts */}
              <div className="flex-parent">
                {userNfts?.map((nft) => <UserNFTCard
                  nft={nft}
                  key={nft.tokenId}
                  pushToCart={pushToCart}
                  arrOfStakedTokens={arrOfStakedTokens}
                  withdrawStake={withdrawStake}
                  stakeNft={stakeNft}
                />)}
              </div>
            </div>
          </>
          :
          <div className="staking--page">
            <div className="staking--nav">

              <h3 className="error-h3"> OOPS!! You Need A Legendary Owl To Stake.</h3>
            </div>
          </div>}
        <ToastContainer />
      </div>
    </section>
  );
};

export default Staking;




const UserNFTCard = ({ nft, arrOfStakedTokens, pushToCart, withdrawStake, stakeNft }) => {
  const { rawMetadata, media } = nft;
  let approved = false;
  if (arrOfStakedTokens.includes(nft.tokenId)) {
    approved = true;
  }

  return (
    <div className="flex-child">
      <div className="staking-card">
        <div className="staking-card-image">
          <img loading="lazy" decoding="async" src={media[0]?.gateway} alt={rawMetadata?.name} />
        </div>
        <h3 className="nft-name">Legendary Owl {rawMetadata?.name}</h3>
        {!approved ?
          <>
            <div className="flex gap-2 px-4 justify-between w-full">
              {/* Push tokenID to Cart */}
              <button className="approve-btn" onClick={() => pushToCart(nft.tokenId)} >Add to Cart</button>
              {/* Call stake function here */}
              <button className="approve-btn" onClick={() => stakeNft(nft.tokenId)} >Stake</button>
            </div>
          </> :
          <div className="flex gap-2 px-4 justify-between w-full harry items-center">
            <span className="text-xl">Staked</span>
            {/* Unstake token */}
            <button className="approve-btn" onClick={() => withdrawStake(nft.tokenId)} >Un-Stake</button>
          </div>
        }
      </div>
    </div>
  );
}