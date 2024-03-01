
import Formulario from "./Formulario.js";
import Lista from "./Lista.js";

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {path: '/Formulario', name: "Formulario", params:{item:{}} ,component: Formulario},
        {path: '/', name: "Lista", component: Lista},
    ]
});

export default router