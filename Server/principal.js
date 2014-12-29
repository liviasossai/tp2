 var express = require('express');
    //var _ = require('underscore');
    var fs = require('fs');

    app = express();
    
    app.use(express.static('client/'));

    app.listen(3000);
