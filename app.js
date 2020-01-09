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
			res.download( __dirname.replace(/\\/g,"/")+'/qrCodes/qrGuardados.zip');
		});
	}
	else{
		res.redirect("index.html");
	}
});


app.listen(3000,()=>{console.log("Escuchando en el puerto 3000");
//for(var i = 0; i < 1000; i++){
	//var QRCode = require('qrcode');
    //QRCode.toFile(`./qrCodes/${i}.png`,`${require('./database').ip}/readQR?abc=${i}`,[{ data: [253,254,255], mode: 'byte' }]);
//}
});