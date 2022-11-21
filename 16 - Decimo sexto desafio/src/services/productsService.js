import faker from 'faker';

async function getProdTest() {
    const productosAlAzar = [];
    for (let i = 0; i < 5; i++) {
        productosAlAzar.push({
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.imageUrl()
        })
    }
    return productosAlAzar;
}

export { getProdTest }

