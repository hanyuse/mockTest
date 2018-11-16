import React from "react";


export default class Basic extends React.Component{
    constructor(props){
        super(props);
    }

    static toString(){
        return "test"
    }


    render() {
        return <h1>Hello,world</h1>;
    }


}