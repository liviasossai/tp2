var User = require('./Models/user');
var bCrypt = require('bcrypt-nodejs'); // Para a senha
var ObjectId = require('mongoose').Types.ObjectId;
var _ = require('underscore');

module.exports = function(req, id_lembrete){
  
    

    
    var i;
    for(i = 0; i < req.user.compromissos.length; i++){
        if(req.user.compromissos[i]._id == id_lembrete){
            
            req.user.compromissos[i].data = req.body.data;
            req.user.compromissos[i].titulo = req.body.titulo;
            req.user.compromissos[i].lembrete = req.body.lembrete;
            req.user.compromissos[i].importancia = req.body.importancia;
            break;
        }
        
    }
    
    req.user.compromissos = _.sortBy(req.user.compromissos, function(obj) { return new Date(transforma_data(obj.data))});
    
    // salvar o lembrete no banco de dados
    req.user.save(function(err) {
                  if (err){
                  console.log('Erro ao editar: '+err);
                  throw err;
                  }
                  console.log('Registro editado');
                  
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
