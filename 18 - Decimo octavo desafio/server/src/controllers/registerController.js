import logger from '../logger/logger.js'
import __dirname from '../../__dirname.js'
import path from 'path';

const signup = path.join(__dirname, '/public/', 'signup.html');

async function getSignUpController(req, res) {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    res.sendFile(signup);
}

async function postSignUpController(req, res) {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`)
    res.redirect('/');
}

async function getSignUpFailController(req, res) {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`)
    res.render('signup-error');
}


export { getSignUpController, postSignUpController, getSignUpFailController }