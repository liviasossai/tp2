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



app.post('/login',
         passport.authenticate('login'),
         function(req, res) {
         
         console.log("usuario");
         console.log(req.user);
         var excluir = require('./excluir.js');
         var d = new Date();
         today = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate();
         
         // Ao ser realizado o login, são verificados os compromissos que deveriam ter sido concluídos até a presente data
         // Eles são adicionados ao histórico com status "não concluído"
         
         //var comp_concl = req.user.compromissos_concluidos;
         var excl = [];
         
         for(var i = 0; i < req.user.compromissos.length; i++){
         if(new Date(transforma_data(req.user.compromissos[i].data)).getTime() - new Date(today).getTime() < 0){
         var cc = {data: req.user.compromissos[i].data, titulo: req.user.compromissos[i].titulo, lembrete: req.user.compromissos[i].lembrete, data_add: "data de conclusão: -", status: "não"};
         req.user.compromissos_concluidos.push(cc);
         excl.push(String(req.user.compromissos[i]._id));
         }
         
         }
         
         req.user.num_acessos = parseInt(String(req.user.num_acessos))+1;
         req.user.save(function(err) {
                       if (err){
                       console.log('Erro ao salvar usuário: '+err);
                       throw err;
                       }
                       });

         
         for(var i = 0; i < excl.length; i++){
         excluir(req.user._id, excl[i]);
         }
         
         
         
         res.redirect('/home');
         });



app.post('/registrar',
         passport.authenticate('registro'),
         function(req, res) {
         res.redirect('/home');
         });



app.post('/concluir', function(req, res) {
         
         console.log("usuario");
         console.log(req.body);
         var concluir = require('./concluir.js');
         
         var today = new Date();
         var dd = today.getDate();
         var mm = today.getMonth()+1;
         var yyyy = today.getFullYear();
         
         req.body.data_add = dd+'-'+mm+'-'+yyyy;
         
         concluir(req, res);
         
         
         res.send(req.compromissos_concluidos);
         
         });

app.post('/historico', function(req, res) {
         
         
         
         var comp = {compromissos_concluidos: req.user.compromissos_concluidos};
         
         res.render('tabela', comp);
         
         });


app.get('/home', function(req, res) {
        
        
        var compromissos1 = req.user.compromissos.slice();
        var compromissos2 = compromissos1.splice(0, 4);
        
        
        var dados = { username: req.user.username,
        num_acessos: req.user.num_acessos,
        compromissos1: compromissos1,
        compromissos2: compromissos2
        };
        
        var pag_render = 'home';
        
        if(req.user.num_acessos == "1"){
        pag_render = 'home_tutorial';
        }
        
        
        res.render(pag_render, dados);
        
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
         num_acessos: req.user.num_acessos,
         compromissos1: compromissos1,
         compromissos2: compromissos2
         };
         
         res.render('home', dados);});


app.post('/excluir', function(req, res) {
         
         var excluir = require('./excluir.js');
         excluir(req.user._id, req.body.id_excluir);
         res.send("ok");
         });

app.post('/editar', function(req, res) {
         
         
         var editar = require('./editar.js');
         req.body.data_add = "";
         var today = new Date();
         var dd = today.getDate();
         var mm = today.getMonth()+1;
         var yyyy = today.getFullYear();
         
         req.body.data_add = dd+'-'+mm+'-'+yyyy;
         
         
         editar(req, req.body.id_editar);
         
         
         
         var compromissos1 = req.user.compromissos.slice();
         var compromissos2 = compromissos1.splice(0, 4);
         
         
         var dados = { username: req.user.username,
         compromissos1: compromissos1,
         compromissos2: compromissos2
         };
         
         res.render('stickers', dados);});


app.get('/logout', function(req, res) {
        console.log(req);
        res.redirect('/');
        });

app.listen(app.get('port'), function() {
           console.log("Nodejs funcionando. Porta:" + app.get('port'));
           });




function transforma_data(data){
    
    var data_aux = "";
    var dia = "";
    var mes = "";
    var ano = "";
    
    var i = 0;
    
    while(data[i] != '/'){
        dia = dia + data[i];
        i++;
    }
    i++;
    while(data[i] != '/'){
        mes = mes + data[i];
        i++;
    }
    i++;
    while(i < data.length){
        ano = ano + data[i];
        i++
    }
    
    if(dia.length < 2){
        dia = "0"+dia;
    }
    if(mes.length < 2){
        mes = "0"+ mes;
    }
    
    data_aux = String(ano+'/'+mes+'/'+dia);
    return data_aux;
    
}
