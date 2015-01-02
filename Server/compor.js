var User = require('./Models/user');
var bCrypt = require('bcrypt-nodejs'); // Módulo empregado na segurança da senha

module.exports = function(req, res){
    
    comp = {data: req.body.data, titulo: req.body.titulo, lembrete: req.body.lembrete};
    req.user.compromissos.push(comp);
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