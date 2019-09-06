import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// if no file name given than it will import index.js from the folder

//As a second argument of createStore function we will pass Redux.applyMiddleware function
// and we will pass our new middlewareChecker function to this Redux.applyMiddleware function

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
