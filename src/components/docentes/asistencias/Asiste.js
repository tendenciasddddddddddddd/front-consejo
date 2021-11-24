import Spinner from '../../../shared/Spinner'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    name: 'Asite',
    components:{Spinner, DatePicker},
    props: {
        paralelo: {
          type: String,
        },
        nombre: {
            type: String,
        },
        materia :{
            type: String,
        }
    },
    data() {
        return {
           panelAsistencias: 'open',
           ispanel: 'open1',
           para: this.paralelo,
           name: this.nombre,
           mate : this.materia,
           isData: false,
           info: {},
           time1: null,
           inAlumnos: [],
           colors: ['#00875a', '#00b8d9', '#6554c0', '#ff5630', '#57d9a3'],
        }
    },
    methods: {
        getData(){
            if(this.$route.params.id){
                this.isData = true;
                    this.$proxies._notasProxi
                    .getAsistencias(this.$route.params.id)
                    .then((x) => {
                        let estudiantes = x.data;
                        this.info = estudiantes.filter((x)=> x.curso ==this.para);
                        this.empujarAlumnos();
                    }).catch((x) => {
                        console.log("Error",x)
                        this.isData = false;
                    });
            }  
       },
       empujarAlumnos(){
        this.inAlumnos= [];
        for (let i = 0; i <this.info.length;i++) {
            let iniciales = this.info[i].nombre;
            var arregloDeSubCadenas = iniciales.split(" ");
            let subcadena = arregloDeSubCadenas[0].substring(0, 1);
            var random = this.colors[Math.floor(Math.random()*this.colors.length)]
            this.inAlumnos.push({name:iniciales,img:subcadena,colors: random});
       } 
       this.isData = false; //PARA EL SNNIPER DE GARDATA
  },
    },
    created() {
        this.getData();
    },
};