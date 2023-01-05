import { Router } from 'express'

import { webAuth } from './auth/index.js'

import passportLogin from './passport/login.js'
import passportRegister from './passport/register.js'

import productosController from './controllers/productoController.js'
import carritoController from './controllers/carritoController.js'

import { getHomeController } from './controllers/homeController.js'
import {
    getRootController, getLoginController, postLoginController, getLogoutController, getLoginFailedController
} from './controllers/authController.js'
import {
    getSignUpController, postSignUpController, getSignUpFailController
} from './controllers/registerController.js'


const productsRouter = new Router();
const carritosRouter = new Router();
const homeRouter = new Router();
const authRouter = new Router();
const registerRouter = new Router();

const productos = new productosController();
const carritos = new carritoController();

// API

productsRouter.get('/:id', productos.getProductsByIdController);
productsRouter.get('/', productos.getRootProductsController);
productsRouter.post('/', productos.postRootProductsController);
productsRouter.put('/:id', productos.putProductsByIdController);
productsRouter.delete('/:id', productos.deleteProductsByIdController);

carritosRouter.get('/:id/productos', carritos.getProductsCarritoByIdController);
carritosRouter.post('/', carritos.postRootApiController);
carritosRouter.post('/:id_carrito/productos/:id_prod', carritos.postProductsCarritoByIdController);
carritosRouter.delete('/:id', carritos.deleteCarritoByIdController);
carritosRouter.delete('/:id_carrito/productos/:id_prod', carritos.deleteProductsCarritoByIdController);

//WEB

homeRouter.get('/home', webAuth, getHomeController);

authRouter.get('/', getRootController);
authRouter.get('/login', getLoginController);
authRouter.post('/login', passportLogin.authenticate('login', {
    failureRedirect: '/loginFailed'
}), postLoginController);
authRouter.get('/logout', webAuth, getLogoutController);
authRouter.get('/loginFailed', webAuth, getLoginFailedController);

registerRouter.get('/signup', getSignUpController);
registerRouter.post('/signup', passportRegister.authenticate('signup', {
    failureRedirect: '/signupFail'
}), postSignUpController);
registerRouter.get('/signupFail', getSignUpFailController);


export { productsRouter, carritosRouter, homeRouter, authRouter, registerRouter }
