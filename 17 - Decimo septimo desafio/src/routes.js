import { Router } from 'express'

import compression from 'compression';

import { webAuth } from './middleware/index.js'

import passportLogin from './passport/login.js'
import passportRegister from './passport/register.js'

import { getProdTestController } from './controllers/productsController.js'
import { getRandomController, getRandomSinParamController } from './controllers/randomController.js'
import { getHomeController } from './controllers/homeController.js'
import { getInfoController, getInfoZipController } from './controllers/infoController.js'
import {
    getRootController, getLoginController, postLoginController, getLogoutController,
    getLoginFailedController
} from './controllers/authController.js'
import {
    getSignUpController, postSignUpController, getSignUpFailController
} from './controllers/registerController.js'


const productsRouter = new Router();
const randomRouter = new Router();
const homeRouter = new Router();
const infoRouter = new Router();
const authRouter = new Router();
const registerRouter = new Router();

// API

productsRouter.get('/productos-test', getProdTestController);

randomRouter.get('/random', getRandomController);
randomRouter.get('/randomSinParam', getRandomSinParamController);

//WEB

homeRouter.get('/home', webAuth, getHomeController);

authRouter.get('/', getRootController);
authRouter.get('/login', getLoginController);
authRouter.post('/login', passportLogin.authenticate('login', {
    failureRedirect: '/loginFailed'
}), postLoginController);
authRouter.get('/logout', webAuth, getLogoutController);
authRouter.get('/loginFailed', webAuth, getLoginFailedController);

infoRouter.get('/info', compression(), getInfoController);
infoRouter.get('/info-zip', getInfoZipController);

registerRouter.get('/signup', getSignUpController);
registerRouter.post('/signup', passportRegister.authenticate('signup', {
    failureRedirect: '/signupFail'
}), postSignUpController);
registerRouter.get('/signupFail', getSignUpFailController);


export { productsRouter, randomRouter, homeRouter, infoRouter, authRouter, registerRouter }

