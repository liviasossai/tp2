var express = require('express');
var app = express();
var fs = require('fs');


// Escutar porta 5000
app.set('port', (process.env.PORT || 5000));
app.use(express.static('Client/'));


// Configuração do módulo de autenticação (passport)
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'minhaChaveSecreta'}));
app.use(passport.initialize());
app.use(passport.session());

// Configuração das views
app.set('view engine', 'hbs');
app.set('views', 'server/Views');

// Configuração do banco de dados
var dbConfig = require('./db.js');
var mongoose = require('mongoose');

mongoose.connect(dbConfig.url);

var initPassport = require('./init');
initPassport(passport);

//
var bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function(req, res) {
  
 var html = fs.readFileSync('Client/login.html');
 res.send(String(html))

});

// --- DEFINIÇÃO DAS ROTAS ---

app.post('/login', passport.authenticate('login', {
                                         successRedirect: '/home',
                                         failureRedirect: '/',
                                         failureFlash : true
                                         }));

app.post('/registrar', passport.authenticate('registro', {
		successRedirect: '/home',
		failureRedirect: '/registro',
		failureFlash : true  
	}));



app.get('/home', function(req, res) {
        

        var compromissos1 = req.user.compromissos.slice();
        var compromissos2 = compromissos1.splice(0, 4);

        
        var dados = { username: req.user.username,
        compromissos1: compromissos1,
        compromissos2: compromissos2
        };
        
        //req.user.compromissos = compromissos2 + compromissos1;
        console.log("comp1: ");
        console.log(req.user.compromissos);
        
        res.render('home', dados);
        
        });


app.post('/compor_lembrete', function(req, res) {
    var compor = require('./compor.js');
         var today = new Date();
         var dd = today.getDate();
         var mm = today.getMonth()+1;
         var yyyy = today.getFullYear();
         
         req.body.data_add = dd+'-'+mm+'-'+yyyy;
         compor(req, res);
         
         var compromissos1 = req.user.compromissos.slice();
         var compromissos2 = compromissos1.splice(0, 4);
         
         
         var dados = { username: req.user.username,
         compromissos1: compromissos1,
         compromissos2: compromissos2
         };
         
        res.render('home', dados);
    
});

app.get('/logout', function(req, res) {
           console.log(req);
           res.redirect('/');
           });

app.listen(app.get('port'), function() {
  console.log("Nodejs funcionando. Porta:" + app.get('port'));
});
