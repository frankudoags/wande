import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import whitelistAddreses from "../constants/whitelistAddresses.js"
import ownerAddresses from "..//constants/ownerAddresses.js"
window.Buffer = window.Buffer || require("buffer").Buffer;

function merkleTree(address, isOwner) {

    const leafNodes = isOwner ? ownerAddresses.map(addr => keccak256(addr)) : whitelistAddreses.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    const leaf = keccak256(address)
    const proof = merkleTree.getHexProof(leaf)
    console.log(proof)

    return (proof)
}

export default merkleTree;