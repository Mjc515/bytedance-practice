import React from "react";
import { MailOutlined,AppstoreOutlined,SettingOutlined } from '@ant-design/icons';

const icons = [ MailOutlined,AppstoreOutlined,SettingOutlined ]
export class BigLogo extends React.Component {
    constructor(){
        super();
        
        setInterval(() =>{
            if(!this.state)
            this.setState({current: 1});
            else
                this.setState({current:(this.state.current + 1)  % icons.length});
        },1000)
        
    }
   
    render() {
        let Icon =this.state ?
            icons[this.state.current] :
            AppstoreOutlined;
        
      return <div id="biglogo">
          <img alt="biglogo" src="AntDesign.svg"/>
          <Icon id="dot" />
        </div>;
    }
  }