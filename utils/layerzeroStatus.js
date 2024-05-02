import { waitForMessageReceived } from "@layerzerolabs/scan-client";

export const getLayerZeroStatus = async (srcChainId, srcHash) => {
  const message = await waitForMessageReceived(srcChainId, srcHash);
  return {
    desChainId: message.dstChainId,
    txHash: message.dstTxHash,
  };
};

// .then((message) => {
//     updateTx({
//       completed: true,
//       confirmation: {
//         chainId: message.dstChainId,
//         txHash: message.dstTxHash,
//       },
//     });
//   })
//   .finally(() => {
//     updateBalances();
//   });
