function getNumerosRandom(cant) {
    const obj = {};
    for (let i = 0; i < cant; i++) {
        let randomNumber = Math.ceil(Math.random() * 1000);
        if (obj[randomNumber]) {
            obj[randomNumber]++;
        } else {
            obj[randomNumber] = 1;
        }
        obj[randomNumber] ? obj[randomNumber] : obj[randomNumber] = 0
    }
    return obj
}


export { getNumerosRandom }

