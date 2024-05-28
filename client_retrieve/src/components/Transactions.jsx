import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";


const TransactionsCard = ({ seller_name,seller_id, buyer_name,buyer_id,bill_id,purchase_date,price }) => {

  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <p className="text-white text-base">Seller Name: {seller_name}</p>
          <p className="text-white text-base">Seller Id: {seller_id}</p>
          <p className="text-white text-base">Buyer Name: {buyer_name}</p>
          <p className="text-white text-base">Buyer Id: {buyer_id}</p>
          <p className="text-white text-base">Bill Id: {bill_id}</p>
          <p className="text-white text-base">Purchase Date: {purchase_date}</p>
          <p className="text-white text-base">Price: {price}</p>
        </div>
      </div>
    </div>
    
  );
};

const Transactions = () => {
  const { transactions, retData } = useContext(TransactionContext);
  const { id, key } = {...retData};
  const {pvt_key} = {...transactions[id-1001]};
  console.log("from transations", id)
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        <div className="flex flex-wrap justify-center items-center mt-10">
          {
            id != "" ?
            
            ( 
              pvt_key == key?
            (<TransactionsCard {...transactions[parseInt(id)-1001]} />) :
            (<h1 className="text-white my-2 text-3xl text-center">Incorrect private key!</h1>)) :
            (<h1></h1>)
          }
        </div>
      </div>
    </div>
  );
};

export default Transactions;
