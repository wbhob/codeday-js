const express = require('express');
const path = require("path");

const app = express();


app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) => {
    res.status(200)
        .sendFile(__dirname + '/views/index.html');
})

app.listen(8080);
