var express = require("express");
var app = express();
const moment = require('moment');
var router = express.Router();


//連接資料庫(npm i mysql)
var mysql = require("mysql");
var conn = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  database: "jiuing",
});

router.get("/members/:id", function (req, res) {
    conn.query(
      "select * from member where userID =?",
      [req.params.id],
      function (err, rows) {
        if (err) {
          console.error("Error updating profile:", err);
          res.status(500).send("Error updating post");
          return;
        }
        res.send(JSON.stringify(rows[0]));
      }
    );
  });
  
  
  // 揪團紀錄
router.get("/record/:id", function (req, res) {
    conn.query(
      "SELECT * FROM post WHERE host = ?",
      [req.params.id],
      function (err, postRows) {
        if (err) {
          console.error("Error updating profile:", err);
          res.status(500).send("Error updating post");
          return;
        }
         ;
        postRows.map((post,index) => {
          conn.query(
            "SELECT member.userID,joinmember.joinL,member.headShot FROM joinmember INNER JOIN member ON joinmember.participants = member.userID WHERE joinmember.postID = ?",
            [post.postID],
            function (err, joinRows) {
              if (err) {
                console.error("Error updating profile:", err);
                return;
              }
              post.upTime = moment(post.upTime).format('YYYY-MM-DD HH:mm');
              post.join=(joinRows);
              // console.log(postRows);
              if (index === postRows.length - 1) {
                // 在最后一次查詢完成後發送資料
                res.send(JSON.stringify(postRows));
              }
            }    
            
            )
  
        })    
      }
    );
})
  
router.get("/joinrecord/:id", function (req, res) {
    conn.query(
      "SELECT post.*,joinmember.*,member.userID,member.headShot FROM post INNER JOIN joinmember ON joinmember.postID = post.postID INNER JOIN member ON post.host = member.userID WHERE joinmember.joinL='Y' AND joinmember.participants = ?;",
      [req.params.id],
      function (err, postRows) {
        if (err) {
          console.error("Error updating profile:", err);
          res.status(500).send("Error updating post");
          return;
        }
        postRows.map((post,index) => {
          conn.query(
            "SELECT member.userID,joinmember.joinL,member.headShot FROM joinmember INNER JOIN member ON joinmember.participants = member.userID WHERE joinmember.postID = ? AND joinmember.joinL='Y' ",
            [post.postID],
            function (err, joinRows) {
              if (err) {
                console.error("Error updating profile:", err);
                return;
              }
              post.join=(joinRows);
              if (index === postRows.length - 1) {
                // 在最后一次查詢完成後發送資料
                res.send(JSON.stringify(postRows));
              }
            }    
            
            )
        })    
      }
    );
})

//揪團被申請通知
router.get("/ownApplied/:id", function (req, res) {
    conn.query(
      "SELECT post.title ,joinmember.*,member.userName FROM post INNER JOIN joinmember ON joinmember.postID = post.postID INNER JOIN member ON joinmember.participants = member.userID WHERE joinmember.joinL='C' AND post.host = ?;",
      [req.params.id],
      function (err, rows) {
        if (err) {
          console.error("Error updating profile:", err);
          res.status(500).send("Error updating post");
          return;
        }
        rows.map(rows =>{
          rows.upTime = moment(rows.upTime).format('YYYY-MM-DD HH:mm');  
        })
        res.send(JSON.stringify(rows));
      }
    );
})

//申請參加通知
router.get("/joinApply/:id", function (req, res) {
  conn.query(
    "SELECT post.title ,joinmember.*,member.userName FROM post "+ 
    "INNER JOIN joinmember ON joinmember.postID = post.postID " +
    "INNER JOIN member ON post.host = member.userID WHERE joinmember.participants = ?;",
    [req.params.id],
    function (err, rows) {
      if (err) {
        console.error("Error updating profile:", err);
        res.status(500).send("Error updating post");
        return;
      }
      rows.map(rows =>{
        rows.upTime = moment(rows.upTime).format('YYYY-MM-DD HH:mm');  
      })
      res.send(JSON.stringify(rows));
    }
  );
})
  
  

  

module.exports = router;
