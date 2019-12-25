const express = require("express");
const session = require('express-session');
const upload = require('express-fileupload');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(require('./routes/users'));
app.use(require('./routes/admin'));

app.use(express.static('public'));

app.listen(3000,()=>{console.log("Escuchando en el puerto 3000");});