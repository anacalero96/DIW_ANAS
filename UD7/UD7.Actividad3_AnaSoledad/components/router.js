
import Formulario from "./Formulario.js";

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {path: '/Formulario', name: "Formulario", component: Formulario},
    ]
});

export default router