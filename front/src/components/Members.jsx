import React, { useState, useEffect} from 'react';
import axios from 'axios';
import cookie from 'react-cookies'
import { useParams } from 'react-router-dom';
import Header from "./header";


const Members = (props) => {
    const { id } = useParams();
    const [memberData, setMemberData] = useState({});
    const [recordData, setRecordData] = useState([]);
    const [joinRdData, setjoinRdData] = useState([]);

    //-----------------------
    const toggleLogoIn = (e) => {
        const logoIn = document.querySelector(".logoIn");
        logoIn.classList.remove("show");
    }
    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const memberResponse = await axios.get(`http://localhost:8000/members/${id}`);
                setMemberData(memberResponse.data);
                
                const recordResponse = await axios.get(`http://localhost:8000/record/${id}`);
                setRecordData(recordResponse.data);
            
                const joinRdResponse = await axios.get(`http://localhost:8000/joinrecord/${id}`);
                setjoinRdData(joinRdResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMemberData();
    }, [id]);
    // console.log(memberData);
    console.log(recordData);
    //memberNavBtn--------------
    const toggleMemberMainBody = (btnId, mainBodyClass, titleText) => {
        document.querySelectorAll(".memberNavBtn").forEach(body => {
            body.classList.remove("show");
        });
        document.querySelector(`#${btnId}`).classList.add("show");
    
        document.querySelectorAll(".memberMainBody").forEach(body => {
            body.classList.remove("show");
        });
        document.querySelector(`.${mainBodyClass}`).classList.add("show");
        document.querySelector(".memberMain h2").textContent = titleText;
    };

    const btn_setting = () => toggleMemberMainBody("settingBtn", "setting", "帳號設定");
    const btn_record = () => toggleMemberMainBody("recordBtn", "record", "揪團紀錄");
    const btn_joinRecord = () => toggleMemberMainBody("joinRecordBtn", "joinRecord", "參加紀錄");

    return (    
        <React.Fragment>
        <Header id={id}/>
        <div className="main" onClick={toggleLogoIn}>
            <div className="container row member">
                <div className="memberNav">
                    <div className="memberNavBtn show row" id="settingBtn" onClick={btn_setting}>
                        <img src="http://localhost:3000/images/setting_icon.png" alt=""/>
                        <h3 className="p_letter">帳號資訊</h3>
                    </div>
                    <div className="memberNavBtn row" id="recordBtn" onClick={btn_record}>
                        <img src="http://localhost:3000/images/jiu_icon.png" alt=""/>
                        <h3 className="p_letter">揪團紀錄</h3>
                    </div>
                    <div className="memberNavBtn row" id="joinRecordBtn" onClick={btn_joinRecord}>
                        <img src="http://localhost:3000/images/join_icon.png" alt=""/>
                        <h3 className="p_letter">參加紀錄</h3>
                    </div>
                </div>
                <div className="memberMain">
                    <h2>帳號資訊 </h2>
                    {/* setting */}
                    <div className="memberMainBody setting show">
                        <div className="member_img">
                            <img src={memberData.headShot} alt=""/>
                        </div>
                        <div className="settingItem row">
                            <div className="settingItemTitle  row">
                                <h3>會</h3><h3>員</h3><h3>名</h3><h3>稱:</h3>
                            </div>
                            <p>{memberData.userName}</p>
                        </div>
                        <div className="settingItem row">
                            <div className="settingItemTitle  row">
                                <h3>信</h3><h3>箱:</h3>
                            </div>
                            <p>{memberData.userEmail}</p>
                        </div>
                        <div className="settingItem row">
                            <div className="settingItemTitle  row">
                                <h3>性</h3><h3>別:</h3>
                            </div>
                            <p>{memberData.sex==0?"男":
                            memberData.sex==1?"女":
                            memberData.sex==2?"其他":"不公開"}</p>
                        </div>
                        <div className="settingItem row">
                            <div className="settingItemTitle  row">
                                <h3>生</h3><h3>日:</h3>
                            </div>
                            <p>{memberData.	birthBoolean==1?memberData.birth:"不公開"}</p>
                        </div>
                        <div className="settingItem">
                            <div className="settingItemTitle  row">
                                <h3>自</h3><h3>我</h3><h3>介</h3><h3>紹:</h3>
                            </div>
                            <p>{memberData.introduction}</p>
                        </div>

                    </div>


                    {/* record */}
                    <div className="memberMainBody record">
                        {recordData.map((record,index)=>(
                            <a href={'/Joing/post/' +record.postID } className="memberEvent">
                                <div className="memberEventImg">
                                    <img src={record.postIMG} alt=""/>
                                </div>
                                <div className="memberEventContentBlock">
                                    <h3>{record.title}</h3>
                                    <div className="content_box_group">
                                        <div className="content_box">
                                            <p>
                                                <span className="p_letter">活動時間</span>
                                                {record.activityDate} {record.activityTime}
                                            </p>
                                        </div>
                                        <div className="content_box box_blue">
                                            <p>
                                                <span className="p_letter">地點:</span>
                                                {record.location}
                                            </p>
                                        </div>
                                        <div className="content_box">
                                            <p>
                                                <span className="p_letter">每人金額:</span>
                                                {record.price}
                                            </p>
                                        </div>
                                    </div>   
                                </div>
                                
                                <div className="memberEventJoiner">
                                    <div>
                                        <h4>申請人</h4>
                                        <div className="memberEventAvatar">

                                        {record.join.map(m => {
                                            if (m.joinL === "C") {
                                                return (
                                                    <div className="member_img" key={m.userID}>
                                                        <a href={"/Joing/members/" + m.userID}>
                                                            <img src={m.headShot} alt="" />
                                                        </a>
                                                    </div>
                                                );
                                            } else {

                                            }
                                        })}
                                        </div>
                                    </div>
                                    <div>
                                        <h4>已參加</h4>
                                        <div className="memberEventAvatar">
                                            {record.join.map(m => {
                                                if (m.joinL === "Y") {
                                                    return (
                                                        <div className="member_img" key={m.userID}>
                                                            <a href={"/Joing/members/" + m.userID}>
                                                                <img src={m.headShot} alt="" />
                                                            </a>
                                                        </div>
                                                    );
                                                } else {

                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </a>   
                        ))}
                    </div>

                    {/* joinRecord */}
                    <div className="memberMainBody joinRecord">
                        {joinRdData.map((join,index)=>{
                            if(join.joinL === "Y"){
                                return(
                                    <a href={'/Joing/post/' +join.postID } className="memberEvent">
                                        <div className="memberEventImg">
                                            <img src={join.postIMG} alt=""/>
                                        </div>
                                        <div className="memberEventContentBlock">
                                            <h3>{join.title}</h3>
                                            <div className="content_box_group">
                                                <div className="content_box">
                                                    <p>
                                                        <span className="p_letter">活動時間</span>
                                                        {join.activityDate} {join.activityTime}
                                                    </p>
                                                </div>
                                                <div className="content_box box_blue">
                                                    <p>
                                                        <span className="p_letter">地點:</span>
                                                        {join.location}
                                                    </p>
                                                </div>
                                                <div className="content_box">
                                                    <p>
                                                        <span className="p_letter">每人費用:</span>
                                                        500 
                                                    </p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="memberEventJoiner">
                                            <div>
                                                <h4>主揪人</h4>
                                                <div className="memberEventAvatar">

                                                    <a href="" className="member_img">
                                                        <img src={join.headShot} alt=""/>
                                                    </a>
                                                </div>
                                            </div>
                                            <div>
                                                <h4>已參加</h4>
                                                <div className="memberEventAvatar">
                                                    {join.join.map(m => {
                                                        if (m.joinL === "Y") {
                                                            return (
                                                                <div className="member_img" key={m.userID}>
                                                                    <a href={"/Joing/members/" + m.userID}>
                                                                        <img src={m.headShot} alt="" />
                                                                    </a>
                                                                </div>
                                                            );
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                );

                            } 
                        })}
                    </div>



                </div>

            </div>
        </div>
        </React.Fragment>
    ) 
}
export default Members;
