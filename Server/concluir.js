var User = require('./Models/user');
var bCrypt = require('bcrypt-nodejs'); // Módulo empregado na segurança da senha
var _ = require('underscore');


module.exports = function(req, res){
    
    
    //console.log("usuario");
    //console.log(req.body);
    
    var comp = {data: req.body.data, titulo: req.body.titulo, lembrete: req.body.lembrete, data_add: "Data de conclusão: "+req.body.data_add, status: req.body.status};
    req.user.compromissos_concluidos.push(comp);
    
    // salvar o lembrete no banco de dados
    req.user.save(function(err) {
                  if (err){
                  console.log('Erro ao salvar usuário: '+err);
                  throw err;
                  }
                  User.findOneAndUpdate({_id: req.user._id}, {$pull: {compromissos: {_id: req.body.id}}}, function(err, data){
                                        console.log(err, data);
                                        });
                  });
    
    
    
    // req.user.compromissos_concluidos = _.sortBy(req.user.compromissos_concluidos, function(obj) { return new Date(obj.data)});
    
    
   
}