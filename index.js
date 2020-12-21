const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const connection = require('./database/database')


// View engine
app.set('view engine', 'ejs')


// Bodry parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Static files
app.use(express.static('public'))


// Connection
connection.authenticate().then(() =>{
    console.log("Connected!")
}).catch((error) => {
    console.log(error)
})
app.get('/', (req, res)=> {
    res.render("index.ejs");
});

app.listen(8080, () =>{
    console.log("App started")
})