import React, { Component } from 'react';
import Header from './header';
import axios from 'axios';
import cookie from 'react-cookies'
class OwnMembers extends Component {
    state = { 
        
     } 
    render()  {
        return (    
        
    <React.Fragment>
    <Header id={this.props.match.params.id}/>
    
    <div className="main" onClick={this.toggleLogoIn}>
        <div className="container row member">
            <div className="memberNav">
                <div className="memberNavBtn row" id="settingBtn" onClick={this.btn_setting}>
                    <img src="http://localhost:3000/images/setting_icon.png" alt=""/>
                    <h3 className="p_letter">帳號設定</h3>
                </div>
                <div className="memberNavBtn row" id="noteBtn" onClick={this.btn_note}>
                    <img src="http://localhost:3000/images/notification_icon.png" alt=""/>
                    <h3 className="p_letter">訊息通知</h3>
                </div>
                <div className="memberNavBtn row" id="recordBtn" onClick={this.btn_record}>
                    <img src="http://localhost:3000/images/jiu_icon.png" alt=""/>
                    <h3 className="p_letter">揪團紀錄</h3>
                </div>
                <div className="memberNavBtn row" id="joinRecordBtn" onClick={this.btn_joinRecord}>
                    <img src="http://localhost:3000/images/join_icon.png" alt=""/>
                    <h3 className="p_letter">參加紀錄</h3>
                </div>
                <div className="memberNavBtn row" id="likeBtn" onClick={this.btn_like}>
                    <img src="http://localhost:3000/images/like_icon.png" alt=""/>
                    <h3 className="p_letter">已收藏</h3>
                </div>
            </div>
            <div className="memberMain">
                <h2>帳號設定 </h2>
                {/* setting */}
                <div className="memberMainBody setting show">
                    <div className="btn_group">
                        <a href={"/Joing/memberedit/"+this.props.match.params.id} className="btn btn_blue">編輯</a>
                    </div>
                    <div className="member_img">
                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                    </div>
                    <div className="settingItem row">
                        <div className="settingItemTitle  row">
                            <h3>會</h3><h3>員</h3><h3>名</h3><h3>稱:</h3>
                        </div>
                        <p>{this.state.userName}</p>
                    </div>
                    <div className="settingItem row">
                        <div className="settingItemTitle  row">
                            <h3>信</h3><h3>箱:</h3>
                        </div>
                        <p>{this.state.userEmail}</p>
                    </div>
                    <div className="settingItem row">
                        <div className="settingItemTitle  row">
                            <h3>性</h3><h3>別:</h3>
                        </div>
                        <p>{this.state.sex}</p>
                    </div>
                    <div className="settingItem row">
                        <div className="settingItemTitle  row">
                            <h3>生</h3><h3>日:</h3>
                        </div>
                        <p>{this.state.birth}</p>
                    </div>
                    <div className="settingItem">
                        <div className="settingItemTitle  row">
                            <h3>自</h3><h3>我</h3><h3>介</h3><h3>紹:</h3>
                        </div>
                        <p>{this.state.introduction} </p>
                    </div>

                </div>

                {/* note */}
                <div className="memberMainBody note">
                    <div className="noteBox">
                        <div className="noteBoxTop row">
                            <div className="time">
                                <p>2024/04/03</p>
                                <p>18:00</p>
                            </div>
                            <div className="subject">
                                <h3>您的揪團已有人申請</h3>
                            </div>
                            <button className="delet"><img src="http://localhost:3000/images/trash_icon.png" alt=""/></button>
                        </div>
                        <div className="noteBoxTContent">
                            <p>會員名稱 已申請參加您的揪團:  台中玩桌遊</p>
                        </div>
                    </div>
                    <div className="noteBox">
                        <div className="noteBoxTop row">
                            <div className="time">
                                <p>2024/04/03</p>
                                <p>18:00</p>
                            </div>
                            <div className="subject">
                                <h3>您的參加申請已通過</h3>
                            </div>
                            <button className="delet"><img src="http://localhost:3000/images/trash_icon.png" alt=""/></button>
                        </div>
                        <div className="noteBoxTContent">
                            <p>會員名稱 已通過您的申請:  礁溪泡溫泉</p>
                        </div>
                    </div>
                    <div className="noteBox">
                        <div className="noteBoxTop row">
                            <div className="time">
                                <p>2024/04/03</p>
                                <p>18:00</p>
                            </div>
                            <div className="subject">
                                <h3>您的參加申請已被婉拒</h3>
                            </div>
                            <button className="delet"><img src="http://localhost:3000/images/trash_icon.png" alt=""/></button>
                        </div>
                        <div className="noteBoxTContent">
                            <p>會員名稱 已婉拒您的申請:  台南喝牛肉湯</p>
                        </div>
                    </div>
                </div>


                {/* record */}
                <div className="memberMainBody record">
                    <div className="memberEvent">
                        <div className="memberEventImg">
                            <img src="" alt=""/>
                        </div>
                        <div className="memberEventContentBlock">
                            <h3>貼文主標貼文主標貼文主標貼文主標貼文主標貼文主標</h3>
                            <div className="content_box_group">
                                <div className="content_box">
                                    <p>
                                        <span className="p_letter">活動時間</span>
                                        2024-03-17 18:00 
                                    </p>
                                </div>
                                <div className="content_box box_blue">
                                    <p>
                                        <span className="p_letter">地點:</span>
                                        <a href=""> 403台中市西區公益路111號1樓</a>
                                    </p>
                                </div>
                                <div className="content_box">
                                    <p>
                                        <span className="p_letter">每人費用:</span>
                                        500 
                                    </p>
                                </div>
                            </div>   
                        </div>
                        
                        <div className="memberEventJoiner">
                            <div>
                                <h4>申請人</h4>
                                <div className="memberEventAvatar">
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4>已參加</h4>
                                <div className="memberEventAvatar">
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                    <div className="memberEvent expired">
                        <div className="memberEventImg">
                            <img src="" alt=""/>
                        </div>
                        <div className="memberEventContentBlock">
                            <h3>貼文主標貼文主標貼文主標貼文主標貼文主標貼文主標</h3>
                            <div className="content_box_group">
                                <div className="content_box">
                                    <p>
                                        <span className="p_letter">活動時間</span>
                                        2024-03-17 18:00 
                                    </p>
                                </div>
                                <div className="content_box box_blue">
                                    <p>
                                        <span className="p_letter">地點:</span>
                                        <a href=""> 403台中市西區公益路111號1樓</a>
                                    </p>
                                </div>
                                <div className="content_box">
                                    <p>
                                        <span className="p_letter">每人費用:</span>
                                        500 
                                    </p>
                                </div>
                            </div>   
                        </div>
                        
                        <div className="memberEventJoiner">
                            <div>
                                <h4>申請人</h4>
                                <div className="memberEventAvatar">
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4>已參加</h4>
                                <div className="memberEventAvatar">
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>

                {/* joinRecord */}
                <div className="memberMainBody joinRecord">
                    <div className="memberEvent">
                        <div className="memberEventImg">
                            <img src="" alt=""/>
                        </div>
                        <div className="memberEventContentBlock">
                            <h3>貼文主標貼文主標貼文主標貼文主標貼文主標貼文主標</h3>
                            <div className="content_box_group">
                                <div className="content_box">
                                    <p>
                                        <span className="p_letter">活動時間</span>
                                        2024-03-17 18:00 
                                    </p>
                                </div>
                                <div className="content_box box_blue">
                                    <p>
                                        <span className="p_letter">地點:</span>
                                        <a href=""> 403台中市西區公益路111號1樓</a>
                                    </p>
                                </div>
                                <div className="content_box">
                                    <p>
                                        <span className="p_letter">每人費用:</span>
                                        500 
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="memberEventJoiner">
                            <div>
                                <h4>主揪人</h4>
                                <div className="memberEventAvatar">
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4>已參加</h4>
                                <div className="memberEventAvatar">
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                    <div className="memberEvent expired">
                        <div className="memberEventImg">
                            <img src="" alt=""/>
                        </div>
                        <div className="memberEventContentBlock">
                            <h3>貼文主標貼文主標貼文主標貼文主標貼文主標貼文主標</h3>
                            <div className="content_box_group">
                                <div className="content_box">
                                    <p>
                                        <span className="p_letter">活動時間</span>
                                        2024-03-17 18:00 
                                    </p>
                                </div>
                                <div className="content_box box_blue">
                                    <p>
                                        <span className="p_letter">地點:</span>
                                        <a href=""> 403台中市西區公益路111號1樓</a>
                                    </p>
                                </div>
                                <div className="content_box">
                                    <p>
                                        <span className="p_letter">每人費用:</span>
                                        500 
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="memberEventJoiner">
                            <div>
                                <h4>主揪人</h4>
                                <div className="memberEventAvatar">
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4>已參加</h4>
                                <div className="memberEventAvatar">
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>


                {/* like */}
                <div className="memberMainBody like">
                    <div className="memberEvent">
                        <button className="delet"><img src="http://localhost:3000/images/trash_icon.png" alt=""/></button>
                        <div className="memberEventImg">
                            <img src="" alt=""/>
                        </div>
                        <div className="memberEventContentBlock">
                            <h3>貼文主標貼文主標貼文主標貼文主標貼文主標貼文主標</h3>
                            <div className="content_box_group">
                                <div className="content_box">
                                    <p>
                                        <span className="p_letter">活動時間</span>
                                        2024-03-17 18:00 
                                    </p>
                                </div>
                                <div className="content_box box_blue">
                                    <p>
                                        <span className="p_letter">地點:</span>
                                        <a href=""> 403台中市西區公益路111號1樓</a>
                                    </p>
                                </div>
                                <div className="content_box">
                                    <p>
                                        <span className="p_letter">每人費用:</span>
                                        500 
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="memberEventJoiner">
                            <div>
                                <h4>主揪人</h4>
                                <div className="memberEventAvatar">
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4>已參加</h4>
                                <div className="memberEventAvatar">
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                    <div className="memberEvent expired">
                        <button className="delet"><img src="http://localhost:3000/images/trash_icon.png" alt=""/></button>
                        <div className="memberEventImg">
                            <img src="" alt=""/>
                        </div>
                        <div className="memberEventContentBlock">
                            <h3>貼文主標貼文主標貼文主標貼文主標貼文主標貼文主標</h3>
                            <div className="content_box_group">
                                <div className="content_box">
                                    <p>
                                        <span className="p_letter">活動時間</span>
                                        2024-03-17 18:00 
                                    </p>
                                </div>
                                <div className="content_box box_blue">
                                    <p>
                                        <span className="p_letter">地點:</span>
                                        <a href=""> 403台中市西區公益路111號1樓</a>
                                    </p>
                                </div>
                                <div className="content_box">
                                    <p>
                                        <span className="p_letter">每人費用:</span>
                                        500 
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="memberEventJoiner">
                            <div>
                                <h4>主揪人</h4>
                                <div className="memberEventAvatar">
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4>已參加</h4>
                                <div className="memberEventAvatar">
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                    <div className="member_img">
                                        <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>

        </div>
    </div>
    </React.Fragment>
    ) 
    }
    componentDidMount = async () => {
        var onLogin = cookie.load('userID');
        if(onLogin) {
            var result = await axios.get("http://localhost:8000/ownmembers/" + this.props.match.params.id);
            var newState = {...this.state};
            newState = result.data;
            this.setState(newState);
        }else {
            alert("請先登入會員");
            window.location.href = "/";
        }
        
    }
    toggleLogoIn = (e) => {
        const logoIn = document.querySelector(".logoIn");
        logoIn.classList.remove("show");
    }
    btn_setting = () => {
            var memberMainBodies = document.querySelectorAll(".memberMainBody");
            memberMainBodies.forEach(function(body) {
                body.classList.remove("show");
            });
            var settingBody = document.querySelector(".setting");
            settingBody.classList.add("show")
            var mainHeader = document.querySelector(".memberMain h2");
            mainHeader.textContent = "帳號設定"
        }
    btn_note = () => {
            var memberMainBodies = document.querySelectorAll(".memberMainBody");
            memberMainBodies.forEach(function(body) {
                body.classList.remove("show");
            });
            var noteBody = document.querySelector(".note");
            noteBody.classList.add("show")
            var mainHeader = document.querySelector(".memberMain h2");
            mainHeader.textContent = "訊息通知"
        }
    btn_record = () => {
            var memberMainBodies = document.querySelectorAll(".memberMainBody");
            memberMainBodies.forEach(function(body) {
                body.classList.remove("show");
            });
            var recordBody = document.querySelector(".record");
            recordBody.classList.add("show")
            var mainHeader = document.querySelector(".memberMain h2");
            mainHeader.textContent = "揪團紀錄"
        }
    btn_joinRecord = () => {
            var memberMainBodies = document.querySelectorAll(".memberMainBody");
            memberMainBodies.forEach(function(body) {
                body.classList.remove("show");
            });
            var joinRecordBody = document.querySelector(".joinRecord");
            joinRecordBody.classList.add("show")
            var mainHeader = document.querySelector(".memberMain h2");
            mainHeader.textContent = "參加紀錄"
        }
    btn_like = () => {
            var memberMainBodies = document.querySelectorAll(".memberMainBody");
            memberMainBodies.forEach(function(body) {
                body.classList.remove("show");
            });
            var likeBody = document.querySelector(".like");
            likeBody.classList.add("show")
            var mainHeader = document.querySelector(".memberMain h2");
            mainHeader.textContent = "已收藏"
        }
    }
        
    

 
export default OwnMembers;