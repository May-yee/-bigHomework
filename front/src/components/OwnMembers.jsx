import React, { useState, useEffect} from 'react';
import axios from 'axios';
import cookie from 'react-cookies'
import Header from "./header";


const Members = (props) => {
    const id = cookie.load('userID');
    const [memberData, setMemberData] = useState({});
    const [recordData, setRecordData] = useState([]);
    const [joinRdData, setJoinRdData] = useState([]);
    const [collectData, setCollectData] = useState([]);
    const [noteAppliedData,setNoteAppliedData] = useState([]);
    const [joinApplyData,setjoinApplyData] = useState([]);
    let today = new Date();
    //----------------------------------
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let todayD = (year + '-' + month + '-' + date + ' ' + hours + ':' + minutes);
    //-----------------------
    const toggleLogoIn = (e) => {
        const logoIn = document.querySelector(".logoIn");
        logoIn.classList.remove("show");
    }
    const fetchlikeData = async() => {
        try{
            const collectResponse = await axios.get(`http://localhost:8000/memberItem/collect/${id}`);
            // console.log(collectResponse)
            if (collectResponse.data) {
                setCollectData(collectResponse.data);
            } else {
                console.log("No data returned");
                setCollectData([]);
            }
        }catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const deleteCollect = async (event ,postID) => {
        event.preventDefault();
        var result = await axios.delete(`http://localhost:8000/memberItem/collect/delete/${id}/${postID}`);
        if(result.data['success']){
            fetchlikeData();
        }
    }
    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const memberResponse = await axios.get(`http://localhost:8000/memberItem/members/${id}`);
                setMemberData(memberResponse.data);
            } catch (error) {
                console.error('Can not get members:', error);
            }
        };
        const fetchrecordData = async()=>{
            try{
                const recordResponse = await axios.get(`http://localhost:8000/memberItem/record/${id}`);
                setRecordData(recordResponse.data);
            }catch (error) {
                console.error('Can not get record:', error);
            }
        }
        const fetchjoinRdData = async()=>{
            try{
                const joinRdResponse = await axios.get(`http://localhost:8000/memberItem/joinrecord/${id}`);
                setJoinRdData(joinRdResponse.data);
            }catch (error) {
                console.error('Can not get joinrecord:', error);
            }
        }

        const fetchOwnAppliedData = async()=>{
            try{
                const noteAppliedResponse = await axios.get(`http://localhost:8000/memberItem/ownApplied/${id}`);
                setNoteAppliedData(noteAppliedResponse.data);
            }catch (error) {
                console.error('Can not get ownAppliedData:', error);
            }
        }
        const fetchjoinApplyData = async()=>{
            try{
                const noteAppliedResponse = await axios.get(`http://localhost:8000/memberItem/joinApply/${id}`);
                setjoinApplyData(noteAppliedResponse.data);
            }catch (error) {
                console.error('Can not get joinApplyData:', error);
            }
        }
        fetchrecordData();
        fetchjoinRdData();
        fetchMemberData();
        fetchlikeData();
        fetchOwnAppliedData();
        fetchjoinApplyData();
    }, [id,]);
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
    const btn_note = () => toggleMemberMainBody("noteBtn", "note", "訊息通知");
    const btn_record = () => toggleMemberMainBody("recordBtn", "record", "揪團紀錄");
    const btn_joinRecord = () => toggleMemberMainBody("joinRecordBtn", "joinRecord", "參加紀錄");
    const btn_like = () => toggleMemberMainBody("likeBtn", "like", "已收藏");
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
                    <div className="memberNavBtn row" id="noteBtn" onClick={btn_note}>
                        <img src="http://localhost:3000/images/notification_icon.png" alt=""/>
                        <h3 className="p_letter">訊息通知</h3>
                    </div>
                    <div className="memberNavBtn row" id="recordBtn" onClick={btn_record}>
                        <img src="http://localhost:3000/images/jiu_icon.png" alt=""/>
                        <h3 className="p_letter">揪團紀錄</h3>
                    </div>
                    <div className="memberNavBtn row" id="joinRecordBtn" onClick={btn_joinRecord}>
                        <img src="http://localhost:3000/images/join_icon.png" alt=""/>
                        <h3 className="p_letter">參加紀錄</h3>
                    </div>
                    <div className="memberNavBtn row" id="likeBtn" onClick={btn_like}>
                        <img src="http://localhost:3000/images/like_icon.png" alt=""/>
                        <h3 className="p_letter">已收藏</h3>
                    </div>
                </div>
                <div className="memberMain">
                    <h2>帳號資訊 </h2>
                    {/* setting */}
                    <div className="memberMainBody setting show">
                        <div className="btn_group">
                            <a href={"/Joing/memberedit/"+ id} className="btn btn_blue">編輯</a>
                        </div>
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
                            <p>{memberData.sex==1?"男":
                                memberData.sex==2?"女":
                                memberData.sex==3?"其他":"不公開"}</p>
                        </div>
                        <div className="settingItem row">
                            <div className="settingItemTitle row">
                                <h3>生</h3><h3>日:</h3>
                            </div>
                            <p>{memberData.birth}</p>
                        </div>
                        <div className="settingItem">
                            <div className="settingItemTitle row">
                                <h3>自</h3><h3>我</h3><h3>介</h3><h3>紹:</h3>
                            </div>
                            <div className='intro'>
                                {memberData.introduction}
                            </div>
                        </div>

                    </div>

                    {/* note */}
                    
                    <div className="memberMainBody note">
                        
                        {joinRdData.map(activity=>{
                            let dateTimeString = activity.activityDate + ' ' + activity.activityTime;
                            let aD = new Date(dateTimeString);
                            var timeDifference = today.getTime() - aD.getTime();
                            var hoursDifference = Math.abs(timeDifference / (1000 * 3600));

                            if (hoursDifference <= 3){
                                return(
                                    <div className="noteBox">
                                        <div className="noteBoxTop row">
                                            <div className="time">
                                                <p>{todayD}</p>
                                            </div>
                                            <div className="subject">
                                                <h3>提醒您!參加的活動快要到囉!</h3>
                                            </div>
                                        </div>
                                        <div className="noteBoxTContent">
                                            <p><span className='point'>{activity.title}</span> 活動快要到囉，請準時參加! 活動時間為 <span className='point'>{dateTimeString}</span></p>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                        {noteAppliedData.map (noteApplied=>
                        <a href={`/Joing/ownpost/${noteApplied.postID}`}>
                            <div className="noteBox">
                                <div className="noteBoxTop row">
                                    <div className="time">
                                        <p>{noteApplied.upTime}</p>
                                    </div>
                                    <div className="subject">
                                        <h3>您的揪團已有人申請</h3>
                                    </div>
                                </div>
                                <div className="noteBoxTContent">
                                    <p><span className='point'>{noteApplied.userName}</span> 已申請參加您的揪團: <span className='point'>{noteApplied.title}</span></p>
                                </div>
                            </div>
                          </a>  
                        )}
                        {joinApplyData.map(joinApply=>{
                            if (joinApply.joinL === 'Y'){
                                return(
                                    <a href={`/Joing/post/${joinApply.postID}`}>
                                    <div className="noteBox">
                                        <div className="noteBoxTop row">
                                            <div className="time">
                                                <p>{joinApply.upTime}</p>
                                            </div>
                                            <div className="subject">
                                                <h3>您的參加申請已通過</h3>
                                            </div>
                                        </div>
                                        <div className="noteBoxTContent">
                                            <p><span className='point'>{joinApply.userName}</span> 已通過您的申請:<span className='point'>{joinApply.title}</span></p>
                                        </div>
                                    </div>
                                    </a>
                                )
                            }else if(joinApply.joinL === 'N'){
                                return(
                                    <a href={`/Joing/post/${joinApply.postID}`}>
                                    <div className="noteBox">
                                        <div className="noteBoxTop row">
                                            <div className="time">
                                            <p>{joinApply.upTime}</p>
                                            </div>
                                            <div className="subject">
                                                <h3>您的參加申請已被婉拒</h3>
                                            </div>
                                        </div>
                                        <div className="noteBoxTContent">
                                            <p><span className='point'>{joinApply.userName}</span>  已婉拒您的申請: <span className='point'>{joinApply.title}</span></p>
                                        </div>
                                    </div>
                                    </a>
                                )
                            }
                        })}


                    </div>

                    {/* record */}
                    <div className="memberMainBody record">
                        {recordData.map((record,index)=>{
                            let dateTimeString = record.activityDate + ' ' + record.activityTime;
                            let aD = new Date(dateTimeString);
                            let isExpired = aD < today;
                            const className = "memberEvent" + (isExpired ? " expired" : "");
                    
                            return(
                                <a href={'/Joing/ownpost/' +record.postID } className={className}>
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
                                                            <img src={m.headShot} alt="" />
                                                        </div>
                                                    );
                                                } else {
                                                    return null;
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
                                                                    <img src={m.headShot} alt="" />
                                                            </div>
                                                        );
                                                    } else {
                                                        return null;
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </a>   
                            )
                        })}
                    </div>

                    {/* joinRecord */}
                    <div className="memberMainBody joinRecord">
                        {joinRdData.map((join,index)=>{
                            let dateTimeString = join.activityDate + ' ' + join.activityTime;
                            let aD = new Date(dateTimeString);
                            let isExpired = aD < today;
                            const className = "memberEvent" + (isExpired ? " expired" : "");
                            return(
                                <a href={'/Joing/post/' +join.postID } className={className}>
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
                                                    return (
                                                        <div className="member_img" key={m.userID}>
                                                            <img src={m.headShot} alt="" />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>

                    {/* like */}
                    <div className="memberMainBody like">
                        {collectData.map((collect,index)=>{
                            let dateTimeString = collect.activityDate + ' ' + collect.activityTime;
                            let aD = new Date(dateTimeString);
                            let isExpired = aD < today;
                            const className = "memberEvent" + (isExpired ? " expired" : "");
                            return(
                                <a href={'/Joing/post/' + collect.postID } className={className}>
                                    <button className="delet"  onClick={ (event) => {deleteCollect(event, collect.postID)}}><img src="http://localhost:3000/images/trash_icon.png" alt=""/></button>
                                    <div className="memberEventImg">
                                        <img src={collect.postIMG} alt=""/>
                                    </div>
                                    <div className="memberEventContentBlock">
                                        <h3>{collect.title}</h3>
                                        <div className="content_box_group">
                                            <div className="content_box">
                                                <p>
                                                    <span className="p_letter">活動時間</span>
                                                    {collect.activityDate} {collect.activityTime}
                                                </p>
                                            </div>
                                            <div className="content_box box_blue">
                                                <p>
                                                    <span className="p_letter">地點:</span>
                                                    {collect.location}
                                                </p>
                                            </div>
                                            <div className="content_box">
                                                <p>
                                                    <span className="p_letter">每人費用:</span>
                                                    {collect.price}
                                                </p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="memberEventJoiner">
                                        <div>
                                            <h4>主揪人</h4>
                                            <div className="memberEventAvatar">
                                                <div className="member_img">
                                                    <img src={collect.headShot} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4>已參加</h4>
                                            <div className="memberEventAvatar">
                                                {collect.join.map(m => {
                                                    return (
                                                        <div className="member_img" key={m.userID}>
                                                            <img src={m.headShot} alt="" />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </a>   
                            )
                        })}
                    </div>

                </div>

            </div>
        </div>
        </React.Fragment>
    ) 
}
export default Members;
