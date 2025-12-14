const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine','hbs');


app.use(async (req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    try{
       await fs.promises.appendFile('server.log', log + '\n');
    }catch(e){
        console.log("Unable to fetch the data");
    }
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintain.hbs');
// });
app.use(express.static(__dirname + '/html'));

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        msg:"Welcome Home",
        title:"Home-page",
        Year: new Date().getFullYear()
    });
});

app.get('/about',(req,res)=>{
      res.render('about.hbs',{
        pageTitle:"About Page"
      });
});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle:"Prjoects"
    })
});

app.get('/bad',(req,res)=>{
    res.send({
        error:"Bad request",
        Reason:"Message can't be fetched"
    });
});
app.listen(3000,()=>{
    console.log("Server is open on the port 3000")
});