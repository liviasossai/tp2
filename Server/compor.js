var User = require('./Models/user');
var bCrypt = require('bcrypt-nodejs'); // Módulo empregado na segurança da senha
var _ = require('underscore');


module.exports = function(req, res){
    
    comp = {data: req.body.data, titulo: req.body.titulo, lembrete: req.body.lembrete, importancia: req.body.importancia, data_add: "Data de adição: "+req.body.data_add};
    req.user.compromissos.push(comp);

   req.user.compromissos = _.sortBy(req.user.compromissos, function(obj) { return new Date(transforma_data(obj.data))});
    console.log(req.user);
    // salvar o lembrete no banco de dados
    req.user.save(function(err) {
                 if (err){
                 console.log('Erro ao salvar usuário: '+err);
                 throw err;
                 }
                 console.log('Registro pronto');
                  
                 });
}

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