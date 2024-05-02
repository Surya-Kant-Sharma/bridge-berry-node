import express from "express";
import bodyParser from "body-parser";
import { getLayerZeroStatus } from "./utils/layerzeroStatus.js";
import dotenv from "dotenv";
import { createTransaction, waitForTransaction } from "./utils/createSafeTx.js";
dotenv.config();

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ data: "I'm running..." });
});

const checkValidator = (request) => {
  const {
    signature,
    targetWallet,
    targetChain,
    srcHash,
    srcChain,
    isSmartWalletDepoly,
    smartContractData,
  } = request;
  if (
    signature &&
    targetWallet &&
    targetChain &&
    srcHash &&
    srcChain &&
    isSmartWalletDepoly &&
    smartContractData
  )
    return {
      signature,
      targetWallet,
      targetChain,
      srcHash,
      srcChain,
      isSmartWalletDepoly,
      smartContractData,
    };
  else return false;
};

const startBarryProccess = async (req) => {
  try {
    const isValid = checkValidator(req?.body);

    if (isValid) {
      const message = await getLayerZeroStatus(
        isValid?.srcChain,
        isValid?.srcHash
      );

      //   if (message?.desChainId || message?.txHash)
      //   await waitForTransaction(message?.desChainId, message?.txHash);
      // createTransaction(
      //   isValid?.desChainId,
      //   isValid?.isSmartWalletDepoly,
      //   isValid?.smartContractData
      // );

      // return message;
      return message || "Transaction Failed";
    } else {
      return "provider complete data to perform";
    }
  } catch (err) {
    console.log(err);
  }
};

app.post("/bridge", async (req, res) => {
  const isValid = await startBarryProccess(req);
  console.log("received data", isValid);
  if (isValid) res.json({ isValid });
  else res.json({ error: "please provide all feilds" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
