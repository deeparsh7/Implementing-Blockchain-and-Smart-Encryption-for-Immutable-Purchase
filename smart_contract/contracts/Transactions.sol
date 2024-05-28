// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Transactions {
    uint256 transactionCount;

    // event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);
  
    struct TransferStruct {
        string seller_name;
        string seller_id;
        string buyer_name;
        string buyer_id;
        string bill_id;
        string purchase_date;
        string price;
        string pvt_key;
    }

    TransferStruct[] transactions;

    function addToBlockchain(string memory seller_name, string memory seller_id,string memory buyer_name, string memory buyer_id, string memory bill_id, string memory purchase_date, string memory price, string memory pvt_key) public {
        transactionCount += 1;
        transactions.push(TransferStruct(seller_name, seller_id, buyer_name, buyer_id, bill_id, purchase_date, price, pvt_key));

        // emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}