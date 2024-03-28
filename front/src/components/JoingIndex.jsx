import React, { Component } from 'react';
import Header from './header';
import axios from 'axios';
import cookie from 'react-cookies'

class JoingIndex extends Component {
    state = { 
        onLogin: "",
        postList: [],
        today: new Date().toISOString().split('T')[0]
        // memberId : 2,
        // path : "/Joing/memeberjoinrecord"
    }
      
    render() { 
        return (
                                   
            <div>
                <Header id={this.props.match.params.id}/>
                <div className="main" onClick={this.toggleLogoIn}>
                    <a href="/Joing/postcreate" className="post_create_btn" onClick={this.onPostCreate}>
                        <div className="post_create">
                            <div className="line"></div>
                            <div className="line"></div>
                        </div>
                    </a>
                    <div className="jumbotron ">
                        <img src="http://localhost:3000/images/jum.png" alt="" />
                    </div>
                    <div className="container ">
                        <div className="post">
                            <div className="btn_group">
                                <button className="btn btn_orange" onClick={this.select_all}>全部</button>
                                <button className="btn btn_orange" onClick={this.select_exercise}>運動</button>
                                <button className="btn btn_orange" onClick={this.select_handmade}>手作</button>
                                <button className="btn btn_orange" onClick={this.select_eat}>吃喝</button>
                                <button className="btn btn_orange" onClick={this.select_movie}>電影</button>
                                <button className="btn btn_orange" onClick={this.select_show}>展覽</button>
                                <button className="btn btn_orange"onClick={this.select_other}>其他</button>
                            </div>
                            <div class="filter_area">
                                <label htmlFor="date">日期</label>
                                <input type="date" onInput={this.select_date} onChange={this.DateInputChange} value={this.state.selectedDate} min={this.state.today}/>
                                <label htmlFor="search">搜尋</label>
                                <input type="text" onChange={this.handleInputChange} value={this.state.keyword} onKeyDown={this.key_enter} placeholder="搜尋"/>
                                <button className='btn btn_orange' onClick={this.handleSearchClick}>確認</button>
                            </div>
                            <div className="post_area">
                                {this.state.postList.map(post => 
                                <a href={cookie.load("userID")==post.host ?`/Joing/ownpost/${post.postID}`:`/Joing/post/${post.postID}`} key={post.postID}>
                                        <div className="post_box">
                                            <div className="post_img">
                                                <img src={post.postIMG} alt="" />
                                            </div>
                                            <div className="post_content">
                                                <h3>{post.title}</h3>
                                                <p className='content_box box_blue'>地點:{post.location}</p>
                                                <p className='content_box'>活動時間:{post.activityDate}  {post.activityTime}</p>
                                                <div className='row'>
                                                    <div className='row'>
                                                        <img src={process.env.PUBLIC_URL + '/images/min.png'} alt="" />
                                                        <p>最低人數<br />{post.minPeople}</p>    
                                                    </div>
                                                    <div className='row'>
                                                        <img src={process.env.PUBLIC_URL + '/images/max.png'} alt="" />
                                                        <p>最高人數 <br />{post.maxPeople}</p>   
                                                    </div>
                                                    <div className='row'>
                                                        <img src={process.env.PUBLIC_URL + '/images/PRICE.png'} alt="" />
                                                        <p>每人金額<br />{post.price} /人</p>   
                                                    </div>
                                                </div>
                                                
                                                
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
        newState.selectedDate = "";
        this.setState(newState);
    }
    select_handmade = async () => {
        var result =  await axios.get("http://localhost:8000/index/post/handmade")
        var newState = {...this.state};
        newState.postList = result.data;
        newState.selectedDate = "";
        this.setState(newState);
    }
    select_eat = async () => {
        var result =  await axios.get("http://localhost:8000/index/post/eat")
        var newState = {...this.state};
        newState.postList = result.data;
        newState.selectedDate = "";
        this.setState(newState);
    }
    select_movie = async () => {
        var result =  await axios.get("http://localhost:8000/index/post/movie")
        var newState = {...this.state};
        newState.postList = result.data;
        newState.selectedDate = "";
        this.setState(newState);
    }
    select_show = async () => {
        var result =  await axios.get("http://localhost:8000/index/post/show")
        var newState = {...this.state};
        newState.postList = result.data;
        newState.selectedDate = "";
        this.setState(newState);
    }
    select_other = async () => {
        var result =  await axios.get("http://localhost:8000/index/post/other")
        var newState = {...this.state};
        newState.postList = result.data;
        newState.selectedDate = "";
        this.setState(newState);
        
    }
    DateInputChange = (event) => {
        this.setState({ selectedDate: event.target.value });
    }
    select_date = async (event) => {
          const result = await axios.get(`http://localhost:8000/index/post/date?value=${event.target.value}`);
          const newState = { ...this.state };
          newState.postList = result.data;
          this.setState(newState);
      }
    select_all = async (event) => {
        var result =  await axios.get("http://localhost:8000/index/post")
        var newState = {...this.state};
        newState.postList = result.data;
        newState.selectedDate = "";
        this.setState(newState);
    }


    handleInputChange = (event) => {
        this.setState({ keyword: event.target.value });
    }


    handleSearchClick = async () => {
        const { keyword } = this.state;
        const result = await axios.get(`http://localhost:8000/index/post/search?keyword=${keyword}`);
        const newState = { ...this.state };
        newState.postList = result.data;
        this.setState(newState);
    }
    key_enter = async (e) => {
        if(e.key==="Enter"){
            const { keyword } = this.state;
            const result = await axios.get(`http://localhost:8000/index/post/search?keyword=${keyword}`);
            const newState = { ...this.state };
            newState.postList = result.data;
            this.setState(newState);
        }
    }

}  
    
    
export default JoingIndex;