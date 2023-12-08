
//Crear bd
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB || window.shimIndexedDB;

//Nombre de la bd
var database = "usersDB_AnaSoledad";
const DB_STORE_NAME = 'users';
const DB_VERSION = 1;
let db;
var opened = false;
var sendDataForm = document.querySelector("#sendData");

const listaUsuario = document.getElementById("users-ul");

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

        // var store = db.createObjectStore(DB_STORE_NAME, {keyPath: "id", autoIncrement: true});

        var store = db.createObjectStore(DB_STORE_NAME, {keyPath: "email"});
        console.log("openCreateDb: Oject store created");
        
        
        store.createIndex('name', 'name', {unique: false});

        store.createIndex('username', 'username', {unique: false});

        store.createIndex('email', 'email', {unique: true, });

        store.createIndex('password', 'password', {unique: false});

        store.createIndex('admin', 'admin');

        store.createIndex('avatar', 'avatar');

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
    var password2 = document.getElementById("password2");

    var admin = document.getElementById("checkSelector");       //Variable para recoger el check que indica que es administrador.
    var avatar = document.querySelector("input[name=radioButton]:checked").value;


    //Variables de comprobación de posibles errores
    var errorName = document.getElementById("nameError");
    var errorUser = document.getElementById("userError");
    var errorEmail = document.getElementById("emailError");
    var errorPassword = document.getElementById("passwordError");
    var errorPassword2 = document.getElementById("confirmError");


    //Comprueba que los campos no esten vacíos.
    if(name.value.trim() === '') {
        errorName.innerText = "The name field is empty ";
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
        errorUser.innerText = "Username field is empty";
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
        errorEmail.innerText = "The email fields are empty";
        errorEmail.style.display = "block";
        errorDetected = true;
        console.log("Email is empty");
    //Comprueba que los valores introducidos sean correctos usando la función isEmailValid.
    } else if (!isEmailValid(email.value)){
        errorEmail.innerText = "The email does not contain the correct formatting";
        errorEmail.innerText = "The email does not contain the correct formatting";
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
       errorPassword.innerText = "The password field is empty";
       errorPassword.style.display = "block";
       errorDetected = true;
       console.log("Password is empty"); 
    } else if (!isPasswordValid(password.value)) {
        errorPassword.innerText = "The password entered is not correct";
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
        errorPassword2.innerText = "The password field is empty";
        errorPassword2.style.display = "block";
        errorDetected = true;
        console.log("Password is empty"); 
    } else if (!isPasswordValid(password2.value)) {
        errorPassword2.innerText = "The password entered is not correct";
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
    var obj = { name: name.value, username: username.value, email: email.value, password: hash.toString(), admin: admin.checked, avatar: avatar};

    var tx = db.transaction(DB_STORE_NAME, "readwrite");
    var store = tx.objectStore(DB_STORE_NAME);


    try {
        request = store.add(obj);
    } catch (event){
        console.log("Catch");
    }
    request.onsuccess = function(event){
        console.log("addUser: Data insertion successfully done. Id:" + event.target.result);

        sessionStorage.setItem("email", event.target.result);

        if(admin.checked){
            location.replace("./index_admin.html");
        } else {
            location.replace("./index_user.html");
        }
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

function showData () {
    var request = indexedDB.open(database, DB_VERSION);    

    request.onsuccess = function (e) {
        db = this.result;
        console.log("openBD DONE");         

        showUser(db);
    };

    request.onerror = function(e) {
        console.error("openBD:", e.target.errorCode);
    };
}

function showUser(db) {

    var tx = db.transaction(DB_STORE_NAME, "readwrite");
    var store = tx.objectStore(DB_STORE_NAME);
    //Muestra la lista de usuarios.  
    listaUsuario.innerHTML='';

    let request = store.openCursor();

    request.onsuccess = function () {
        let cursor = request.result;       
        
        if(cursor) {
            mostrarUsuario(cursor.key, cursor.value);
            cursor.continue();
        } else {
            console.log("usuario");
        }
        console.log("Edit from DB was successfull");
    };

    request.onerror = function (e) {
        console.error("showUsers error", this.error);      //Indica que se ha producicdo un error y no se ha podido insertar.
    };

    tx.oncomplete = function () {
        db.close();     //Cierra la conexión.
    }; 
};

function mostrarUsuario(email, datos) {
    listaUsuario.innerHTML+= '<div class="usuario"><span>'+ datos.username + '</span> <button class="btn_edit" onclick="getData('+ email +')">Edit</button><button class="btn_edit" onclick="deleteData('+ email +')">Delete</button></div>';
};

function getData () {
    var request = indexedDB.open(database, DB_VERSION);   

    request.onsuccess = function (e) {
        db = this.result;
        console.log("openBD DONE");      

        //Obtiene los datos del usuario loggueado
        getUser(db, sessionStorage.getItem("email"));
    };

    request.onerror = function(e) {
        console.error("openBD:", e.target.errorCode);
    };
};

//Para obtener el usuario loggueado
function getUser (db, email) {
    
    var tx = db.transaction(DB_STORE_NAME, "readwrite");

    //Solo lectura
    var store = tx.objectStore(DB_STORE_NAME);      //Obtiene la tabla que usamos.
    
    request = store.get(email);
    let datos;
  
    request.onsuccess = function (e) {
       datos = e.target.result;
       loadUser(email, datos);
    };

    request.onerror = function (e) {
        console.error("Connection error", this.error);      //Indica que se ha producicdo un error y no se ha podido insertar.
    };

    tx.oncomplete = function () {
        db.close();     //Cierra la conexión.
    }; 
};

function loadUser (email, datos) {
    var avatarprofile = document.getElementById("avatar");
    var nomusuari = document.getElementById("nombreUsuario");
    var nombre = document.getElementById("name");
    var emailU = document.getElementById("emailUser");

    sessionStorage.setItem("profile", JSON.stringify(datos));
    

    //Muestra el nombre de usuario introducido
    nomusuari.innerHTML =  datos.username;
    nombre.innerHTML = datos.name;
    emailU.innerHTML = datos.email;
    avatarprofile.src = datos.avatar;
};

function login(){
    location.replace("./login.html");
};

function showEditor(){
    var editor = document.getElementById("formEdit");
    editor.style.display = "block";
};

function editProfile(){
    showEditor();

    var req = indexedDB.open(database, DB_VERSION);     

    req.onsuccess = function (e) {
        db = this.result;
        console.log("openBD DONE");      

        //obtiene los datos para que rellene los campos.
        email = sessionStorage.getItem("email");
     
        var tx = db.transaction(DB_STORE_NAME, "readwrite");
        var store = tx.objectStore(DB_STORE_NAME);     
        
        request = store.get(email);

        let datos;
      
        request.onsuccess = function (e) {
           datos = e.target.result;

           var nombreEdit = document.getElementById("editname");
           var userEdit = document.getElementById("editusername");
           var emailEdit = document.getElementById("editemail");
       
           nombreEdit.value =  datos.name;
           userEdit.value = datos.username;
           emailEdit.value = datos.email;
        };
    
        request.onerror = function (e) {
            console.error("Connection error", this.error);
        };
    
        tx.oncomplete = function () {
            db.close();  
        }; 
    };

    req.onerror = function(event) {
        console.error("openBD:", event.target.errorCode);
    };
};

function updateUser() {
    
    var updateName = document.getElementById("editname");
    var updateUser = document.getElementById("editusername");
    var updateEmail = document.getElementById("editemail");

    let datos = JSON.parse(sessionStorage.getItem("profile"));

    var obj = {
        name: updateName.value, 
        username: updateUser.value, 
        email: updateEmail.value,
        password: datos.password,
        avatar: datos.avatar,
    };
    
    var req = indexedDB.open(database, DB_VERSION);   

    req.onsuccess = function (event) {
        db = this.result;
        console.log("openBD DONE");      

        var tx = db.transaction(DB_STORE_NAME, "readwrite");
        var store = tx.objectStore(DB_STORE_NAME);          

        request = store.put(obj);

        request.onsuccess = function (e) { 
           datos = e.target.result;
           console.log("funciona");
           location.replace("./index_admin.html");

            // let datos;
            request.onsuccess = function (e) { 
                datos = e.target.result;
                console.log("funciona");
                location.replace("./index_admin.html");
            };
        
            request.onerror = function (e) {
                console.error("Connection error", this.error);
            };

            tx.oncomplete = function () {
                db.close();  
            }; 
        };
    };

    req.onerror = function(event) {
        console.error("openBD:", event.target.errorCode);
    };
};

//Funcion para mostrar el pop-up de modificar la contraseña.

function showPassword(){
    var editor = document.getElementById("formPassword");
    editor.style.display = "block";
};

//Función para modificar la contraseña
function changePassword (){
    
    var passwdUser = document.getElementById("editpassword");
    var passwdConfirm = document.getElementById("confirmpassword");
    var errorDetected = false;

    var errorPassword = document.getElementById("passwordError");
    var errorPassword2 = document.getElementById("passwordError2");

    if (passwdUser.value === ''){
        errorPassword.innerText = "The password fields are empty";
        errorPassword.style.display = "block";
        errorDetected = true;
        console.log("Password is not correct");
    } else {
        errorPassword.style.display = "none";
    }
    if (passwdConfirm.value === ''){
        errorPassword2.innerText = "The password fields are empty";
        errorPassword2.style.display = "block";
        errorDetected = true;
        console.log("Password is not correct");
    } else {
        errorPassword2.style.display = "none";
    }

    if (passwdConfirm.value != passwdUser.value) {
        errorPassword2.innerText = "The password is not the same";
        errorPassword2.style.display = "block";
        errorDetected = true;
        console.log("Password is not correct");
    }
    if(errorDetected) {
        console.log("Error detected");
        return; 
    } else {
        console.log("Email is correct");
        errorPassword2.style.display = "none"; 
        console.log("Password is correct");
        errorPassword.style.display = "none";
        console.log("All good");
    }
    
    //Accede a los datos del perfil.
    let datos = JSON.parse(sessionStorage.getItem("profile"));
    var obj = {
        name:datos.name,
        username:datos.username,
        email:datos.email,
        password:passwdUser.value,
        admin:datos.admin,
        avatar:datos.avatar
    };

    // password: CryptoJS.MD5(passwdUser.value),
    
    var req = indexedDB.open(database, DB_VERSION);   
    console.log("h");
    req.onsuccess = function (event) {
        db = this.result;
        console.log("openBD DONE");      

        var tx = db.transaction(DB_STORE_NAME, "readwrite");
        var store = tx.objectStore(DB_STORE_NAME); 

        request = store.put(obj);

        request.onsuccess = function (e) { 
           datos = e.target.result;
           console.log("funciona");
           
            // let datos;

            request.onsuccess = function (e) { 
                datos = e.target.result;
                console.log("funciona");
                location.replace("./index_admin.html");
            };
        
            request.onerror = function (e) {
                console.error("Connection error", this.error);
            };

            tx.oncomplete = function () {
                db.close();  
            }; 
        };
    };

    req.onerror = function(event) {
        console.error("openBD:", event.target.errorCode);
    };
};

window.addEventListener('load', (event) => {
    if(window.location.pathname.includes("/index.html")) {
        sendDataForm.addEventListener("click", (event) => {
            sendData();
        });
    } else {
        getData();
    }
});

