// 0. Get all the required modules
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const getCorrectContentType = require('./ContentType'); // Custom Module

// 1. Configure Server to Run on Port
function runServer() {
  const server = http.createServer((req, res) => {
    // Prefix ensures that only files within the public folder are acccessible
    let fileName = './public' + req.url;

    // If Path exists
    if (fs.existsSync(fileName)) {
      const stats = fs.statSync(fileName);
      const isFile = stats.isFile();
      // If directory get all files
      if (!isFile) {
        const fileList = fs.readdirSync(fileName);
        // Take first file of directory and add to path
        fileName += `/${fileList[0]}`;
      }
      // Creates ContentType depending on file type
      const fileType = path.extname(fileName);
      console.log(fileType);
      const contentType = getCorrectContentType(fileType);

      // Display entered web page
      fs.readFile(fileName, (err, file) => {
        if (err) {
          console.log(err);
        } else {
          res.writeHead(200, contentType);
          res.write(file);
          res.end();
        }
      });

      // If path does not exists
    } else {
      console.log(
        '404 Not Found\nPlease check if you entered the correct path!',
      );
      // Display Error Page
      fs.readFile('./error.html', (err, errorFile) => {
        if (err) {
          console.log(err);
        } else {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.write(errorFile);
          res.end();
        }
      });
    }
  });

  // Listen to specified port
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
}

// 2. Run Server
runServer();
