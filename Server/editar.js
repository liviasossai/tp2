var User = require('./Models/user');
var bCrypt = require('bcrypt-nodejs'); // Para a senha
var ObjectId = require('mongoose').Types.ObjectId;
var _ = require('underscore');

module.exports = function(req, id_lembrete){
    
   
    
    User.findOneAndUpdate({_id: req.user._id}, {$pull: {compromissos: {_id: id_lembrete}}}, function(err, data){
                          console.log(err, data);
                          });
    


    comp = {data: req.body.data, titulo: req.body.titulo, lembrete: req.body.lembrete, importancia: req.body.importancia, data_add: req.body.data_add};
    req.user.compromissos.push(comp);

    
    req.user.compromissos = _.sortBy(req.user.compromissos, function(obj) { return -new Date(obj.data)});
    console.log(req.user);
    // salvar o lembrete no banco de dados
    req.user.save(function(err) {
                  if (err){
                  console.log('Erro ao editar: '+err);
                  throw err;
                  }
                  console.log('Registro editado');
                  
                  });
    
    req.user = User.findOne({ _id:  req.user._id }, function(err, user) { console.log("erro"); });
    
}

