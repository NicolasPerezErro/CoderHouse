import twilio from "twilio";

// NO ME DEJA COMPRAR UN NUMERO TWILIO
const accountSid = '';
const authToken = '';

const client = twilio(accountSid, authToken);

function options(message,number) {
    let wppOptions = '';
    return wppOptions = {
        body: message,
        from: 'whatsapp:+1455238886',
        to: `whatsapp:${number}`
    }
}

async function enviarWhatsApp(message,number) {
    await client.messages.create(options(message,number))
}

export default enviarWhatsApp;
