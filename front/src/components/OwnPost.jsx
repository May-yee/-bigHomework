import React, { Component } from 'react';
import Header from './header';
import axios from 'axios';
import cookie from 'react-cookies';
class OwnPost extends Component {
    state = { 
        postItem:{},
        chatList:[],
        joinmember:{},
        applyMan:[],
        joinMan:[],
     } 
    render() { 
        return (
        <React.Fragment>
        <Header id={cookie.load('userID')}/>     
        <div className="main">            
            <div className="container post_page">
                <div className="post_item">                
                    <div className="images">
                            <img src={this.state.postItem.postIMG} alt="" />
                    </div>
                    <div className="post_item_content">
                        <div className="btn_group row">
                            {new Date(this.state.postItem.activityDate)<new Date()?<div className="btn btn_gray">已過期</div>:<a href={`/Joing/postedit/${this.props.match.params.id}`}><div className="btn btn_blue">編輯</div></a>}       
                            <div className="btn btn_orange" onClick={this.onDelete}>刪除</div>
                        </div>
                        <div className="member_box">
                            <div className='member_img'>
                                <img src={this.state.postItem.headShot} alt=""/>
                            </div>
                            <p>{this.state.postItem.userName}</p>
                        </div>
                        <h2>{this.state.postItem.title}</h2>
                        <div className='content_box_group'>
                            <p className="content_box">
                                <span className='p_letter'>揪團時間:</span>{this.state.postItem.registeredDate} {this.state.postItem.registeredTime}
                            </p>
                            <p className="content_box">
                                <span className='p_letter'>活動時間:</span>{this.state.postItem.activityDate} {this.state.postItem.activityTime}
                            </p>
                            <div className='row'>
                                <p className="content_box box_blue">
                                    <span className='p_letter'>地點:</span>{this.state.postItem.location}
                                </p>
                                <a href={'https://www.google.com/maps/search/?api=1&query=' + this.state.postItem.location} target='_blank' className="content_box box_border">
                                    查看地點
                                </a> 
                            </div>
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
                                <p>每人價錢</p>
                                <img src="http://localhost:3000/images/PRICE.png" alt=""/>
                                <p>{this.state.postItem.price}</p>
                            </div>                       
                        </div>
                        <pre>{this.state.postItem.content}</pre>
                    </div>                                
                </div>
            
                <div className="post_right">
                    <div className="comment">
                            <div className="comment_title">
                                <h2>揪團討論ING</h2>
                            </div>
                            <div className='message_area'>
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
                                <div className="submit"><img src="http://localhost:3000/images/submit.svg" alt="" onClick={this.send_message}/></div>
                            </div>
                    </div>
                    <div className="join_box">
                        <div className="already_join">
                            <div className="join_box_title row">
                                <h2>已參加</h2>
                                <div className="num_box"><p>{this.state.joinMan.length}</p></div>
                            </div>
                            <div className="join_member">
                                {this.state.joinMan.map(join =>
                                    <a href={`/Joing/members/${join.userID}`} className='member_img'>
                                        <img src={join.headShot} alt=""/>
                                    </a>
                                )}
                                
                            </div>
                        </div>
                        <div className="review_join">
                            <div className="join_box_title row">
                                <h2>申請參加</h2>
                                <div className="num_box"><p>{this.state.applyMan.length}</p></div>
                            </div>
                            <div className="join_member">
                                {this.state.applyMan.map((apply, index) => (
                                    <div className="join_member_box">
                                        <a href={`/Joing/members/${apply.userID}`} className='member_img'>
                                            <img src={apply.headShot} alt=""/>
                                        </a>
                                        <div className="btn_group row">
                                            <div className="btn btn_blue" onClick={() => this.btn_accept(index)}>接受</div>
                                            <div className="btn btn_gray" onClick={() => this.btn_reject(index)}>拒絕</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='delete_box'>
                <img src="http://localhost:3000/images/delete.png" />
                <div className='btn_group'>
                    <div className='btn btn_orange' onClick={this.delete}>確認</div>
                    <div className='btn btn_gray' onClick={this.onCancel}>取消</div>
                </div>
            </div>
        </div>        
            
        
    </React.Fragment>


        );
    }
   
    componentDidMount = async () =>{
        var result = await axios.get(`http://localhost:8000/index/postitem/${this.props.match.params.id}`);
        var chatResult = await axios.get(`http://localhost:8000/index/chatitem/${this.props.match.params.id}`);
        var applyResult = await axios.get(`http://localhost:8000/post/apply/${this.props.match.params.id}`);
        var joinResult = await axios.get(`http://localhost:8000/post/accept/${this.props.match.params.id}`);      
        var newState = {...this.state};
        newState.postItem = result.data;
        newState.chatList = chatResult.data;
        newState.applyMan = applyResult.data;
        newState.joinMan = joinResult.data;        
        this.setState(newState);
    }
    onDelete = (e) => {
        document.querySelector(".delete_box").classList.add("show");
    }
    onCancel = (e) => {
        document.querySelector(".delete_box").classList.remove("show");
    }
    delete = (e) => {
        axios.delete(`http://localhost:8000/post/delete/${this.props.match.params.id}`);
        window.location.href = "/Joing/index/" + cookie.load('userID')
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
        if(dataToSever.message !== ''){
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


    key_enter = async (e) => {
        if(e.key === "Enter"){
                var dataToSever = {
                com_postID: this.props.match.params.id,
                message: this.state.chatList.message,
                commenter: this.state.chatList.commenter,
                cmName: this.state.chatList.cmName,
                headShot: this.state.chatList.headShot
                }

                if(dataToSever.message !== ''){
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
    btn_accept = async (index) => {
        var newState = {...this.state};
        newState.joinmember.postID = this.props.match.params.id;
        if (index >= 0 && index < newState.applyMan.length) {
            newState.joinmember.participants = newState.applyMan[index].participants;
        newState.joinmember.joinL = "Y";
        this.setState(newState);
        var dataToServer = {
            postID : this.props.match.params.id,
            participants: this.state.joinmember.participants,
            joinL: this.state.joinmember.joinL
        }
        await axios.post("http://localhost:8000/post/accept", dataToServer);
        // console.log(dataToServer);
        // alert("ok");
        // this.setState(newState);
        window.location.reload();
        }
    }
    btn_reject = async (index) => {
        var newState = {...this.state};
        newState.joinmember.postID = this.props.match.params.id;
        if (index >= 0 && index < newState.applyMan.length) {
            newState.joinmember.participants = newState.applyMan[index].participants;
        newState.joinmember.joinL = "N";
        this.setState(newState);
        var dataToServer = {
            postID : this.props.match.params.id,
            participants: this.state.joinmember.participants,
            joinL: this.state.joinmember.joinL
        }
        await axios.post("http://localhost:8000/post/reject", dataToServer);
        window.location.reload();
        }
    }
} 
export default OwnPost;