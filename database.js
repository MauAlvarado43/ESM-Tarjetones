const mysql = require("mysql");

let connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'n0m3l0',
	database : 'park'
});

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