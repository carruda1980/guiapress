const express = require("express");
const router = express.Router();
const Category = require('../categories/Category')
const Article = require('./Article')
const Slugify = require("slugify");

router.get('/admin/articles/new', (req, res) => {
    Category.findAll().then(categories =>{
        res.render('admin/articles/new', {
            categories: categories
        })
    });
    
});

router.get('/admin/articles', (req, res) => {
        Article.findAll({
            include: [{
                model: Category
            }]
        }).then(articles => {
            res.render('admin/articles/index', {
                articles:articles
            })
        });
    });

router.post('/articles/save', (req, res) => {
    var categoryId = req.body.category;
    var body = req.body.body;
    var title = req.body.title;

    Article.create({
        title: title,
        slug: Slugify(title),
        body: body,
        categoryId: categoryId
    }).then(() => {
        res.redirect('/admin/articles')
    })
})

module.exports = router