// Definição da estratégia local para login
var LocalStrategy   = require('passport-local').Strategy;
var User = require('./Models/user');
var bCrypt = require('bcrypt-nodejs'); // Para a senha

module.exports = function(passport){
    
    passport.use('login', new LocalStrategy({
                                            passReqToCallback : true
                                            },
                                            function(req, username, password, done) {
                                            // Verifica no banco de dados se o usuário solicitado de fato existe
                                            User.findOne({ 'username' :  username },
                                                         function(err, user) {
                                                         // Em caso de algum erro qualquer:
                                                         if (err){
                                                         console.log("erro");
                                                         return done(err);
                                                         }
                                                         // Em caso de erro devido a usuário não encontrado:
                                                         if (!user){
                                                         console.log('Usuário não encontrado: '+username);
                                                         return done(null, false);
                                                         }
                                                         // Se a senha estiver errada
                                                         if (!isValidPassword(user, password)){
                                                         console.log('Senha errada'); // Usado apenas para controle no lado do servidor (não é seguro avisar ao usuário!)
                                                         return done(null, false); // redirecionamento para a página de login
                                                         }
                                                         // Usuário e senha errados:
                                                         return done(null, user);
                                                         }
                                                         );
                                            
                                            })
                 );
    
    
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}