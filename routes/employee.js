const express = require("express");
const router = express.Router();

const database = require("../database");

router.post("/addCar",(req,res)=>{

    if(req.session.level == "employee"){
        
        let brand = req.body.brand;
        let sbrand = req.body.sbrand;
        let color = req.body.color;
        let plate = req.body.plate;

        if(brand == "" || brand == null || brand == undefined){
            res.send({error:["Los parámetros no son correctos"],message:[]});
        }
        else if(sbrand == "" || sbrand == null || sbrand == undefined){
            res.send({error:["Los parámetros no son correctos"],message:[]});
        }
        else if(color == "" || color == null || color == undefined){
            res.send({error:["Los parámetros no son correctos"],message:[]});
        }
        else if(plate == "" || plate == null || plate == undefined){
            res.send({error:["Los parámetros no son correctos"],message:[]});
        }
        else{
            database.getCarsByNum(req.session.user).then((resolve2)=>{
                if(resolve2.length==0){
                    database.addCar(req.session.user,brand,sbrand,color,plate).then((resolve)=>{
                        res.send(resolve);
                    });
                }
                else{
                    res.send({error:["Ya has registrado un vehículo"],message:[]});
                }
            })
        }
    }
    else{
        res.send({error:[],message:[]});
    }

});

router.post("/getName",(req,res)=>{

    if(req.session.level == "employee"){

        if(req.session.user == null){
            res.send(null);
        }
        else{
            database.getEmployeeByNumber(req.session.user).then((resolve)=>{
                if(resolve == null){
                    res.send(null);
                }
                else{
                    res.send(resolve[0].nom_emp);
                }
            });
        }

    }
    else{
        res.send(null);
    }

});

router.post("/getMyCars",(req,res)=>{

    if(req.session.level == "employee"){

        if(req.session.user == null){
            res.send({error:[],message:[]});
        }
        else{

            database.getCarsByNum(req.session.user).then((resolve)=>{

                let html = `<table class="table table-sm table-hover table-bordered" style="background-color: white;">
                                <tr>
                                    <th style="text-align: center; vertical-align: middle">Placa</th>
                                    <th style="text-align: center; vertical-align: middle">Marca</th>
                                    <th style="text-align: center; vertical-align: middle">SubMarca</th>
                                    <th style="text-align: center; vertical-align: middle">Color</th>
                                    
                                </tr>
                `;
                //<th style="text-align: center; vertical-align: middle">Eliminar</th>

                resolve.forEach(element => {
                    html += `<tr>
                                <td style="text-align: center; vertical-align: middle">${element.placa_car}</td>
                                <td style="text-align: center; vertical-align: middle">${element.marca_car}</td>
                                <td style="text-align: center; vertical-align: middle">${element.smarca_car}</td>
                                <td style="text-align: center; vertical-align: middle">${element.color}</td>
                                
                            </tr>`;
                });
                //<td style="text-align: center; vertical-align: middle"><input type="button" value="Eliminar"
                //                onclick="deleteMyCar(${element.id_reg},${element.id_car});"></td>

                html += "</table>";

                if(resolve.length == 0){
                    html = `<div class="col-md-4 mx-auto">
                                <div class="card mx-auto">
                                    <div class="card-body">
                                    <!--<h1>Hello </h1>-->
                                    <p class="lead">No hay carros aun!</p>
                                    <a href="registrarCarro.html" class="btn btn-success btn-block">Registra un carro</a>
                                </div>
                            </div>`;
                }

                res.send({error:[],message:[html]});

            });
        }

    }
    else{
        res.send({error:[],message:[]});
    }

});

router.post("/deleteMyCar",(req,res)=>{
/*
    if(req.session.level == "employee"){

        let id_reg = req.body.m;
        let id_car = req.body.n;

        if(id_reg == "" || id_reg == null || id_reg == undefined){
            res.send({error:["Los parámetros no son correctos"],message:[]});
        }
        else if(id_car == "" || id_car == null || id_car == undefined){
            res.send({error:["Los parámetros no son correctos"],message:[]});
        }
        else{
            database.deleteMyCar(id_reg,id_car).then((resolve)=>{
                res.send(resolve);
            });
        }
    }
    else{*/
        res.send({error:[],message:[]});
    /*}
*/
});

