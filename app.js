const express = require("express");
const session = require('express-session');
const upload = require('express-fileupload');
const bodyParser = require('body-parser');

const zipFolder = require('zip-a-folder');

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
app.use(require('./routes/employee'));

app.use(express.static('public'));

app.get("/downloadZIP",(req,res)=>{
	if(req.session.level=="admin"){
		zipFolder.zipFolder(__dirname.replace(/\\/g,"/")+'/qrCodes', __dirname.replace(/\\/g,"/")+'/qrCodes/qrGuardados.zip', function(err) {
			if(err) {
				console.log(err);
			}
			res.download( __dirname.replace(/\\/g,"/")+'/qrCodes/archive.zip');
		});
	}
	else{
		res.send({error:[],message:[]});
	}
});

app.listen(3000,()=>{console.log("Escuchando en el puerto 3000");});