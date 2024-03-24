import React, { Component } from 'react';
import axios from 'axios';
import { StandaloneSearchBox } from '@react-google-maps/api';

class PostEdit extends Component {
    state = { 
        postItem: {}, 
        today : new Date().toISOString().split('T')[0]
    } 

    handleImageChange = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('postIMG', file);
    
        reader.onloadend = () => {
            const newState = { ...this.state }; // 複製現有狀態
            newState.postItem.postIMG = reader.result; // 將讀取的 base64 圖片數據設置到 postItem 的 postIMG 屬性中
            newState.imgPreview = reader.result; // 將讀取的 base64 圖片數據設置到 imgPreview 狀態中，以便在預覽圖片中使用
            this.setState(newState); // 更新狀態
            this.setState({ formData });
        };
    
        if (file) {
            reader.readAsDataURL(file); // 開始讀取文件
        }

    }

    render() { 
        return (
                <div className="main">
                        <div className="container">
                            <div className="create">
                                <form action="" method="post">
                                    <div className="post_img">
                                        <img src={this.state.postItem.postIMG} alt="Preview" />
                                    </div>
                                    <div className="settingItem row">
                                        <label className="settingItemTitle row"><h3>上</h3><h3>傳</h3><h3>圖</h3><h3>片:</h3></label>
                                        <input type="file" id="imageInput" accept="image/*" multiple={false} onChange={this.handleImageChange}/>    
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
                                        <input type="date" value={this.state.postItem.registeredDate} onChange={this.registeredDate_change} name="registeredDate" min={this.state.today}/>
                                        <input type="time" value={this.state.postItem.registeredTime} onChange={this.registeredTime_change} name="registeredTime"/>
                                    </div>
                                    <div className="settingItem row">
                                        <label htmlFor="activityDate" className="settingItemTitle row"><h3>活</h3><h3>動</h3><h3>時</h3><h3>間:</h3></label>
                                        <input type="date" value={this.state.postItem.activityDate} onChange={this.activityDate_change} name="activityDate" min={this.state.today}/>
                                        <input type="time" value={this.state.postItem.activityTime} onChange={this.activityTime_change} name="activityTime"/>
                                    </div>
                                    <div className="settingItem row">
                                        <label htmlFor="location" className="settingItemTitle row"><h3>地</h3><h3>點:</h3></label>
                                        <StandaloneSearchBox onLoad={this.handleSearchBoxLoad} onPlacesChanged={this.handlePlacesChanged}>
                                            <input id="searchInput" type="text" value={this.state.postItem.location} onChange={this.location_change} required/>
                                        </StandaloneSearchBox>
                                        <button id="searchButton" className="btn btn_orange"  onClick={this.goToGoogleMap}>查看地圖</button>
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
                                        <input type="number" value={this.state.postItem.price} onChange={this.price_change} name="price" min="0"/>
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
    componentDidMount = async () =>{
        var result = await axios.get(`http://localhost:8000/index/postitem/${this.props.match.params.id}`);    
        var newState = {...this.state};
        newState.postItem = result.data;        
        this.setState(newState);
    }

    postIMG_change = (e) => {
        var newState = {...this.state};
        newState.postItem.postIMG = e.target.value
        this.setState(newState);
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

    //Google map------------------
    handleSearchBoxLoad = (ref) => {
        this.setState({ searchBox: ref });
    };

    handlePlacesChanged = () => {
        if (this.searchBox) {
            const places = this.searchBox.getPlaces();
            console.log(places);
            this.setState(prevState => ({
                postItem: {
                    ...prevState.postItem,
                    location: places[0].name
                }
            }));
        }
    };
    goToGoogleMap = () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${this.state.postItem.location}`, '_blank');
    };

    ok_click = async () => {
        const { postItem, formData } = this.state;
        console.log(postItem);
        console.log(formData);
        try {

            formData.append('postItem', JSON.stringify(postItem));
    
            // 發送 POST 請求
            // await axios.put("http://localhost:8000/index/postitem",formData);
    
            // 重定向到其他頁面
            // window.location = "/";
        } catch (error) {
            // console.error("Error:", error);
            // 處理錯誤
        }
    }




}
 
export default PostEdit;