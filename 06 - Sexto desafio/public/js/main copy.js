const socket = io.connect();

//------------------------------------------------------------------------------------
// PRODUCTOS
const formAgregarProducto = document.getElementById('formAgregarProducto')
//añade un evento que se ejecuta del lado del cliente cuando usa el id submit
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    //Armar objeto producto y emitir mensaje a evento update
    const producto = {
        title: document.getElementById('nombre').value,
        price: document.getElementById('precio').value,
        thumbnail: document.getElementById('foto').value
    };
    socket.emit('update', producto);
});

socket.on('productos', productos => {
    //generar el html y colocarlo en el tag productos llamando al funcion makeHtmlTable
    let tablaHtml = makeHtmlTable(productos);
    document.getElementById('productos').innerHTML = tablaHtml;
});


function makeHtmlTable(productos) {
    return fetch('plantillas/tabla-productos.handlebars')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos });
            return html;
        });
};

//-------------------------------------------------------------------------------------
// CHAT
const inputUsername = document.getElementById('inputUsername');
const inputMensaje = document.getElementById('inputMensaje');
const btnEnviar = document.getElementById('btnEnviar');

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()
    //Armar el objeto de mensaje y luego emitir mensaje al evento nuevoMensaje con sockets
    const hoy = new Date();
    const mensaje = {
        email: inputUsername.value,
        fechayHora: `[${hoy.toLocaleDateString()} ${hoy.toLocaleTimeString()}]`,
        mensaje: inputMensaje.value
    };
    formPublicarMensaje.reset();
    inputMensaje.focus();
    socket.emit('nuevo-mensaje', mensaje);
});

socket.on('mensajes', mensajes => {
    const html = mensajes.map(elem => {
        return (`<div><strong style="color:blue">${elem.email}</strong> <font style="color:brown">${elem.fechayHora}:</font> <em style="color:green">${elem.mensaje}</em></div>`)
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
});

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
});

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
});