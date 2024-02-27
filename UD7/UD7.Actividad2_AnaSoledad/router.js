//Importamos los componentes
import Hello from "./Hello.js";

const Home = {template: '<div>Home</div>'};

//Definimos una variable para nuestras rutas.
let router = VueRouter.createRouter({
    history:VueRouter.createWebHistory(),
    routes: [
        {path: '/', name: "Home", component: Home},
        {path: '/hello', component: Hello},
    ]
});

export default router

