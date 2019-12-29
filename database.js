const mysql = require("mysql");
const ip = "http://192.168.100.48:3000";
exports.ip = ip;


let connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'n0m3l0',
	database : 'park'
});

/*
connection.query(`LOAD DATA LOCAL INFILE 'D:/tarjetones_new/db/baseEstacionamiento.csv' INTO TABLE empleado CHARACTER SET latin1 FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (apat_emp,
    amat_emp,nom_emp,num_emp,tar_emp,rfc_emp,fun_emp,est_emp,turno,dep_emp,ext_emp,cel_emp,email);`,(err)=>{
    if(err){console.log(err);}
});
*/

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
                    connection.query("SELECT * FROM empleado WHERE rfc_emp = ? AND num_emp = ?",[pass,user],(err2,results2,fields2)=>{
                        if(err2){
                            console.log(err2);
                            resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                        }
                        if(results2.length == 1){
                            resolve({error:[],message:["Iniciando sesión"],status:1});
                        }
                        else{
                            resolve({error:["La contraseña es incorrecta"],message:[]});
                        }
                    });
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
            connection.query("SELECT * FROM registro NATURAL JOIN empleado NATURAL JOIN carro",(err,results,fields)=>{
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
            connection.query("SELECT * FROM registro NATURAL JOIN empleado NATURAL JOIN carro WHERE num_emp LIKE ?",[num_emp],(err,results,fields)=>{
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
                connection.query("INSERT INTO registro (id_car,id_emp,fecha) values ("+results.insertId+",(SELECT id_emp FROM empleado WHERE num_emp = ?),'"+date+"')",[num_emp],(err2,results2,fields2)=>{
                    if(err2){
                        console.log(err2);
                        resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                    }
                    
                    connection.query("SELECT * FROM empleado WHERE num_emp = ?",[num_emp],(err3,results3,fields3)=>{
                        
                        if(err3){
                            console.log(err2);
                            resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                        }

                        if(results3.length == 0){
                            resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                        }
                        else{
                            var QRCode = require('qrcode');
                            QRCode.toFile(`./qrCodes/${results3[0].apat_emp}_${results3[0].amat_emp}_${results3[0].nom_emp}_${date.replace(/\:/g,"_").replace(" ",",")}.png`,`${ip}/readQR?xyz=${num_emp}&abc=${results2.insertId}&mno=${results.insertId}`,[{ data: [253,254,255], mode: 'byte' }]);
                            resolve({error:[],message:["Carro registrado correctamente"]});
                        }

                    });

                });
            });
        });
    }catch(err){console.log(err);}
};

exports.deleteCar = function(id_car,id_reg){
    try{
        return new Promise((resolve,reject)=>{
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
                    resolve({error:[],message:["Carro Eliminado correctamente"]});
                });
            });
        });
    }catch(err){console.log(err);
    }
};

exports.getCarsByNum = function(num_emp){
    try{
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM registro NATURAL JOIN empleado NATURAL JOIN carro WHERE num_emp = ?",[num_emp],(err,results,fields)=>{
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
                    require("fs").unlink(`./qrCodes/${res3[0].apat_emp}_${res3[0].amat_emp}_${res3[0].nom_emp}_${res3[0].fecha.replace(" ",",").replace(/\:/g,"_")}.png`,(err4)=>{
                        if(err4){console.log(err4);}
                    })
                }catch(err5){console.log(err5);}
            });

            connection.query("DELETE FROM registro WHERE id_reg = ?",[id_reg],(err)=>{
                if(err){
                    console.log(err);
                    resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                }
                connection.query("DELETE FROM carro WHERE id_car = ?",[id_car],(err2)=>{
                    if(err2){
                        console.log(err2);
                        resolve({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
                    }
                    resolve({error:[],message:["Carro Eliminado correctamente"]});
                });
            });
        });
    }catch(err){console.log(err);}
};

exports.readQR = function(num_emp,id_reg,id_car){
    try{
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM registro NATURAL JOIN empleado NATURAL JOIN carro WHERE num_emp = ? AND id_reg = ? AND id_car = ?",[num_emp,id_reg,id_car],(err,res,fields)=>{
                if(err){
                    console.log(err);
                }
                resolve(res);
            });
        });
    }catch(err){console.log(err);}
};