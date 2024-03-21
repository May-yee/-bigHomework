import React, { Component } from 'react';
import axios from 'axios';
class JoingPostCreate extends Component {
    state = { 
        postItem: {},
        ImgPreview: "http://localhost:3000/images/head_sticker.png"
     }
     handleImageChange = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                ImgPreview: reader.result
            });
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    render() { 
        return (
<div className="main">
        <div className="container">
            <div className="create">
                <form action="" method="">
                    <div className="post_img">
                        <img  id="imagePreview" src={this.state.ImgPreview} alt=""/>
                    </div>
                    <div className="settingItem row">
                        <label className="settingItemTitle row"><h3>上</h3><h3>傳</h3><h3>圖</h3><h3>片:</h3></label>
                        <input type="file" id="imageInput" accept="image/*" multiple="false" onChange={this.handleImageChange}/>    
                    </div>
                    <div className="settingItem row">
                        <label htmlFor="type" className="settingItemTitle row"><h3>類</h3><h3>別:</h3></label>
                        <select name="type" id="" value={this.state.postItem.type} onChange= {this.type_change}>
                            <option value="0">運動</option>
                            <option value="1">手作</option>
                            <option value="2">吃喝</option>
                            <option value="3">電影</option>
                            <option value="4">展覽</option>
                            <option value="5">其他</option>
                        </select>
                    </div>
                    <div className="settingItem row">
                        <label htmlFor="title" className="settingItemTitle row"><h3>標</h3><h3>題:</h3></label>
                        <input type="text" value={this.state.postItem.title} name="title" onChange={this.title_change}/>
                    </div>
                    <div className="settingItem row">
                        <label htmlFor="registeredDate" className="settingItemTitle row"><h3>揪</h3><h3>團</h3><h3>時</h3><h3>間:</h3></label>
                        <input type="date" value={this.state.postItem.registeredDate} onChange={this.registeredDate_change} name="registeredDate" style={{marginRight: "20px"}}/>
                        <input type="time" value={this.state.postItem.registeredTime} onChange={this.registeredTime_change} name="registeredTime"/>
                    </div>
                    <div className="settingItem row">
                        <label htmlFor="activityDate" className="settingItemTitle row"><h3>活</h3><h3>動</h3><h3>時</h3><h3>間:</h3></label>
                        <input type="date" value={this.state.postItem.activityDate} onChange={this.activityDate_change} name="activityDate"/>
                        <input type="time" value={this.state.postItem.activityTime} onChange={this.activityTime_change} name="activityTime"/>
                    </div>
                    <div class="settingItem row">
                        <label for="location" class="settingItemTitle row"><h3>地</h3><h3>點:</h3></label>
                        <input id="searchInput" type="text" value={this.state.postItem.location} onChange={this.location_change}/>
                        <button id="searchButton" class="btn btn_orange">查看地圖</button>
                    </div>
                    <div className="settingItem row">
                        <label htmlFor="minPeople" className="settingItemTitle row"><h3>最</h3><h3>少</h3><h3>人</h3><h3>數:</h3></label>
                        <input type="number" value={this.state.postItem.minPeople} onChange={this.minPeople_change}  name="minPeople"  min="0"/>
                        <p className="remarks">(不限人數請選0)</p>
                    </div>
                    <div className="settingItem row">
                        <label htmlFor="maxPeople" className="settingItemTitle row"><h3>最</h3><h3>多</h3><h3>人</h3><h3>數:</h3></label>
                        <input type="number" value={this.state.postItem.maxPeople} onChange={this.maxPeople_change} name="maxPeople" min="0"/>
                        <p className="remarks">(不限人數請選0)</p>
                    </div>
                    <div className="settingItem row">
                        <label htmlFor="price" className="settingItemTitle row"><h3>每</h3><h3>人</h3><h3>費</h3><h3>用:</h3></label>
                        <input type="number" value={this.state.postItem.price} onChange={this.price_change} name="price" min="-1"/>
                        <label htmlFor="priceCheck" className="row" id="ifprice">
                            <input type="checkbox" name="priceCheck" id="priceCheck"/>
                            <div className="checkbox"></div>
                            各付各的
                        </label>
                    </div>
                    <div className="settingItem">
                        <label htmlFor="introduction" className="settingItemTitle row"><h3>內</h3><h3>文:</h3></label>
                        <textarea name="introduction" id="" cols="30" rows="10" value={this.state.postItem.content} onChange={this.content_change}></textarea>
                    </div>
                    <div className="btn_group">
                        <button className="btn btn_orange" onClick={this.ok_click}>確定</button>
                        <a href="/" className="btn btn_gray">取消</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
        );
    }
    
    type_change = (e) => {
        var newState = {...this.state};
        newState.postItem.type = e.target.value
        this.setState(newState);
    }


    title_change = (e) => {
        var newState = {...this.state};
        newState.postItem.title = e.target.value
        this.setState(newState);
    }
    registeredDate_change = (e) => {
        var newState = {...this.state};
        newState.postItem.registeredDate = e.target.value
        this.setState(newState);
    }
    registeredTime_change = (e) => {
        var newState = {...this.state};
        newState.postItem.registeredTime = e.target.value
        this.setState(newState);    
    }

    activityDate_change = (e) => {
        var newState = {...this.state};
        newState.postItem.activityDate = e.target.value
        this.setState(newState);
    }


    activityTime_change = (e) => {
        var newState = {...this.state};
        newState.postItem.activityTime = e.target.value
        this.setState(newState);
    }

    minPeople_change = (e) => {
        var newState = {...this.state};
        newState.postItem.minPeople = e.target.value;
        this.setState(newState);       
    }
    maxPeople_change = (e) => {
        var newState = {...this.state};
        newState.postItem.maxPeople = e.target.value;
        this.setState(newState);        
    }

    location_change = (e) => {
        var newState = {...this.state};
        newState.postItem.location = e.target.value;
        this.setState(newState);
        console.log(this.state.postItem.location)        
    }

    price_change = (e) => {
        var newState = {...this.state};
        newState.postItem.price = e.target.value;
        this.setState(newState); 
    }

    content_change = (e) => {
        var newState = {...this.state};
        newState.postItem.content = e.target.value;
        this.setState(newState); 
    }

    ok_click = async () => {
        var dataToSever = {
            postItem: this.state.postItem
        } 
        await axios.post("http://localhost:8000/post/create",dataToSever);
        window.location = "/";
    }
    
}
 
export default JoingPostCreate;