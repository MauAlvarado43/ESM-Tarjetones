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
		zipFolder.zipFolder(__dirname.replace(/\\/g,"/")+'/qrCodes', __dirname.replace(/\\/g,"/")+'/db/qrGuardados.zip', function(err) {
			if(err) {
				console.log(err);
			}
			res.download( __dirname.replace(/\\/g,"/")+'/db/qrGuardados.zip');
		});
	}
	else{
		res.redirect("index.html");
	}
});


app.listen(3000,()=>{console.log("Escuchando en el puerto 3000");
/*
let pdf = require('html-pdf');

let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
	<style>
		@font-face {
			font-family: 'Montserrat';
            src: url('file:///${__dirname.replace(/\\/g,"/")}/template/Montserrat-Bold.ttf') format('truetype');
            font-weight: bold;
            font-style: normal;
        }
        table{
            border-color:transparent;
            border-spacing: 2px 6px;
        }
        h2{
            font-family: 'Montserrat';
            color: white;
            margin-bottom: 0;
            padding-bottom: 0;
            font-size:14px;
        }
        img{
            vertical-align: middle;
            margin-bottom: 0;
        }
        h3{
            font-family: 'Montserrat';
            color: white;
            margin-top: 0;
            padding-top: 0;
            margin-bottom: 0;
            font-size:12px;
        }
        h1{
			font-family: 'Montserrat';
            color: white;
            margin-top: 0;
            padding-top: 0;
            margin-bottom: 0;
            font-size:14px;
        }
    </style>
    `;

let options = {    
	format: 'Tabloid',
	base: "file:///"+__dirname.replace(/\\/g,"/"),
	type: "pdf",
	orientation: "landscape",
	border: {
		top: "2cm",
		right: "0.01in",
		bottom: "2cm",
		left: "0.01in"
	},
	footer: {
		height: "0in",
	}
};

for(var i = 1; i <= 800; i++){
    
    let color = "";
    let number = "";

    if(i<=100){color="#75125C";}
    else if(i<=200){color="#005B96";}
    else if(i<=300){color="#BB1E1E";}
    else if(i<=400){color="#00A86B";}
    else if(i<=500){color="#E1A02C";}
    else if(i<=600){color="#6C5834";}
    else if(i<=700){color="#75125C";}
    else if(i<=800){color="#005B96";}

    if(i<10){
        number="00"+i+"";
    }
    else if(i<100){
        number="0"+i+"";
    }
    else{
        number = i+"";
    }

    if(i==1){
        html+=`
        <table border="1">
            <tr>
            <td style=" background-color: ${color};">
                <center>
                    <h2>&nbsp;<img src="file:///${__dirname.replace(/\\/g,"/")}/template/ipn-logo.png" width="30" height="45">&nbsp;Instituto Politécnico Nacional&nbsp;&nbsp;</h2>
                    <h3>&nbsp;&nbsp;&nbsp;&nbsp;Escuela Superior de Medicina</h3>
                    <img src="file:///${__dirname.replace(/\\/g,"/")}/qrCodes/${i}.png" width="150" height="150">
					<h1>${number}</h1>
					<br>
                </center>
            </td>
        `;
    }
    else if(i%18==0){
        html+=`
                <td style=" background-color: ${color};">
                    <center>
                        <h2>&nbsp;<img src="file:///${__dirname.replace(/\\/g,"/")}/template/ipn-logo.png" width="30" height="45">&nbsp;Instituto Politécnico Nacional&nbsp;&nbsp;</h2>
                        <h3>&nbsp;&nbsp;&nbsp;&nbsp;Escuela Superior de Medicina</h3>
                        <img src="file:///${__dirname.replace(/\\/g,"/")}/qrCodes/${i}.png" width="150" height="150">
                        <h1>${number}</h1>
                        <br>
                    </center>
                </td>
            </tr>
            </table>
            <p style="page-break-after: always;"></p>
            <table border="1">
            <tr>
        `;
    }
    else if(i%6==0){
        html+=`
                <td style=" background-color: ${color};">
                    <center>
                        <h2>&nbsp;<img src="file:///${__dirname.replace(/\\/g,"/")}/template/ipn-logo.png" width="30" height="45">&nbsp;Instituto Politécnico Nacional&nbsp;&nbsp;</h2>
                        <h3>&nbsp;&nbsp;&nbsp;&nbsp;Escuela Superior de Medicina</h3>
                        <img src="file:///${__dirname.replace(/\\/g,"/")}/qrCodes/${i}.png" width="150" height="150">
                        <h1>${number}</h1>
                        <br>
                    </center>
                </td>
            </tr>
            <tr>
        `;
    }
    else if(i==800){
        html+=`
                <td style=" background-color: ${color};">
                    <center>
                        <h2>&nbsp;<img src="file:///${__dirname.replace(/\\/g,"/")}/template/ipn-logo.png" width="30" height="45">&nbsp;Instituto Politécnico Nacional&nbsp;&nbsp;</h2>
                        <h3>&nbsp;&nbsp;&nbsp;&nbsp;Escuela Superior de Medicina</h3>
                        <img src="file:///${__dirname.replace(/\\/g,"/")}/qrCodes/${i}.png" width="150" height="150">
                        <h1>${number}</h1>
                        <br>
                    </center>
                </td>
            </tr>
            </table>
        </body>
        </html>
        `;

        pdf.create(html, options).toFile('./qrs.pdf', function(err, res) {
            if (err) return console.log(err);
        });

    }
    else{
        html+=`
        <td style=" background-color: ${color};">
            <center>
                <h2>&nbsp;<img src="file:///${__dirname.replace(/\\/g,"/")}/template/ipn-logo.png" width="30" height="45">&nbsp;Instituto Politécnico Nacional&nbsp;&nbsp;</h2>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;Escuela Superior de Medicina</h3>
                <img src="file:///${__dirname.replace(/\\/g,"/")}/qrCodes/${i}.png" width="150" height="150">
                <h1>${number}</h1>
                <br>
            </center>
        </td>
        `;
    }
    */
    /*
	var qr = require('qr-image-color');
	var png_string = qr.image(`${require('./database').ip}/readQR?abc=${i}`, { type: 'png', color: "white",size:7, transparent: true });
    png_string.pipe(require('fs').createWriteStream(`./qrCodes/${i}.png`));
    
    
}
*/   

});