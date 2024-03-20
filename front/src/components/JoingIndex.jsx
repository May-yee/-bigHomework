import React, { Component } from 'react';
import Header from './header';
import axios from 'axios';
class JoingIndex extends Component {
    state = { 
        postList: []
        // memberId : 2,
        // path : "/Joing/memeberjoinrecord"
    }
      
    render() { 
        return (
                                   
<body>
    <Header/>
    <div class="main">
        <a href="/Joing/postcreate" class="post_create_btn">
            <div class="post_create">
                <div class="line"></div>
                <div class="line"></div>
            </div>
        </a>
        <div class="jumbotron ">
            <div class="mask"></div>
            <div class="jumbotron_content">
                <h1>揪團ING讓你不再孤單</h1>
                <h3>像候鳥一樣隨人群而飛</h3>
                <div class="jumbotron_p">
                    <p>
                        渴望與志同道合的人一起度過精彩時光？快來加入我們的揪團網站吧！
                        <br />
                        無論你是喜歡戶外活動、藝術文化、美食探險還是尋找新的興趣愛好，我們的揪團網站都能滿足你的需求。在這裡，你可以輕鬆地尋找到各種各樣的活動，並與來自台灣各地的新朋友一起共享難忘的體驗。
                        <br />
                        參加我們的揪團活動，不僅可以擴展你的社交圈子，還可以豐富你的生活，打造屬於自己的精彩回憶。現在就加入我們，開始你的飛翔之旅吧！
                    </p>
                </div>

            </div>
        </div>
        <div class="container ">
            <div class="post">
                <div class="btn_group">
                    <button class="btn btn_orange click">桌遊</button>
                    <button class="btn btn_orange">運動</button>
                    <button class="btn btn_orange">手作</button>
                    <button class="btn btn_orange">吃喝</button>
                    <button class="btn btn_orange">電影</button>
                    <button class="btn btn_orange">展覽</button>
                    <button class="btn btn_orange">其他</button>
                </div>
                <div class="filter_area">
                    <label for="date">
                        日期
                        <input type="date"/>
                    </label>
                    <label for="search">搜尋
                        <input type="text"/>
                    </label>
                </div>
                <div className="post_area">
                    {this.state.postList.map(post =>
                    <a href={`/Joing/post/${post.postID}`} key={post.postID}>
                            <div className="post_box">
                                <div className="post_img"></div>
                                <div className="post_content">
                                    <h3>{post.title}</h3>
                                    <p className="mark_orange">{post.location}</p>
                                    <p>活動時間:{post.activityDate}  {post.activityTime}</p>
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
</body>


    
    


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
    toggleLogoIn = () => {
        const logoIn = document.querySelector(".logoIn");
        logoIn.classList.toggle("show");
        console.log("OK");
    }

}  
    
export default JoingIndex;