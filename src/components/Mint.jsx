import React, { useState, useEffect } from "react";
import "../assets/css/Mint.css"
import { Container, Grid, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Snackbar } from "@mui/material";
import Owl from "../assets/images/arts/gif.gif"
import whitelistAddreses from "../constants/whitelistAddresses.js"
import ogAddresses from "constants/ogAddresses";
import ownerAddresses from "constants/ownerAddresses";

import { useMoralis } from "react-moralis"
import Moralis from "moralis"

import merkleTree from "../merkle-tree/merkleTree";

const Mint = () => {

  const { isInitialized, isInitializing, account } = useMoralis();

  const [amount, setAmount] = useState(1);
  const [whitelistState, setWhitelistState] = useState(false)
  const [ownerState, setOwnerState] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)
  const [mintError, setMintError] = useState()
  const [txError, setTxError] = useState(false)
  const [price, setPrice] = useState(0.05)
  const [saleState, setSaleState] = useState(true)
  const [maxAmount, setMaxAmount] = useState(5)
  const [supply, setSupply] = useState(0)

  const contractAddress = "0x6928D682911C068fBbCAEB1a409B9Ab34fAbfB91"
  const contractAbi = [
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_owners",
          "type": "address[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "ApprovalCallerNotOwnerNorApproved",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ApprovalQueryForNonexistentToken",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ApproveToCaller",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "BalanceQueryForZeroAddress",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "MintERC2309QuantityExceedsLimit",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "MintToZeroAddress",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "MintZeroQuantity",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "OwnerQueryForNonexistentToken",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "OwnershipNotInitializedForExtraData",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "TransferCallerNotOwnerNorApproved",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "TransferFromIncorrectOwner",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "TransferToNonERC721ReceiverImplementer",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "TransferToZeroAddress",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "URIQueryForNonexistentToken",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "fromTokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "toTokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "ConsecutiveTransfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "cost",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSaleState",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "getWhitelistState",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_mintAmount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "_mintAmounts",
          "type": "uint256[]"
        },
        {
          "internalType": "address[]",
          "name": "_receivers",
          "type": "address[]"
        }
      ],
      "name": "mintForAddresses",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_mintAmount",
          "type": "uint256"
        },
        {
          "internalType": "bytes32[]",
          "name": "_merkleProof",
          "type": "bytes32[]"
        }
      ],
      "name": "ownerMint",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_uriPrefix",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_backgroundMetadataUri",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_cagedBackgroundMetadataUri",
          "type": "string"
        }
      ],
      "name": "reveal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "revealed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_cost",
          "type": "uint256"
        }
      ],
      "name": "setCost",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_hiddenMetadataUri",
          "type": "string"
        }
      ],
      "name": "setHiddenMetadataUri",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_maxSupply",
          "type": "uint256"
        }
      ],
      "name": "setMaxSupply",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "_state",
          "type": "bool"
        }
      ],
      "name": "setPaused",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_whitelistCost",
          "type": "uint256"
        }
      ],
      "name": "setWhitelistCost",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_newwlMerkleRoot",
          "type": "bytes32"
        }
      ],
      "name": "setwlMerkleRoot",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "tokensOfOwner",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "whitelistClaimed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "whitelistCost",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_mintAmount",
          "type": "uint256"
        },
        {
          "internalType": "bytes32[]",
          "name": "_merkleProof",
          "type": "bytes32[]"
        }
      ],
      "name": "whitelistMint",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]


  const isMobile = window.innerWidth <= 500;

  const FirstIncrement = () => {
    if (amount == maxAmount) {
      return
    }
    setAmount(amount + 1);
  };

  const FirstDecrement = () => {
    if (amount == 1) {
      return
    }
    setAmount(amount - 1);
  };

  useEffect(() => {
    Moralis.start({ serverUrl: `https://rlk0bebeeryq.usemoralis.com:2053/server`, appId: `7IeTOs1s5htRvL6LGEDfMOlihq3O8ETBUQC2biv3` });
  }, [])

  async function updateSaleState() {
    const tokenOptions = {
      address: contractAddress,
      abi: contractAbi,
      function_name: "getSaleState",
      chain: "eth"
    }
    const response = await Moralis.Web3API.native.runContractFunction(tokenOptions)
    setSaleState(!response)
  }

  async function mint() {
    await Moralis.enableWeb3()
    let proof
    if (whitelistState || ownerState) {
      console.log(account)
      proof = merkleTree(account, ownerState)
    }

    let optionsMint = {
      contractAddress: contractAddress,
      abi: contractAbi,
      functionName: whitelistState ? "whitelistMint" : ownerState ? "ownerMint" : "mint",
      params: whitelistState || ownerState ? {
        _mintAmount: amount,
        _merkleProof: proof
      } : {
        _mintAmount: amount
      },
      msgValue: amount * Moralis.Units.ETH(price.toString())
    }
    try {
      const mintTx = await Moralis.executeFunction(optionsMint)
      await mintTx.wait(1)
      setMintSuccess(true)
    } catch (e) { setTxError(true); setMintError(e.message); console.log(e) }
  }

  useEffect(() => {
    Moralis.start({ serverUrl: `https://rlk0bebeeryq.usemoralis.com:2053/server`, appId: `7IeTOs1s5htRvL6LGEDfMOlihq3O8ETBUQC2biv3` });
  }, [])

  useEffect(() => {
    if (isInitialized) {
      updateSaleState()
      getSupply()
    }
  }, [isInitializing, isInitialized])

  useEffect(() => {
    getWhitelisted()
  }, [account])

  async function getWhitelisted() {
    const accountToLower = account ? account.toLowerCase() : ""
    if (ownerAddresses.includes(accountToLower)) {
      setOwnerState(true)
      setMaxAmount(7)
      setPrice(0.04)
      return
    }
    if (whitelistAddreses.includes(accountToLower) || ogAddresses.includes(accountToLower)) {
      const wlOptions = {
        address: contractAddress,
        abi: contractAbi,
        function_name: "getWhitelistState",
        chain: "eth",
        params: {
          _address: account
        }
      }
      const response = await Moralis.Web3API.native.runContractFunction(wlOptions)
      if (response) {
        setWhitelistState(false)
        setPrice(0.05)
      } else {
        setWhitelistState(true)
        if (!ogAddresses.includes(accountToLower)) {
          setMaxAmount(5)
        }
        setPrice(0.04)
      }
    }
  }

  async function getSupply() {
    const wlOptions = {
      address: contractAddress,
      abi: contractAbi,
      function_name: "totalSupply",
      chain: "eth"
    }
    const response = await Moralis.Web3API.native.runContractFunction(wlOptions)
    setSupply(response)
  }

  return (
    // <div className="main">
    <div className="App">
      <div className="mint">
        <div className="head">
          <h2 className="public-heading">{saleState ? "Minting live" : "Minting coming soon"}</h2>
        </div>
        <Container>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box>
                <img className="monkey-img" src={Owl} />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box>
                <div className="btns">
                  <button className="minus-btn" onClick={() => FirstDecrement()}>
                    <RemoveIcon fontSize="large" />
                  </button>
                  <p className="number">{amount}</p>
                  <button className="plus-btn" onClick={() => FirstIncrement()}>
                    <AddIcon fontSize="large" />
                  </button>{" "}
                </div>
                <p className="max-mint">Limit: {maxAmount}</p>
                {/* <br /> */}
                <hr className="line" />
                <div>
                  <h4 className="total-eth">Total {(amount * price).toFixed(3)} ETH</h4>
                  {/* <h4 className="total-eth">
                        0.088 ETH
                      </h4>{" "} */}
                </div>
                {/* <br /> <br /> */}
                {/* <br /> */}
                <hr className="line" /> <br />
                {/* <br /> */}
                <button
                  className="connect-wallet-btn"
                  onClick={() => mint()}
                  disabled={saleState == 0}
                >
                  Mint
                </button>{" "}
              </Box>
            </Grid>{" "}
          </Grid>
          <br />
          <center>
            {account ? (whitelistState ? <p>You are whitelisted</p> : ownerState ? <p> You are a holder </p> : "") : ""}
            {/* <p className="contract-address" >CONTRACT ADDRESS</p>
            <a className="mint-address" href={`https://etherscan.io/address/${contractAddress}`} target="_blank"> */}
            {/* {contractAddress} */}
            {/* </a>{" "} */}
            <h1 className="minted">{supply}/2000 Minted</h1>

          </center>
        </Container>{" "}
      </div>{" "}
      {/* </div> */}
      <Snackbar
        message="Mint successful! You can view your Owls on OpenSea"
        open={mintSuccess}
        autoHideDuration={5000}
        onClose={() => { setMintSuccess(false) }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      />
      <Snackbar
        message={`Something went wrong, please follow steps in our Discord channel! Error: ${mintError ? mintError.substring(0, 50) : "Unknown"}`}
        open={txError}
        autoHideDuration={10000}
        onClose={() => { setTxError(false) }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
      />
    </div >
  );
};

export default Mint;