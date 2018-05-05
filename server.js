var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

app.use(session({
  secret: 'skol',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use(bodyParser.urlencoded({extended: true}));
app.use( bodyParser.json() );
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/", function (req, res){
    res.render('index')
})

app.post("/process", function (req, res){
    console.log(req.body);
        req.session.name = req.body.name;
        req.session.location = req.body.location;
        req.session.language = req.body.language;
        req.session.comment = req.body.comment;

    
    res.redirect('/result')
})

app.get("/result", function (req, res){
    var name = req.session.name,
        location = req.session.location,
        language = req.session.language,
        comment = req.session.comment;

    res.render('result', req.session)
})

app.listen(1337, function(){
    console.log("listening on port 1337");
})