router.post("/getProfile",(req,res)=>{
    if(req.session.user == null){
        res.send({error:[],message:[]});
    }
    else{
        database.getEmployeeByNumber(req.session.user).then((resolve)=>{
            if(resolve == null || resolve.length == 0){
                res.send({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
            }
            else{
                let form = `
                <div class="col-md-4 mx-auto">
                    <div class="card">
                        <div class="card-body">  
                            <form fontstyle="transform: uppercase;">
                                <div class="form-group" style="text-transform: uppercase;">
                                Apellido Paterno:<br>
                                <input type="text" id="appat" name="appat" class="form-control" readonly value="${resolve[0].apat_emp}">
                                </div>
                                <div class="form-group" style="text-transform: uppercase;">
                                Apellido Materno:<br>
                                <input type="text" id="apmat" name="apmat" class="form-control" readonly value="${resolve[0].amat_emp}">
                                </div>
                                <div class="form-group" style="text-transform: uppercase;">
                                Nombre(s):<br>
                                <input type="text" id="nom" name="nom" class="form-control" readonly value="${resolve[0].nom_emp}">
                                </div>
                                <div class="form-group" style="text-transform: uppercase;">
                                RFC:<br>
                                <input type="text" id="rfc" name="rfc" class="form-control" readonly value="${resolve[0].rfc_emp}">
                                </div>
                                <div class="form-group" style="text-transform: uppercase;">
                                Número de empleado:<br>
                                <input type="text" id="numemp" name="numemp" class="form-control" readonly value="${resolve[0].num_emp}">
                                </div>
                                <div class="form-group" style="text-transform: uppercase;">
                                Tarjeta checador:<br>
                                <input type="text" id="tarjchek" name="tarjchek" class="form-control" readonly value="${resolve[0].tar_emp}">
                                </div>
                                <div class="form-group" style="text-transform: uppercase;">
                                Nombramiento:<br>
                                <input type="text" id="fun" name="fun" class="form-control" readonly value="${resolve[0].fun_emp}">
                                </div>
                                <div class="form-group" style="text-transform: uppercase;">
                                Estatus:<br>
                                <input type="text" id="est" name="est" class="form-control" readonly value="${resolve[0].est_emp}">
                                </div>
                                <hr class="my-4">
                                <div class="form-group" style="text-transform: uppercase;">
                                Departamento de Adscripción:<br>
                                <select class="form-control" id="dep" name="dep" required="">
                                    <option ${(resolve[0].dep_emp=="")?'selected="selected"':''}>Departamento de Adscripción</option>
                                    <option ${(resolve[0].dep_emp=="Direccion")?'selected="selected"':''}>Direccion</option>
                                    <option ${(resolve[0].dep_emp=="Decanato")?'selected="selected"':''}>Decanato</option>
                                    <option ${(resolve[0].dep_emp=="Coordinacion de Enlace y Gestion Tecnica")?'selected="selected"':''}>Coordinacion de Enlace y Gestion Tecnica</option>
                                    <option ${(resolve[0].dep_emp=="Unidad de Informatica")?'selected="selected"':''}>Unidad de Informatica</option>
                                    <option ${(resolve[0].dep_emp=="Subdireccion Academica")?'selected="selected"':''}>Subdireccion Academica</option>
                                    <option ${(resolve[0].dep_emp=="Departamento de Formacion Basica Disciplinaria")?'selected="selected"':''}>Departamento de Formacion Basica Disciplinaria</option>
                                    <option ${(resolve[0].dep_emp=="Departamento de Formacion Humanistica y Socio-Medica")?'selected="selected"':''}>Departamento de Formacion Humanistica y Socio-Medica</option>
                                    <option ${(resolve[0].dep_emp=="Departamento de Formacion Especifica en Clinopatologia e Internado Rotatorio")?'selected="selected"':''}>Departamento de Formacion Especifica en Clinopatologia e Internado Rotatorio</option>
                                    <option ${(resolve[0].dep_emp=="Departamento de Formacion Integral e Institucional")?'selected="selected"':''}>Departamento de Formacion Integral e Institucional</option>
                                    <option ${(resolve[0].dep_emp=="Departamento de Innovacion Educativa")?'selected="selected"':''}>Departamento de Innovacion Educativa</option>
                                    <option ${(resolve[0].dep_emp=="Departamento de Evaluacion y Seguimiento Academico")?'selected="selected"':''}>Departamento de Evaluacion y Seguimiento Academico</option>
                                    <option ${(resolve[0].dep_emp=="Unidad de Tecnologia Educativa y Campus Virtual")?'selected="selected"':''}>Unidad de Tecnologia Educativa y Campus Virtual</option>
                                    <option ${(resolve[0].dep_emp=="Subdireccion de Servicios Educativos e Integracion Social")?'selected="selected"':''}>Subdireccion de Servicios Educativos e Integracion Social</option>
                                    <option ${(resolve[0].dep_emp=="Departamento de Gestion Escolar")?'selected="selected"':''}>Departamento de Gestion Escolar</option>
                                    <option ${(resolve[0].dep_emp=="Departamento de Servicios Estudiantiles")?'selected="selected"':''}>Departamento de Servicios Estudiantiles</option>
                                    <option ${(resolve[0].dep_emp=="Posgrado")?'selected="selected"':''}>Posgrado</option>
                                </select>
                                </div>
                                <div class="form-group" style="text-transform: uppercase;">
                                Turno:<br>
                                <select class="form-control" id="turn" name="turn" required="">
                                    <option>Turno</option>
                                    <option ${(resolve[0].turno=="Matutino")?'selected="selected"':''}>Matutino</option>
                                    <option ${(resolve[0].turno=="Vespertino")?'selected="selected"':''}>Vespertino</option>
                                </select>
                                </div>
                                <div class="form-group" style="text-transform: uppercase;">
                                Correo electrónico:<br>
                                <input type="text" id="email" name="email" class="form-control" value="${resolve[0].email}">
                                </div>
                                <div class="form-group" style="text-transform: uppercase;">
                                Celular:<br>
                                <input type="text" id="cel" name="cel" class="form-control" value="${resolve[0].cel_emp}">
                                </div>
                                <div class="form-group" style="text-transform: uppercase;">
                                Extensión IPN:<br>
                                <input type="text" id="ext" name="ext" class="form-control" value="${resolve[0].ext_emp}">
                                </div>
                                <div class="form-group">
                                    <a class="btn btn-secondary btn-block" onclick="updateEmployee();">Guardar</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`
                res.send({error:[],message:[form]});
            }
        });
    }
});

router.post("/updateProfile",(req,res)=>{

    let dep   = req.body.dep;
    let turn  = req.body.turn;
    let email = req.body.email;
    let cel   = req.body.cel;
    let ext   = req.body.ext;

    if(req.session.user == null){
        res.send({error:[],message:[]});
    }
    else if(dep == "" || dep == null || dep == undefined || dep == "Departamento de Adscripción"){
        res.send({error:["Los parámetros no son correctos"],message:[]});
    }
    else if(turn == "" || turn == null || turn == undefined || turn == "Turno"){
        res.send({error:["Los parámetros no son correctos"],message:[]});
    }
    else if(email == "" || email == null || email == undefined){
        res.send({error:["Los parámetros no son correctos"],message:[]});
    }
    else if(cel == "" || cel == null || cel == undefined){
        res.send({error:["Los parámetros no son correctos"],message:[]});
    }
    else if(ext == "" || ext == null || ext == undefined){
        res.send({error:["Los parámetros no son correctos"],message:[]});
    }
    else{
        database.editProfile(req.session.user,{dep_emp:dep,turno:turn,email:email,cel_emp:cel,ext_emp:ext}).then((resolve)=>{
            res.send(resolve);
        });
    }

});

router.post("/getRegistry",(req,res)=>{
    if(req.session.level == "employee"){
        database.getCarsByNum(req.session.user).then((resolve)=>{
            if(resolve == {error:["Ha ocurrido un error, inténtelo más tarde"],message:[]}){
                res.send({error:["Ha ocurrido un error, inténtelo más tarde"],message:[]});
            }
            else{
                if(resolve.length==0 || resolve == null){
                    res.send({error:[],message:["ok"]});
                }
                else{
                    res.send({error:[],message:["no"]});
                }
            }
        });
    }
    else{
        res.send({error:[],message:[]});
    }
});

module.exports = router;