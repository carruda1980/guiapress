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

router.get('/admin/articles/edit/:id', (req, res) => {
    var id = req.params.id;
    Article.findByPk(id).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render('admin/articles/edit', {
                    categories: categories,
                    article: article
                })
            })
        }else{
            res.redirect('/admin/articles')
        }
    }).catch(err => {
        res.redirect('/admin/articles')
    })
    
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
});

router.post('/articles/delete', (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/articles')
            })
        }else{
            res.redirect('/admin/articles')
        }
    }else{
        res.redirect('/admin/articles')
    }
});

router.post('/articles/update', (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var categoryId = req.body.category;

    Article.update({
        title: title,
        body: body,
        slug: Slugify(title),
        categoryId: categoryId
    },{
        where: {
            id:id
        }
    }).then(() => {
        res.redirect('/admin/articles')
    }).catch(err =>{
        res.redirect('/admin/articles')
    })
});

module.exports = router