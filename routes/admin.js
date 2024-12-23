const express = require("express");
const router = express.Router();

const database = require("../database");

//Función para agregar un empleado

router.post("/addEmployee",(req,res)=>{

    if(req.session.level=="admin"){

    let name  = req.body.name;
    let appat = req.body.appat;
    let apmat = req.body.apmat;
    let rfc   = req.body.rfc;
    let num   = req.body.num;
    let tar   = req.body.tar;
    let nom   = req.body.nom;
    let turn  = req.body.turn;
    let ads   = req.body.ads;
    let email = req.body.email;
    let phone = req.body.phone;
    let ext   = req.body.ext;
    let est   = req.body.est;

    //Recabamos todos los datos y los validamos

    let array = [num,name,appat,apmat,rfc,tar,nom,turn,ads,email,phone,ext,est];
    let bool = true;

    array.forEach(element => {
        if(element == "" || element == null || element == undefined || element=="Turno" || element == "Estatus" || element == "Nombramiento" || element=="Departamento de Adscripción"){
            bool = false;
        }
    });

    if(bool){
        //Si los datos son correctos, entonces lo guardamos en la base de datos
        database.addEmployee([num,name,appat,apmat,rfc,tar,nom,turn,ads,email,phone,ext,est]).then((resolve)=>{
            res.send(resolve);
        });
    }
    else{
        res.send({error:["Revise los campos y vuelva a intentarlo"],message:[]});
    }

    }else{
        res.send({error:[],message:[]});
    }
    
});

//Función para editar un empleado
router.post("/editEmployees",(req,res)=>{
    if(req.session.level=="admin"){

        let name  = req.body.name;
        let appat = req.body.appat;
        let apmat = req.body.apmat;
        let rfc   = req.body.rfc;
        let num   = req.body.num;
        let tar   = req.body.tar;
        let nom   = req.body.nom;
        let turn  = req.body.turn;
        let ads   = req.body.ads;
        let email = req.body.email;
        let phone = req.body.phone;
        let ext   = req.body.ext;
        let est   = req.body.est;

        //Recabamos todos los datos y los validamos
    
        let array = [num,name,appat,apmat,rfc,tar,nom,turn,ads,email,phone,ext,est];
        let bool = true;
    
        array.forEach(element => {
            if(element == "" || element == null || element == undefined || element=="Turno" || element == "Estatus" || element == "Nombramiento" || element=="Departamento de Adscripción"){
                bool = false;
            }
        });
    
        if(bool){

            let data = {
                nom_emp:name,
                apat_emp: appat,
                amat_Emp: apmat,
                rfc_emp: rfc,
                tar_emp: tar,
                fun_emp: nom,
                turno: turn,
                dep_emp: ads,
                email: email,
                cel_emp: phone,
                ext_emp: ext,
                est_emp: est
            };

            //Le pasamos a la base de datos la información en un JSON para indicar los campos modificados

            database.editEmployee(num,data).then((resolve)=>{
                res.send(resolve);
            });

        }
        else{
            res.send({error:["Revise los campos y vuelva a intentarlo"],message:[]});
        }
    
        }else{
            res.send({error:[],message:[]});
        }
});

//Función para eliminar un empleado
router.post("/deleteEmployees",(req,res)=>{
    if(req.session.level=="admin"){
        let num = req.body.num;
        if(num == "" || num == null || num == undefined){
            res.send({error:["Los parámetros no son correctos"],message:[]});
        }
        else{
            //Mandamos el número de empleado para borrarlo
            database.deleteEmployee(num).then((resolve)=>{
                res.send(resolve);
            });
        }    
    }
    else{
        res.send({error:[],message:[]});
    }
});

