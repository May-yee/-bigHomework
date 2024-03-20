import React, { Component } from 'react';
import Header from './header';
import axios from 'axios';
class PostDelete extends Component {
    state = { 
        postItem:{},
     } 
    render() { 
        return (
        <React.Fragment>
        <Header/>     
            <div class="main">            
            <div class="container post_page">
                    <div class="post_item">                
                    <div class="images"></div>
                    <div class="post_item_content">
                        <div class="member_box">
                            <img src="http://localhost:3000/images/head_sticker.png" alt=""/>
                            <p>會員名稱</p>
                        </div>
                        <h2>{this.state.postItem.title}</h2>
                        <div class="btn_group row">
                            <a href={`/Joing/postedit/${this.props.match.params.id}`}><div class="btn btn_blue">編輯</div></a>
                            <div class="btn btn_gray" onClick={this.ok_click}>刪除</div>
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
        </div>
    </div>        
            
        
    </React.Fragment>


        );
    }
   
    componentDidMount = async () =>{
        var result = await axios.get(`http://localhost:8000/index/postitem/${this.props.match.params.id}`);    
        var newState = {...this.state};
        newState.postItem = result.data;        
        this.setState(newState);
    }

    ok_click =  () => {
        // console.log(this.state.todoItem.todoTableId)
        axios.delete(
            "http://localhost:8000/post/delete/" + 
            this.state.postItem.postID);
        window.location = "http://localhost:3000/";
    }
    
} 
export default PostDelete;