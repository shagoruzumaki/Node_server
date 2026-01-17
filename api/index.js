const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();

// View Engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));

// Middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});

// Static files
app.use(express.static(path.join(__dirname, "../public")));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        msg: "Welcome Home",
        title: "Home-page",
        Year: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Page"
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: "Projects"
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: "Bad request",
        Reason: "Message can't be fetched"
    });
});

// Export the Express app for Vercel
module.exports = app;