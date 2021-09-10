const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const port = process.env.PORT || 3000;

function checkPath(filePath) {
  if (filePath === './public/favicon.ico') {
    filePath = './public/index.html';
  } else if (filePath === './public/') {
    filePath = './public/index.html';
  }
  const stats = fs.statSync(filePath);
  const isFile = stats.isFile();
  console.log(isFile);
  if (!isFile) {
    const fileList = fs.readdirSync(filePath);
    console.log(fileList);
    filePath += `/${fileList[0]}`;
  }
  return filePath;
}

function configureServer() {
  const server = http.createServer((req, res) => {
    let fileName = './public' + req.url;
    const fileType = path.extname(fileName);

    fileName = checkPath(fileName);

    fs.access(fileName, (error) => {
      if (error) {
        console.log(
          '404 Not Found\nPlease check if you entered the correct path!',
        );
        fs.readFile('./error.html', (err, errorFile) => {
          if (err) {
            console.log(err);
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(errorFile);
            res.end();
          }
        });
      } else {
        console.log(fileName);
        fs.readFile(fileName, (err, file) => {
          if (err) {
            console.log(err);
          } else {
            res.write(file);
            res.end();
          }
        });
      }
    });
  });
  server.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
}

configureServer();

// Header Content Type
