import React, { Component } from 'react';
import Header from './header';
import axios from 'axios';
class MemberEdit extends Component {
    state = { } 
    render() { 
        return (
            <React.Fragment>
            <Header id={this.props.match.params.id}/>
            <div className="main">
                <div className="container">
                    <h2 style={{textAlign: "center"}}>帳號編輯 </h2>
                    <div className="settingEdit">
                        <form action="" method="get">
                            <div className="member_img">
                                <img  id="imagePreview" src="http://localhost:3000/images/head_sticker.png" alt=""/>
                            </div>
                            <div className="settingItem row">
                                <label className="settingItemTitle row"><h3>上</h3><h3>傳</h3><h3>頭</h3><h3>貼:</h3></label>
                                <input type="file" id="imageInput" accept="image/*" multiple="false"/>    
                            </div>
                            <div className="settingItem row">
                                <label for="memberName" className="settingItemTitle row"><h3>會</h3><h3>員</h3><h3>名</h3><h3>稱:</h3></label>
                                <input type="text" value={this.state.userName} name="memberName"/>
                            </div>
                            <div className="settingItem row">
                                <label for="mail" className="settingItemTitle row"><h3>信</h3><h3>箱:</h3></label>
                                <input type="text" value={this.state.userEmail} name="mail"/>
                            </div>
                            <div className="settingItem row">
                                <label for="password" className="settingItemTitle row"><h3>密</h3><h3>碼:</h3></label>
                                <input type="password" value="" name="password"/>
                            </div>
                            <div className="settingItem row">
                                <label for="birth" className="settingItemTitle row"><h3>生</h3><h3>日:</h3></label>
                                <input type="date" value="" name="birth"/>
                            </div>
                            <div className="settingItem row">
                                <label for="sex" className="settingItemTitle row"><h3>性</h3><h3>別:</h3></label>
                                <select name="sex" id="" value={this.state.sex}>
                                    <option value="0">男</option>
                                    <option value="1">女</option>
                                    <option value="2">其他</option>
                                    <option value="3">不公開</option>
                                </select>
                            </div>
                            <div className="settingItem">
                                <label for="introduction" className="settingItemTitle row"><h3>自</h3><h3>我</h3><h3>介</h3><h3>紹:</h3></label>
                                <textarea name="introduction" id="" cols="30" rows="10" value={this.state.introduction}></textarea>
                            </div>
                            <div className="btn_group">
                                <button className="btn btn_orange">確定</button>
                                <a href="/ownMember" className="btn btn_gray">取消</a>
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
        newState = result.data;
        this.setState(newState);
    }
}
 
export default MemberEdit;