const http =  require("http");

const requestListener = (req,res)=>{
    // console.log(req);
    console.log(req.url);
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write("Hello 123");
    res.end();
}

const server = http.createServer(requestListener);
server.listen(3005)