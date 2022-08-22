const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-Parser');
var path = require('path');
var Usuario = require('./model/usuario');
var upload = require('./config/configMulter');

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res){
    Usuario.find({}).exec(function(err, docs){
        res.render('index.ejs',{Usuarios: docs}); 
    });
});

app.post('/', function(req, res){
    Usuario.find({nome: new RegExp(req.body.txtPesquisa, 'gi')}).exec(function(err, docs){
        res.render('index.ejs', {Usuarios: docs});
    });
});

app.get('/add', function(req,res){
    res.render('add.ejs');
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

app.get('/edt/:id', function(req,res){
    Usuario.findById(req.params.id, function(err, docs){
        if(err){
            console.log(err);
        }else{
            res.render('edt.ejs', {Usuario: docs});
        }
    });
});

app.post('/edt/:id', upload.single("txtFoto"), function(req, res){
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