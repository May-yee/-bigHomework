import React, { Component } from 'react';
import Header from './header';
import axios from 'axios';
import cookie from 'react-cookies'
class MemberEdit extends Component {
    state = {
        // headShot:"",
        // userImgPreview:"",
     } 
    render() { 
        return (
            <React.Fragment>
            <Header id={this.props.match.params.id}/>
            <div className="main">
                <div className="container">
                    <h2 style={{textAlign: "center"}}>帳號編輯 </h2>
                    <div className="settingEdit">
                        <form>
                            <div className="member_img">
                                <img  id="imagePreview" src={this.state.userImgPreview} alt=""/>
                            </div>
                            <div className="settingItem row">
                                <label className="settingItemTitle row"><h3>上</h3><h3>傳</h3><h3>頭</h3><h3>貼:</h3></label>
                                <input type="file" id="imageInput" accept=".png,.jpg,.jpeg" multiple="false" onInput={this.handleImageChange}/>    
                            </div>
                            <div className="settingItem row">
                                <label for="userName" className="settingItemTitle row"><h3>會</h3><h3>員</h3><h3>名</h3><h3>稱:</h3></label>
                                <input type="text" defaultValue={this.state.userName} name="userName" id='userName'/>
                            </div>
                            <div className="settingItem row">
                                <label for="userEmail" className="settingItemTitle row"><h3>信</h3><h3>箱:</h3></label>
                                <input type="text" defaultValue={this.state.userEmail} name="userEmail" id='Email'/>
                            </div>
                            <div className="settingItem row">
                                <label for="sex" className="settingItemTitle row"><h3>性</h3><h3>別:</h3></label>
                                <select name="sex" id="sex">
                                    <option value="1" selected={this.state.sex ===1}>男</option>
                                    <option value="2" selected={this.state.sex ===2}>女</option>
                                    <option value="3" selected={this.state.sex ===3}>其他</option>
                                    <option value="4" selected={this.state.sex ===4}>不公開</option>
                                </select>
                            </div>
                            <div className="settingItem">
                                <label for="introduction" className="settingItemTitle row"><h3>自</h3><h3>我</h3><h3>介</h3><h3>紹:</h3></label>
                                <textarea name="introduction" id="introduction" cols="30" rows="10" defaultValue={this.state.introduction}></textarea>
                            </div>
                            <div className="btn_group">
                                <button className="btn btn_orange" type='button' onClick={this.onEdit}>確定</button>
                                <a href={"/Joing/ownmembers/" + cookie.load('userID')} className="btn btn_gray">取消</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </React.Fragment>
    
        );
    }
    componentDidMount = async () => {
        var result = await axios.get("http://localhost:8000/member/info/" + this.props.match.params.id);
        var newState = {...this.state};
        newState.headShot = result.data.headShot;
        newState.userImgPreview = result.data.headShot;
        newState.userEmail = result.data.userEmail;
        newState.sex = result.data.sex;
        newState.userName = result.data.userName;
        newState.introduction = result.data.introduction;
        this.setState(newState);
    }
    handleImageChange = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            var newState = {...this.state};
            newState.headShot = file;
            newState.userImgPreview = reader.result;
            this.setState(newState);
        }
        reader.readAsDataURL(file);
    }
    onEdit = async (e) => {
        console.log(this.state.headShot)
        var formData = new FormData();
        var config = {headers: {'Content-Type': 'multipart/form-data'}};
        formData.append('headShot',  this.state.headShot);
        formData.append('userEmail', document.getElementById('Email').value);
        formData.append('userName', document.getElementById('userName').value);
        formData.append('sex', document.getElementById('sex').value);
        formData.append('introduction', document.getElementById('introduction').value);
        formData.append('userID', cookie.load('userID'));
        var result = await axios.post(
            'http://localhost:8000/member/edit',
            formData,
            config
        );
        window.location.href = "/Joing/ownmembers/" + cookie.load('userID')
    }
}
 
export default MemberEdit;