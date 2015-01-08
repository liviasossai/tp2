var mongoose = require('mongoose');
 
module.exports = mongoose.model('User',{
    username: String,
    password: String,
    email: String,
    compromissos: [{data: String, titulo: String, lembrete: String, importancia: String, data_add: String}],
    compromissos_concluidos: [{data: String, titulo: String, lembrete: String, data_add: String, status: String}]
});
