export default {
    name: "Formulario",
    data(){
        return{
            form: {
                title: "",
                resum: "",
                autor: "",
                fecha: "",
                img: '',
                publication_status: 'borrador',
            },
            list:[],
            editing: false,
            editIndex: -1,       //Variable indicating that the post is being edited.
            msg_title: false,
            msg_autor: false,
        } 
    },
    mounted(){
        let objeto = JSON.parse(localStorage.getItem("posts"));
        // console.log(objeto);
        // console.log(this.list);

        this.list = objeto!=null?objeto:[];
        if(localStorage.getItem("editing") != null){
            this.editing = true;
            this.editIndex = localStorage.getItem("editing");
            this.form.title = this.list[this.editIndex].title;
            this.form.resum = this.list[this.editIndex].resum;
            this.form.autor = this.list[this.editIndex].autor;
            var img = this.list[this.editIndex].img.split("/");
            this.form.img = img[img.length-1];
            this.form.fecha = this.list[this.editIndex].fecha;
            this.form.publication_status = this.list[this.editIndex].publication_status;

            localStorage.removeItem("editing");
        }
        // this.list.indexOf(item);
    },
    methods: { 
        create_post:function(){
       
            if(this.form.title === ''){
                this.msg_title = true;
            } else {
                this.msg_title = false;
            }
           //Check that the author field is not empty.
            if(this.form.autor === ''){
                this.msg_autor = true;
            } else {
                this.msg_autor = false;
            }
            //If either field is empty, do not create the post.
            if(this.msg_autor || this.msg_title) {
                return;
            }
            // console.log(this.editing);
           
            //Conditional to check whether you are editing or creating.
            if(this.editing == true){
                this.editing = false;
                
                this.list.splice(
                    this.editIndex, 1, {
                        title: this.form.title,
                        resum: this.form.resum,
                        autor: this.form.autor,
                        img: '/UD7/UD7.Actividad3_AnaSoledad/img/'+ this.form.img,
                        fecha: this.form.fecha,
                        publication_status: this.form.publication_status,
                    }
                );
            } else {
                this.list.push({
                    title: this.form.title,
                    resum: this.form.resum,
                    autor: this.form.autor,
                    img: '/UD7/UD7.Actividad3_AnaSoledad/img/'+ this.form.img,
                    fecha: new Date().toLocaleDateString("es-ES", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}),
                    publication_status: this.form.publication_status,
                }); 
            }
            localStorage.setItem("posts", JSON.stringify(this.list));

            //Leave the form values empty.
            this.form.title = '';
            this.form.resum = '';
            this.form.autor = '';
            this.form.fecha = '';
            this.editIndex = -1;

            this.$router.push("/");
        },
        saveimg: function(event){
            //Stores the name of the image.
            this.form.img = event.target.files[0].name;
        },
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
        <button type="button" @click="create_post()">Save</button> 
    </div>
    `,
}