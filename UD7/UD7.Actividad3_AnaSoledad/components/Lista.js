import Posts from "./Posts.js"; 
export default{
    name: "Lista",
    data(){
      return{
        list:[],
        editing: false,
      }  
    },
    components:{
        Posts,
    },
    created(){
        let objeto = JSON.parse(localStorage.getItem("posts"));
        this.list = objeto;
    },
    methods: {
        deletePost: function(item){
            this.list.splice(
                this.list.indexOf(item), 1
            );
            localStorage.setItem("posts", JSON.stringify(this.list));
        }, 
        editPost: function(item){ 
            this.editing = true;
            localStorage.setItem("editing", this.list.indexOf(item));
            this.$router.push(`/Formulario`);
            // this.editIndex =  this.list.indexOf(item);
        },
        publishedPost: function(item) {
            this.list.splice(
                this.list.indexOf(item), 1, {
                    title: item.title,
                    resum: item.resum,
                    autor: item.autor,
                    img: item.img,
                    fecha: item.fecha,
                    publication_status: "publicado",
                }
            );
            localStorage.setItem("posts", JSON.stringify(this.list));
        },
    },
    template: `
    <div id="lista">
        <!--Habrá un botón para crear nuevo post y cuando lo pulses, se mostrará la vista del formulario de crear posts-->
        <h1 class="title-listposts">LIST OF POSTS</h1>
        <router-link to="/Formulario">New Post</router-link>
        <Posts v-for="item in list" :item="item" v-on:delete_post="deletePost" v-on:edit_post="editPost" v-on:published_post="publishedPost"></Posts>
    </div>
    `
}