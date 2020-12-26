const express = require("express");
const router = express.Router();
const Category = require("./Category");
const Slugify = require("slugify");
const adminAuth = require('../middlewares/middlewares');

router.get('/admin/categories/new', adminAuth, (req, res) => {
    res.render('admin/categories/new')
});

router.get('/admin/categories', adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/categories/index', {
            categories: categories
        })
    })
});

router.post('/categories/delete', adminAuth, (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/categories')
            })
        }else{
            res.redirect('/admin/categories')
        }
    }else{
        res.redirect('/admin/categories')
    }
});

router.post('/categories/save', adminAuth, (req, res) => {
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: Slugify(title)
        }).then(() =>{
            res.redirect('/admin/categories')
        });
    }else{
        res.redirect('/admin/categories/new')
    }
});

router.get('/admin/categories/edit/:id', adminAuth, (req, res) => {
    var id = req.params.id;
    console.log(id);
    if(id != undefined){
        if(!isNaN(id)){
            Category.findByPk(id).then(category => {
                res.render('admin/categories/edit', {
                    category: category
                })
            })
        }else{
            res.redirect('/admin/categories');
        }
    }else{
        res.redirect('/admin/categories')
    }
});

router.post('/categories/update', adminAuth, (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    Category.update({
        title: title,
        slug: Slugify(title)
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/categories')
    })
});

module.exports = router