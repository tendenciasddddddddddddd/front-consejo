import Spinner from '../../../../shared/Spinner'
export default {
    name : 'Aulaprincipal',
    components:{Spinner},
    data() {
        return {
            info: null,
            isData: false,
            tabb: "cerrarr",
            isTabb: 'un',
        }
    },
    methods: {
        getData(){
           this.isData = true;
           if(this.$route.params.id){
            this.$proxies._aulaProxi
            .get(this.$route.params.id)
            .then((x) => {
              this.info = x.data;
              console.log(this.info)
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