const _colors = require("chalk");
const cliProgress = require('cli-progress');
const ora = require('ora');

var b1 = new cliProgress.SingleBar({
    format: _colors.red("Generando QR's |") + _colors.blue('{bar}') + "| {percentage}% | {value}/{total} | Faltan aproximadamente {eta} s",
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    clearOnComplete: true,
    hideCursor: true
});

b1.start(1600, 0,{
    speed:"N/A"
});

let json = [];

for(var i = 1; i <= 800; i++){

    let sign = require("./cipher").sign(i+"");

    json.push({
        id:i,
        sign:sign.substring(0,30)
    });  

    b1.increment();

    var qr = require('qr-image-color');
    var png_string = qr.image(`${require('./database').ip}/readQR?abc=${i}&sign=${sign}`, { type: 'png', color: "white",size:7, transparent: true });
    
    png_string.pipe(require('fs').createWriteStream(`./qrCodes/${i}.png`)).on("finish",()=>{
        b1.increment();
        if(b1.value==1600){

            b1.stop();

            ora(("Se han generado todos lor QR")).succeed();

            require("fs").writeFileSync("./keys/signs.json",JSON.stringify(json).replace(/\}\,/g,"},\n"),(err)=>{
                if(err){
                    console.trace("Ha ocurrido un error en la generación");
                }
            });
        }
    });

}

