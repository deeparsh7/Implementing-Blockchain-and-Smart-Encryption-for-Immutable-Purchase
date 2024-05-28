import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { nanoid } from "nanoid";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;
const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ seller_name: "", seller_id: "",buyer_name: "", buyer_id: "", bill_id: "", purchase_date: "", price: ""});
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);
  const [imageData, setImageData] = useState("");

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  const addImages = (e) => {
    const imageInput = document.getElementById('imageInput');
    const imageFiles = imageInput.files;
    for (let i = 0; i < imageFiles.length; i++) {
      const imageFile = imageFiles[i];
  
      // Use a FileReader to read the image file and convert it to a base64 encoded string
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageBuffer = event.target.result; // ArrayBuffer
        const imageArray = new Uint8Array(imageBuffer); // Convert ArrayBuffer to Uint8Array
        const base64Image = btoa(String.fromCharCode.apply(null, imageArray)); // Convert Uint8Array to base64 string
  
        // Use the base64Image string for further processing, such as uploading to a server or displaying on the page
        
        setImageData(base64Image)
        console.log('Base64 Image:', imageData);
      };
      reader.readAsArrayBuffer(imageFile);
    }
    console.log('going good')
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          seller_name: transaction.seller_name,
          seller_id: transaction.seller_id,
          buyer_name: transaction.buyer_name,
          buyer_id: transaction.buyer_id,
          bill_id: transaction.bill_id,
          purchase_date: transaction.purchase_date,
          price: transaction.price,
          pvt_key: transaction.pvt_key
        }));

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { seller_name,seller_id, buyer_name,buyer_id,bill_id,purchase_date,price} = formData;
        const transactionsContract = createEthereumContract();
        const pvt_key = nanoid(); 
        console.log(pvt_key)
        // await ethereum.request({
        //   method: "eth_sendTransaction",
        //   params: [{
        //     from: currentAccount,
        //     to: addressTo,
        //     gas: "0x5208",
        //     value: parsedAmount._hex,
        //   }],
        // });

        const transactionHash = await transactionsContract.addToBlockchain(seller_name,seller_id, buyer_name,buyer_id,bill_id,purchase_date,price, pvt_key);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());        
        // window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        addImages,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
