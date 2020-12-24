const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');

// Import Models
const Category = require('./categories/Category');
const Article = require('./articles/Article');

// View engine
app.set('view engine', 'ejs');


// Bodry parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Static files
app.use(express.static('public'));


// Connection
connection.authenticate().then(() =>{
    console.log("Connected!")
}).catch((error) => {
    console.log(error)
});

app.use('/', categoriesController);
app.use('/', articlesController);

app.get('/', (req, res)=> {
    Article.findAll().then(articles => {
        res.render("index.ejs", {
            articles: articles
        });
    })
});

app.listen(8080, () =>{
    console.log("App started")
});