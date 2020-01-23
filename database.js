const mysql = require("mysql");
const ip = "http://192.168.100.48:3000";
exports.ip = ip;


let connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'n0m3l0',
	database : 'park'
});

/*connection.query(`LOAD DATA LOCAL INFILE 'D:/Bátiz/SERVICIO SOCIAL/Proyectos/ESM-tarjetones/tarjetones_new/db/baseEstacionamiento.csv' INTO TABLE empleado CHARACTER SET latin1 FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (apat_emp,
    amat_emp,nom_emp,num_emp,tar_emp,rfc_emp,fun_emp,est_emp,turno,dep_emp,ext_emp,cel_emp,email);`,(err)=>{
    if(err){console.log(err);}
});*/


function getActualDate(){
    let date = new Date();
    return (date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
}

exports.login = function(user,pass){
    try{
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM empleado WHERE num_emp = ?",[user],(err,results,fields)=>{
                if(err){
                    console.log(err);
                    resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                }
                if(results.length == 1){
                    if(results[0].rfc_emp.trim().substring(0,results[0].rfc_emp.trim().length-3) == pass.trim()){
                        resolve({error:[],message:["Iniciando sesión"],status:1});
                    }else{
                        resolve({error:["La contraseña es incorrecta"],message:[]});
                    }
                }
                else{
                    resolve({error:["El usuario no existe"],message:[]});
                }

            });
        });
    }catch(err){console.log(err);}
};

exports.getEmployeeByNumber = function(num_emp){
    try{
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM empleado WHERE num_emp = ?",[num_emp],(err,results,fields)=>{
                if(err){
                    console.log(err);
                    resolve(null);
                }
                resolve(results);
            });
        });
    }catch(err){console.log(err);}
};

exports.addEmployee = function(data){
    try{
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM empleado WHERE num_emp = ?",data[0],(err,results,fields)=>{
                if(err){
                    console.log(err);
                    resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                }
                if(results.length!=0){
                    resolve({error:["El número de empleado ya está en uso"],message:[]});
                }
                else{
                    connection.query("INSERT INTO empleado (num_emp,nom_emp,apat_emp,amat_emp,rfc_emp,tar_emp,fun_emp,turno,dep_emp,email,cel_emp,ext_emp,est_emp) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",data,(err2)=>{
                        if(err2){
                            console.log(err2);
                            resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                        }
                        else{
                            resolve({error:[],message:["Empleado registrado correctamente"]});
                        }
                    });
                }
            });
        });
    }catch(err){console.log(err);}
};

exports.getEmployees = function(){
    try{
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM empleado",(err,results,fields)=>{
                if(err){
                    console.log(err);
                    resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                }
                resolve(results);
            });
        });
    }catch(err){console.log(err);}
};

exports.getEmployeesSearched = function(num_emp){
    try{
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM empleado WHERE num_emp LIKE ?",[num_emp],(err,results,fields)=>{
                if(err){
                    console.log(err);
                    resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                }
                resolve(results);
            });
        });
    }catch(err){console.log(err);}
};

exports.editEmployee = function(num,data){
    try{
        return new Promise((resolve,reject)=>{
            connection.query("UPDATE empleado SET ? WHERE num_emp = ?",[data,num],(err,results,fields)=>{
                if(err){
                    console.log(err);
                    resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                }
                resolve({error:[],message:["Empleado modificado correctamente"]});
            });
        });
    }catch(err){console.log(err);}
};

exports.editProfile = function(num,data){
    try{
        return new Promise((resolve,reject)=>{
            connection.query("UPDATE empleado SET ? WHERE num_emp = ?",[data,num],(err,results,fields)=>{
                if(err){
                    console.log(err);
                    resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                }
                resolve({error:[],message:["Datos modificados correctamente"]});
            });
        });
    }catch(err){console.log(err);}
}

exports.deleteEmployee = function(num){
    try{
        return new Promise((resolve,reject)=>{
            connection.query("SELECT id_emp,id_reg,id_car FROM registro NATURAL JOIN empleado WHERE num_emp",[num],(err,results,fields)=>{
                if(err){
                    console.log(err);
                    resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                }
                results.forEach(element => {
                    connection.query("DELETE FROM registro WHERE id_reg = ?",[element.id_reg]);
                    connection.query("DELETE FROM carro WHERE id_car = ?",[element.id_car]);
                });
                connection.query("DELETE FROM empleado WHERE num_emp = ?",[num]);
                resolve({error:[],message:["Empleado eliminado correctamente"]});
            });
        });
    }catch(err){console.log(err);}
};

