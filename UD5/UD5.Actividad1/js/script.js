
//Crear bd
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB || window.shimIndexedDB;

//Nombre de la bd

const request = window.indexedDB.open("userDB", 1);
let db;

request.onerror = (event) => {
    console.error("El navegador no funciona");
};
request.onsuccess = (event) => {
    db = event.target.result;
    console.log("database opened");
};

//CREAR TABLAS PARA EL FORMULARIO 

request.onupgradeneeded = (event) => {
    const db = event.target.result;

    var store = db.createObjectStore("users", {keyPath: "id", autoIncrement: true} );
    console.log("openCreateDb: Oject store created");

    store.createIndex('name', 'name', {unique: false});

    store.createIndex('username', 'username', {unique: false});

    store.createIndex('email', 'email', {unique: false});

    store.createIndex('password', 'password', {unique: false});

    console.log("Index created: name, username, email, password");
};

function sendData() {

    openCreateDb(function(db){
        var hiddenId = document.getElementById("hiddenId").value;
        
    });
}

