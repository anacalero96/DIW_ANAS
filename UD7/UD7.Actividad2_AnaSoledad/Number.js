export default {
    name: "Number",
    props:["numero"],
    methods: {
        clicNumber: function(item){
            this.$emit("clicked-numero", item);
        }
    },
    template:`
        <div>
            <input type="button" v-bind:value="numero" @click="clicNumber(numero)">
        </div>
    `,

}