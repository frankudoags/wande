import { useState, useEffect } from "react";
import { Slide } from "react-reveal";
import { ethers } from "ethers";
import { useMoralis, useChain } from "react-moralis"
import { stakingContractAddress, nftContractAddress } from '../constants/stakingContractAddress'
import nftAbi from '../constants/nftAbi.json'
import stakingAbi from '../constants/stakingAbi.json'
import { Alchemy } from "alchemy-sdk";
import '../assets/css/staking.css'



const Staking = () => {
  const alchemy = new Alchemy();
  const { enableWeb3, isWeb3Enabled, account, chainId } = useMoralis();
  const [approved, setApproved] = useState(false)
  const [balance, setBalance] = useState(0)
  const [stakedTokens, setStakedTokens] = useState([])
  const [availableRewards, setAvailableRewards] = useState()
  const [tokenStaked, setTokenStaked] = useState()
  const [userNfts, setUserNfts] = useState([])
  const { ethereum } = window;




  const stakingContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const staking = new ethers.Contract(stakingContractAddress, stakingAbi.abi, signer);

    return staking;
  };

  const userBalance = async () => {

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(nftContractAddress, nftAbi.abi, signer);

    try {

      const result = await nftContract.balanceOf(account)

      const bal = result.toNumber()
      setBalance(bal)
      getUserNft()
      userStakedNfts()

    } catch (err) {
      console.log(err)
    }

  }

  const userStakedNfts = async () => {
    const contract = stakingContract()

    try {
      const result = await contract.userStakeInfo(account)
      const [_tokenStaked, _availableRewards] = result
      const tokensStaked = _tokenStaked.toNumber()
      const availableRewards = _availableRewards.toNumber()
      setTokenStaked(tokensStaked)
      setAvailableRewards(availableRewards)

    }
    catch (error) {
      console.log(error)

    }

  }



  const getUserNft = async () => {
    const nfts = (await alchemy.nft.getNftsForOwner(account)).ownedNfts
    const userNft = nfts.filter(obj => obj.contract.address === '0x6928d682911c068fbbcaeb1a409b9ab34fabfb91')
    setUserNfts(userNft)
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


  }, [account])

  return (
    <section className="faq sections" id="staking">
      <div className="container">
        <Slide bottom>
          <h2>STAKING </h2>

        </Slide>
        {balance ? <Slide bottom cascade>
          <div className="staking--page">
            <nav className="staking--nav">
              <ul className="staking-list">
                <li className="staking-listitems">
                  <div>Total NFTs</div>
                  {balance}
                </li>
                <li className="staking-listitems">
                  <div>Staked NFTs</div>
                  {tokenStaked}
                </li>

                <li className="staking-listitems">
                  <div>Available for claim</div>
                  {availableRewards}
                </li >

                <button className="staking--btn" onClick={() => getReward()} >Claim</button>

              </ul>
            </nav>
          </div>
          <div className="row">
            {
              userNfts?.map((nft) => {
                return (
                  <div className="col-lg-4 col-md-6">
                    <div className="artist-box">
                      <div className="artist-image">
                        <img loading="lazy" decoding="async" src={nft.media[0].thumbnail} alt="legendary-owl" />
                      </div>
                      <p className="nft-name">{nft.rawMetadata.name}</p>
                      <p>Approve to stake</p>
                      {approved ? <button onClick={() => stakeNft(nft.tokenId)}>Stake</button> : <button onClick={() => getApproval(nft.tokenId)}>Approve</button>}
                    </div>
                  </div>
                )

              })
            }
          </div>
        </Slide> :
          <div className="staking--page">
            <div className="staking--nav">

              <p> OOPS!! You Need A Legendary Owl To Stake.</p>
            </div>
          </div>}
      </div>
    </section>
  );
};

export default Staking;
