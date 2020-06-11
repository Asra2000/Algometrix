// required external modules
var express = require("express");
const path = require("path");
var mongoose = require('mongoose'),
    bodyParser = require('body-parser');
var passport = require('passport'),
    LocalStrategy = require('passport-local');

//-----------------------------------------------------------------------------------

//app variables
var app = express();
const port = process.env.PORT||3000;
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/algometrix', {useNewUrlParser: true, useUnifiedTopology: true});

//the user db
var User = require('./models/user');
var Comment = require('./models/comment');

 
//passport config
app.use(require('express-session')({
    secret: 'Let them die',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//global middleware
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})


//--------------------------------------------------------------------------------------
// Routes defination
app.get("/",(req, res)=>{
    res.render("home");
});

app.get("/bubble", (req, res)=>{
    res.render("anime");
})

app.get("/abouts", (req,res)=>{
    res.render('abouts');
})


//register :new user form
app.get("/register", (req, res)=>{
    res.render('register');
});

//adding the new user
app.post('/register', (req, res)=>{
    var newUser = {username: req.body.username};
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate('local')(req, res, ()=>{
            res.redirect("/");
        });
    });
});

app.get("/login",(req, res)=>{
    res.render('login');
});

app.post("/login", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login' 
}),    (req, res)=>{
});

//logout
app.get('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/');
});

app.post('/comment', (req, res)=>{
    if(req.isAuthenticated()){
        res.render('comment')
    }
    else{
        res.render('login');
    }
});

// server activation
app.listen(port, ()=>{
    console.log("running");
});

