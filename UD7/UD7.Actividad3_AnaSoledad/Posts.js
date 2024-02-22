export default {
    name: "Posts",
    props:["item"],
    emits: ["delete_post", "edit_post", "published_post"],
    methods: {
        delete_post:function(item){
            console.log("entrado");
            this.$emit("delete_post", item);
        },
        edit_post:function(item){
            this.$emit("edit_post", item);
        },
        published_post:function(item){
            this.$emit("published_post", item);
        }
    },
    template: `
    <div id="style_post">
        <p>{{item.title}} {{item.resum}} {{item.autor}} {{item.img}} {{item.fecha}}</p>
        <img v-bind:src="item.img">
        <button id="btn_delete" type="button" @click="delete_post(item)">DELETE</button>
        <button id="btn_edit" type="button" @click="edit_post(item)">EDIT</button>
        <button id="btn_published" type="button" @click="published_post(item)" v-if="item.publication_status=='borrador'">PUBLISH</button>
    </div>
        
  `,
}