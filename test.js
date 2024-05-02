import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

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

export const createTransaction = async (chainId, contractAddress) => {
  //   const rpc = getRpc(chainId);
  console.log("contract Address : ", contractAddress, chainId);

  const provider = new ethers.providers.JsonRpcProvider(
    "https://arbitrum.llamarpc.com"
  );
  console.log("provider: ", ABI, provider);

  const key = process.env.Key;
  const signer = new ethers.Wallet(key, provider);
  console.log("signer: ", provider, signer);
  const contract = new ethers.Contract(contractAddress, ABI, signer);
  console.log("contract Address : ", contract);

  const data = {
    to: "0x28A702e64E53935E4d469B82D149ce7be86Fa2aE",
    value: 1,
    data: "0x03d2238f00000002000000a0000000000000000000000000c9613c2ac408e4f0dd9ece407ecf7b15d0f8bb620000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000041249c58b0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000c9613c2ac408e4f0dd9ece407ecf7b15d0f8bb6200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000006423b872dd00000000000000000000000028a702e64e53935e4d469b82d149ce7be86fa2ae000000000000000000000000d60efdd4f242d8b04d4eb8bf377bb415df33f0d7000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000",
    operation: 1,
    safeTxGas: 0,
    baseGas: 0,
    gasPrice: 0,
    gasToken: "0x0000000000000000000000000000000000000000",
    refundReceiver: "0x0000000000000000000000000000000000000000",
    signature:
      "0x962961abc3b6feaa1a9a73010061416beb6a7ed542e28040c47fe4bdc2570aaf2ab0a3f4e1b5be9b705b2b22655787358c4dfe9b8b5307ba444c3bc61e96df051c",
  };

  const hash = await contract.execTransaction(
    data?.to,
    data?.value,
    data?.data,
    data?.operation,
    data?.safeTxGas,
    data?.baseGas,
    data?.gasPrice,
    data?.gasToken,
    data?.refundReceiver,
    data?.signatures
  );

  console.log("contract Address : ", hash);
  return hash;
};

createTransaction(110, "0x303bf2924C19e5a5db2aAB93717DE55C152484f7");
