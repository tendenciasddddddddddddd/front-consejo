import Spinner from '../../../shared/Spinner'
export default {
    name: 'Nota',
    components:{
        Spinner
    },
    data() {
        return {
            info: {},
            user: this.$store.state.user,
            isData: false,
            listNota: null,
            tabla: "notas",
            isVisible: 'nota1',
        }
    },
    methods: {
        getData(){
            this.isData = true;
            if(this.user.id){
             this.$proxies._notasProxi
             .get(this.user.id)
             .then((x) => {
               this.info = x.data;
               this.isData = false;
             })
             .catch((err) => {
               console.log("Error", err);
               this.isData = false;
             });
            }
        },
    },
    created() {
        this.getData();
    },
};