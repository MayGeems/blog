var conexao = require('../config/conexao');
var EstiloSchema = conexao.Schema({
    nomeEstilo:{type:String},
    descricaoEstilo:{type:String}
});

module.exports = conexao.model("Estilo", EstiloSchema);