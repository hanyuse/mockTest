import $ from "jquery";
import React from "react";
import ReactDom  from "react-dom";


import("../index/index").then((data)=>{
    const Basic = data.default;
    console.log(Basic);

    ReactDom.render(
        <Basic></Basic>,
        document.getElementById('root')
    )



})
