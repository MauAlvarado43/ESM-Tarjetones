const express = require("express");
const router = express.Router();

const database = require("../database");

router.post("/login",(req,res)=>{

    let user = req.body.user;
    let password = req.body.pass;

    if(user=="root" && password=="n0m3l0"){

      req.session.level = "admin";
      req.session.user = "root";

      res.send({error:[],message:["Iniciando sesión"],level:0});

    }
    else if(/[0-9]/.test(user)){

      database.login(user,password).then((resolve)=>{
        if(resolve.error.length == 0){
          req.session.level = "employee";
          req.session.user = user;
        }
        res.send(resolve);
      });

    }
    else{

      res.send({error:["El formato de usuario no es correcto"],message:[]});

    }

});

router.get("/logout",(req,res)=>{
  req.session.level = null;
  req.session.user = null;
  res.redirect("index.html");
});

router.post("/getUser",(req,res)=>{
  res.send(req.session.user);
});

router.post("/",(req,res)=>{
  res.send("index.html");
});

router.get("/readQR",(req,res)=>{

  let num_emp = req.query.xyz;
  let id_reg = req.query.abc;
  let id_car = req.query.mno;

  if(num_emp == null || id_car == null || id_reg == null){
    res.send("Está mal construído el código QR, no pertenece a nuestra base de datos");
  }

  else if(num_emp == undefined || id_car == undefined || id_reg == undefined){
    res.send("Está mal construído el código QR, no pertenece a nuestra base de datos");
  }

  else{
    database.readQR(num_emp,id_reg,id_car).then((resolve)=>{
      if(resolve.length==0){
        res.send("Este carro no está registrado");
      }
      else{
        res.send(`Este QR corresponde a un ${resolve[0].marca_car} ${resolve[0].smarca_car} color ${resolve[0].color}
         y le pertenece a ${resolve[0].nom_emp} ${resolve[0].apat_emp}`);
      }
    });
    
  }

});

module.exports = router;