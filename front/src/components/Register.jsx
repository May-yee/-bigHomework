import React, { Component } from 'react';

class Register extends Component {
    state = {
        userImgPreview: "http://localhost:3000/images/head_sticker.png"
    }

    handleImageChange = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                userImgPreview: reader.result
            });
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    render() {
        const { userImgPreview } = this.state;

        return (
            <div className="main">
                <div className="container">
                    <h2 style={{ textAlign: "center" }}>註冊帳號</h2>
                    <div className="settingEdit">
                        <form id="registerform" action="" method="post">
                            <div className="member_img">
                                <img id="imagePreview" src={userImgPreview} alt="" />
                            </div>
                            <div className="settingItem row">
                                <label className="settingItemTitle row"><h3>上</h3><h3>傳</h3><h3>頭</h3><h3>貼:</h3></label>
                                <input type="file" id="headShot" accept=".png,.jpg,.jpeg" onChange={this.handleImageChange} multiple={false} required />
                            </div>
                    <div class="settingItem row">
                        <label for="userName" class="settingItemTitle row"><h3>會</h3><h3>員</h3><h3>名</h3><h3>稱:</h3></label>
                        <input type="text" value="" name="userName" id="userName" required/>
                    </div>
                    <div class="settingItem row">
                        <label for="userEmail" class="settingItemTitle row"><h3>信</h3><h3>箱:</h3></label>
                        <input type="email" value="" name="userEmail" id="userEmail" required/>
                    </div>
                    <div class="settingItem row">
                        <label for="passWord" class="settingItemTitle row"><h3>密</h3><h3>碼:</h3></label>
                        <input pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,13}$" type="passWord" value="" name="passWord" id="passWord" required/>
                    </div>
                    <div class="settingItem row">
                        <label for="passWord2" class="settingItemTitle row"><h3>重</h3><h3>新</h3><h3>輸</h3><h3>入:</h3></label>
                        <input pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,13}$" type="passWord" value="" name="passWord2" id="passWord2" required/>
                    </div>
                    <div class="settingItem row">
                        <label for="birth" class="settingItemTitle row"><h3>生</h3><h3>日:</h3></label>
                        <input type="date" value="" name="birth" id="birth" required/>
                        <label for="birthBoolean" class="settingItemTitle row"><h3>公</h3><h3>開:</h3></label>
                        <input type="checkbox" id="birthBoolean" name="birthBoolean"/>
                    </div>
                            {/* 其他註冊表單欄位 */}
                            {/* ... */}
                            <div className="btn_group">
                                <button type="submit" className="btn btn_orange">確定</button>
                                <a href="/" className="btn btn_gray">取消</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
