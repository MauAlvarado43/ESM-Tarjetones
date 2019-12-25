const express = require("express");
const router = express.Router();

const database = require("../database");

router.post("/addCar",(req,res)=>{

    if(req.session.level == "employee"){
        
        let brand = req.body.brand;
        let sbrand = req.body.sbrand;
        let color = req.body.color;
        let plate = req.body.plate;

        database.addCar(req.session.user,brand,sbrand,color,plate).then((resolve)=>{
            res.send(resolve);
        });

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

        database.getEmployeeByNumber(req.session.user).then((resolve)=>{
            if(resolve == null){
                res.send(null);
            }
            else{
                res.send(resolve[0].nom_emp);
            }
        });

    }
    else{
        res.send(null);
    }

});

module.exports = router;