exports.getCars = function(){
    try{
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM registro NATURAL JOIN empleado NATURAL JOIN carro NATURAL JOIN disponibles",(err,results,fields)=>{
                if(err){
                    console.log(err);
                    resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                }
                resolve(results);
            });
        });
    }catch(err){console.log(err);}
};

exports.getCarsSearched = function(num_emp){
    try{
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM registro NATURAL JOIN empleado NATURAL JOIN carro NATURAL JOIN disponibles WHERE num_emp LIKE ?",[num_emp],(err,results,fields)=>{
                if(err){
                    console.log(err);
                    resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                }
                resolve(results);
            });
        });
    }catch(err){console.log(err);}
};

exports.addCar = function(num_emp,brand,sbrand,color,plate){
    try{
        return new Promise((resolve,reject)=>{

            let date = getActualDate();

            connection.query("INSERT INTO carro (placa_car,marca_car,smarca_car,color) VALUES (?,?,?,?)",[plate,brand,sbrand,color],(err,results,fields)=>{
                if(err){
                    console.log(err);
                    resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                }
                connection.query("INSERT INTO registro (id_car,id_emp,fecha,id_dis) values ("+results.insertId+",(SELECT id_emp FROM empleado WHERE num_emp = ?),'"+date+"',(SELECT id_dis FROM disponibles WHERE used = 0 LIMIT 1))",[num_emp],(err2,results2,fields2)=>{
                    
                    if(err2){
                        console.log(err2);
                        resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                    }
                    
                    connection.query("SELECT * FROM empleado WHERE num_emp = ?",[num_emp],(err3,results3,fields3)=>{
                        
                        if(err3){
                            console.log(err3);
                            resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                        }

                        connection.query("UPDATE disponibles SET used = 1 WHERE id_dis = (SELECT id_dis FROM registro WHERE id_Reg = ?)",[results2.insertId],(err4,results4,fields4)=>{
                            if(err4){
                                console.log(err4);
                                resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                            }

                            if(results3.length == 0){
                                resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                            }
                            else{
                                //var QRCode = require('qrcode');
                                //QRCode.toFile(`./qrCodes/${results3[0].apat_emp}_${results3[0].amat_emp}_${results3[0].nom_emp}_${date.replace(/\:/g,"_").replace(" ",",")}.png`,`${ip}/readQR?abc=${results2.insertId}`,[{ data: [253,254,255], mode: 'byte' }]);
                                resolve({error:[],message:["Carro registrado correctamente"]});
                            }

                        });
                    });
                });
            });
        });
    }catch(err){console.log(err);}
};

exports.deleteCar = function(id_car,id_reg){
    try{
        return new Promise((resolve,reject)=>{

            connection.query("SELECT * FROM registro WHERE id_reg = ?",[id_reg],(err3,res3,fields3)=>{

                if(err3){
                    console.log(err3);
                    resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                }

                connection.query("DELETE FROM registro WHERE id_reg = ?",[id_reg],(err,results,fields)=>{
                    if(err){
                        console.log(err);
                        resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                    }
                    connection.query("DELETE FROM carro WHERE id_car = ?",[id_car],(err2,results2,fields2)=>{
                        if(err2){
                            console.log(err2);
                            resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                        }
                        connection.query("DELETE FROM disponibles WHERE id_dis = ?",[res3[0].id_dis],(err4,res4,fields4)=>{
                            if(err4){
                                console.log(err4);
                                resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                            }
                        });
                        resolve({error:[],message:["Carro Eliminado correctamente"]});
                    });
                });
            });

        });
    }catch(err){console.log(err);
    }
};

exports.getCarsByNum = function(num_emp){
    try{
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM registro NATURAL JOIN empleado NATURAL JOIN carro NATURAL JOIN disponibles WHERE num_emp = ?",[num_emp],(err,results,fields)=>{
                if(err){
                    console.log(err);
                    resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                }
                resolve(results);
            });
        });
    }catch(err){console.log(err);}
};