//Función para obtener a todos los empleados
router.post("/getEmployees",(req,res)=>{
    if(req.session.level=="admin"){
        database.getEmployees().then((resolve)=>{

            //Obtenemos los registros y a su vez le damos css

            let html = `<table class="table table-sm table-hover table-bordered" style="background-color: white;">
                            <tr>
                                <th style="text-align: center; vertical-align: middle;">Nombre</th>
                                <th style="text-align: center; vertical-align: middle">Número</th>
                                <th style="text-align: center; vertical-align: middle">Tarjeta</th>
                                <th style="text-align: center; vertical-align: middle">RFC</th>
                                <th style="text-align: center; vertical-align: middle">Departamento</th>
                                <th style="text-align: center; vertical-align: middle">Función</th>
                                <th style="text-align: center; vertical-align: middle">Estado</th>
                                <th style="text-align: center; vertical-align: middle">Celular</th>
                                <th style="text-align: center; vertical-align: middle">Extensión</th>
                                <th style="text-align: center; vertical-align: middle">Email</th>
                                <th style="text-align: center; vertical-align: middle">Turno</th>
                                <th style="text-align: center; vertical-align: middle">Modificar</th>
                                <th style="text-align: center; vertical-align: middle">Eliminar</th>
                            </tr>
            `;

            resolve.forEach(element => {
                html += `<tr>
                            <td style="text-align: center; vertical-align: middle">${element.apat_emp+" "+element.amat_emp+" "+element.nom_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.num_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.tar_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.rfc_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.dep_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.fun_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.est_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.cel_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.ext_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.email}</td>
                            <td style="text-align: center; vertical-align: middle">${element.turno}</td>
                            <td style="text-align: center; vertical-align: middle"><a class="btn btn-secondary btn-lg" style="color: white; cursor: pointer;" onclick="moveEmployee('${element.apat_emp}','${element.amat_emp}','${element.nom_emp}',${element.num_emp},${element.tar_emp},'${element.rfc_emp}','${element.dep_emp}','${element.fun_emp}','${element.est_emp}','${element.cel_emp}','${element.ext_emp}','${element.email}','${element.turno}');">Modificar</a></td>
                            <td style="text-align: center; vertical-align: middle"><a class="btn btn-secondary btn-lg" style="color: white; cursor: pointer;" onclick="deleteEmployee(${element.num_emp});">Eliminar</a></td>
                        </tr>`;
            });

            html += "</table>";

            if(resolve.length == 0){
                html = `<div class="col-md-4 mx-auto">
                            <div class="card mx-auto">
                                <div class="card-body">
                                <!--<h1>Hello </h1>-->
                                <p class="lead">No hay empleados aun!</p>
                                <a href="registrarUsuario.html" class="btn btn-success btn-block">Añade uno!</a>
                            </div>
                        </div>`;
            }

            res.send({error:[],message:[html]});

        });
    }
    else{
        res.send({error:[],message:[]});
    }
});

//Funcion para buscar alos empleados
router.post("/getEmployeesSearched",(req,res)=>{
    if(req.session.level=="admin"){
        database.getEmployeesSearched(req.body.n).then((resolve)=>{

            //Obtenemos los registros y a su vez le damos css

            let html = `<table class="table table-sm table-hover table-bordered" style="background-color: white;">
                            <tr>
                                <th style="text-align: center; vertical-align: middle;">Nombre</th>
                                <th style="text-align: center; vertical-align: middle">Número</th>
                                <th style="text-align: center; vertical-align: middle">Tarjeta</th>
                                <th style="text-align: center; vertical-align: middle">RFC</th>
                                <th style="text-align: center; vertical-align: middle">Departamento</th>
                                <th style="text-align: center; vertical-align: middle">Función</th>
                                <th style="text-align: center; vertical-align: middle">Estado</th>
                                <th style="text-align: center; vertical-align: middle">Celular</th>
                                <th style="text-align: center; vertical-align: middle">Extensión</th>
                                <th style="text-align: center; vertical-align: middle">Email</th>
                                <th style="text-align: center; vertical-align: middle">Turno</th>
                                <th style="text-align: center; vertical-align: middle">Modificar</th>
                                <th style="text-align: center; vertical-align: middle">Eliminar</th>
                            </tr>
            `;

            resolve.forEach(element => {
                html += `<tr>
                            <td style="text-align: center; vertical-align: middle">${element.apat_emp+" "+element.amat_emp+" "+element.nom_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.num_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.tar_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.rfc_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.dep_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.fun_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.est_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.cel_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.ext_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.email}</td>
                            <td style="text-align: center; vertical-align: middle">${element.turno}</td>
                            <td style="text-align: center; vertical-align: middle"><a class="btn btn-secondary btn-lg" style="color: white; cursor: pointer;" onclick="moveEmployee('${element.apat_emp}','${element.amat_emp}','${element.nom_emp}',${element.num_emp},${element.tar_emp},'${element.rfc_emp}','${element.dep_emp}','${element.fun_emp}','${element.est_emp}','${element.cel_emp}','${element.ext_emp}','${element.email}','${element.turno}');">Modificar</a></td>
                            <td style="text-align: center; vertical-align: middle"><a class="btn btn-secondary btn-lg" style="color: white; cursor: pointer;" onclick="deleteEmployee(${element.num_emp});">Eliminar</a></td>
                        </tr>`;
            });

            html += "</table>";

            if(resolve.length == 0){
                html = `<div class="col-md-4 mx-auto">
                            <div class="card mx-auto">
                                <div class="card-body">
                                <!--<h1>Hello </h1>-->
                                <p class="lead">No hay un empleado con ese número!</p>
                            </div>
                        </div>`;
            }

            res.send({error:[],message:[html]});

        });
    }
    else{
        res.send({error:[],message:[]});
    }
});

