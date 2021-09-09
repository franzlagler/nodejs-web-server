const http = require('node:http');
const fs = require('node:fs');

const port = process.env.PORT || 3000;

fs.readFile('./text.txt', (err, text) => {
  if (err) {
    throw err;
  }

  const server = http.createServer((req, res) => {
    res.write(text);
    res.end();
  });

  server.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
});
