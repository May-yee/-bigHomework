import React, { Component } from 'react';
import Header from './header';
import axios from 'axios';
import cookie from 'react-cookies'

class JoingIndex extends Component {
    state = { 
        onLogin: "",
        postList: []
        // memberId : 2,
        // path : "/Joing/memeberjoinrecord"
    }
      
    render() { 
        return (
                                   
            <div onClick={this.toggleLogoIn}>
                <Header id={this.props.match.params.id}/>
                <div className="main">
                    <a href="/Joing/postcreate" className="post_create_btn" onClick={this.onPostCreate}>
                        <div className="post_create">
                            <div className="line"></div>
                            <div className="line"></div>
                        </div>
                    </a>
                    <div className="jumbotron ">
                        <div className="mask"></div>
                        <div className="jumbotron_content">
                            <h1>揪團ING讓你不再孤單</h1>
                            <h3>像候鳥一樣飛向溫暖</h3>
                            <div className="jumbotron_p">
                                <p>
                                    渴望與志同道合的人一起度過精彩時光？快來加入我們的揪團網站吧！
                                    <br />
                                    無論你是喜歡戶外活動、藝術文化、美食探險還是尋找新的興趣愛好，我們的揪團網站都能滿足你的需求。
                                    <br />
                                    在這裡，你可以輕鬆地尋找到各種各樣的活動，並與來自台灣各地的新朋友一起共享難忘的體驗。
                                    <br />
                                    參加我們的揪團活動，不僅可以擴展你的社交圈子，還可以豐富你的生活，打造屬於自己的精彩回憶。現在就加入我們，開始你的飛翔之旅吧！
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="container ">
                        <div className="post">
                            <div className="btn_group">
                                <button className="btn btn_orange">桌遊</button>
                                <button className="btn btn_orange" onClick={this.select_exercise}>運動</button>
                                <button className="btn btn_orange" onClick={this.select_handmade}>手作</button>
                                <button className="btn btn_orange" onClick={this.select_eat}>吃喝</button>
                                <button className="btn btn_orange" onClick={this.select_movie}>電影</button>
                                <button className="btn btn_orange" onClick={this.select_show}>展覽</button>
                                <button className="btn btn_orange"onClick={this.select_other}>其他</button>
                            </div>
                            <div class="filter_area">
                                <label htmlFor="date">日期</label>
                                <input type="date"/>
                                <label htmlFor="search">搜尋</label>
                                <input type="text"/>
                            </div>
                            <div className="post_area">
                                {this.state.postList.map(post => 
                                <a href={`/Joing/post/${post.postID}`} key={post.postID}>
                                        <div className="post_box">
                                            <div className="post_img">
                                                <img src={post.postIMG} alt="" />
                                            </div>
                                            <div className="post_content">
                                                <h3>{post.title}</h3>
                                                <p>{post.location}</p>
                                                <p className='content_box'>活動時間:{post.activityDate}  {post.activityTime}</p>
                                                <p>{post.minPeople}</p>
                                                <p>{post.maxPeople}</p>
                                                <p>{post.price} /人</p>
                                            </div>
                                        </div>
                                </a>
                                    )}
                                    
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>


    
    


        )
    }

        
    
    componentDidMount = async () =>{
        var result = await axios.get("http://localhost:8000/index/post");
        var newState = {...this.state};
        newState.postList = result.data;
        this.setState(newState);
        
        //     var newState = {...this.state};
    // if(newState.memberId !== 1){
    //     newState.path = "/Joing/anothermemeberjoinrecord"
    // }else{
    //     newState.path = "/Joing/memeberjoinrecord"
    // }
    // this.setState(newState);
    }
    onPostCreate = (e) => {
        e.preventDefault();
        if(cookie.load("userID")){
            window.location.href = "/Joing/postcreate"
        }else {
            alert('請先登入會員');
        }
    }
    toggleLogoIn = (e) => {
        const logoIn = document.querySelector(".logoIn");
        logoIn.classList.remove("show");
    }
    select_exercise = async () => {
        var result =  await axios.get("http://localhost:8000/index/post/exercise")
        var newState = {...this.state};
        newState.postList = result.data;
        this.setState(newState);
    }
    select_handmade = async () => {
        var result =  await axios.get("http://localhost:8000/index/post/handmade")
        var newState = {...this.state};
        newState.postList = result.data;
        this.setState(newState);
    }
    select_eat = async () => {
        var result =  await axios.get("http://localhost:8000/index/post/eat")
        var newState = {...this.state};
        newState.postList = result.data;
        this.setState(newState);
    }
    select_movie = async () => {
        var result =  await axios.get("http://localhost:8000/index/post/movie")
        var newState = {...this.state};
        newState.postList = result.data;
        this.setState(newState);
    }
    select_show = async () => {
        var result =  await axios.get("http://localhost:8000/index/post/show")
        var newState = {...this.state};
        newState.postList = result.data;
        this.setState(newState);
    }
    select_other = async () => {
        var result =  await axios.get("http://localhost:8000/index/post/other")
        var newState = {...this.state};
        newState.postList = result.data;
        this.setState(newState);
    }
}  
    
    
export default JoingIndex;