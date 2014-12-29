var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static('Client/'));

app.get('/', function(request, response) {
  response.sendfile('Client/login.html');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
