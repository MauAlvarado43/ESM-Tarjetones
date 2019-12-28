const express = require("express");
const router = express.Router();

const database = require("../database");

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

    let array = [num,name,appat,apmat,rfc,tar,nom,turn,ads,email,phone,ext,est];
    let bool = true;

    array.forEach(element => {
        if(element == "" || element == null || element == undefined || element=="Turno" || element == "Estatus" || element == "Nombramiento"){
            bool = false;
        }
    });

    if(bool){
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
    
        let array = [num,name,appat,apmat,rfc,tar,nom,turn,ads,email,phone,ext,est];
        let bool = true;
    
        array.forEach(element => {
            if(element == "" || element == null || element == undefined || element=="Turno" || element == "Estatus" || element == "Nombramiento"){
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

router.post("/deleteEmployees",(req,res)=>{
    if(req.session.level=="admin"){
        let num = req.body.num;
        if(num == "" || num == null || num == undefined){
            res.send({error:["Los parámetros no son correctos"],message:[]});
        }
        else{
            database.deleteEmployee(num).then((resolve)=>{
                res.send(resolve);
            });
        }    
    }
    else{
        res.send({error:[],message:[]});
    }
});

router.post("/getEmployees",(req,res)=>{
    if(req.session.level=="admin"){
        database.getEmployees().then((resolve)=>{

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
                            <td style="text-align: center; vertical-align: middle"><a class="btn btn-secondary btn-lg" style="color: white; cursor: pointer;" 
                            onclick="moveEmployee('${element.apat_emp}','${element.amat_emp}','${element.nom_emp}',${element.num_emp},${element.tar_emp},
                            '${element.rfc_emp}','${element.dep_emp}','${element.fun_emp}','${element.est_emp}','${element.cel_emp}','${element.ext_emp}',
                            '${element.email}','${element.turno}');">Modificar</a></td>
                            <td style="text-align: center; vertical-align: middle"><a class="btn btn-secondary btn-lg" style="color: white; cursor: pointer;" 
                            onclick="deleteEmployee(${element.num_emp});">Eliminar</a></td>
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

router.post("/getCars",(req,res)=>{
    if(req.session.level=="admin"){
        database.getCars().then((resolve)=>{
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
                                <p class="lead">No hay carros aun!</p>
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

module.exports = router;