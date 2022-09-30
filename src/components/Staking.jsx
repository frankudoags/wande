import { useState, useEffect } from "react";
import { Slide } from "react-reveal";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis"
import { stakingContractAddress, nftContractAddress } from '../constants/stakingContractAddress'
import nftAbi from '../constants/nftAbi.json'
import stakingAbi from '../constants/stakingAbi.json'
import { Network, Alchemy } from "alchemy-sdk";
import '../assets/css/staking.css'



const Staking = () => {
  const settings = {
    apiKey: "0AhEi7ZgISHTLrreg8I-AxOfdmhLzRhC", // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };
  const alchemy = new Alchemy(settings);
  const { account } = useMoralis();
  const [balance, setBalance] = useState(0)
  // eslint-disable-next-line
  const [stakedTokens, setStakedTokens] = useState([])
  const [availableRewards, setAvailableRewards] = useState()
  const [tokenStaked, setTokenStaked] = useState();
  // eslint-disable-next-line
  const [arrOfStakedTokens, setArrOfStakedTokens] = useState([]);
  const [userNfts, setUserNfts] = useState([])
  const { ethereum } = window;

  //cart functionality
  const [cart, setCart] = useState([]);
  const pushToCart = (id) => {
    setCart((prev) => [...prev, id]);
  };
  const stakeAllinCart = async () => {
    if (cart.length < 1) return;
    const contract = stakingContract();
    const NFTContract = nftContract();
    try {
      const bool = await contract.isApprovedForAll(account, stakingContractAddress);
      if (!bool) {
        await NFTContract.setApprovalForAll(stakingContractAddress, true);
      }
      await contract.stake(cart);

    } catch (error) {
      console.log(error);
    }
  }

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

  const userBalance = async () => {

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(nftContractAddress, nftAbi.abi, signer);

    try {

      const result = await nftContract.balanceOf(account);
      const bal = result.toNumber();
      setBalance(bal)
      getAllUserNft();
      userStakedNftsInfo();
    } catch (err) {
      console.log(err)
    }

  }

  const userStakedNftsInfo = async () => {
    const contract = stakingContract()

    try {
      const result = await contract.userStakeInfo(account);
   
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
  const getAllUserNft = async () => {
    const nfts = (await alchemy.nft.getNftsForOwner(account)).ownedNfts
    const userNft = nfts.filter(obj => obj.contract.address === '0x6928d682911c068fbbcaeb1a409b9ab34fabfb91')
    setUserNfts(userNft);
    console.log(userNft);
  }

  const getUserStakedNft = async () => {
    const contract = stakingContract()
    const cleanNft = [];

    try {
      for (let i = 0; i < userNfts; i++) {
        const result = await contract.stakerAddress(userNfts[i].tokenId)
        if (result === "0x4d26817ee0d948fff7f262acdb7038cde41f717d") {
          cleanNft.push(userNfts[i].tokenId);
        }
      };
      console.log(cleanNft);
      setArrOfStakedTokens(cleanNft);


    }
    catch (error) {
      console.log(error);
      setArrOfStakedTokens([]);

    }
  }
  const stakeNft = async (tokenId) => {
    const contract = stakingContract()
    const NFTContract = nftContract();
    let approvedToken = []
    approvedToken.push(tokenId)
    try {
      const bool = await contract.isApprovedForAll(account, stakingContractAddress);
      if (!bool) {
        await NFTContract.setApprovalForAll(stakingContractAddress, true);
      }
      await contract.stake(approvedToken);
    }
    catch (error) {
      console.log(error)

    }
  }

  const withdrawStake = async (id) => {
    const contract = stakingContract();
    let unstaked = [];
    unstaked.push(id);
    try {
      await contract.withdraw(unstaked);

    }
    catch (error) {
      console.log(error)

    }

  }

  const getReward = async () => {
    const contract = stakingContract()

    try {
      await contract.claimRewards();

    }
    catch (error) {
      console.log(error)

    }

  }



  useEffect(() => {
    userBalance()
    getUserStakedNft();

  }, [account])

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
          <img loading="lazy" decoding="async" src={media[0]?.thumbnail} alt={rawMetadata?.name} />
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