import React, { Component } from 'react';
import axios from 'axios';
class Header extends Component {
    state = { 
        userName: "會員名稱",
        headShot: "http://localhost:3000/images/head_sticker.png",
        userID: "",
     } 
    render() { 
        return (
<header>
        <div className="container">
            <a href="/">
                <div className="logo_box row">
                    <img src="http://localhost:3000/images/LOGO.png" alt=""/>
                    <p>揪ing</p>
                </div>
            </a>
            <ul className="row">
                <a href={"/Joing/ownmembers/" + this.state.userID}><li>會員專區</li></a>
                <a href=""><li>新手上路</li></a>
                <a href=""><li>聯絡我們</li></a>
            </ul>
            <div className="member_box" onClick={this.toggleLogoIn}>
                <div className="member_img" >
                    <img src={this.state.headShot} alt=""/>
                </div>
                <p>{this.state.userName}</p>
            </div>
        </div>
        <div className="container" id="logindiv" onClick={this.logindiv}>
            <form className="logoIn" method='post' id="logoInform" onSubmit={this.logoIn}>
                <input type="text" name="userEmail" id="userEmail" required/>
                <input type="password" name="passWord" id="passWord" required/>
                <input type="submit" value="登入"/>
                <a href="/Joing/register">註冊帳號</a>
            </form>
        </div>
    </header>
        );
    }
    componentDidMount = async () => {
        console.log(this.props.id)
        if(this.props.id) {
            var userinfo = await axios.get("http://localhost:8000/member/info/" +  this.props.id);  
            var newState = userinfo.data;
            this.setState(newState);
        }
    }
    toggleLogoIn = (e) => {
        e.stopPropagation();
        const logoIn = document.querySelector(".logoIn");
        logoIn.classList.add("show");
    }
    logindiv = (e) => {
        e.stopPropagation();
    }
    logoIn = async (e) => {
        console.log(this.props)
        e.preventDefault();
        var dataToServer = {
            userEmail: document.getElementById('userEmail').value,
            passWord: document.getElementById('passWord').value
        }
        var config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        var result = await axios.post(
            'http://localhost:8000/member/login', 
            dataToServer,
            config
        )
        if(result.data['success']) {
            this.setState({
                userName: result.data.userName,
                headShot: result.data.headShot,
                userID: result.data.userID,
            })
            window.location = "/Joing/index/" + result.data.userID

        }else {
            alert('帳號或密碼錯誤')
        }
    }


}
 
export default Header;