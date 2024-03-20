import React, { Component } from 'react';
class Header extends Component {
    state = {  } 
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
                <a href="/Joing/memebers"><li>會員專區</li></a>
                <a href=""><li>新手上路</li></a>
                <a href=""><li>聯絡我們</li></a>
            </ul>
            <div className="member_box" onClick={this.toggleLogoIn}>
                <div className="member_img" >
                    <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                </div>
                <p>會員名稱</p>
            </div>
        </div>
        <div className="container">
            <div className="logoIn">
                <input type="text" name="" id=""/>
                <input type="password" name="" id=""/>
                <input type="submit" value="登入"/>
                <a href="/Joing/register">註冊帳號</a>
            </div>
        </div>
    </header>
        );
    }
    toggleLogoIn = () => {
        const logoIn = document.querySelector(".logoIn");
        logoIn.classList.toggle("show");
    }
}
 
export default Header;