const http = require('http');
const url = require('url');
const fs = require('fs');

//Gets the error page
let page404 = fs.readFileSync('404.html', 'utf-8', (err, data) => {
    if (err)
    {    
        throw err
    }

    return data;
});

//Creates the server on port 8080
http.createServer(function (req, res) {
    const q = url.parse(req.url, true);
    let filename = "";
    if (q.pathname === "/") {
      filename = "." + "/index.html";
    } else {
      filename = "." + q.pathname;
    }

    fs.readFile(filename, function (err, data) {
      //Puts the 404 error page up if user visits a non-existing page
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(page404);
        return res.end();
      }

      //Puts the CSS up when presented
      else if (filename == './styles.css')
      {
        res.writeHead(200, {"Content-Type": "text/css"});
        res.write(data);
        return res.end();
      }
    
      //Puts the page up when presented
      else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  }).listen(8080);