exports.deleteMyCar = function(id_reg,id_car){
    try{
        return new Promise((resolve,reject)=>{

            connection.query("SELECT * FROM registro NATURAL JOIN empleado WHERE id_reg = ?",[id_reg],(err3,res3,fls3)=>{
                try{
                    connection.query("DELETE FROM registro WHERE id_reg = ?",[id_reg],(err)=>{
                        if(err){
                            console.log(err);
                            resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                        }
                        connection.query("DELETE FROM disponibles WHERE id_dis = ?",[res3[0].id_dis],(err4,res4,fields4)=>{
                            require("fs").unlink(`./qrCodes/${res3[0].id_dis}.png`);
                            let json = JSON.parse(require("fs").readFileSync("./keys/signs.json"));
                            json.splice((res3[0].id_dis-1),1);
                            require("fs").writeFile("./keys/signs.json",JSON.stringify(json),(err)=>{
                                if(err){console.log(err);}
                            });
                            if(err4){
                                console.log(err4);
                                resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                            }
                        });
                        connection.query("DELETE FROM carro WHERE id_car = ?",[id_car],(err2)=>{
                            if(err2){
                                console.log(err2);
                                resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                            }
                            resolve({error:[],message:["Carro Eliminado correctamente"]});
                        });
                    });
                }catch(err5){console.log(err5);}
            });
        });
    }catch(err){console.log(err);}
};

exports.updateQR = function(id_reg){
    try{
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM registro WHERE id_reg = ?",[id_reg],(err,results,fields)=>{
                if(err){
                    console.log(err);
                    resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                }

                let id_dis = results[0].id_dis;

                connection.query("UPDATE registro set id_dis = (SELECT id_dis FROM disponibles WHERE used = 0 LIMIT 1) WHERE id_reg = ?",[id_reg],(err2,results2,fields2)=>{
                    if(err2){
                        console.log(err2);
                        resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                    }
                    connection.query("UPDATE disponibles set used = 1 WHERE id_dis = (SELECT id_dis FROM registro WHERE id_reg = ?)",[id_reg]);
                    connection.query("DELETE FROM disponibles WHERE id_dis = ?",[id_dis]);
                    resolve({error:[],message:["El QR se ha modificado correctamente"]});
                });
                
            });
            
        });
    }catch(err){console.log(err);}
};

exports.readQR = function(id_reg){
    try{
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM registro NATURAL JOIN empleado NATURAL JOIN carro WHERE id_reg = ? ",[id_reg],(err,res,fields)=>{
                if(err){
                    console.log(err);
                }
                resolve(res);
            });
        });
    }catch(err){console.log(err);}
};

exports.getAmountQR = function(){
    try{
        return new Promise((resolve,reject)=>{
            connection.query("SELECT COUNT(*) AS amount FROM disponibles WHERE used = 0",(err,res,fields)=>{
                if(err){
                    console.log(err);
                }
                resolve(res[0].amount);
            });
        });
    }catch(err){console.log(err);}
};

