var User = require('./Models/user');
var bCrypt = require('bcrypt-nodejs'); // Para a senha
var ObjectId = require('mongoose').Types.ObjectId;
var _ = require('underscore');

module.exports = function(req, id_lembrete){
  
    
//   User.findOneAndUpdate({_id: '1234', emailList: 'abc'}, {$set: {'emailList.$': 'ghi'}})

   /* User.findOneAndUpdate({_id: req.user._id}, {$pull: {compromissos: {_id: id_lembrete}}}, function(err, data){
                          console.log(err, data);
                          });
    
   

    
    
    var json = User.find({ _id: req.user._id }).lean().exec(function(err, items) {
                                                 //addProperty(items);
                                                            
                                                 req.user.compromissos = JSON.parse(JSON.stringify(items))[0].compromissos;
                                                            console.log(req.user.compromissos);
                                                 });
    
    
   // comp = {data: req.body.data, titulo: req.body.titulo, lembrete: req.body.lembrete, importancia: req.body.importancia, data_add: req.body.data_add};
    //req.user.compromissos.push(comp);

    */
    
    
    
    var i;
    for(i = 0; i < req.user.compromissos.length; i++){
        if(req.user.compromissos[i]._id == id_lembrete){
            
            req.user.compromissos[i].data = req.body.data;
            req.user.compromissos[i].titulo = req.body.titulo;
            req.user.compromissos[i].lembrete = req.body.lembrete;
            req.user.compromissos[i].importancia = req.body.importancia;
            req.user.compromissos[i].data_add =  "Data da última edição: "+req.body.data_add;
            break;
        }
        
    }
    
    req.user.compromissos = _.sortBy(req.user.compromissos, function(obj) { return new Date(obj.data)});
    
    // salvar o lembrete no banco de dados
    req.user.save(function(err) {
                  if (err){
                  console.log('Erro ao editar: '+err);
                  throw err;
                  }
                  console.log('Registro editado');
                  
                  });
    
    //req.user = User.findOne( {$elemMatch: { _id:  req.user._id }}, function(err, user) { console.log("erro"); });


    //console.log('usuário upado');
    //console.log(req.user);
}

