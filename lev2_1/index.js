const http = require('http');
const fs = require('fs');

const errorHtml = fs.readFileSync("pages/error.html");

function sendFile(path, response) {
    fs.readFile(path, (err, data) => {
        if (err) {
            response.end(errorHtml)
            return
        }
        response.end(data.toString())
    }
    )
}

const server = http.createServer((request, response) => {

    console.log("neue request", request.method, request.url)

    if (request.url === "/") {
        sendFile("pages/index.html", response)
    }

    else {
        const filePath = "pages" + request.url;
        sendFile(filePath, response)
    }
})

const PORT = 9000;
server.listen(PORT, () => {
    console.log('listening on port', PORT);
})