
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

    const request = indexedDB.open("usersDB", 1);

    request.onsuccess = function(event) {

        db = event.target.result;
        console.log("database opened");
        opened = true;

        onDbCompleted(db);
    };

    request.onupgradeneeded = function() {

        db = request.result;

        //Crear tablas para el formulario.
        var store = db.createObjectStore("users", {keyPath: "id", autoIncrement: true} );
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
    var name = document.getElementById("name");
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    var obj = {name: name.value, username: username.value, email: email.value, password: password.value};

    var tx = db.transaction("users", "readwrite");
    var store = tx.objectStore("users");

    try {
        request = store.add(obj);
    } catch(event){
        console.log("Catch");
    }
    request.onsuccess = function(event){
        console.log("addUser" + event.target.result);

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

