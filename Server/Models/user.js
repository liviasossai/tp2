var mongoose = require('mongoose');
 
module.exports = mongoose.model('User',{
    username: String,
    password: String,
    email: String,
    compromissos: [{data: String, titulo: String, lembrete: String}],
    num_compromissos: Number
});
