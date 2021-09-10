function getCorrectContentType(fileType) {
  const contentType = { 'Content-Type': '' };
  switch (fileType) {
    case '.html':
      contentType['Content-Type'] = 'text/html';
      break;
    case '.css':
      contentType['Content-Type'] = 'text/css';
      break;
    case '.txt':
      contentType['Content-Type'] = 'text/plain';
      break;
    case '.xml':
      contentType['Content-Type'] = 'text/xml';
      break;
    case '.js':
      contentType['Content-Type'] = 'application/js';
      break;
    case '.pdf':
      contentType['Content-Type'] = 'application/pdf';
      break;
    case '.json':
      contentType['Content-Type'] = 'application/pdf';
      break;
    case '.gif':
      contentType['Content-Type'] = 'image/gif';
      break;
    case '.jpeg':
      contentType['Content-Type'] = 'image/jpeg';
      break;
    case '.jpg':
      contentType['Content-Type'] = 'image/jpeg';
      break;
    case '.png':
      contentType['Content-Type'] = 'image/png';
      break;
    default:
      contentType['Content-Type'] = 'text/html';
      break;
  }

  return contentType;
}

module.exports = getCorrectContentType;
