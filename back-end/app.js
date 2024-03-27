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
// 日期篩選
app.get("/index/post/date", function (req, res) {
  const activityDate = req.query.value; // 從 URL 參數中獲取日期
  conn.query("SELECT * FROM post WHERE activityDate = ?", [activityDate], function (err, rows) {
    if (err) {
      console.error('Error querying posts by date:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send(JSON.stringify(rows));
  });
});

// 搜尋篩選
app.get("/index/post/search", function (req, res) {
  const keyword = req.query.keyword;
  conn.query("SELECT * FROM post WHERE title LIKE ? OR location LIKE ?", [`%${keyword}%`, `%${keyword}%`], function (err, rows) {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send(JSON.stringify(rows));
  });
});


// 活動貼文
app.get("/index/postitem/:id", function (req, res) {
  conn.query(
    "SELECT * FROM post INNER JOIN member ON post.host = member.userID  where postID = ?",
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
  let Img = "http://localhost:8000/uploads/" + req.file.filename;
  // console.log(img);
  console.log(req.body);
  conn.query(
    "insert into post (postIMG,type,host,title, registeredDate, registeredTime, activityDate, activityTime, minPeople, maxPeople, location, price, content) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      Img,
      req.body.type,
      req.body.host,
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
app.post("/index/postitem",upload.single("postIMG"), function (req, res) {
  let img = "";
  if (!req.file) {
    conn.query("SELECT postIMG FROM post WHERE postID = ?", [req.body.postID], function (err, rows) {
      if (err) {
        console.error("Error fetching post image:", err);
        res.status(500).send("Error updating post");
        return;
      }
      img = rows[0].postIMG;
      console.log(img)
      updatePost(img); 
    });
  } else {
    img = "http://localhost:8000/uploads/" + req.file.filename;
    console.log(img)
    updatePost(img);
  }
  function updatePost(img) {
    conn.query(
      "update post set postIMG = ?,type=? ,title= ?, registeredDate= ?, registeredTime= ?, activityDate= ?, activityTime= ?, minPeople= ?, maxPeople= ?, location= ?, price= ?, content= ? where postID= ?",
      [
        img,
        req.body.type,
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
        req.body.postID
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

  }
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

//--------------
// 會員頁
//--------------
app.get("/members/:id", function (req, res) {
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

//通知
app.get("/note/:id", function (req, res) {
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

// 揪團紀錄
app.get("/record/:id", function (req, res) {
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
      const test=postRows.map((post,index) => {
        conn.query(
          "SELECT member.userID,joinmember.joinL,member.headShot FROM joinmember INNER JOIN member ON joinmember.participants = member.userID WHERE joinmember.postID = ?",
          [post.postID],
          function (err, joinRows) {
            if (err) {
              console.error("Error updating profile:", err);
              return;
            }
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

app.get("/joinrecord/:id", function (req, res) {
  conn.query(
    "SELECT post.*,joinmember.*,member.userID,member.headShot FROM post INNER JOIN joinmember ON joinmember.postID = post.postID INNER JOIN member ON post.host = member.userID WHERE joinmember.joinL='Y' AND joinmember.participants = ?;",
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
          "SELECT member.userID,joinmember.joinL,member.headShot FROM joinmember INNER JOIN member ON joinmember.participants = member.userID WHERE joinmember.postID = ? AND joinmember.joinL='Y' ",
          [post.postID],
          function (err, joinRows) {
            if (err) {
              console.error("Error updating profile:", err);
              return;
            }
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

app.get("/collect/:id", function (req, res) {
  conn.query(
    "SELECT post.*,collect.*,member.userID,member.headShot FROM post INNER JOIN collect ON collect.postID = post.postID INNER JOIN member ON post.host = member.userID WHERE collect.userID = ? AND collect.iscollect=1;",
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
          "SELECT member.userID,joinmember.joinL,member.headShot FROM joinmember INNER JOIN member ON joinmember.participants = member.userID WHERE joinmember.postID = ? and joinmember.joinL= 'Y' ;",
          [post.postID],
          function (err, joinRows) {
            if (err) {
              console.error("Error updating profile:", err);
              return;
            }
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





//-----------收藏功能
app.post("/collect", function(req, res) {
  conn.query("select * from collect WHERE userID = ? AND postID = ?",
    [req.body.userID, req.body.postID],
    function(err, rows) {
      if(!rows[0]) {
        res.send(null)
      }else {
        res.send(true)
      }
    }
  )
})

app.post("/collected", function(req, res) {
  conn.query("insert into collect (postID, userID, iscollect) value(?,?,?)",
    [req.body.postID, req.body.userID, req.body.iscollect],
    function(err, rows) {
      if(!err){
        res.send({success: true})
      }else{
        res.send({success: false})
      }
    }
  )
})

// 申請參加請求
app.post("/post/apply", function (req, res) {
  conn.query(
    "insert into joinmember (participants, postID, joinL) values(?,?,?)",
    [req.body.participants, req.body.postID, req.body.joinL],
    function (err, rows) {
      if (err) {
        console.error("Error updating post:", err);
        res.status(500).send("Error updating post");
        return;
      }
      res.send(JSON.stringify(req.body.applyItem));
    }
  );
});
// 申請參加人員資料
app.get("/post/apply/:id", function (req, res) {
  conn.query("SELECT * FROM joinmember inner join member on joinmember.participants = member.userID where postID = ? and joinL =  'C'", 
  [req.params.id], 
  function (err, rows) {
    res.send(JSON.stringify(rows));
  });
});
// 接受參加
app.post("/post/accept", function (req, res) {
  conn.query(
    "update joinmember set joinL = ? where participants = ? And  postID= ?",
    [ req.body.joinL, req.body.participants ,req.body.postID],
    function (err, rows) {
      if (err) {
        console.error("Error updating post:", err);
        res.status(500).send("Error updating post");
        return;
      }
      res.send(JSON.stringify(req.body.applyItem));
    }
  );
});

// 參加人員資料
app.get("/post/accept/:id", function (req, res) {
  conn.query("SELECT * FROM joinmember inner join member on joinmember.participants = member.userID where postID = ? and joinL =  'Y'", 
  [req.params.id], 
  function (err, rows) {
    res.send(JSON.stringify(rows));
  });
});
// 拒絕申請
app.delete("/apply/delete/:id", function (req, res) {
  conn.query(
    "delete from joinmember where participants = ?",
    [req.params.id],
    function (err, rows) {
      res.send("#" + req.params.id + " deleted");
    }
  );
});

app.get("/post/isjoined/:id", function (req, res) {
  const participants = req.query.participants;

  conn.query("SELECT joinL FROM joinmember WHERE postID = ? AND participants = ?", 
  [req.params.id, participants], 
  function (err, rows) {
    if (err) {
      console.error("Error querying joinmember:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (rows.length > 0) {
      res.send(rows[0].joinL); // 回傳 joinL 值
    } else {
      res.send(""); // 如果查無資料，回傳預設值
    }
  });
});


