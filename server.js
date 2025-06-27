const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const myServer = http.createServer((req, res) =>{

    let filePath = "./public" + req.url;

    if(filePath === "./public/"){
        filePath = "./public/index.html";
    }

    const extName = path.extname(filePath);

    let contentType = "text/html";
    switch(extName){

        case ".css" : contentType = "text/css";
                      break;

        case ".js" : contentType = "text/javascript";
                     break;

        case ".png": contentType = "text/png";
                     break;
    }

    // fs.readFile() is critical in this project because 
    // -it's what actually reads the content of the file from your disk 
    // -so the server can send it to the browser.

    // Without fs.readFile, the server wouldn’t know what to send.
    // It reads the HTML/CSS/JS/image file content into a variable (content).
    //Then that content is sent in the response: res.end(content).
    fs.readFile(filePath, (err,content) => {

        if(err){

            fs.readFile("./public/404.html", (err404, content404) => {

                res.writeHead(404, {"Content-Type" : "text/html"});
                res.end(content404);
            });
        }else{

            res.writeHead(200, {"Content-Type" : contentType});
            res.end(content);
        }
    });
});

myServer.listen(PORT, () => {
    console.log("Server is running");
})