export default {
    name: "Posts",
    props:["item"]
,
    methods: {
        delete_post: function(item){
            console.log("entrado");
            this.$emit("delete_post", item);
        },
        edit_post:function(item){
            this.$emit("edit_post", item);
        }
    },
    template: `
        <p>{{item.title}} {{item.resum}} {{item.autor}} {{item.img}} {{item.fecha}}</p>
        <img v-bind:src="item.img">
        <button id="btn_delete" type="button" @click="delete_post(item)">DELETE</button>
        <button id="btn_edit" type="button" @click="edit_post(item)">EDIT</button>
  `,
}