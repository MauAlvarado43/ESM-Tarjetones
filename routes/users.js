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

module.exports = router;