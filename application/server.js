const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
var port = process.env.PORT || 4000;

app.use(function(req, res, next) {
  console.log(`Received ${req.method} request to ${req.url}`);
  res.header("Strict-Transport-Security", "max-age=15552000; includeSubDomains; preload");
  res.header("X-Frame-Options", "deny");
  res.header("X-XSS-Protection", "1; mode=block");
  res.header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", "0");
  res.header("X-Content-Type-Options", "nosniff");
  next();
})
// Cors
if(process.env.NODE_ENV === 'development') {
    app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
        if(req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }

        next();
    });
}

//Health endpoint
app.get('/health', function(req, res) {
  return res.json({
    status: 'up'
  });
})

//Config file
app.get('/config.json', function(req, res) {
    let config = {
    };
    return res.json(config);
});

// Angular frontend
app.set('appPath', path.join(__dirname + '/client'));
app.use(express.static(app.get('appPath')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

// Start listening
const server = http.createServer(app);

server.listen(port, () => {
  console.log('Server listening on port: ', port);
});
