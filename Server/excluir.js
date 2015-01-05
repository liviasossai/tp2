var User = require('./Models/user');
var bCrypt = require('bcrypt-nodejs'); // Para a senha
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = function(user_id, id_lembrete){
    
    User.findOneAndUpdate({_id: user_id}, {$pull: {compromissos: {_id: id_lembrete}}}, function(err, data){
                                console.log(err, data);
                                });
    
    }

