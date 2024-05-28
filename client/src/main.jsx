import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";


// const firebaseConfig = {
//   apiKey: "AIzaSyAaRzX_WopUokUJeqoQ_MptV9k2-i39QYM",
//   authDomain: "banking-crud.firebaseapp.com",
//   databaseURL: "https://banking-crud-default-rtdb.firebaseio.com",
//   storageBucket: "banking-crud.appspot.com",
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <TransactionsProvider>
    <App />
  </TransactionsProvider>,
  document.getElementById("root"),
);
