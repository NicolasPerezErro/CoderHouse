import logger from '../logger/logger.js'

async function getHomeController(req, res) {
    const nombre = req.session.user;
    if (req.session.views) {
        req.session.views++;
    } else {
        req.session.views = 1;
    }
    console.log(`Visitas: ${req.session.views}`)
    logger.info(`Ruta: ${req.url} y metodo: ${req.method} ok`);
    res.render('home', { nombre });
}

export { getHomeController }