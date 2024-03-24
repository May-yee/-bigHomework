import React, { Component } from 'react';
import Header from './header';
import axios from 'axios';
import cookie from 'react-cookies'
class Members extends Component {
    state = { 
        
     } 
    render()  {
        return (    
        
    <React.Fragment>
    <Header id={this.props.match.params.id}/>
    
    <div className="main">
        <div className="container row member">
            <div className="memberNav">
                <div className="memberNavBtn row" id="settingBtn" onClick={this.btn_setting}>
                    <img src="http://localhost:3000/images/setting_icon.png" alt=""/>
                    <h3 className="p_letter">帳號資訊</h3>
                </div>
                <div className="memberNavBtn row" id="recordBtn" onClick={this.btn_record}>
                    <img src="http://localhost:3000/images/jiu_icon.png" alt=""/>
                    <h3 className="p_letter">揪團紀錄</h3>
                </div>
                <div className="memberNavBtn row" id="joinRecordBtn" onClick={this.btn_joinRecord}>
                    <img src="http://localhost:3000/images/join_icon.png" alt=""/>
                    <h3 className="p_letter">參加紀錄</h3>
                </div>
            </div>
            <div className="memberMain">
                <h2>帳號資訊 </h2>
                {/* setting */}
                <div className="memberMainBody setting show">
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
                        <p>1616vvvvv@mail.com</p>
                    </div>
                    <div className="settingItem row">
                        <div className="settingItemTitle  row">
                            <h3>性</h3><h3>別:</h3>
                        </div>
                        <p>其他性別</p>
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
                        <p>人這次到很的心的在我環境，的都當朋友裡面是，家都結人點的，是因為是一個的可以，了嗎還會有什麼換成，就說縮著愛。新的好棒結果是來了，明的感覺一個他可能：樣的感情得有來了好不好，早晨還有，被兩剛看到最後是這，我看著手機大家別人家自己不的慾望。我還是了他我需我懷疑樂是我，的太不好意都化可愛啊怎樣，分是太我也不難然會被得這加上，的心真的只可，一我比較，早了會的這笑的武器的記。例如這個人都不自己哈哈，我認為不是一樣，怎麼說爆炸我就是沒有，也都是聖誕節，不然⋯不然結果是我一定要。 </p>
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



            </div>

        </div>
    </div>
    </React.Fragment>
    ) 
    }
    componentDidMount = async () => {
        var result = await axios.get("http://localhost:8000/member/info/" + this.props.match.params.id);
        var newState = {...this.state};
        newState = result.data;
        this.setState(newState);
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
        
    

 
export default Members;
