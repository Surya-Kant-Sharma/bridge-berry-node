import express from "express";
import bodyParser from "body-parser";
import { getLayerZeroStatus } from "./utils/layerzeroStatus.js";
import { createTransaction, waitForTransaction } from "./utils/createSafeTx.js";
import dotenv from "dotenv";
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
    const data = checkValidator(req?.body);
    console.log("Validating data.");

    if (data) {
      console.log(
        "Waitting for the transaction to be confirm on the destination chain."
      );
      const message = await getLayerZeroStatus(data?.srcChain, data?.srcHash);
      let hash = "";

      if (message?.desChainId || message?.txHash) {
        console.log(
          "Message received on the destination chain waitting for the destination transaction."
        );
        await waitForTransaction(message?.desChainId, message?.txHash);
        console.log("Intent executed successfully.");
        hash = await createTransaction(
          data?.targetChain,
          data?.targetWallet,
          data?.smartContractData
        );

        console.log("Transaction Successfull : ", hash?.hash);
      }

      return hash || message;
      //   return message || "Transaction Failed";
    } else {
      return "provider complete data to perform.";
    }
  } catch (err) {
    // console.log(err);
    console.log("Transaction Failed.");
  }
};

app.post("/bridge", async (req, res) => {
  //   console.log("Data : ", req?.body);
  const data = await startBarryProccess(req);
  //   console.log("received data", data);
  if (data) res.json({ data });
  else res.json({ error: "please provide all feilds" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
