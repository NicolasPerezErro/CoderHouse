import { Router } from 'express';
import { webAuth } from '../../src/auth/index.js';

import __dirname from '../../__dirname.js';
import path from 'path';

import passport from 'passport';
import bCrypt from 'bcrypt';

import { Strategy as LocalStrategy } from 'passport-local';

import User from '../../src/models.js'

const loginPath = path.join(__dirname, '/public/', 'login.html')

const authWebRouter = new Router()

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (!isValidPassword(user, password)) {
                return done(null, false);
            }

            return done(null, user);
        })
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});


function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

// servicios

authWebRouter.get('/', (req, res) => {
    res.redirect('/login')
})

authWebRouter.get('/login', (req, res) => {
    res.sendFile(loginPath)

})

authWebRouter.post('/login', passport.authenticate('login', { //valida que exista el usuario
    failureRedirect: '/loginFailed'
}), (req, res) => {
    const body = req.body;
    req.session.user = body.username;
    res.redirect('/home')

})

authWebRouter.get('/logout', webAuth, (req, res) => {
    function renderizarLogout(){
        console.log('destruyendo la sesion')
        res.render('logout', { nombre })
    }
    const nombre = req.session.user
    req.session.destroy(err => {
        if (err) {
            res.json({ status: 'Logout Error', body: err })
        } else {
            setTimeout(renderizarLogout, 5000); // Tiempo para destruir la sesion
        }
    })
})

authWebRouter.get('/loginFailed', (req, res) => {
    res.render('login-error');

})



export default authWebRouter