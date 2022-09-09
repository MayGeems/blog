var conexao = require('../config/conexao');
var EstiloSchema = conexao.Schema({
    nomeEstilo:{type:String},
    descricaoEstilo:{type:String},
    artista:[{
        type:conexao.Schema.Types.ObjectId, 
        ref: "Artista"
    }]
});

module.exports = conexao.model("Estilo", EstiloSchema);