import { Button, Input, Menu } from 'antd';
import { Row, Col} from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { UnorderedListOutlined } from '@ant-design/icons';
import { BigLogo } from "./BigLogo.js";



function App() {
  return (
    <div className="App">
      <Row>
        <Col>
          <h1><a id="logo"><img alt="logo" src="logo.svg"/>Ant Design</a></h1>
        </Col>
        <Col flex="1">
          <div id="searchbox">
            <Input placeholder="搜索" />
          </div>
        </Col>
        <Col>
          <Menu id="menu" mode="horizontal">
            <Menu.Item>设计</Menu.Item>
            <Menu.Item>文档</Menu.Item>
            <Menu.Item>组件</Menu.Item>
            <Menu.Item>资源</Menu.Item>
            <Menu.Item>国内镜像</Menu.Item>
            <Menu.SubMenu title=" " icon={<UnorderedListOutlined />}>
              <Menu.Item>子菜单项</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Col>
      </Row>
      <Row justify="center">
        <BigLogo />
        
      </Row>
      <Row justify="center">
        <div id="btns">
          <Button type="primary" shape="round">开始使用</Button>
          <Button type="secondary" shape="round">设计语言</Button>
        </div>
      </Row>
      
    </div>
  );
}

export default App;
