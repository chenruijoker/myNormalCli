import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import logo from "./static/test.png";

ReactDOM.render(<App />, document.getElementById("app"));

setTimeout(() => {
    let Img = new Image();
    Img.src = logo;
    document.getElementById("app").appendChild(Img);
}, 2000);
