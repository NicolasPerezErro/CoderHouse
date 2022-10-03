import { Router } from 'express'
import { webAuth } from '../../auth/index.js'

const authWebRouter = new Router()

authWebRouter.get('/login', (req, res) => {
    res.redirect('/')
})

authWebRouter.post('/login', (req, res) => {
    const body = req.body;
    if (body.nombre?.length > 0) {
        req.session.user = body.nombre;
        //res.send('Login exitoso');
        res.redirect('/home')
    } else {
        res.send('Error: introducir un nombre valido')
    }

})

authWebRouter.get('/logout', webAuth, (req, res) => {
    const nombre = req.session.user
    req.session.destroy(err => {
        if (err) {
            res.json({ status: 'Logout Error', body: err })
        } else {
            res.render('./pages/logout', { nombre })
        }
    })
})




export default authWebRouter