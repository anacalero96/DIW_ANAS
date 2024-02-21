export default {
    name: "Posts",
    props:["item"],
    methods: {
         
    },
    template: `
        <h1 class="title-listposts">LIST OF POSTS</h1>
        <p>{{item.title}} {{item.resum}} {{item.autor}} {{item.img}} {{item.fecha}}</p>
        <img v-bind:src="item.img">
        <button id="btn_delete" type="button" @click="deletePost(item)">DELETE</button>
        <button id="btn_edit" type="button" @click="editPost(item)">EDIT</button>
     `,
}