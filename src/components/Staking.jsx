import { useState, useEffect } from "react";
import { Slide } from "react-reveal";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis"
import { stakingContractAddress, nftContractAddress } from '../constants/stakingContractAddress'
import nftAbi from '../constants/nftAbi.json'
import stakingAbi from '../constants/stakingAbi.json'
import { Alchemy } from "alchemy-sdk";
import '../assets/css/staking.css'



const Staking = () => {
  const alchemy = new Alchemy();
  const { account } = useMoralis();
  // eslint-disable-next-line
  const [approved, setApproved] = useState(false)
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
  // eslint-disable-next-line
  const pushToCart = (id) => {
    setCart((prev) => [...prev, id]);
  };

  // eslint-disable-next-line
  const stakeAllinCart = async () => {
    if (cart.length < 1) return;
    const contract = stakingContract();
    const NFTContract = nftContract();
    try {
      await NFTContract.setApprovalForAll(stakingContractAddress);
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
      console.log(result);
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
        if (result === account) {
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
  const getApproval = async (tokenId) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(nftContractAddress, nftAbi.abi, signer);

    try {

      await nftContract.approve(stakingContractAddress, tokenId)

      setApproved(true)

    } catch (err) {
      console.log(err)
    }
  }
  // eslint-disable-next-line
  const stakeNft = async (tokenId) => {
    const contract = stakingContract()
    let approvedToken = []
    approvedToken.push(tokenId)
    try {
      await contract.stake(approvedToken);

    }
    catch (error) {
      console.log(error)

    }
  }

  // eslint-disable-next-line
  const withdrawStake = async () => {
    const contract = stakingContract()
    try {
      await contract.withdraw(stakedTokens);

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
              </nav>
            </div>
            <div className="row">
              <div className="heading">
                <h3>Staked and Unstaked NFTS</h3>
                <p>To stake, you have to approve first then stake.</p>
              </div>
              {/* Div that displays all nfts */}
              <div className="flex-parent">
                {userNfts?.map((nft) => <UserNFTCard
                  nft={nft}
                  key={nft.tokenId}
                  arrOfStakedTokens={arrOfStakedTokens}
                  getApproval={getApproval}
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




const UserNFTCard = ({ nft, arrOfStakedTokens, getApproval, withdrawStake, stakeNft }) => {
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
              {/* Approve token */}
              <button className="approve-btn" onClick={() => getApproval(nft.tokenId)} >Approve</button>
              {/* Call stake function here */}
              <button className="approve-btn" onClick={() => stakeNft(nft.tokenId)} >Stake</button>
            </div>
          </> :
          <div className="flex gap-2 px-4 justify-between w-full harry items-center">
            <span className="text-xl">Staked</span>
            <button className="approve-btn" onClick={() => withdrawStake(nft.tokenId)} >Un-Stake</button>
          </div>
        }
      </div>
    </div>
  );
}