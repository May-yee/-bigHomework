import React, { Component } from 'react';
import Header from './header';
import axios from 'axios';
import cookie from 'react-cookies';
class OwnPost extends Component {
    state = { 
        postItem:{},
        chatList:[],
        applyMan:[]
     } 
    render() { 
        return (
        <React.Fragment>
        <Header id={cookie.load('userID')}/>     
            <div class="main">            
            <div class="container post_page">
                    <div class="post_item">                
                    <div className="images">
                            <img src={this.state.postItem.postIMG} alt="" />
                        </div>
                    <div class="post_item_content">
                        <div class="member_box">
                            <img src={this.state.postItem.headShot} alt=""/>
                            <p>會員名稱</p>
                        </div>
                        <h2>{this.state.postItem.title}</h2>
                        <div class="btn_group row">
                            <a href={`/Joing/postedit/${this.props.match.params.id}`}><div class="btn btn_blue">編輯</div></a>
                            <a href={`/Joing/postdelete/${this.props.match.params.id}`}><div class="btn btn_gray">刪除</div></a>
                        </div>
                        <div class="content_box row">
                            <h4>揪團時間:</h4><p>{this.state.postItem.registeredDate} {this.state.postItem.registeredTime}</p>
                        </div>
                        <div class="content_box row">
                            <h4>活動時間:</h4><p>{this.state.postItem.activityDate} {this.state.postItem.activityTime}</p>
                        </div>
                        <div class="content_box row box_blue">
                            <h4>地點:</h4><a href="">{this.state.postItem.location}</a>
                        </div>
                        <div class="content_icon row">
                            <div class="col-3">
                                <p>最低人數</p>
                                <img src="http://localhost:3000/images/MIN.png" alt=""/>
                                <p>{this.state.postItem.minPeople}</p>
                            </div>
                            <div class="col-3">
                                <p>最多人數</p>
                                <img src="http://localhost:3000/images/MAX.png" alt=""/>
                                <p>{this.state.postItem.maxPeople}</p>
                            </div>
                            <div class="col-3">
                                <p>每人價錢</p>
                                <img src="http://localhost:3000/images/PRICE.png" alt=""/>
                                <p>{this.state.postItem.price}</p>
                            </div>                       
                        </div>
                        <p>{this.state.postItem.content}</p>
                    </div>                                
            </div>
            
            

            <div class="post_right">
                <div class="comment">
                        <div class="comment_title">
                            <h2>揪團討論ING</h2>
                        </div>
                        <div class="message_area">
                            {this.state.chatList.map(chat=>
                                <div class="message">
                                <div class="member_box">
                                    <img src={chat.headShot} alt=""/>
                                    <p>{chat.cmName}</p>
                                </div>
                                <p>{chat.message}</p>
                            </div>
                            )}
                        </div>
                        <div class="comment_input">
                            <input type="text" placeholder="傳送留言...." value={this.state.chatList.message} onChange={this.message_change} onKeyDown={this.key_enter}/>
                            <div class="submit"><img src="http://localhost:3000/images/submit.svg" alt="" onClick={this.send_message}/></div>
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
                        </div>
                    </div>
                    <div class="review_join">
                        <div class="join_box_title row">
                            <h2>申請參加</h2>
                            <div class="num_box"><p>8</p></div>
                        </div>
                        <div class="join_member">
                            <div class="join_member_box ">
                                <a href="">
                                    <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                </a>
                                <div class="btn_group row">
                                    <div class="btn btn_blue">參加</div>
                                    <div class="btn btn_gray">拒絕</div>
                                </div>
                            </div>
                            <div class="join_member_box">
                                <a href="">
                                    <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                </a>
                                <div class="btn_group row">
                                    <div class="btn btn_blue">參加</div>
                                    <div class="btn btn_gray">拒絕</div>
                                </div>
                            </div>
                            <div class="join_member_box">
                                <a href="">
                                    <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                </a>
                                <div class="btn_group row">
                                    <div class="btn btn_blue">參加</div>
                                    <div class="btn btn_gray">拒絕</div>
                                </div>
                            </div>
                            <div class="join_member_box">
                                <a href="">
                                    <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                </a>
                                <div class="btn_group row">
                                    <div class="btn btn_blue">參加</div>
                                    <div class="btn btn_gray">拒絕</div>
                                </div>
                            </div>
                            <div class="join_member_box">
                                <a href="">
                                    <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                                </a>
                                <div class="btn_group row">
                                    <div class="btn btn_blue">參加</div>
                                    <div class="btn btn_gray">拒絕</div>
                                </div>
                            </div>
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
        var chatResult = await axios.get(`http://localhost:8000/index/chatitem/${this.props.match.params.id}`);   
        var newState = {...this.state};
        newState.postItem = result.data;
        newState.chatList = chatResult.data;        
        this.setState(newState);
    }
    message_change = (e) => {
        var newState = {...this.state};
        newState.chatList.message = e.target.value;
        newState.chatList.com_postID = this.props.match.params.id;
        newState.chatList.commenter = cookie.load('userID');
        newState.chatList.cmName = cookie.load('userName')
        newState.chatList.headShot = cookie.load('headShot')
        this.setState(newState);
        
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
export default OwnPost;