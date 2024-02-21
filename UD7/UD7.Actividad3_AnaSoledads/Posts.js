export default {
    name: "Posts",
    props:["list"],
    template: `
        <p>{{item.title}} {{item.resum}} {{item.autor}} {{item.img}} {{item.fecha}}</p>
            <img v-bind:src="item.img">
            <button id="btn_delete" type="button" @click="deletePost(item)">DELETE</button>
            <button id="btn_edit" type="button" @click="editPost(item)">EDIT</button> `,
}