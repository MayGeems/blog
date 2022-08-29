var conexao = require('../config/conexao');
var ArtistaSchema = conexao.Schema({
    nomeArtista:{type:String},
    fotoArtista:{type:String},
    datanascArtista:{type:String},
    descricaoArtista:{type:String},
    emailArtista:{type:String}
});

module.exports = conexao.model("Artista", ArtistaSchema);