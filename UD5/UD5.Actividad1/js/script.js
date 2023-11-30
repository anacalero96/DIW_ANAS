
//Crear bd
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB || window.shimIndexedDB;

//Nombre de la bd
var database = "usersDB_AnaSoledad";
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
    var password2 = document.getElementById("confirmpassword");


    //Variables de comprobación de posibles errores

    var errorName = document.getElementById("nameError");
    var errorUser = document.getElementById("userError");
    var errorEmail = document.getElementById("emailError");
    var errorPassword = document.getElementById("passwordError");
    var errorPassword2 = document.getElementById("confirmError");


    //Comprueba que los campos no esten vacíos.
    if(name.value.trim() === '') {
        errorName.innerText = "Los campos estan vacíos";
        errorName.style.display = "block";      //muestra el mensaje
        errorDetected = true;
        console.log("Name is empty");
    } else {
        console.log("Name is correct");
        errorName.style.display = "none";
        errorDetected = false;
    };
    //Comprueba que los campos no esten vacíos.
    if(username.value.trim() === ''){
        errorUser.innerText = "Los campos están vacíos";
        errorUser.style.display = "block";
        errorDetected = true;
        console.log("Username is empty");
    } else {
        console.log("Username is correct");
        errorUser.style.display = "none";
        errorDetected = false;
    };
    //Comprueba que los campos no esten vacíos.
    if(email === '') {
        errorEmail.innerText = "Los campos están vacíos";
        errorEmail.style.display = "block";
        errorDetected = true;
        console.log("Email is empty");
    //Comprueba que los valores introducidos sean correctos usando la función isEmailValid.
    } else if (!isEmailValid === (email.value)){
        errorEmail.innerText = "El email no contiene el formato correcto";
        errorEmail.style.display = "block";
        errorDetected = true;
        console.log("Email is not correct");
    } else {
        console.log("Email is correct");
        errorEmail.style.display = "none";
        errorDetected = false;
    };
    //Comprueba que la contraseña introducida contenga los requisitos minimos.
    if(password.value === ''){
       errorPassword.innerText = "Los campos están vacíos";
       errorPassword.style.display = "block";
       errorDetected = true;
       console.log("Password is empty"); 
    } else if (!isPasswordValid === (password.value)) {
        errorPassword.innerText = "La contraseña introducida no es correcta";
        errorPassword.style.display = "block";
        errorDetected = true;
        console.log("Password is not correct");
    } else {
        console.log("Password is correct");
        errorPassword.style.display = "none";
        errorDetected = false;
    };
    //Comprueba la segunda contraseña correcta.
    if(password2.value === ''){
        errorPassword2.innerText = "Los campos están vacíos";
        errorPassword2.style.display = "block";
        errorDetected = true;
        console.log("Password is empty"); 
    } else if (!isPasswordValid === (password2.value)) {
        errorPassword2.innerText = "La segunda contraseña introducida no es correcta";
        errorPassword2.style.display = "block";
        errorDetected = true;
        console.log("Password is not correct");
    } else {
        console.log("Password is correct");
        errorPassword2.style.display = "none";
        errorDetected = false;
    };

    //Función para comprobar el email sea correcto e introduzca los valores de la constante.
    function isEmailValid(input) {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(String(input).toLocaleLowerCase());
    };
    //Función para comprobar que la contraseña introducida tenga el formato correcto.

    function isPasswordValid (input) {
        const regPasswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
        return regPasswd.test(String(input));
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

