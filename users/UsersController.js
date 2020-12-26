const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');
const adminAuth = require('../middlewares/middlewares');


router.get('/admin/users', adminAuth, (req,res) => {
    User.findAll().then(users => {
        res.render('admin/users/index', {users: users})
    })
});

router.get('/admin/users/create', adminAuth, (req,res) => {
    res.render('admin/users/create')
});

router.post('/users/create', adminAuth, (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    User.create({
        email: email,
        password: hash
    }).then(() => {
        res.redirect('/')
    }).catch(err => {
        res.redirect('/')
    });
});

router.get('/login', (req, res) => {
    res.render('admin/users/login')
});

router.post('/authenticate', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if(user != undefined){
            var canLogin = bcrypt.compareSync(password, user.password);

            if(canLogin){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin/articles')
            }else{
                res.redirect('/login')
            }
        }else{
            res.redirect('/login')
        }

    })
});

module.exports = router;