var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());

app.listen(8000,()=>{
    console.log("正在運行");
})

var session = require("express-session");
app.use(session({
    secret: "Pa$$w0rd",
    resave: true,
    saveUninitialized: true
}));

var bp =require("body-parser");
app.use(bp.urlencoded({extended:false}))
app.set("view engine", "ejs");

// 將 public 文件夾下的靜態文件暴露出來
app.use(express.static(__dirname +'/public'));

app.use( express.urlencoded({extended:true}) ); //解析表單資料
app.use( express.json() );

//連接資料庫(npm i mysql)
var mysql=require("mysql");
const { findSourceMap } = require("module");
const router = require("./routers/register");
var conn= mysql.createConnection({
    user:"root",
    password:"",
    host:"localhost",
    database:"jiuing"
})

app.get("/",(req, res)=> {
     // 查詢數據庫中的數據
     conn.query("SELECT * FROM post", {},(err, results) => {
         // 渲染模板並將數據發送到客戶端
         res.render("index", { data: results });
        //  console.log(results);[{}]
     });
    
})


//登入者的貼文
app.get("/ownpost/:id",(req,res)=>{
    conn.query("select * from post where postId = ?",
        [req.params.id],
        function (err,results){
            if (err) {
                console.error(err);
                return res.status(500).render("error_page500.ejs");
            }
    
            // 如果找不到紀錄，導致錯誤頁面
            if (results.length === 0) {
                return res.status(404).render("error_page400.ejs");
            }

            // 執行第二個查詢
            conn.query("SELECT * FROM coment WHERE com_postId = ?", [req.params.id], function(err, comentResult) {
                if (err) {
                    console.error(err);
                    return res.status(500).render("error_page500.ejs");
                }
            
                // 渲染模板
                res.render("own_post_page.ejs", { 
                    post: results[0],
                    comments: comentResult // 將評論資料傳遞給模板
                });
                // console.log(results);
                // console.log(comentResult);
    });
        }
    )  
})

//登入者的會員頁面 
app.get("/ownMember",(req,res)=>{
    console.log(req.session.userID);
    res.render("own_member");
})

//登入者的會員帳號編輯頁面 
app.get("/ownMember/settingEdit",(req,res)=>{
    res.render("setting_edit");
})

//註冊 
app.get("/register",(req,res)=>{
    res.render("register");
})
//導入註冊
var register = require("./routers/register");
app.use("/member/register", register);

app.get("/index/post", function (req, res) {
    conn.query("select * from post", [],
        function (err, rows) {
            res.send( JSON.stringify(rows) );
        }
    )
})

// 活動貼文
app.get("/index/postitem/:id", function (req, res) {
    conn.query("select * from post where postID = ?", 
    [req.params.id],
    function (err, rows) {
        res.send( JSON.stringify(rows[0]) );
    }
)
})

app.get("/index/chatitem/:id", function (req, res) {
    conn.query("select * from coment where com_postId = ?", 
    [req.params.id],
    function (err, rows) {
        res.send( JSON.stringify(rows) );
    }
)
})

//新增貼文
app.post("/post/create",function(req, res){
    conn.query("insert into post (type,title, registeredDate, registeredTime, activityDate, activityTime, minPeople, maxPeople, location, price, content) values(?,?,?,?,?,?,?,?,?,?,?)",
    [req.body.postItem.type,req.body.postItem.title, req.body.postItem.registeredDate, req.body.postItem.registeredTime, req.body.postItem.activityDate, req.body.postItem.activityTime, req.body.postItem.minPeople, req.body.postItem.maxPeople, req.body.postItem.location, req.body.postItem.price, req.body.postItem.content],
    function(err, rows){
        if (err) {
            console.error("Error updating post:", err);
            res.status(500).send("Error updating post");
            return;
        }
        res.send( JSON.stringify( req.body.postItem ));
    }     
    )
})

app.put("/index/postitem",function(req, res){
    conn.query("update post set type=? ,title= ?, registeredDate= ?, registeredTime= ?, activityDate= ?, activityTime= ?, minPeople= ?, maxPeople= ?, location= ?, price= ?, content= ? where postID= ?",
    [req.body.postItem.type,req.body.postItem.title, req.body.postItem.registeredDate, req.body.postItem.registeredTime, req.body.postItem.activityDate, req.body.postItem.activityTime, req.body.postItem.minPeople, req.body.postItem.maxPeople, req.body.postItem.location, req.body.postItem.price, req.body.postItem.content, req.body.postItem.postID],
    function(err, rows){
        if (err) {
            console.error("Error updating post:", err);
            res.status(500).send("Error updating post");
            return;
        }
        res.send( JSON.stringify( req.body.postItem ));
    }     
    )
})




app.delete("/post/delete/:id", function (req, res) {
    conn.query("delete from post where postID = ?",
        [req.params.id], 
        function (err, rows) {
            res.send("#" + req.params.id + " deleted");
        }
    )
})


