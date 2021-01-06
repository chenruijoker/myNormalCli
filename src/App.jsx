import React from "react";
import "./App.scss";
import Test from "./components/Test";
import Img1 from './static/test.png'; // 图片的引用都是采用这种方式

function App(props) {

  console.log(21213);


  return (
    <div className="App">
      这是首页
      <span className="test">这是测试字体</span>
      <img src={Img1} style={{width:200,height:200}} />
      <div>
        <Test />
      </div>
      <div className="backName"></div>
    </div>
  );
}

export default App;
