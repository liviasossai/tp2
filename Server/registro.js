var LocalStrategy   = require('passport-local').Strategy;
// Estratégia local: implementação do registro/cadastro de novos usuários
var User = require('./Models/user');
var bCrypt = require('bcrypt-nodejs'); // Módulo empregado na segurança da senha

module.exports = function(passport){

	passport.use('registro', new LocalStrategy({
            passReqToCallback : true // passar a requisição completa para o callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){
                // encontrar no Mongodb o usuário com username especificado
                User.findOne({ 'username' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // usuário já existe -> lembrando que a chave é o nome de usuário, que deve ser única
                    if (user) {
                        console.log('Usuário já existente: '+username);
                        return done(null, false);
                    } else {
                        // criar usuário com as informações solicitadas
                        var newUser = new User();

                        newUser.username = username;
                        newUser.password = createHash(password);
                        newUser.email = req.param('email');

                        // salvar usuário no banco de dados
                        newUser.save(function(err) {
                            if (err){
                                console.log('Erro ao salvar usuário: '+err);  
                                throw err;  
                            }
                            console.log('Registro pronto');
                            return done(null, newUser);
                        });
                    }
                });
            };

            process.nextTick(findOrCreateUser);
        })
    );

    // Segurança da senha
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}
