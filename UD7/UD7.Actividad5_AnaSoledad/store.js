
//Añadir el estado de la publicación
const store = Pinia.defineStore('store', {
    state: () => ({
        publication_status: 'borrador',
    }),
    //Comprueba el estado de la publicación
    getters: {

    },
    //Metodos usados para crear, eliminar, editar y publicar.
    actions: {

    }
});
export default store