//Función para obtener un vehículo buscado
router.post("/getCarsSearched",(req,res)=>{

    let num_emp = req.body.n;

    if(req.session.level=="admin"){
        database.getCarsSearched(num_emp).then((resolve)=>{

            //Obtenemos los registros y a su vez le damos css

            let html = `<table class="table table-sm table-hover table-bordered" style="background-color: white;">
                            <tr>
                                <th style="text-align: center; vertical-align: middle;">Nombre</th>
                                <th style="text-align: center; vertical-align: middle">Número</th>
                                <th style="text-align: center; vertical-align: middle">Departamento</th>
                                <th style="text-align: center; vertical-align: middle">Celular</th>
                                <th style="text-align: center; vertical-align: middle">Turno</th>
                                <th style="text-align: center; vertical-align: middle">Placa</th>
                                <th style="text-align: center; vertical-align: middle">Marca</th>
                                <th style="text-align: center; vertical-align: middle">SubMarca</th>
                                <th style="text-align: center; vertical-align: middle">Color</th>
                                <th style="text-align: center; vertical-align: middle"># QR</th>
                                <th style="text-align: center; vertical-align: middle">Reasignar QR</th>
                                <th style="text-align: center; vertical-align: middle">Eliminar</th>
                            </tr>
            `;
            resolve.forEach(element => {
                html += `<tr>
                            <td style="text-align: center; vertical-align: middle">${element.apat_emp+" "+element.amat_emp+" "+element.nom_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.num_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.dep_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.cel_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.turno}</td>
                            <td style="text-align: center; vertical-align: middle">${element.placa_car}</td>
                            <td style="text-align: center; vertical-align: middle">${element.marca_car}</td>
                            <td style="text-align: center; vertical-align: middle">${element.smarca_car}</td>
                            <td style="text-align: center; vertical-align: middle">${element.color}</td>
                            <td style="text-align: center; vertical-align: middle">${element.id_dis}</td>
                            <td style="text-align: center; vertical-align: middle"><a class="btn btn-secondary btn-lg" style="color: white; cursor: pointer;"
                             onclick="updateQR(${element.id_reg});">Reasignar QR</a></td>
                            <td style="text-align: center; vertical-align: middle"><a class="btn btn-secondary btn-lg" style="color: white; cursor: pointer;"
                             onclick="deleteCar(${element.id_car},${element.id_reg});">Eliminar</a></td>
                        </tr>`;
            });

            html += "</table>";

            if(resolve.length == 0){
                html = `<div class="col-md-4 mx-auto">
                            <div class="card mx-auto">
                                <div class="card-body">
                                <!--<h1>Hello </h1>-->
                                <p class="lead">No hay carros registrados por ese empleado!</p>
                            </div>
                        </div>`;
            }

            res.send({error:[],message:[html]});
        });
    }
    else{
        res.send({error:[],message:[]});
    }
});

//Función para obtener todos los vehículos
router.post("/getCars",(req,res)=>{
    if(req.session.level=="admin"){
        database.getCars().then((resolve)=>{

            //Obtenemos los registros y a su vez le damos css

            let html = `<table class="table table-sm table-hover table-bordered" style="background-color: white;">
                            <tr>
                                <th style="text-align: center; vertical-align: middle;">Nombre</th>
                                <th style="text-align: center; vertical-align: middle">Número</th>
                                <th style="text-align: center; vertical-align: middle">Departamento</th>
                                <th style="text-align: center; vertical-align: middle">Celular</th>
                                <th style="text-align: center; vertical-align: middle">Turno</th>
                                <th style="text-align: center; vertical-align: middle">Placa</th>
                                <th style="text-align: center; vertical-align: middle">Marca</th>
                                <th style="text-align: center; vertical-align: middle">SubMarca</th>
                                <th style="text-align: center; vertical-align: middle">Color</th>
                                <th style="text-align: center; vertical-align: middle"># QR</th>
                                <th style="text-align: center; vertical-align: middle">Reasignar QR</th>
                                <th style="text-align: center; vertical-align: middle">Eliminar</th>
                            </tr>
            `;
            resolve.forEach(element => {
                html += `<tr>
                            <td style="text-align: center; vertical-align: middle">${element.apat_emp+" "+element.amat_emp+" "+element.nom_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.num_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.dep_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.cel_emp}</td>
                            <td style="text-align: center; vertical-align: middle">${element.turno}</td>
                            <td style="text-align: center; vertical-align: middle">${element.placa_car}</td>
                            <td style="text-align: center; vertical-align: middle">${element.marca_car}</td>
                            <td style="text-align: center; vertical-align: middle">${element.smarca_car}</td>
                            <td style="text-align: center; vertical-align: middle">${element.color}</td>
                            <td style="text-align: center; vertical-align: middle">${element.id_dis}</td>
                            <td style="text-align: center; vertical-align: middle"><a class="btn btn-secondary btn-lg" style="color: white; cursor: pointer;"
                             onclick="updateQR(${element.id_reg});">Reasignar QR</a></td>
                            <td style="text-align: center; vertical-align: middle"><a class="btn btn-secondary btn-lg" style="color: white; cursor: pointer;"
                             onclick="deleteCar(${element.id_car},${element.id_reg});">Eliminar</a></td>
                        </tr>`;
            });

            html += "</table>";

            if(resolve.length == 0){
                html = `<div class="col-md-4 mx-auto">
                            <div class="card mx-auto">
                                <div class="card-body">
                                <!--<h1>Hello </h1>-->
                                <p class="lead">No hay Vehículos aun!</p>
                            </div>
                        </div>`;
            }

            res.send({error:[],message:[html]});
        });
    }
    else{
        res.send({error:[],message:[]});
    }
});

