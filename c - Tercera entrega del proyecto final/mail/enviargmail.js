import { createTransport } from "nodemailer";

const HOST = 'nicoperezz999@gmail.com';

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: HOST,
        pass: 'mppnbukfeargdmlz'
    }
});

function options(subject, htmlInfo) {
    let mailOptions;
    return mailOptions = {
        from: 'Servidor Node.js',
        to: process.env.TEST_MAIL,
        subject: subject,
        html: htmlInfo
    };

}

async function enviarMail(subject, htmlInfo) {
    await transporter.sendMail(options(subject, htmlInfo));
}


export default enviarMail;