import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";

import { Loader } from ".";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    // step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading, addImages } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { seller_name,seller_id, buyer_name,buyer_id,bill_id,purchase_date,price } = formData;

    e.preventDefault();

    if (!seller_name || !seller_id || !buyer_name || !buyer_id || !bill_id || !purchase_date || !price) return;

    sendTransaction();
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-6xl text-white text-gradient py-1">
          Your Gateway to Secure and Transparent Transactions<br />
          </h1>
          <p style={{ fontSize: '23px' }} className="text-left mt-9 text-white font-light md:w-12/12 w-12/12 text-base">
          Empowering trust through decentralization.
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-11 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-3" />
              <p style={{ fontSize: '18px' }} className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

          {/* <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div> */}
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <p style={{ fontSize: '20px' }} className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Seller Name" name="seller_name" type="text" handleChange={handleChange} />
            <Input placeholder="Seller Id ( Pan / Aadhaar )" name="seller_id" type="text" handleChange={handleChange} />
            <Input placeholder="Buyer Name" name="buyer_name" type="text" handleChange={handleChange} />
            <Input placeholder="Buyer Id ( Pan / Aadhaar )" name="buyer_id" type="text" handleChange={handleChange} />
            <Input placeholder="Bill Id" name="bill_id" type="text" handleChange={handleChange} />
            <Input placeholder="Purchase Date" name="purchase_date" type="text" handleChange={handleChange} />
            <Input placeholder="Price" name="price" type="text" handleChange={handleChange} />
            <input placeholder="Upload Images" name = "images" id="imageInput" onChange={(e) => addImages(e)} type="file" multiple className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"/>


            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send now
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
