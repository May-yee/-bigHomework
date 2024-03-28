import React, { Component } from 'react';
import Header from './header';
import axios from 'axios';
import cookie from 'react-cookies'
class Post extends Component {
    state = { 
        postItem:{},
        chatList:[],
        joinmember:{},
        joinMan:[],
        isjoined: ""
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
                            <a href={'/Joing/members/' + this.state.postItem.userID} className='member_img'>
                                <img src={this.state.postItem.headShot} alt=""/>
                            </a>
                            <p>{this.state.postItem.userName}</p>
                        </div>
                        <h2>{this.state.postItem.title}</h2>
                        <div className="btn_group row">
                            {(cookie.load('userID')) ?
                                (this.state.iscollect) ? <div className="btn btn_gray apply-btn">已收藏</div>: 
                                <a><div className="btn btn_orange apply-btn" onClick={this.btn_collect}>收藏活動</div></a> 
                            : ""}
                            {(cookie.load('userID')) ?  
                                this.state.isjoined === "Y" ? <div className="btn btn_gray apply-btn">已參加</div> :
                                this.state.isjoined === "C" ? <div className="btn btn_gray apply-btn">申請中</div> :
                                <a><div className="btn btn_blue apply-btn" onClick={this.btn_apply}>申請參加</div></a>
                            : ""}
                        </div>
                        <div className='content_box_group'>
                            <p className="content_box row">
                                <span className='p_letter'>揪團時間:</span>{this.state.postItem.registeredDate} {this.state.postItem.registeredTime}
                            </p>
                            <p className="content_box row">
                                <span className='p_letter'>活動時間:</span>{this.state.postItem.activityDate} {this.state.postItem.activityTime}
                            </p>
                            <a href={'https://www.google.com/maps/search/?api=1&query=' + this.state.postItem.location} target='_blank' className="content_box row box_blue">
                                <span className='p_letter'>地點:</span>{this.state.postItem.location}
                            </a>
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
                                    <div className='member_img'>
                                        <img src={chat.headShot} alt=""/>
                                    </div>
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
                    <div className="join_box">
                    <div class="already_join">
                        <div class="join_box_title row">
                            <h2>已參加</h2>
                            <div class="num_box"><p>{this.state.joinMan.length}</p></div>
                        </div>
                        <div class="join_member">
                        <div className="num_box"><p></p></div>
                        </div>
                        <div className="join_member">
                            {this.state.joinMan.map(join =><a href={`/Joing/members/${join.userID}`} className='member_img'>
                                <img src={join.headShot} alt=""/>
                            </a>)}
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
        var participants = cookie.load('userID');
        var joinYet = await axios.get(`http://localhost:8000/post/isjoined/${this.props.match.params.id}?participants=${participants}`);
        var result = await axios.get(`http://localhost:8000/index/postitem/${this.props.match.params.id}`);
        var chatresult = await axios.get(`http://localhost:8000/index/chatitem/${this.props.match.params.id}`);
        var joinResult = await axios.get(`http://localhost:8000/post/accept/${this.props.match.params.id}`); 
        var collect = await axios.post("http://localhost:8000/collect",
        {userID: cookie.load('userID'), postID: this.props.match.params.id}
        );
         
        var newState = {...this.state};
        newState.postItem = result.data;
        newState.chatList = chatresult.data;
        newState.joinMan = joinResult.data;    
        newState.iscollect = collect.data;
        newState.isjoined = joinYet.data;    
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
    btn_collect = async () => {
        var dataToServer = {
            postID: this.props.match.params.id,
            userID: cookie.load('userID'),
            iscollect: true
        }
        var collected = await axios.post("http://localhost:8000/collected",dataToServer); 
        if(collected.data['success']){
            var newState = {...this.state};  
            newState.iscollect = collected.data['success'];    
            this.setState(newState);
        }
    }

    btn_apply = async () => {
        var newState = {...this.state};
        newState.joinmember.postID = this.props.match.params.id;
        newState.joinmember.participants = cookie.load("userID");
        newState.joinmember.joinL = "C";
        this.setState(newState);
        var dataToServer = {
            postID: this.state.joinmember.postID,
            participants: this.state.joinmember.participants,
            joinL: this.state.joinmember.joinL
        }
        await axios.post("http://localhost:8000/post/apply",dataToServer);
        this.setState({ isjoined: "C" });
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