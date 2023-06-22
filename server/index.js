const express = require('express');
const app = express();
const cors = require("cors");

const nodeMailer = require("nodemailer");

app.use(express.json());
app.use(cors());

const db = require('./models');
const html = `
    <h1>Welcome to the Dormitory Management System!</h1>
    <p>Thank you for choosing our product.<p>
`;

//Routers
const dormRouter = require('./routes/Dorms');
app.use("/dorms", dormRouter);
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server running on port 3001");
    });
});

async function main() {
    const transporter = nodeMailer.createTransport({
        service: 'yahoo',
        auth: {
            user: 'vulc_alex@yahoo.com',
            pass: 'azxmdrxhcjdztwpx',
        }
    });

    const info = await transporter.sendMail({
        from: 'vulc_alex@yahoo.com',
        to: 'vulc.alex@yahoo.com',
        subject: 'Welcome',
        html: html,

    })
    console.log("Message sent: " + info.messageId);
}

//Sending e-mail
main().catch(e => console.log(e));


