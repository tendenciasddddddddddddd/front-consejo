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
        }
    },
    methods: {
        getData(){
            this.isData = true;
            if(this.$route.params.id){
                this.isData = true;
                if(this.name=='Intensivo'){
                    this.modalidad = 'm1'
                } else if (this.name=='Extraordinaria'){
                    this.modalidad = 'm2'
                } else{
                    this.modalidad = ''
                }
                if(this.modalidad!=''){
                    this.$proxies._notasProxi.getAsistencias(this.$route.params.id,this.para)
                    .then((x) => {
                        let estudiantes = x.data;
                        this.info = estudiantes.filter((x)=> x.typo ==this.modalidad);
                        this.isData = false;
                        console.log(this.info)
                    }).catch(() => {
                        console.log("Error")
                        this.isData = false;
                    });
                }
                
            }  
     },
    },
    created() {
        this.getData();
    },
};