import { ethers } from "ethers";
import Contract from "../constants/contractData.json";

const getRpc = (chainId) => {
  if (chainId == "") {
    return "";
  } else if (chainId == "") {
    return "";
  }
};

export const createTransaction = async (chainId, contractAddress, data) => {
  const rpc = getRpc(chainId);
  const provider = new ethers.JsonRpcProvider(rpc);
  const signer = new ethers.Wallet(key, provider);
  const contract = ethers.Contract(contractAddress, Contract.ABI, signer);
  const hash = await contract.execTransaction(data);
  return hash;
};
