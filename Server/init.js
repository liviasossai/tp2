var login = require('./login');
var signup = require('./registro');
var User = require('./Models/user'); // Modelo da estrutura usuário

module.exports = function(passport){

	
    passport.serializeUser(function(user, done) {
        console.log('serializando: ');console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserializando:',user);
            done(err, user);
        });
    });

   // Estratégias locais definidas nos arquivos registro.js e login.js
    login(passport);
    signup(passport);

}
