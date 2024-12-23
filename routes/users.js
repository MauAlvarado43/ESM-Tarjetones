const express = require("express");
const router = express.Router();

const database = require("../database");

//Función para iniciar sesión
router.post("/login",(req,res)=>{

    let user = req.body.user;
    let password = req.body.pass;

    //Iniciar como administrador
    if(user=="root" && password=="n0m3l0"){

      req.session.level = "admin";
      req.session.user = "root";

      res.send({error:[],message:["Iniciando sesión"],level:0});

    }
    //Iniciar como empleado
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

//Cerrar sesión
router.get("/logout",(req,res)=>{
  req.session.level = null;
  req.session.user = null;
  res.redirect("index.html");
});

//Obtener el número de empleado logeado
router.post("/getUser",(req,res)=>{
  res.send(req.session.user);
});

//Redireccionar al index
router.post("/",(req,res)=>{
  res.send("index.html");
});

//Función para leer el código qr
router.get("/readQR",(req,res)=>{

  let id_reg = req.query.abc;
  let sign = req.query.sign;
  let json = JSON.parse(require("fs").readFileSync("./keys/signs.json"));

  //Si el qr no tiene los datos necesarios
  if(id_reg == null || sign == null){
    res.send(`<!DOCTYPE html>

      <html lang="es">
      
        <head>
          <meta charset="utf-8">
          <title>Park APP</title>
          <!-- Bootstrap 4 -->
          <link rel="stylesheet" href="css/bootstrap.min.css">
          <!-- Font Awesome  -->
          <link rel="stylesheet" href="css/all.css">
          <!-- Custom CSS  -->
          <link rel="stylesheet" href="css/main.css"
        </head>
      
        <body>
      
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" id="_home" style="color: white; cursor: pointer;">Tarjetones 2019</a>
              
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
      
          <main class="container p-5" id="p-container">
              <div id="message"></div>
              <div class="jumbotron mt-4">
                  <h2 class="lead">Está mal construído el código QR, no pertenece a nuestra base de datos</h2>
              </div>
          </main>
      
          <!-- Bootstrap 4 javascript -->
          <script src="js/jquery.js"></script>
          <script src="js/popper.min.js"></script>
          <script src="js/bootstrap.min.js"></script>
          </body>
          </html>`);
  }
//Si el qr no tiene los datos necesarios
  else if(id_reg == undefined || sign == undefined){
    res.send(`<!DOCTYPE html>

    <html lang="es">
    
      <head>
        <meta charset="utf-8">
        <title>Park APP</title>
        <!-- Bootstrap 4 -->
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <!-- Font Awesome  -->
        <link rel="stylesheet" href="css/all.css">
        <!-- Custom CSS  -->
        <link rel="stylesheet" href="css/main.css"
      </head>
    
      <body>
    
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container">
              <a class="navbar-brand" id="_home" style="color: white; cursor: pointer;">Tarjetones 2019</a>
            
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
          </div>
      </nav>
    
        <main class="container p-5" id="p-container">
            <div id="message"></div>
            <div class="jumbotron mt-4">
                <h2 class="lead">Está mal construído el código QR, no pertenece a nuestra base de datos</h2>
            </div>
        </main>
    
        <!-- Bootstrap 4 javascript -->
        <script src="js/jquery.js"></script>
        <script src="js/popper.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        </body>
        </html>`);
  }

  else{
    database.readQR(id_reg).then((resolve)=>{
      //Si el qr no está registrado
      if(resolve.length==0){
        res.send(`<!DOCTYPE html>

        <html lang="es">
        
          <head>
            <meta charset="utf-8">
            <title>Park APP</title>
            <!-- Bootstrap 4 -->
            <link rel="stylesheet" href="css/bootstrap.min.css">
            <!-- Font Awesome  -->
            <link rel="stylesheet" href="css/all.css">
            <!-- Custom CSS  -->
            <link rel="stylesheet" href="css/main.css"
          </head>
        
          <body>
        
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
              <div class="container">
                  <a class="navbar-brand" id="_home" style="color: white; cursor: pointer;">Tarjetones 2019</a>
                
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                  </button>
              </div>
          </nav>
        
            <main class="container p-5" id="p-container">
                <div id="message"></div>
                <div class="jumbotron mt-4">
                    <h2 class="lead">Este carro no está registrado</h2>
                </div>
            </main>
        
            <!-- Bootstrap 4 javascript -->
            <script src="js/jquery.js"></script>
            <script src="js/popper.min.js"></script>
            <script src="js/bootstrap.min.js"></script>
            </body>
            </html>`);
      }

      //Si la firma digital corresponde y además está registrado el QR
      else if(sign.trim()==json[id_reg-1].trim()){
        res.send(`<!DOCTYPE html>

        <html lang="es">
        
          <head>
            <meta charset="utf-8">
            <title>Park APP</title>
            <!-- Bootstrap 4 -->
            <link rel="stylesheet" href="css/bootstrap.min.css">
            <!-- Font Awesome  -->
            <link rel="stylesheet" href="css/all.css">
            <!-- Custom CSS  -->
            <link rel="stylesheet" href="css/main.css"
          </head>
        
          <body>
        
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" id="_home" style="color: white; cursor: pointer;">Tarjetones 2019</a>
                  
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
        
            <main class="container p-5" id="p-container">
                <div id="message"></div>
                <div class="jumbotron mt-4">
                    <h2 class="lead">Este QR corresponde a un ${resolve[0].marca_car} ${resolve[0].smarca_car} color ${resolve[0].color}
                    y le pertenece a ${resolve[0].nom_emp} ${resolve[0].apat_emp}</h2>
                </div>
            </main>
        
            <!-- Bootstrap 4 javascript -->
            <script src="js/jquery.js"></script>
            <script src="js/popper.min.js"></script>
            <script src="js/bootstrap.min.js"></script>
            </body>
            </html>`);
      }
      //Si la firma digital no corresponde
      else{
        res.send(`<!DOCTYPE html>

        <html lang="es">
        
          <head>
            <meta charset="utf-8">
            <title>Park APP</title>
            <!-- Bootstrap 4 -->
            <link rel="stylesheet" href="css/bootstrap.min.css">
            <!-- Font Awesome  -->
            <link rel="stylesheet" href="css/all.css">
            <!-- Custom CSS  -->
            <link rel="stylesheet" href="css/main.css"
          </head>
        
          <body>
        
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
              <div class="container">
                  <a class="navbar-brand" id="_home" style="color: white; cursor: pointer;">Tarjetones 2019</a>
                
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                  </button>
              </div>
          </nav>
        
            <main class="container p-5" id="p-container">
                <div id="message"></div>
                <div class="jumbotron mt-4">
                    <h2 class="lead">Este código QR ha sido falsificado</h2>
                </div>
            </main>
        
            <!-- Bootstrap 4 javascript -->
            <script src="js/jquery.js"></script>
            <script src="js/popper.min.js"></script>
            <script src="js/bootstrap.min.js"></script>
            </body>
            </html>`);
      }
    });
    
  }

});

module.exports = router;