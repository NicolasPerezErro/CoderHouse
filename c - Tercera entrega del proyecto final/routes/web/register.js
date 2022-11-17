import { Router } from 'express'
import multer from 'multer';

import __dirname from '../../__dirname.js';
import path from 'path';

import passport from 'passport';
import bCrypt from 'bcrypt';

import { Strategy as LocalStrategy } from 'passport-local';

import User from '../../src/models.js';
import logger from '../../logger/logger.js'
import enviarMail from '../../mail/enviargmail.js'

const signup = path.join(__dirname, '/public/', 'signup.html')

const registerWebRouter = new Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage });

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    (req, username, password, done) => { // la funcion espera la etiqueta username y password
        User.findOne({ 'username': username }, (err, user) => {
            if (err) {
                return done(err);
            };

            if (user) {
                return done(null, false);
            }

            const newUser = {
                username: username,
                password: createHash(password),
                name: req.body.name,
                age: req.body.age,
                address: req.body.address,
                phone: req.body.phone

            };

            User.create(newUser, (err, userWithId) => {
                if (err) {
                    return done(err);
                }
                return done(null, userWithId);
            })
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

// servicios

registerWebRouter.get('/signup', (req, res) => {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`)
    res.sendFile(signup)
})

registerWebRouter.post('/signup', passport.authenticate('signup', { //valida que al crear un usuario no exista
    failureRedirect: '/signupFail'
}), (req, res) => {
    const body = req.body;
    req.session.name = body.name;
    const subject = 'nuevo registro'
    const htmlInfo = `username: ${body.username},
                      password: ${body.password},
                      name: ${body.name},
                      age: ${body.age},
                      address: ${body.address},
                      phone: ${body.phone}`
    enviarMail(subject, htmlInfo);
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`)
    res.redirect('/')
})

registerWebRouter.get('/signupFail', (req, res) => {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`)
    res.render('signup-error')
})

registerWebRouter.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Error subiendo archivo')
        error.httpStatusCode = 400
        return next(error)
    }
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`)
})



export default registerWebRouter