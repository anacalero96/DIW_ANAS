
//Crear bd
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB || window.shimIndexedDB;

//Nombre de la bd
var database = "usersDB";
const DB_STORE_NAME = 'users';
const DB_VERSION = 1;
let db;
var opened = false;
var sendDataForm = document.querySelector("#sendData");

function openCreateDb (onDbCompleted){

    if(opened){
        db.close();
        opened = false;
    }

    var request = indexedDB.open(database, DB_VERSION);

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("database opened" + db);
        opened = true;

        onDbCompleted(db);
    };

    request.onupgradeneeded = function() {

        db = request.result;

        console.log("openCreateDb: upgrade needed " + db);
        //Crear tablas para el formulario.
        var store = db.createObjectStore(DB_STORE_NAME, {keyPath: "id", autoIncrement: true});
        console.log("openCreateDb: Oject store created");

        store.createIndex('name', 'name', {unique: false});

        store.createIndex('username', 'username', {unique: false});

        store.createIndex('email', 'email', {unique: false});

        store.createIndex('password', 'password', {unique: false});

        console.log("Index created: name, username, email, password");
    };

    request.onerror = function(event) {
        console.error("openCreateDb: error opening or creating DB:", event.target.errorCode);
    };
}

//Recoge los valores del formulario y los inserta en la bd.
function sendData() {

    openCreateDb(function(db){
        var hiddenId = document.getElementById("hiddenId").value;
        
        if(hiddenId == 0){
            addUser(db);
        } else {
            console.log("change user values");
            // editUser(db);
        }
    });
}

function addUser(db){

    var errorDetected = false;

    var name = document.getElementById("name");
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");


    //Variables de comprobación de posibles errores

    var errorName = document.getElementById("nameError");
    var errorUser = document.getElementById("userError");
    var errorEmail = document.getElementById("emailError");
    var errorPassword = document.getElementById("passwordError");
    var errorPassword2 = document.getElementById("confirmError");

    if(name.value === '') {
        errorName.innerText = "Los campos estan vacíos";
        errorName.style.display = "block";      //muestra el mensaje
        errorDetected = true;
        console.log("Name is empty");
    } else {
        console.log("Name is correct");
        errorName.style.display = "none";
        errorDetected = false;
    };

    if(email === '') {
        errorEmail.innerText = "Los campos están vacíos";
        errorEmail.style.display = "block";
        errorDetected = true;
        console.log("Email is empty");
    } else if (!isEmailValid === (email.value)){
        errorEmail.innerText = "Los campos están vacíos";
        errorEmail.style.display = "block";
        errorDetected = true;
        console.log("Email is not correct");
    } else {
        console.log("Email is correct");
        errorName.style.display = "none";
        errorDetected = false;
    }
    
    //Función para comprobar el email
    function isEmailValid(input) {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(String(input).toLocaleLowerCase());
    };

    //Función para mostrar los errores detectados.
    if(errorDetected) {
        console.log("Error detected");
        db.close();
        opened = false;
        return; 
    } else {
        console.log("All good");
    }





    var hash = CryptoJS.MD5(password.value);
    var obj = { name: name.value, username: username.value, email: email.value, password: hash.toString()};

    var tx = db.transaction(DB_STORE_NAME, "readwrite");
    var store = tx.objectStore(DB_STORE_NAME);

    try {
        request = store.add(obj);
    } catch (event){
        console.log("Catch");
    }
    request.onsuccess = function(event){
        console.log("addUser: Data insertion successfully done. Id:" + event.target.result);

        // readData();
        // clearFormInputs();
    };
    request.onerror = function(event){
        console.error("addUsers: error creating data", this.error);
    };
    tx.oncomplete = function(){
        console.log("addUser: transaction completed");
        db.close();
        opened = false;
    };
}


window.addEventListener('load', (event) => {
  sendDataForm.addEventListener("click", (event) => {
    sendData();
  });
});

