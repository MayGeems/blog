var conexao = require('../config/conexao');
var ObraSchema = conexao.Schema({
    nomeObra:{type:String},
    fotoObra:{type:String},
    dataObra:{type:String},
    precoObra:{type:String}
});

module.exports = conexao.model("Obra", ObraSchema);