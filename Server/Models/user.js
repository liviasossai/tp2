var mongoose = require('mongoose');
 
module.exports = mongoose.model('User',{
    username: String,
    password: String,
    email: String,
    compromissos: [{data: String, titulo: String, lembrete: String, importancia: String}],
    num_compromissos: Number
});
