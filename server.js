const http = require("http");
const {
  v4: uuidv4
} = require('uuid');

const errorHandle = require("./errorHandle");
const {
  log
} = require("console");

const todos = [];

const requestListener = (req, res) => {
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  }

  let body = ""
  req.on('data', (chunk) => {
    body += chunk;
  });
  if (req.url === "/todos" && req.method == "GET") {
    res.writeHead(200, headers);
    res.write(JSON.stringify({
      "status": "success",
      data: todos
    }));
    res.end();
  } else if (req.url === "/todos" && req.method == "POST") {
    req.on('end', () => {
      try {
        const title = JSON.parse(body).title;
        if (title !== undefined) {
          const todo = {
            "title": title,
            "id": uuidv4(),
          }
          console.log(todo);
          todos.push(todo)
          res.writeHead(200, headers);
          res.write(JSON.stringify({
            "status": "success",
            data: todos
          }));
          res.end();
        } else {
          errorHandle(res);
        }
      } catch (error) {
        errorHandle(res);
      }

    });
  } else if (req.url === "/todos" && req.method == "DELETE") {
    todos.length = 0
    res.writeHead(200, headers);
    res.write(JSON.stringify({
      "status": "success",
      data: todos
    }));
    res.end();
  } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
    // 取出id
    const id = req.url.split("/").pop();
    // 抓索引
    const index = todos.findIndex(Element => Element.id == id)
    console.log(id, index);
    if (index !== -1) {
      todos.splice(index, 1)
      res.writeHead(200, headers);
      res.write(JSON.stringify({
        "status": "success",
        data: todos,
        "message": "刪除成功!"
      }));
      res.end();
    } else {
      errorHandle(res)
    }
  } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
    req.on("end", () => {
      try {
        const todo = JSON.parse(body).title;
        const id = req.url.split('/').pop();
        const index = todos.findIndex(element => element.id == id)
        if (todo !== undefined && index !== -1) {
          // 經由 todo 比對是否有 title 或 index 是否有索引值存在
          todos[index].title = todo
        } else {
          errorHandle(res)
        }
        console.log(index);
        res.end();
      } catch {
        errorHandle(res);
      }
    })
  } else if (req.method == "OPTIONS") {
    res.writeHead(200, headers);
    x
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(JSON.stringify({
      "status": "false",
      Message: "輸入資料錯誤"
    }));
    res.end();
  }
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005)