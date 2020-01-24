const pdf = require('html-pdf');
const _colors = require("chalk");
const cliProgress = require('cli-progress');
const ora = require('ora');

//Barra de progreso para generar el HTML con toda la información
var b1 = new cliProgress.SingleBar({
    format: _colors.red("Generando HTML |") + _colors.blue('{bar}') + "| {percentage}% | {value}/{total} | Faltan aproximadamente {eta} s",
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    clearOnComplete: true,
    hideCursor: true
});

//Declaración del html con css incluído
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
            font-size:13px;
        }
        img{
            margin-bottom: 0;
            vertical-align: middle;
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

//Opciones de guardado del PDF
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

b1.start(800, 0,{
    speed:"N/A"
});

//Concatenar los 800 registros
for(var i = 1; i <= 800; i++){

    b1.increment();
    
    let color = "";
    let number = "";

    //Variación del color dependiendo de las centenas

    if(i<=100){color="#75125C";}
    else if(i<=200){color="#005B96";}
    else if(i<=300){color="#BB1E1E";}
    else if(i<=400){color="#00A86B";}
    else if(i<=500){color="#E1A02C";}
    else if(i<=600){color="#6C5834";}
    else if(i<=700){color="#75125C";}
    else if(i<=800){color="#005B96";}

    //Relleno de la numeración

    if(i<10){
        number="00"+i+"";
    }
    else if(i<100){
        number="0"+i+"";
    }
    else{
        number = i+"";
    }

    //Si el index es 1, creamos la tabla
    if(i==1){
        html+=`
        <table border="1">
            <tr>
            <td style=" background-color: ${color}; width:6.9cm; height:6.91cm;">
            <img src="file:///${__dirname.replace(/\\/g,"/")}/template/esm.png" style="opacity: 0.03; position: absolute; filter: grayscale(100%);" width="260" height="260">
                <center>
                    <h2>&nbsp;<img src="file:///${__dirname.replace(/\\/g,"/")}/template/ipn-logo.png" style="position:absolute;" width="30" height="45">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Instituto Politécnico Nacional&nbsp;</h2>
                    <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Escuela Superior de Medicina</h3>
                </center>
                <br>
                    <img src="file:///${__dirname.replace(/\\/g,"/")}/template/2020.png" width="25" height="75" style="margin-left:12%; opacity:.5;">
                    <img src="file:///${__dirname.replace(/\\/g,"/")}/qrCodes/${i}.png" width="150" height="150">
                <center>
                    <h1>${number}</h1>
                <br>
                </center>
            </td>
        `;
    }
    //Si en la hoja ya hay 18 QR's, insertamos un salto de página y cerramos la tabla
    else if(i%18==0){
        html+=`
                <td style=" background-color: ${color}; width:6.9cm; height:6.91cm;">
                <img src="file:///${__dirname.replace(/\\/g,"/")}/template/esm.png" style="opacity: 0.03; position: absolute; filter: grayscale(100%);" width="260" height="260">    
                    <center>
                        <h2>&nbsp;<img src="file:///${__dirname.replace(/\\/g,"/")}/template/ipn-logo.png" style="position:absolute;" width="30" height="45">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Instituto Politécnico Nacional&nbsp;</h2>
                        <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Escuela Superior de Medicina</h3>
                    </center>
                    <br>
                        <img src="file:///${__dirname.replace(/\\/g,"/")}/template/2020.png" width="25" height="75" style="margin-left:12%; opacity:.5;">
                        <img src="file:///${__dirname.replace(/\\/g,"/")}/qrCodes/${i}.png" width="150" height="150">
                    <center>
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
    //Si hay 6 QR's en la misma línea, saltamos a la siguiente 
    else if(i%6==0){
        html+=`
                <td style=" background-color: ${color}; width:6.9cm; height:6.91cm;">
                <img src="file:///${__dirname.replace(/\\/g,"/")}/template/esm.png" style="opacity: 0.03; position: absolute; filter: grayscale(100%);" width="260" height="260">    
                    <center>
                        <h2>&nbsp;<img src="file:///${__dirname.replace(/\\/g,"/")}/template/ipn-logo.png" style="position:absolute;" width="30" height="45">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Instituto Politécnico Nacional&nbsp;</h2>
                        <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Escuela Superior de Medicina</h3>
                    </center>
                    <br>
                        <img src="file:///${__dirname.replace(/\\/g,"/")}/template/2020.png" width="25" height="75" style="margin-left:12%; opacity:.5;">
                        <img src="file:///${__dirname.replace(/\\/g,"/")}/qrCodes/${i}.png" width="150" height="150">
                    <center>
                    <h1>${number}</h1>
                    <br>
                    </center>
                </td>
            </tr>
            <tr>
        `;
    }
    //Si ya el for está a punto de terminar, cerramos el html
    else if(i==800){
        html+=`
                <td style=" background-color: ${color}; width:6.9cm; height:6.91cm;">
                <img src="file:///${__dirname.replace(/\\/g,"/")}/template/esm.png" style="opacity: 0.03; position: absolute; filter: grayscale(100%);" width="260" height="260">    
                    <center>
                        <h2>&nbsp;<img src="file:///${__dirname.replace(/\\/g,"/")}/template/ipn-logo.png" style="position:absolute;" width="30" height="45">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Instituto Politécnico Nacional&nbsp;</h2>
                        <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Escuela Superior de Medicina</h3>
                    </center>
                    <br>
                        <img src="file:///${__dirname.replace(/\\/g,"/")}/template/2020.png" width="25" height="75" style="margin-left:12%; opacity:.5;">
                        <img src="file:///${__dirname.replace(/\\/g,"/")}/qrCodes/${i}.png" width="150" height="150">
                    <center>
                    <h1>${number}</h1>
                    <br>
                    </center>
                </td>
            </tr>
            </table>
        </body>
        </html>
        `;

        b1.stop();

        var saving = ora(
            {text: 'Generando PDF'//,
                //spinner: {
                    //frames: [,],
                    //interval: 300,
                //}
            });

        saving.start();

        //Generamos el PDF
        pdf.create(html, options).toFile('./qrs.pdf', function(err, res) {
            if (err) return console.log(err);
            saving.stop();
            ora("Se ha guardado el PDF con los QR").succeed();
        });

    }
    //Insertamos normal el QR
    else{
        html+=`
        <td style=" background-color: ${color}; width:6.9cm; height:6.91cm;">
        <img src="file:///${__dirname.replace(/\\/g,"/")}/template/esm.png" style="opacity: 0.03; position: absolute; filter: grayscale(100%);" width="260" height="260">
            <center>
                <h2>&nbsp;<img src="file:///${__dirname.replace(/\\/g,"/")}/template/ipn-logo.png" style="position:absolute;" width="30" height="45">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Instituto Politécnico Nacional&nbsp;</h2>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Escuela Superior de Medicina</h3>
            </center>
            <br>
                <img src="file:///${__dirname.replace(/\\/g,"/")}/template/2020.png" width="25" height="75" style="margin-left:12%; opacity:.5;">
                <img src="file:///${__dirname.replace(/\\/g,"/")}/qrCodes/${i}.png" width="150" height="150">
            <center>
            <h1>${number}</h1>
            <br>
            </center>
        </td>
        `;
    }
    
}