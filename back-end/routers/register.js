var express = require('express');
var app = express();
var router = express.Router();
var multer = require('multer');
var crypto = require("crypto");
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

var myStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../front/public/headshots");    // 保存的路徑 (需先自己創建)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + 'id.png');  // 自定義檔案名稱
    }
});
var upload = multer({
    storage: myStorage,  // 設置 storage
});
var mysql = require("mysql");
const exp = require('constants');
var conn = mysql.createConnection({
    user: "root",
    password: "",
    host: "localhost",
    port: 3306,
    database: "jiuing"
});
//註冊
router.post("/register", upload.single('headShot'), function(req,res){
    var cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(req.body.passWord, 'utf8', 'hex');
    encrypted += cipher.final('hex');   //  密碼加密
    var headShot = (req.file.path.substring(15)) //頭貼路徑
    conn.query("insert into member (userName, password, userEmail, headShot, birth, birthBoolean, sex, introduction, cryptokey, cryptoiv) values (?,?,?,?,?,?,?,?,?,?)",
        [req.body.userName, encrypted, req.body.userEmail, headShot,
        req.body.birth, req.body.birthBoolean, req.body.sex, req.body.introduction, key, iv],
        function (err, rows) {
            if(!err){
                res.send({success: true});
            }else{
                res.send({success: false});
            }
            
        }
    )
});
//登入
router.post("/login", function(req, res) {
    conn.query("select * from member where userEmail = ?",
        [req.body.userEmail],
        function(err, rows) {
            if(rows[0]) {
                let decipher = crypto.createDecipheriv(algorithm, rows[0].cryptokey, rows[0].cryptoiv);
                let decrypted = decipher.update(rows[0].passWord, 'hex', 'utf8');
                decrypted += decipher.final('utf8');    //解析密碼
                console.log(decrypted);
                if(decrypted == req.body.passWord) {
                    res.send({
                        success: true, 
                        headShot: rows[0].headShot,
                        userName: rows[0].userName,
                        userID: rows[0].userID,
                    })
                }else {
                    res.send({success: false})
                }
            }else {
                res.send({success: false})
            }
            
        }
    )
})
//編輯會員
router.post("/edit", upload.single('headShot'), function(req, res) {
    if(req.file) {
        var headShot = (req.file.path.substring(15))
    }else {
        var headShot = req.body.headShot;
    }
    conn.query("update member set userName =?, userEmail =?, headShot =?, sex =?, introduction =? where userID = ?",
    [req.body.userName, req.body.userEmail, headShot, 
        req.body.sex, req.body.introduction, req.body.userID],
    function(err, rows) {
        console.log(err)
        res.send('編輯成功')
    }
    )
})
router.get("/info/:id", function(req, res) {
    if(req.params.id) {
        conn.query("select * from member where userID = ?",
        [req.params.id],
        function(err, rows) {
            res.send(rows[0])
        }
        )
    }
})
app.post("/collect", function(req, res) {
    conn.query("select * from collect WHERE userID = ?",
      [req.body.userID],
      function(err, rows) {
        console.log(rows[0])
        if(!rows[0]) {
          res.send(null)
        }
      }
    )
  })
  
  app.post("/collected", function(req, res) {
    conn.query("inser into collect (postID, userID, iscollect) value(?,?,?)",
      [req.body.postID, req.body.userID, req.body.iscollect],
      function(err, rows) {
        
      }
    )
  })
module.exports = router;