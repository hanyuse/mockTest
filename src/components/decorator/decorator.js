import React from "react";
//装饰器修饰类，增加类的功能


@formTest("我就是装饰器")
export default class DecoratorTest extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <h1>装饰器类的使用方式</h1>
        )
    }
}


function formTest(value){
    return function(target){
        target.prototype.save = value;
    }
}