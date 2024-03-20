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
        cb(null, "./public/uploads/");    // 保存的路徑 (需先自己創建)
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
router.post("/", upload.single('headShot'), function(req,res){
    var cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(req.body.passWord, 'utf8', 'hex');
    encrypted += cipher.final('hex');   //  密碼加密
    var headShot = (req.file.path.substring(6)) //頭貼路徑
    conn.query("insert into member (userName, password, userEmail, headShot, birth, birthBoolean, sex, introduction, cryptokey, cryptoiv) values (?,?,?,?,?,?,?,?,?,?)",
        [req.body.userName, encrypted, req.body.userEmail, headShot,
        req.body.birth, req.body.birthBoolean, req.body.sex, req.body.introduction, key, iv],
        function (err, rows) {
            res.send({success: true});
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
                    req.session.userID = rows[0].userID;
                    res.send({
                        success: true, 
                        headShot: rows[0].headShot,
                        userName: rows[0].userName
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
module.exports = router;