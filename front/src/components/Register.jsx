import React, { Component } from 'react';
import axios from 'axios';
import { Croppie } from "croppie";
var croppie ;
var croppieOptions;
var c;
class Register extends Component {
    state = {
        userImgPreview: "http://localhost:3000/images/head_sticker.png",
        headShot: "",
        userEmail: "",
        passWord: "",
        passWord2:"",
        passWordPoint: 0,
        userName: "",
        birth: "",
        birthBoolean: 0,
        sex: "0",
        introduction: "",
    }
    img = React.createRef();
    render() {
        return (
            <div className="main">
                <div className="container">
                    <h2 style={{ textAlign: "center" }}>註冊帳號</h2>
                    <div className="settingEdit">
                        <form id="registerform" onSubmit={this.onSubmit}>
                           
                            <div id="main-cropper" >
                                <div className="member_img" >
                                    <img ref={this.img} src={this.state.userImgPreview} alt="cropped image" />
                                </div>
                            </div>
                            <div className="settingItem row">
                                
                                <label className="settingItemTitle row"><h3>上</h3><h3>傳</h3><h3>頭</h3><h3>貼:</h3></label>
                                <input type="file" id="upload" multiple={false}  accept=".png,.jpg,.jpeg" onChange={this.OnFileUpload} required/>
                                <button id="btnCrop" type='button' className='btn btn_blue' onClick={this.onResult}>上傳</button>
                            </div>
                            <div className="settingItem row">
                                <label htmlFor="userName" className="settingItemTitle row"><h3>會</h3><h3>員</h3><h3>名</h3><h3>稱:</h3></label>
                                <input type="text" value={this.state.userName} name="userName" id="userName" onChange={this.userNameChange} required/>
                            </div>
                            <div className="settingItem row">
                                <label htmlFor="userEmail" className="settingItemTitle row"><h3>信</h3><h3>箱:</h3></label>
                                <input type="email" value={this.state.userEmail} name="userEmail" id="userEmail" onChange={this.userEmailChange} required/>
                            </div>
                            <div className="settingItem row">
                                <label htmlFor="passWord" className="settingItemTitle row"><h3>密</h3><h3>碼:</h3></label>
                                <input pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,13}$" type="passWord" value={this.state.passWord} onChange={this.passWordChange} 
                                onFocus={this.onFocus} onBlur={this.onBlur} name="passWord" id="passWord" required/>
                                 {(this.state.passWordPoint) ? 
                                <ul id="passWordPoint">
                                    <li>長度為6~13字元</li>
                                    <li>至少包含一個大寫、小寫、數字</li>
                                </ul> : ""}
                            </div>
    
                            <div className="settingItem row">
                                <label htmlFor="passWord2" className="settingItemTitle row"><h3>重</h3><h3>新</h3><h3>輸</h3><h3>入:</h3></label>
                                <input pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,13}$" type="passWord" value={this.state.passWord2} onChange={this.passWordChange2} name="passWord2" id="passWord2" required/>
                            </div>
                            <div className="settingItem row">
                                <label htmlFor="birth" className="settingItemTitle row"><h3>生</h3><h3>日:</h3></label>
                                <input type="date" value={this.state.birth} onChange={this.birthChange} name="birth" id="birth" required/>
                                <label htmlFor="birthBoolean" className="row">
                                    <input type="checkbox" name="birthBoolean" id="birthBoolean" value={this.state.birthBoolean} onChange={this.birthBooleanChange}/>
                                    <div className="checkbox"></div>
                                    不公開
                                </label>
                            </div>
                            <div className="settingItem row">
                                <label htmlFor="sex" className="settingItemTitle row"><h3>性</h3><h3>別:</h3></label>
                                <select name="sex" id="sex" onChange={this.sexChange}>
                                    <option value="1">男</option>
                                    <option value="2">女</option>
                                    <option value="3">其他</option>
                                    <option value="4">不公開</option>
                                </select>
                            </div>
                            <div className="settingItem">
                                <label htmlFor="introduction" className="settingItemTitle row"><h3>自</h3><h3>我</h3><h3>介</h3><h3>紹:</h3></label>
                                <textarea name="introduction" id="introduction" cols="30" rows="10" onChange={this.introductionChange}></textarea>
                            </div>
                            <div className="btn_group">
                                <button type="submit" className="btn btn_orange">確定</button>
                                <a href="/" className="btn btn_gray">取消</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }   //end of render
   componentDidMount = () => {
    croppie = document.getElementById("main-cropper");
    croppieOptions = {
        showZoomer: true,
        enableOrientation: true,
        mouseWheelZoom: "ctrl",
        viewport: {
            width: 100, height: 100, type: "circle"
        },
        boundary: {
            width: 400, height: 300
        }
    };
    c = new Croppie(croppie, croppieOptions);
   }
    OnFileUpload = (e) => {
		const reader = new FileReader();
        const file = e.target.files[0];
		reader.readAsDataURL(file);
		reader.onload = () => {
			c.bind({ url: reader.result });
		};
    }
    onResult = (e) => {
        c.result("base64").then(base64 => {
            this.img.current.src = base64
          });
        c.result("blob").then(blob => {
        var newState = {...this.state};
        newState.headShot = blob;
        this.setState(newState);
        });  
        
    }
    // handleImageChange = (e) => {
    //     const reader = new FileReader();
    //     const file = e.target.files[0];
    //     reader.onloadend = () => {
    //         var newState = {...this.state};
    //         newState.headShot = e.target.files[0];
    //         newState.userImgPreview = reader.result;
    //         this.setState(newState);
    //     }
    //     reader.readAsDataURL(file);
        
    // }
    userNameChange = (e) => {
        var newState = {...this.state};
        newState.userName = e.target.value;
        this.setState(newState);
        console.log(this.state)
    }
    userEmailChange = (e) => {
        var newState = {...this.state};
        newState.userEmail = e.target.value;
        this.setState(newState);
    }
    passWordChange = (e) => {
        var newState = {...this.state};
        newState.passWord = e.target.value;
        this.setState(newState);
    }
    onFocus = (e) => {
        var newState = {...this.state};
        newState.passWordPoint = 1;
        this.setState(newState);
    }
    onBlur = (e) => {
        var newState = {...this.state};
        newState.passWordPoint = 0;
        this.setState(newState);
    }
    passWordChange2 = (e) => {
        var newState = {...this.state};
        newState.passWord2 = e.target.value;
        this.setState(newState);
    }
    birthChange = (e) => {
        var newState = {...this.state};
        newState.birth = e.target.value;
        this.setState(newState);
    }
    birthBooleanChange = (e) => {
        var newState = {...this.state};
        newState.birthBoolean = e.target.checked ? 1 : 0;
        this.setState(newState);
    }
    sexChange = (e) => {
        var newState = {...this.state};
        newState.sex = e.target.value;
        this.setState(newState);
    }
    introductionChange = (e) => {
        var newState = {...this.state};
        newState.introduction = e.target.value;
        this.setState(newState);
    };
    onSubmit = async (e) => {
        e.preventDefault();
        if(this.state.headShot){
            if(this.state.passWord === this.state.passWord2) {
                var formData = new FormData();
                var config = {headers: {'Content-Type': 'multipart/form-data'}};
                console.log(this.state.headShot)
                formData.append('headShot',  this.state.headShot);
                formData.append('userEmail', this.state.userEmail);
                formData.append('passWord', this.state.passWord);
                formData.append('userName', this.state.userName);
                formData.append('birth',  this.state.birth);
                formData.append('birthBoolean', this.state.birthBoolean);
                formData.append('sex', this.state.sex);
                formData.append('introduction', this.state.introduction);
                var result = await axios.post(
                    'http://localhost:8000/member/register',
                    formData,
                    config
                );
                if(result.data['success']) {
                    alert("註冊成功");
                    window.location.href = "/"
                }else {
                    alert("註冊失敗");
                }
            } else {
                alert("密碼不相同")
            }
        }else {
            alert("請點擊上傳頭貼")
        }
        
        
    }
}

export default Register;
