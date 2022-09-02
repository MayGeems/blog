const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-Parser');
var path = require('path');
var Usuario = require('./model/usuario');
var Artista = require('./model/artista');
var Obra = require('./model/obra');
var upload = require('./config/configMulter');

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get('/obra', function(req , res){
    Obra.find({}).exec(function(err, docs){
        res.render('obra/lst.ejs', {Obras: docs});    
    });
});

app.post('/obra', function(req, res){
    Obra.find({nomeObra: new RegExp(req.body.txtPesquisa, 'gi')}).exec(function(err, docs){
        res.render('obra/lst.ejs', {Obras: docs});
    });
});

app.get('/obra/add', function(req, res){
    Artista.find({}).then(function(artistas){
        res.render('obra/add.ejs', {Artistas:artistas});
    })
    

});

app.post('/obra/add', upload.single("txtFotoObra"), function(req, res){
    var obra = new Obra({
        nomeObra: req.body.txtNomeObra,
        fotoObra: req.file.filename,
        dataObra: req.body.txtDataObra,
        precoObra: req.body.txtPrecoObra
    });
    obra.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/obra');
        }
    });
});

app.get('/obra/del/:id', function(req, res){
    Obra.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/obra');
        }
    });
});

app.get('/obra/edt/:id', function(req, res){
    Obra.findById(req.params.id, function(err, docs){
        if(err){
            console.log(err);
        }else{
            res.render('/obra/edt.ejs', {Obra: docs});
        }
    });
});

app.post('obra/edt/:id', upload.single('txtFotoObra'), function(req, res){
    Obra.findByIdAndUpdate(req.params.id, 
        {
            nomeObra: req.body.txtNomeObra,
            fotoObra: req.file.filename,
            dataObra: req.body.txtDataObra,
            precoObra: req.body.txtPrecoObra
        }, function(err, docs){
            res.redirect('/obra');
        });
});

app.get('/artista', function(req,res){
    Artista.find({}).exec(function(err, docs){
        res.render('artista/lst.ejs', {Artistas: docs});
    });
});

app.post('/artista', function(req, res){
    Artista.find({nomeArtista: new RegExp(req.body.txtPesquisa, 'gi')}).exec(function(err, docs){
        res.render('artista/lst.ejs', {Artistas: docs});
    });
});

app.get('/artista/add', function(req, res){
    res.render('artista/add.ejs');
});

app.post('/artista/add', upload.single("txtFotoArtista"), function(req, res){
    var artista = new Artista({
        nomeArtista: req.body.txtNomeArtista,
        fotoArtista: req.file.filename,
        datanascArtista: req.body.txtDataNascArtista,
        descricaoArtista: req.body.txtDescricaoArtista,
        emailArtista: req.body.txtEmailArtista
    });
    artista.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/artista');
        }
    });
});

app.get('/artista/del/:id', function(req, res){
    Artista.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/artista');
        }
    });
});

app.get('/artista/edt/:id', function(req, res){
    Artista.findById(req.params.id, function(err, docs){
        if(err){
            console.log(err);
        }else{
            res.render('/artista/edt.ejs', {Artista: docs});
        }
    });
});

app.post('artista/edt/:id', upload.single("txtFotoArtista"), function(req, res){
    Artista.findByIdAndUpdate(req.params.id, 
        {
            nomeArtista: req.body.txtNomeArtista,
            fotoArtista: req.file.filename,
            datanascArtista: req.body.txtDataNasArtista,
            descricaoArtista: req.body.txtDescricaoArtista,
            emailArtista: req.body.txtEmailArtista
        }, function(err, docs){
            res.redirect('/artista');
        });
});

app.get('/', function(req, res){
    Usuario.find({}).exec(function(err, docs){
        res.render('usuario/index.ejs',{Usuarios: docs}); 
    });
});

app.post('/', function(req, res){
    Usuario.find({nome: new RegExp(req.body.txtPesquisa, 'gi')}).exec(function(err, docs){
        res.render('usuario/index.ejs', {Usuarios: docs});
    });
});

app.get('/add', function(req,res){
    res.render('usuario/add.ejs');
});

app.post('/add', upload.single("txtFoto"), function(req,res){
    var usuario = new Usuario({
        nome: req.body.txtNome,
        email: req.body.txtEmail,
        senha: req.body.txtSenha,
        foto: req.file.filename
    });
    usuario.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    });
});

app.get('/del/:id', function(req, res){
    Usuario.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    });
});

app.get('usuario/edt/:id', function(req,res){
    Usuario.findById(req.params.id, function(err, docs){
        if(err){
            console.log(err);
        }else{
            res.render('/usuario/edt.ejs', {Usuario: docs});
        }
    });
});

app.post('usuario/edt/:id', upload.single("txtFoto"), function(req, res){
    Usuario.findByIdAndUpdate(req.params.id, 
        {
            nome: req.body.txtNome, 
            email:req.body.txtEmail, 
            senha: req.body.txtSenha, 
            foto: req.file.filename
        }, function(err, docs){
            res.redirect('/');
        });
});

app.listen(3000, function(){
    console.log("Conexão incializada");
});