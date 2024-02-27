export default {
    name: "Formulario",
    props: ["msg_autor", "msg_title", "saveimg"],
    emits:["create_post"],
    data(){
        return{
            form: {
                title: "",
                resum: "",
                autor: "",
                fecha: "",
                img: '',
                publication_status: 'borrador',
            }
        } 
    },
    methods: {
        create_post:function(){
            this.$emit("create_post");
        }
    },
    template: `
    <div class="form" id="formulario">
        <p class="title_createPost">CREATE DE POST</p>
        <div class="form-control">
            <label for="title">Title</label>
            <p v-if="msg_title">This field cannot be empty</p>
            <input type="text" v-model="form.title" id="title">
        </div>
        <div class="form-control">
            <label for="resum">Summary</label>
            <textarea v-model="form.resum" id="resum"></textarea>
        </div>

        <div class="form-control">
            <label for="autor">Autor</label>
            <p v-if="msg_autor">This field cannot be empty</p>
        <!--Drop-down to indicate which category the author belongs to.-->
            <select v-model="form.autor" id="autor">
                <option>ART</option>
                <option>INTERVIEW</option>
                <option>SHOPPING</option>
                <option>GASTRONOMY</option>
                <option>OTHER ARTICLES</option>
            </select>
        </div>
        <div class="form-control">
            <label for="image">Image</label>
            <input type="file" @change="saveimg">
        </div>
        <!--Button to create post-->
        <button type="button" @click="createPost()">Create</button> 
    </div>
    `,
}