exports.increaseAmountQR = function(){
    try{
        return new Promise((resolve,reject)=>{
            connection.query("SELECT MAX(id_dis) as maximus FROM disponibles",(err,res,fields)=>{
                if(err){
                    console.log(err);
                    resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                }
                for(var i = res[0].maximus+1; i <= (res[0].maximus+30); i++){
                    connection.query("INSERT INTO disponibles (id_dis,used) VALUES ("+i+",0)",(err2,res2,fields2)=>{
                        if(err2){
                            console.log(err2);
                            resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                        }
                    });
                    var qr = require('qr-image-color');
                    var png_string = qr.image(`${require('./database').ip}/readQR?abc=${i}`, { type: 'png', color: "white",size:7, transparent: true });
                    png_string.pipe(require('fs').createWriteStream(`./qrCodes/${i}.png`));
                    if(i==(res[0].maximus+30)){
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

                                        for(var j = res[0].maximus+1; j <= res[0].maximus+30; j++){
                                            let color = "";
                                            let number = "";
                                        
                                            if(j<=res[0].maximus+5){color="#75125C";}
                                            else if(j<=res[0].maximus+10){color="#005B96";}
                                            else if(j<=res[0].maximus+15){color="#BB1E1E";}
                                            else if(j<=res[0].maximus+20){color="#00A86B";}
                                            else if(j<=res[0].maximus+25){color="#E1A02C";}
                                            else if(j<=res[0].maximus+30){color="#6C5834";}
                                        
                                            if(j<10){
                                                number="00"+j+"";
                                            }
                                            else if(j<100){
                                                number="0"+j+"";
                                            }
                                            else{
                                                number = j+"";
                                            }
                                            if(j==res[0].maximus+1){
                                                html+=`
                                                <table border="1">
                                                    <tr>
                                                    <td style=" background-color: ${color};">
                                                        <center>
                                                            <h2>&nbsp;<img src="file:///${__dirname.replace(/\\/g,"/")}/template/ipn-logo.png" width="30" height="45">&nbsp;Instituto Politécnico Nacional&nbsp;&nbsp;</h2>
                                                            <h3>&nbsp;&nbsp;&nbsp;&nbsp;Escuela Superior de Medicina</h3>
                                                            <img src="file:///${__dirname.replace(/\\/g,"/")}/qrCodes/${j}.png" width="150" height="150">
                                                            <h1>${number}</h1>
                                                            <br>
                                                        </center>
                                                    </td>
                                                `;
                                            }
                                            else if(j==res[0].maximus+18){
                                                html+=`
                                                        <td style=" background-color: ${color};">
                                                            <center>
                                                                <h2>&nbsp;<img src="file:///${__dirname.replace(/\\/g,"/")}/template/ipn-logo.png" width="30" height="45">&nbsp;Instituto Politécnico Nacional&nbsp;&nbsp;</h2>
                                                                <h3>&nbsp;&nbsp;&nbsp;&nbsp;Escuela Superior de Medicina</h3>
                                                                <img src="file:///${__dirname.replace(/\\/g,"/")}/qrCodes/${j}.png" width="150" height="150">
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
                                            else if(j==res[0].maximus+6 || j==res[0].maximus+12 || j==res[0].maximus+24){
                                                html+=`
                                                        <td style=" background-color: ${color};">
                                                            <center>
                                                                <h2>&nbsp;<img src="file:///${__dirname.replace(/\\/g,"/")}/template/ipn-logo.png" width="30" height="45">&nbsp;Instituto Politécnico Nacional&nbsp;&nbsp;</h2>
                                                                <h3>&nbsp;&nbsp;&nbsp;&nbsp;Escuela Superior de Medicina</h3>
                                                                <img src="file:///${__dirname.replace(/\\/g,"/")}/qrCodes/${j}.png" width="150" height="150">
                                                                <h1>${number}</h1>
                                                                <br>
                                                            </center>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                `;
                                            }
                                            else if(j==i){
                                                html+=`
                                                        <td style=" background-color: ${color};">
                                                            <center>
                                                                <h2>&nbsp;<img src="file:///${__dirname.replace(/\\/g,"/")}/template/ipn-logo.png" width="30" height="45">&nbsp;Instituto Politécnico Nacional&nbsp;&nbsp;</h2>
                                                                <h3>&nbsp;&nbsp;&nbsp;&nbsp;Escuela Superior de Medicina</h3>
                                                                <img src="file:///${__dirname.replace(/\\/g,"/")}/qrCodes/${j}.png" width="150" height="150">
                                                                <h1>${number}</h1>
                                                                <br>
                                                            </center>
                                                        </td>
                                                    </tr>
                                                    </table>
                                                </body>
                                                </html>
                                                `;

                                                pdf.create(html, options).toFile('./qrs_2.pdf', function(err, reso) {
                                                    if (err) {console.log(err);}
                                                    resolve({error:[],message:[""]});
                                                });
                                        
                                            }
                                            else{
                                                html+=`
                                                <td style=" background-color: ${color};">
                                                    <center>
                                                        <h2>&nbsp;<img src="file:///${__dirname.replace(/\\/g,"/")}/template/ipn-logo.png" width="30" height="45">&nbsp;Instituto Politécnico Nacional&nbsp;&nbsp;</h2>
                                                        <h3>&nbsp;&nbsp;&nbsp;&nbsp;Escuela Superior de Medicina</h3>
                                                        <img src="file:///${__dirname.replace(/\\/g,"/")}/qrCodes/${j}.png" width="150" height="150">
                                                        <h1>${number}</h1>
                                                        <br>
                                                    </center>
                                                </td>
                                                `;
                                            }
                                        }

                    }
                }
            });
        });
    }catch(err){console.log(err);}
};