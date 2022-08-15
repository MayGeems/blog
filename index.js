const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-Parser');
var path = require('path');

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.unlencoded({extended:false}));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res){
    res.send("Olá, mundo");
});

app.listen(3000, function(){
    console.log("Conexão incializada");
});