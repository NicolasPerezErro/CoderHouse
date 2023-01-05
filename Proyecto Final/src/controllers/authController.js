import logger from '../logger/logger.js'
import path from 'path';

const loginPath = path.join(process.cwd(), '/public/', 'login.html');

async function getRootController(req, res) {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    res.redirect('/login');
}

async function getLoginController(req, res) {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    res.sendFile(loginPath);
}

async function postLoginController(req, res) {
    const body = req.body;
    req.session.user = body.username;
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    res.redirect('/home');
}

async function getLogoutController(req, res) {
    const nombre = req.session.user;
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    req.session.destroy(err => {
        if (err) {
            res.json({ status: 'Logout Error', body: err })
        } else {
            res.render('logout', { nombre });
        }
    })
}

async function getLoginFailedController() {
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    res.render('login-error');
}

export {
    getRootController, getLoginController, postLoginController, getLogoutController, getLoginFailedController
}