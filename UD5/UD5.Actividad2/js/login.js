
//Crear bd
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB || window.shimIndexedDB;

//Nombre de la bd
var database = "usersDB_AnaSoledad";
const DB_STORE_NAME = 'users';
const DB_VERSION = 1;
let db;
var opened = false;
// var sendDataForm = document.querySelector("#sendData");
// const listaUsuario = document.getElementById("users-ul");


function loginValidation(){
    var emailUser = document.getElementById("email").value;
    var passwdUser = document.getElementById("password");
    var hash = CryptoJS.MD5(passwdUser.value);

    var request = indexedDB.open(database, DB_VERSION);   

    var errorEmail = document.getElementById("emailError");
    var errorPassword = document.getElementById("passwordError");
    var errorDetected = false;

    if(emailUser === '') {
        errorEmail.innerText = "The email fields are empty";
        errorEmail.style.display = "block";
        errorDetected = true;
        console.log("Email is empty");
    }
    if (passwdUser.value === ''){
        errorPassword.innerText = "The password fields are empty";
        errorPassword.style.display = "block";
        errorDetected = true;
        console.log("Password is not correct");
    }

    if(errorDetected) {
        console.log("Error detected");
        return; 
    } else {
        console.log("Email is correct");
        errorEmail.style.display = "none"; 
        console.log("Password is correct");
        errorPassword.style.display = "none";
        console.log("All good");
    }
    
    request.onsuccess = function (e) { 

        db = this.result; 
        var tx = db.transaction(DB_STORE_NAME, "readwrite");
        var store = tx.objectStore(DB_STORE_NAME);    
        console.log("openBD DONE");  
        var req = store.get(emailUser);

    
        req.onsuccess = function (e) {
            let datos;
            datos = e.target.result;
            console.log(datos);   

            //Comprueba si existe el usuario en la bd.
            if(datos != undefined) {
                //comprueba que la contraseña introducida sea correcta.
                if(datos.password === hash.toString()) {
                    //guarda el usuario logueado.
                    sessionStorage.setItem("email", emailUser);
                    //comprueba si es administrador y redirecciona. 
                    if(datos.admin){
                        location.replace("./index_admin.html");
                    } else {
                        location.replace("./index_user.html");
                    }
                }
            } 
        };
     
        req.onerror = function (e) {
             console.error("Connection error", this.error);      //Indica que se ha producicdo un error y no se ha podido insertar.
        };
     
        tx.oncomplete = function () {
            db.close();     //Cierra la conexión.
        }; 
    };

    request.onerror = function(e) {
        console.error("openBD:", e.target.errorCode);
    }; 
};

