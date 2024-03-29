import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies'

class Header extends Component {
    state = {
        onLogin: "",
        userName: "登入/註冊",
        headShot: "http://localhost:3000/images/head_sticker.png",
        userID: "",
     } 
    render() { 
        return (
<header>
        <div className="container">
            <a href={(cookie.load('userID')) ? "/Joing/index/" + cookie.load('userID') : "/"}>
                <div className="logo_box row">
                    <img src="http://localhost:3000/images/LOGO.png" alt=""/>
                    <p>揪ing</p>
                </div>
            </a>
            <ul className="row">
                <a href='/' onClick={this.gomember}><li>會員專區</li></a>
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
                {(this.state.onLogin) ? "" 
                : <React.Fragment>
                <input type="text" name="userEmail" id="userEmail" placeholder='在此輸入信箱' required/>
                <input type="password" name="passWord" id="passWord" placeholder='在此輸入密碼' required/>
                <a className='btnrigster' href="/Joing/register">註冊帳號</a>
                </React.Fragment>
                }
                {(this.state.onLogin) ? 
                <input type="button" value="登出" className='logout' id="logout" onClick={this.onLogout}/> :
                <input type="submit" value="登入"/>
                }
                
            </form>
        </div>
    </header>
        );
    }
    componentDidMount = async () => {
        if(cookie.load('userID')) {
            var userinfo = await axios.get("http://localhost:8000/member/info/" +  cookie.load('userID'));  
            var newState = {...this.state};
            newState.userName = userinfo.data.userName;
            newState.headShot = userinfo.data.headShot;
            newState.userID = userinfo.data.userID;
            newState.onLogin = cookie.load('userID');
            this.setState(newState);
        }
    }
    gomember = (e) => {
        e.preventDefault();
        var onLogin = cookie.load('userID');
        if(onLogin) {
            window.location.href = "/Joing/ownmembers/" + this.state.userID
        }else {
            alert("請先登入會員")
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
            cookie.save('userID', result.data.userID, { path: '/' })
            cookie.save('userName', result.data.userName, { path: '/' })
            cookie.save('headShot', result.data.headShot, { path: '/' })
            this.setState({
                onLogin: result.data.userID,
                userName: result.data.userName,
                headShot: result.data.headShot,
                userID: result.data.userID,
            })

            window.location = "/Joing/index/" + result.data.userID;

        }else {
            alert('帳號或密碼錯誤')
        }
    }
    onLogout = (e) => {
        cookie.remove('userID', { path: '/' })
        var newState = {...this.state};
        newState.onLogin = cookie.load('userID');
        this.setState(newState);
        window.location.href = "/"
    }

}
 
export default Header;