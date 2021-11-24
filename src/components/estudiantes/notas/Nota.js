//const info = JSON.parse(localStorage.getItem("Xf"));
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
            name: 'lola',
            isTabla: 'notasquimestre',
            inAlumnos: [],

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
               this.savep();
             })
             .catch((e) => {
               console.log("Error not found",e);
               this.isData = false;
             });
            }
        },
        savep() {
            //updateReforma2
              this.inAlumnos = [];
              
              let notas = this.info.calificaciones;
              for (let j = 0; j < notas.length; j++) {
                let id = this.info._id;
              let nombre = '';
              let materia= '';
              let parcial1 = 0;
              let parcial2 = 0;
              let promedio = 0;
              let foranea = "";


                promedio = notas[j].promediof;
                nombre = notas[j].docente;
                materia = notas[j].materia;
                let calificar = notas[j].notas;
                if (promedio == null) {
                    promedio = 0;
                  }
                for (let k = 0; k < calificar.length; k++) {
                    if (calificar[k].quimestre == "p1") {
                      parcial1 = calificar[k].promedio;
                    }
                    if (calificar[k].quimestre == "p2") {
                      parcial2 = calificar[k].promedio;
                    }
                }  
                foranea = notas[j]._id;
                this.inAlumnos.push({
                    id: id,
                    name: nombre,
                    par1: parcial1,
                    par2: parcial2,
                    promed: promedio,
                    fora: foranea,
                    materia : materia,
                  });
              }
          },
    },
    created() {
        this.getData();
    },
};