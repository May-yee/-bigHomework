import React,{ useState,Component,useEffect } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { StandaloneSearchBox } from '@react-google-maps/api';
import Header from './header';
import { useParams } from 'react-router-dom';

function PostEdit(){
    const [postData, setPostData] = useState({
        postID:'',
        postIMG: '',
        type: '',
        title: '',
        registeredDate: '',
        registeredTime: '',
        activityDate: '',
        activityTime: '',
        minPeople: 0,
        maxPeople: 0,
        location: '',
        price: 0,
        content: ''
    });
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:8000/index/postitem/${id}`)
            .then(response => {
                console.log("拿到資料", response);
                setPostData(response.data);
            })
            .catch(error => {
                console.error("發生錯誤", error);
            });
    }, [id]);

    const [imgPreview, setImgPreview] = useState('');
    const [searchBox, setSearchBox] = useState(null);

    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value
        });
    };
    //Google map------------------
    const handleSearchBoxLoad = (ref) => {
        setSearchBox(ref);
    };

    const handlePlacesChanged = () => {
        if (searchBox) {
            const places = searchBox.getPlaces();
            console.log(places);
            setPostData({
                ...postData,
                location: places[0].name
            });
        }
    };
    const goToGoogleMap = () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${postData.location}`, '_blank');
    };
    
    //--------------------
    let today = new Date().toISOString().split('T')[0];


    const handleImageChange = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            setPostData({
                ...postData,
                postIMG: file
            });
            setImgPreview(reader.result);
            
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    
    
    
    //------------------
    const editPost=(e) =>{
        console.log(postData.postIMG)
        e.preventDefault();
        var formData = new FormData();
        formData.append("postID",id);
        formData.append("postIMG",postData.postIMG);
        formData.append("type", postData.type);
        formData.append("title", postData.title);
        formData.append("registeredDate", postData.registeredDate);
        formData.append("registeredTime", postData.registeredTime);
        formData.append("activityDate", postData.activityDate);
        formData.append("activityTime", postData.activityTime);
        formData.append("minPeople", postData.minPeople);
        formData.append("maxPeople", postData.maxPeople);
        formData.append("location", postData.location);
        formData.append("price",postData.price);
        formData.append("content", postData.content);
        console.log(formData);
        
        axios.post("http://localhost:8000/index/postitem",formData)
        .then(response => {
            console.log("Post created successfully:", response);
            window.location = (cookie.load('userID')) ? "/Joing/index/" + cookie.load('userID') : "/";
        })
        .catch(error => {
            console.error("Error creating post:", error);
        });
    
    }
    
    return (
        <div className="main">
            <div className="container">
                <div className="create">
                    <form action="" method="" onSubmit={editPost}>
                        <div className="post_img">
                            {<img src={ imgPreview || postData.postIMG } alt="Preview" />}
                        </div>
                        <div className="settingItem row">
                            <label className="settingItemTitle row"><h3>上</h3><h3>傳</h3><h3>圖</h3><h3>片:</h3></label>
                            <input type="file" id="imageInput" accept="image/*" multiple={false} onChange={handleImageChange} name='postIMG'/>    
                        </div>
                        <div className="settingItem row">
                            <label htmlFor="type" className="settingItemTitle row"><h3>類</h3><h3>別:</h3></label>
                            <select name="type" onChange= {handleInputChange} value={postData.type} required>
                                <option value="">請選擇---</option>
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
                            <input type="text" name="title" onChange={handleInputChange} value={postData.title} required/>
                        </div>
                        <div className="settingItem row">
                            <label htmlFor="registeredDate" className="settingItemTitle row"><h3>揪</h3><h3>團</h3><h3>時</h3><h3>間:</h3></label>
                            <input type="date" min={today} onChange={handleInputChange} name="registeredDate" value={postData.registeredDate} required/>
                            <input type="time" onChange={handleInputChange} name="registeredTime" value={postData.registeredTime} required/>
                        </div>
                        <div className="settingItem row">
                            <label htmlFor="activityDate" className="settingItemTitle row"><h3>活</h3><h3>動</h3><h3>時</h3><h3>間:</h3></label>
                            <input type="date" min={today} onChange={handleInputChange} name="activityDate" value={postData.activityDate} required/>
                            <input type="time" onChange={handleInputChange} name="activityTime" value={postData.activityTime} required/>
                        </div>
                        <div className="settingItem row">
                            <label htmlFor="location" className="settingItemTitle row"><h3>地</h3><h3>點:</h3></label>
                            <StandaloneSearchBox onLoad={handleSearchBoxLoad} onPlacesChanged={handlePlacesChanged}>
                                <input id="searchInput" type="text" onChange={(e) => setPostData({...postData, location: e.target.value})} value={postData.location} required/>
                            </StandaloneSearchBox>
                            <button id="searchButton" className="btn btn_orange"  onClick={goToGoogleMap}>查看地圖</button>
                        </div>
                        <div className="settingItem row">
                            <label htmlFor="minPeople" className="settingItemTitle row"><h3>最</h3><h3>少</h3><h3>人</h3><h3>數:</h3></label>
                            <input type="number" onChange={handleInputChange}  name="minPeople"  min="0" value={postData.minPeople} required/>
                            <p className="remarks">(不限人數請選0)</p>
                        </div>
                        <div className="settingItem row">
                            <label htmlFor="maxPeople" className="settingItemTitle row"><h3>最</h3><h3>多</h3><h3>人</h3><h3>數:</h3></label>
                            <input type="number" onChange={handleInputChange} name="maxPeople" min="0" value={postData.maxPeople} required/>
                            <p className="remarks">(不限人數請選0)</p>
                        </div>
                        <div className="settingItem row">
                            <label htmlFor="price" className="settingItemTitle row"><h3>每</h3><h3>人</h3><h3>費</h3><h3>用:</h3></label>
                                <input type="number" onChange={handleInputChange} name="price" min="0" value={postData.price} required />
                        </div>
                        <div className="settingItem">
                            <label htmlFor="introduction" className="settingItemTitle row"><h3>內</h3><h3>文:</h3></label>
                            <textarea name="content" id="" cols="30" rows="10" onChange={handleInputChange}  value={postData.content} required></textarea>
                        </div>
                        <div className="btn_group">
                            <button className="btn btn_orange" type='submit'>確定</button>
                            <a href="/" className="btn btn_gray">取消</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
    
}
 
export default PostEdit;