import React from 'react';
import './App.scss';
import Test from './components/Test';
function App(props) {
    return (
        <div className="App">
            这是首页
            <span className="test">这是测试字体</span>
            <div>
                <Test />
            </div>
        </div>
    );
}

export default App;