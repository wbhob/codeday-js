const log = require('util').log;

const express = require('express');
const path = require("path");
const nodemailer = require('nodemailer');

const app = express();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'pr7for5sjwpbjtut@ethereal.email',
        pass: 'zFsFHetSwvSnbyEUvW'
    }
});

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));


app.get('/contact', (req, res) => {
    transporter.sendMail({
        from: req.query.email,
        to: 'you@youremail.com', // SET TO YOUR EMAIL
        subject: 'A message from the website',
        text: `
        Sender: $${req.query.name}

        Message: ${req.query.message}
        `,
    }, (err, info) => {
        log('hit')
        if (err) {
            log(err);
            res.status(500)
                .sendFile(__dirname + '/views/index.html');
            return;
        }
        log(info);
        res.status(200)
            .sendFile(__dirname + '/views/index.html');
    });
});

app.get('/', (req, res) => {
    res.status(200)
        .sendFile(__dirname + '/views/index.html');
});

app.listen(8080);
