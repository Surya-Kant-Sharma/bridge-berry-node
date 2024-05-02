import { ethers } from "ethers";

const ABI = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
      {
        internalType: "enum Enum.Operation",
        name: "operation",
        type: "uint8",
      },
      { internalType: "uint256", name: "safeTxGas", type: "uint256" },
      { internalType: "uint256", name: "baseGas", type: "uint256" },
      { internalType: "uint256", name: "gasPrice", type: "uint256" },
      { internalType: "address", name: "gasToken", type: "address" },
      {
        internalType: "address payable",
        name: "refundReceiver",
        type: "address",
      },
      { internalType: "bytes", name: "signatures", type: "bytes" },
    ],
    name: "execTransaction",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
];

// Avax : 106
// Base : 184
// polygon : 109
// Airbitrum : 110

// const getChainId = (chain) => {
//     switch (chain) {
//         case 184 :
//             return  ;

//         case 184 :
//             return : "";
//     }
// }

const getRpc = (chainId) => {
  if (chainId == 184) {
    return process.env.Base_RPC;
  } else if (chainId == 110) {
    return process.env.Airbitrum_RPC;
  }
};

export const createTransaction = async (chainId, contractAddress, data) => {
  const rpc = getRpc(chainId);
  const provider = new ethers.JsonRpcProvider(rpc);
  const key = proccess.env.Key;
  const signer = new ethers.Wallet(key, provider);
  const contract = ethers.Contract(contractAddress, Contract.ABI, signer);
  const hash = await contract.execTransaction(data);
  return hash;
};

export const waitForTransaction = async (chianId, hash) => {
  const rpc = getRpc(chianId);
  const provider = ethers.JsonRpcProvider(rpc);
  const wait = await provider.waitForTransaction(hash);
  return wait;
};
