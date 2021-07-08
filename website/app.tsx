import React from 'react';
import { Button, Avatar } from './../components/index';
// import './../components/button/style/index.less';
import './../components/avatar/style/index.less';
import './app.less';

const App = () => {
    return (
        <div>
            {/* <div>
                <Button 
                    hollow
                    type="primary"
                >
                    默认状态
                </Button>
            </div>
            <div>
                <Button
                    disabled
                    hollow
                    >不可点击状态</Button>
            </div>
            <div>
                <Button
                    size="small"
                    dashed
                    onClick={e => alert("这是一个小尺寸的button组件")}
                >
                    <span>这是一个小尺寸的button组件</span>
                </Button>
            </div>
            <div>
                <Button
                    type="primary"
                    onClick={e => alert("这是一个正常尺寸的button组件")}
                >
                    <span>这是一个正常尺寸的button组件</span>
                </Button>
            </div>
            <div>
                <Button
                    size="large"
                    shape="circle"
                    onClick={e => alert("这是一个大尺寸的button组件")}
                >
                    <span>这是一个大尺寸的button组件</span>
                </Button>
            </div> */}
            <Avatar
                size="large"
                alt='头像'
                src={'https://thirdwx.qlogo.cn/mmopen/vi_32/LMCia5mKG5zmJYZrfjkiaibw40YzaoBWE41b2wiahCqIibYAyldz6iaZdYiaXSN6F22KM7ViccJLHibBmcMZowz4uxUbglw/132'}
            >
                user
            </Avatar>
            <Avatar.Group size="small">
                <Avatar>user</Avatar>
                <Avatar
                    alt='头像'
                    src={'https://thirdwx.qlogo.cn/mmopen/vi_32/LMCia5mKG5zmJYZrfjkiaibw40YzaoBWE41b2wiahCqIibYAyldz6iaZdYiaXSN6F22KM7ViccJLHibBmcMZowz4uxUbglw/132'}
                >
                    user
                </Avatar>
                <Avatar
                    alt='头像'
                    src={'https://thirdwx.qlogo.cn/mmopen/vi_32/LMCia5mKG5zmJYZrfjkiaibw40YzaoBWE41b2wiahCqIibYAyldz6iaZdYiaXSN6F22KM7ViccJLHibBmcMZowz4uxUbglw/132'}
                >
                    user
                </Avatar>
                <Avatar
                    alt='头像'
                    src={'https://thirdwx.qlogo.cn/mmopen/vi_32/LMCia5mKG5zmJYZrfjkiaibw40YzaoBWE41b2wiahCqIibYAyldz6iaZdYiaXSN6F22KM7ViccJLHibBmcMZowz4uxUbglw/132'}
                >
                    user
                </Avatar>
                <Avatar
                    alt='头像'
                    src={'https://thirdwx.qlogo.cn/mmopen/vi_32/LMCia5mKG5zmJYZrfjkiaibw40YzaoBWE41b2wiahCqIibYAyldz6iaZdYiaXSN6F22KM7ViccJLHibBmcMZowz4uxUbglw/132'}
                >
                    user
                </Avatar>
            </Avatar.Group>
            <Avatar
                style={{ width: '40px', height: '40px', lineHeight: '40px' }}
            >
                xxliange
            </Avatar>
            {/* <Avatar shape='square'>
                xxliange
            </Avatar> */}
        </div>
    )
};

export default App;

