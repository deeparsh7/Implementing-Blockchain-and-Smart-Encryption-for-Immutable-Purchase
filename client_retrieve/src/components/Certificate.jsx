import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Certificate = () => {
    const { transactions } = useContext(TransactionContext);
    const len = Object.keys(transactions).length;
    const { pvt_key } = {...transactions[len-1]}
    console.log("Cert compo ", pvt_key);
    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-certificate">
            <div className="flex flex-col md:p-12 py-12 px-4">
                <div className="bg-[#181918] m-4 flex flex-1
                    2xl:min-w-[450px]
                    2xl:max-w-[500px]
                    sm:min-w-[270px]
                    sm:max-w-[300px]
                    min-w-full
                    flex-col p-3 rounded-md hover:shadow-2xl"
                    >
                    <div className="flex flex-col items-center w-full mt-3">
                    <p className="text-white my-2 text-3xl text-center">Ownership Certificate</p>
                        <div className="display-flex justify-start w-full mb-6 p-2">
                        
                        <p className="text-white text-base">Purchase ID: {1000+len}</p>
                        <p className="text-white text-base">Private Key: {pvt_key}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
    );
}

export default Certificate;