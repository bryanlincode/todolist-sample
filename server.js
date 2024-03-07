const http = require("http");

const requestListener = (req, res) => {

  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
  }

  console.log(req.url);

  if (req.url === "/" && req.method == "GET") {
    res.writeHead(200, headers);
    res.write(JSON.stringify({
        "status":"success",
         data:[]
    }));
    res.end();
  } else if (req.url === "/" && req.method == "DELETE") {
    res.writeHead(200, headers);
    res.write("刪除成功");
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write("輸入錯誤");
    res.end();
  }
}

const server = http.createServer(requestListener);
server.listen(3005)