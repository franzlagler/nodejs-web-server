// Header Content Type
// Fehlermeldung

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  let fileName = './public' + req.url;
  console.log(fileName);
  const fileType = path.extname(fileName);
  console.log(fileType);

  console.log(path.extname(''));

  if (fileName === './favicon.ico') {
    fileName = './public/index.html';
  } else if (fileName === './') {
    fileName = './public/index.html';
  }
  fs.access(fileName, (error) => {
    if (error) {
      console.log('Error');
      res.end();
    } else {
      fs.readFile(fileName, (err, file) => {
        if (err) {
          console.log(err);
        }
        res.write(file);
        res.end();
      });
    }
  });
});
server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
