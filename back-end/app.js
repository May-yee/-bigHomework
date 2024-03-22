var express = require("express");
var app = express();
var cors = require("cors");
var multer = require("multer");
const path = require("path");
app.use(cors());

app.listen(8000, () => {
  console.log("正在運行");
});

var session = require("express-session");
app.use(
  session({
    secret: "Pa$$w0rd",
    resave: true,
    saveUninitialized: true,
  })
);

var bp = require("body-parser");
app.use(bp.urlencoded({ extended: false }));

// 將靜態文件暴露出來
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({ extended: true })); //解析表單資料
app.use(express.json());

//連接資料庫(npm i mysql)
var mysql = require("mysql");
const { findSourceMap } = require("module");
const router = require("./routers/register");
var conn = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  database: "jiuing",
});

//導入註冊
var register = require("./routers/register");
app.use("/member", register);

app.get("/index/post", function (req, res) {
  conn.query("select * from post", [], function (err, rows) {
    res.send(JSON.stringify(rows));
  });
});
// 篩選活動功能
app.get("/index/post/exercise", function (req, res) {
  conn.query("select * from post where type = 0", [], function (err, rows) {
    res.send(JSON.stringify(rows));
  });
});

app.get("/index/post/handmade", function (req, res) {
  conn.query("select * from post where type = 1", [], function (err, rows) {
    res.send(JSON.stringify(rows));
  });
});

app.get("/index/post/eat", function (req, res) {
  conn.query("select * from post where type = 2", [], function (err, rows) {
    res.send(JSON.stringify(rows));
  });
});

app.get("/index/post/movie", function (req, res) {
  conn.query("select * from post where type = 3", [], function (err, rows) {
    res.send(JSON.stringify(rows));
  });
});

app.get("/index/post/show", function (req, res) {
  conn.query("select * from post where type = 4", [], function (err, rows) {
    res.send(JSON.stringify(rows));
  });
});

app.get("/index/post/other", function (req, res) {
  conn.query("select * from post where type = 5", [], function (err, rows) {
    res.send(JSON.stringify(rows));
  });
});

// 活動貼文
app.get("/index/postitem/:id", function (req, res) {
  conn.query(
    "select * from post where postID = ?",
    [req.params.id],
    function (err, rows) {
      res.send(JSON.stringify(rows[0]));
    }
  );
});

app.get("/index/chatitem/:id", function (req, res) {
  conn.query(
    "select * from coment where com_postId = ?",
    [req.params.id],
    function (err, rows) {
      res.send(JSON.stringify(rows));
    }
  );
});

// 設置 Multer 用於上傳的存儲引擎和文件保存位置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // 將上傳的文件保存到 uploads 目錄中
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // 使用時間戳作為文件名
  },
});
const upload = multer({ storage: storage });

//新增貼文
app.post("/post/create", upload.single("postIMG"), function (req, res) {
  const img = "http://localhost:8000/uploads/" + req.file.filename;
  // console.log(img);
  console.log(req.body);
  conn.query(
    "insert into post (postIMG,type,userID,title, registeredDate, registeredTime, activityDate, activityTime, minPeople, maxPeople, location, price, content) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      img,
      req.body.type,
      req.body.userID,
      req.body.title,
      req.body.registeredDate,
      req.body.registeredTime,
      req.body.activityDate,
      req.body.activityTime,
      req.body.minPeople,
      req.body.maxPeople,
      req.body.location,
      req.body.price,
      req.body.content,
    ],
    function (err, rows) {
      if (err) {
        console.error("Error updating post:", err);
        res.status(500).send("Error updating post");
        return;
      }

      res.send(JSON.stringify(req.body));
    }
  );
});
//修改貼文
app.put("/index/postitem", function (req, res) {
  conn.query(
    "update post set type=? ,title= ?, registeredDate= ?, registeredTime= ?, activityDate= ?, activityTime= ?, minPeople= ?, maxPeople= ?, location= ?, price= ?, content= ? where postID= ?",
    [
      req.body.postItem.type,
      req.body.postItem.title,
      req.body.postItem.registeredDate,
      req.body.postItem.registeredTime,
      req.body.postItem.activityDate,
      req.body.postItem.activityTime,
      req.body.postItem.minPeople,
      req.body.postItem.maxPeople,
      req.body.postItem.location,
      req.body.postItem.price,
      req.body.postItem.content,
      req.body.postItem.postID,
    ],
    function (err, rows) {
      if (err) {
        console.error("Error updating post:", err);
        res.status(500).send("Error updating post");
        return;
      }
      res.send(JSON.stringify(req.body.postItem));
    }
  );
});

// 刪除貼文
app.delete("/post/delete/:id", function (req, res) {
  conn.query(
    "delete from post where postID = ?",
    [req.params.id],
    function (err, rows) {
      res.send("#" + req.params.id + " deleted");
    }
  );
});

// 新增留言板留言
app.post("/post/chat", function (req, res) {
  conn.query(
    "insert into coment (com_postID, commenter, cmName, headShot, message) values(?,?,?,?,?)",
    [req.body.com_postID, req.body.commenter, req.body.cmName, req.body.headShot, req.body.message],
    function (err, rows) {
      if (err) {
        console.error("Error updating post:", err);
        res.status(500).send("Error updating post");
        return;
      }
      res.send(JSON.stringify(req.body.postItem));
    }
  );
});

app.get("/ownmembers/:id", function (req, res) {
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

// app.post("/post/apply", function (req, res) {
//     conn.query(
//       "insert into apply (memberID, postID, headShot) values(?,?,?)",
//       [req.body.memberID, req.body.postID, req.body.headShot],
//       function (err, rows) {
//         if (err) {
//           console.error("Error updating post:", err);
//           res.status(500).send("Error updating post");
//           return;
//         }
//         res.send(JSON.stringify(req.body.postItem));
//       }
//     );
//   });

// app.get("/apply/post/:id", function (req, res) {
//     conn.query("select * from apply where postID = ?", 
//     [req.params.id], 
//     function (err, rows) {
//       res.send(JSON.stringify(rows));
//     });
//   });
