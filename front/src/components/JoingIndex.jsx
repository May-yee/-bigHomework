import React, { Component } from 'react';
import Header from './header';
import axios from 'axios';
import cookie from 'react-cookies'

class JoingIndex extends Component {
    state = { 
        onLogin: "",
        postList: [],
        
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
                                <input type="date" onChange={this.select_date} value={this.state.selectedDate}/>
                                <label htmlFor="search">搜尋</label>
                                <input type="text" onChange={this.handleInputChange} value={this.state.keyword} placeholder="搜尋"/>
                                <button className='btn btn_orange' onClick={this.handleSearchClick}>確認</button>
                            </div>
                            <div className="post_area">
                                {this.state.postList.map(post => 
                                <a href={cookie.load("userID")==post.userID ?`/Joing/ownpost/${post.postID}`:`/Joing/post/${post.postID}`} key={post.postID}>
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
    select_other = async (event) => {
        var result =  await axios.get("http://localhost:8000/index/post/other")
        var newState = {...this.state};
        newState.postList = result.data;
        newState.selectedDate = event.target.value;
        this.setState(newState);
    }

    select_date = async (event) => {
        var selectedDate = event.target.value; // 獲取選擇的日期       
          const result = await axios.get(`http://localhost:8000/index/post/date?value=${selectedDate}`);
          const newState = { ...this.state };
          newState.postList = result.data;
          this.setState(newState);
          selectedDate = event.target.value;
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


}  
    
    
export default JoingIndex;