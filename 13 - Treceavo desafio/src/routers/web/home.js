import { Router } from 'express'
import { webAuth } from '../../auth/index.js'

const productosWebRouter = new Router()

productosWebRouter.get('/home', webAuth, (req, res) => {
    const nombre = req.session.user;
    if (req.session.views) {
        req.session.views++;
    } else {
        req.session.views = 1;
    }
    console.log(`Visitas: ${req.session.views}`)
    res.render('home', { nombre })
})

export default productosWebRouter