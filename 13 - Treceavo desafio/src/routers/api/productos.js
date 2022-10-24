import faker from 'faker';
import { Router } from 'express'

const productosApiRouter = new Router()


productosApiRouter.get('/productos-test', (req, res) => {
    const productosAlAzar = [];
    for (let i = 0; i < 5; i++) {
        productosAlAzar.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.imageUrl()
        })
    }

    res.json(productosAlAzar);
})

export default productosApiRouter