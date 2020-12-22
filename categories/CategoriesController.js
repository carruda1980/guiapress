const express = require("express");
const router = express.Router();
const Category = require("./Category");
const Slugify = require("slugify");

router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new')
});

router.get('/admin/categories', (req, res) => {
    res.render('admin/categories/index')
});

router.post('/categories/save', (req, res) => {
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: Slugify(title)
        }).then(() =>{
            res.redirect('/')
        });
    }else{
        res.redirect('/admin/categories/new')
    }
});

module.exports = router