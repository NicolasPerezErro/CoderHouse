import twilio from "twilio";

const accountSid = '';
const authToken = '';

const client = twilio(accountSid, authToken);

const number = process.argv[2];
const message = process.argv[3];

const options = {
    body: message,
    from: 'whatsapp:+14155238886',
    to: `whatsapp:${number}`
};

try {
    const message = await client.messages.create(options);
    console.log(message);
} catch (error) {
    console.log(error);
}