//Función para eliminar un vehículo a través del registro
router.post("/deleteCar",(req,res)=>{

    if(req.session.level=="admin"){
        
        let id_car = req.body.n;
        let id_reg = req.body.m;

        if(id_car == "" || id_car == null || id_car == undefined){
            res.send({error:["Los parámetros no son correctos"],message:[]});
        }
        else if(id_reg == "" || id_reg == null || id_reg == undefined){
            res.send({error:["Los parámetros no son correctos"],message:[]});
        }
        else{
            database.deleteCar(id_car,id_reg).then((resolve)=>{
                res.send(resolve);
            });
        }

    }
    else{
        res.send({error:[],message:[]});
    }

});

//SIN USAR
/*
router.post("/updateQR",(req,res)=>{
    if(req.session.level=="admin"){
        
        let id_reg = req.body.r;
        database.updateQR(id_reg).then((resolve)=>{
            res.send(resolve);
        });

    }
    else{
        res.send({error:[],message:[]});
    }
});

router.post("/generateQR",(req,res)=>{

    let id_car = req.body.m;
    let id_reg = req.body.n;
    let num_emp = req.body.o;

    var QRCode = require('qrcode');

    //${results3[0].apat_emp}_${results3[0].amat_emp}_${results3[0].nom_emp}_${date.replace(/\:/g,"_").replace(" ",",")}.png`

    database.readQR(num_emp,id_reg,id_car).then((resolve)=>{
        QRCode.toDataURL(`${database.ip}/readQR?xyz=${num_emp}&abc=${id_reg}&mno=${id_car}`, function (err, url) {
            if(err){console.log(err);}
            res.send({
                url:url,
                name:resolve[0].apat_emp+"_"+resolve[0].amat_emp+"_"+resolve[0].nom_emp+"_"+resolve[0].fecha.replace(/\:/g,"_").replace(" ",",")+".png"
            });
        });
    });

});
*/

//Función para obtener la cantidad de QR's disponibles
router.post("/getAmounQR",(req,res)=>{
    if(req.session.level=="admin"){
        
        database.getAmountQR().then((resolve)=>{
            res.send({error:[],message:[resolve]});
        });

    }
    else{
        res.send({error:[],message:[]});
    }
});

//Generar otros 30 códigos QR
router.post("/increaseAmounQR",(req,res)=>{
    if(req.session.level=="admin"){    
        database.increaseAmountQR().then((resolve)=>{
            res.send(resolve);
        });
    }
    else{
        res.send({error:[],message:[]});
    }
});

//Descargar el pdf con los 800 QR's
router.get("/downloadPDF1",(req,res)=>{
    if(req.session.level=="admin"){    
        res.download("qrs.pdf");
    }
    else{
        res.send({error:[],message:[]});
    }   
});

//Descargar el pdf con los 30 QR's generados
router.get("/downloadPDF2",(req,res)=>{
    if(req.session.level=="admin"){    
        res.download("qrs_2.pdf");
    }
    else{
        res.send({error:[],message:[]});
    }   
});

//Obtener el nombre del empleado en el registro de vehículos para confirmar su identidad
router.post("/checkEmployee",(req,res)=>{

    let num_emp = req.body.emp;

    if(req.session.level=="admin"){
        
        database.getEmployeeByNumber(num_emp).then((resolve)=>{
        
            if(resolve==null || resolve.length==0){
                res.send({error:[],message:[""]});
            }
            else{
                res.send({error:[],message:[resolve[0].apat_emp+" "+resolve[0].amat_emp+" "+" "+resolve[0].nom_emp]});
            }
        });

    }
    else{
        res.send({error:[],message:[]});
    }

});

module.exports = router;