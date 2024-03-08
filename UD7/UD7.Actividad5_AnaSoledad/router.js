
import Formulario from "./components/Formulario.js";
import Lista from "./components/Lista.js";

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {path: '/Formulario', name: "Formulario", params:{item:{}} ,component: Formulario},
        {path: '/', name: "Lista", component: Lista},
    ]
});

export default router