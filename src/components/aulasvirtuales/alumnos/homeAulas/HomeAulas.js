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
            inAlumnos: [],
            isCargar: false,
            colors: ['#00875a', '#00b8d9', '#6554c0', '#ff5630', '#57d9a3'],
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
              this.isData = false;
            })
            .catch((err) => {
              console.log("Error", err);
              this.isData = false;
            });
           }
       },

       empujarAlumnos(){
             this.inAlumnos= [];
             this.tabb= "iniciarr";
             this.isCargar= true;
            for (let i = 0; i <this.info.estudiantes.length;i++) {
                 let iniciales = this.info.estudiantes[i].name;
                 var arregloDeSubCadenas = iniciales.split(" ");
                 let subcadena = arregloDeSubCadenas[0].substring(0, 1)+arregloDeSubCadenas[2].substring(0, 1);
                 var random = this.colors[Math.floor(Math.random()*this.colors.length)]
                 this.inAlumnos.push({name:iniciales,img:subcadena,colors: random});
            } 
            this.isCargar= false;
       },

    },
    
    created() {
         this.getData();
         
    },

};