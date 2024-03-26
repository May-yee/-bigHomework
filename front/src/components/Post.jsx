import React, { Component } from 'react';
import Header from './header';
import axios from 'axios';
import cookie from 'react-cookies'
class Post extends Component {
    state = { 
        postItem:{},
        chatList:[],
     } 
    render() { 
        return (
        <React.Fragment>
        <Header id={cookie.load('userID')}/>     
        <div className="main" onClick={this.toggleLogoIn}>  

            <div className="container post_page">
                <div className="post_item">                
                        <div className="images">
                            <img src={this.state.postItem.postIMG} alt="" />
                        </div>
                    <div className="post_item_content">
                        <div className="member_box">
                            <img src={this.state.postItem.headShot} alt=""/>
                            <p>會員名稱</p>
                        </div>
                        <h2>{this.state.postItem.title}</h2>
                        <div className="btn_group row">
                            <a><div className="btn btn_blue apply-btn" onClick={this.btn_apply}>申請參加</div></a>
                            
                        </div>
                        <div className="content_box row">
                            <h4>揪團時間:</h4><p>{this.state.postItem.registeredDate} {this.state.postItem.registeredTime}</p>
                        </div>
                        <div className="content_box row">
                            <h4>活動時間:</h4><p>{this.state.postItem.activityDate} {this.state.postItem.activityTime}</p>
                        </div>
                        <div className="content_box row box_blue">
                            <h4>地點:</h4><a href="">{this.state.postItem.location}</a>
                        </div>
                        <div className="content_icon row">
                            <div className="col-3">
                                <p>最低人數</p>
                                <img src="http://localhost:3000/images/MIN.png" alt=""/>
                                <p>{this.state.postItem.minPeople}</p>
                            </div>
                            <div className="col-3">
                                <p>最多人數</p>
                                <img src="http://localhost:3000/images/MAX.png" alt=""/>
                                <p>{this.state.postItem.maxPeople}</p>
                            </div>
                            <div className="col-3">
                                <p>每人金額</p>
                                <img src="http://localhost:3000/images/PRICE.png" alt=""/>
                                <p>{this.state.postItem.price}</p>
                            </div>                       
                        </div>
                        <p>{this.state.postItem.content}</p>
                    </div>
                </div>                                    
                <div className="post_right">
                    <div className="comment">
                        <div className="comment_title">
                            <h2>揪團討論ING</h2>
                        </div>
                        <div className="message_area">
                            {this.state.chatList.map(chat=>
                                <div className="message">
                                <div className="member_box">
                                    <img src={chat.headShot} alt=""/>
                                    <p>{chat.cmName}</p>
                                </div>
                                <p>{chat.message}</p>
                            </div>
                            )}
                        </div>
                        <div className="comment_input">
                            <input type="text" placeholder="傳送留言...." value={this.state.chatList.message} onChange={this.message_change} onKeyDown={this.key_enter}/>
                            <div className="submit"><img src="http://localhost:3000/images/submit.svg" alt=""onClick={this.send_message}/></div>
                        </div>
                    </div>
                    <div class="join_box">
                    <div class="already_join">
                        <div class="join_box_title row">
                            <h2>已參加</h2>
                            <div class="num_box"><p>12</p></div>
                        </div>
                        <div class="join_member">
                            <a href="">
                                <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                            </a>
                            <a href="">
                                <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                            </a>
                            <a href="">
                                <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                            </a>
                            <a href="">
                                <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                            </a>
                            <a href="">
                                <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                            </a>
                            <a href="">
                                <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                            </a>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            
        </div>       
            
        
    </React.Fragment>


        );
    }
   
    componentDidMount = async () =>{
        var result = await axios.get(`http://localhost:8000/index/postitem/${this.props.match.params.id}`);
        var chatresult = await axios.get(`http://localhost:8000/index/chatitem/${this.props.match.params.id}`);    
        var newState = {...this.state};
        newState.postItem = result.data;
        newState.chatList = chatresult.data;        
        this.setState(newState);
    }
    toggleLogoIn = (e) => {
        const logoIn = document.querySelector(".logoIn");
        logoIn.classList.remove("show");
    }
    message_change = (e) => {
        var newState = {...this.state};
        newState.chatList.message = e.target.value;
        newState.chatList.com_postID = this.props.match.params.id;
        newState.chatList.commenter = cookie.load('userID')
        newState.chatList.cmName = cookie.load('userName')
        newState.chatList.headShot = cookie.load('headShot')
        this.setState(newState);
        
    }

    btn_apply = async () => {
        var newState = {...this.state};
        newState.apply.postID = this.props.match.params.id;
        newState.apply.memberID = cookie.load("userID");
        newState.apply.headShot = cookie.load('headShot');
        this.setState(newState);
        var dataToServer = {
            postID: this.state.apply.postID,
            memberID: this.state.apply.memberID,
            headShot: this.state.apply.headShot
        }
        console.log(dataToServer);
         await axios.post("http://localhost:8000/post/apply",dataToServer);
        alert("ok");
    }
   
    send_message = async () => {
        var dataToSever = {
            com_postID: this.props.match.params.id,
            message: this.state.chatList.message,
            commenter: this.state.chatList.commenter,
            cmName: this.state.chatList.cmName,
            headShot: this.state.chatList.headShot
        }
        if(cookie.load("userID")){
            await axios.post("http://localhost:8000/post/chat",dataToSever);
            var chatResult = await axios.get(`http://localhost:8000/index/chatitem/${this.props.match.params.id}`);
            var newState = {...this.state};
            newState.chatList = chatResult.data;        
            this.setState(newState);
            newState.chatList.message = "";
            this.setState(newState);
            
        }else {
            alert('請先登入會員');
        }
            
    }
    key_enter = async (e) => {
        if(e.key === "Enter"){
                    var dataToSever = {
                    com_postID: this.props.match.params.id,
                    message: this.state.chatList.message,
                    commenter: this.state.chatList.commenter,
                    cmName: this.state.chatList.cmName,
                    headShot: this.state.chatList.headShot
                }
                if(cookie.load("userID")){
                    await axios.post("http://localhost:8000/post/chat",dataToSever);
                    var chatResult = await axios.get(`http://localhost:8000/index/chatitem/${this.props.match.params.id}`);
                    var newState = {...this.state};
                    newState.chatList = chatResult.data;        
                    this.setState(newState);
                    newState.chatList.message = "";
                    this.setState(newState);
                    
                }else {
                    alert('請先登入會員');
                }                
            }
        }
    }

 
export default Post;