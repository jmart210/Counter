var express = require("express");
var session = require("express-session");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'letsdothis!',
    resave: true,
    saveUninitialized: true
}));

var count = 0;

app.get('/', function(req,res){

    res.render('index', {count: count});
});
app.post('/', function(req,res){
    count++;
    req.session.count = count;
    console.log("Counter = " + count);
    res.redirect('/');

});
app.post('/two', function(req,res){
    count = count + 2;
    req.session.count = count;
    console.log("Add 2 = " + count);
    res.redirect('/');
});
app.post('/reset', function(req,res){
    count = 0;
    req.session.count = count;
    console.log("Reset count");
    res.redirect('/');
});
app.listen(8000, function(){
    console.log("server for counter on port 8000!");
});
