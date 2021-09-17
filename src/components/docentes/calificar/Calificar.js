const info = JSON.parse(localStorage.getItem('Xf'));
import Spinner from '../../../shared/Spinner'
export default {
    name: 'Calificar',
    components:{
        Spinner
    },
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
          tab: "abrir",
          isVisible: 'pane1',
          isAlumno: '',
          isDoble : false,
          isDuplicado: false,
          isFoto: '',
            isData: false,
            info: null,
            coleccionNotas: null,
            detalleNotas: null,
            para: this.paralelo,
            name: this.nombre,
            mate : this.materia,
            docentes: info.nombre,
            isError: '',
            modalidad: '',
            ifLoad: false,
            model :{
                _id: null,
                notas: {
                    materia: '',
                    docente: '',
                    quimestre: '',
                    aporte11 :  '',
                    aporte12 :  '',
                    aporte13 :  '',
                    aporte14 :  '',
                    aporte15 :  '',
                    aporte21 :  '',
                    aporte22 :  '',
                    aporte23 :  '',
                    aporte24 :  '',
                    aporte25 :  '',
                    aporte31 :  '',
                    aporte32 :  '',
                    aporte33 :  '',
                    aporte34 :  '',
                    aporte35 :  '',
                    suma:  '',
                    promedio:  '',
                    examen:  '',
                },
            },
            confirma :{
                _id: null,
                confirmar : {
                    materia: '',
                    promedio:  '',
                }
            },
            searchQuery: null,
        }
    },
    computed: {
      resultQuery(){
        if(this.searchQuery){
        return this.info.filter((item)=>{
          return this.searchQuery.toLowerCase().split(' ').every(v => item.fkestudiante.apellidos.toLowerCase().includes(v))
        })
        }else{
          return this.info
        }
      }
    },
    methods: {
        getData(){
            this.isData = true;
            if(this.$route.params.id){
                this.isData = true;
                if(this.name=='Intensivo'){
                        this.modalidad = 'm1'
                } else{
                    this.modalidad = 'm2'
                } 
                this.$proxies._notasProxi.getAll(this.$route.params.id,this.para,this.modalidad)
                .then((x) => {
                    this.info = x.data;
                    this.isData = false;
                }).catch(() => {
                    console.log("Error")
                    this.isData = false;
                });
            }  
    },
    save() {
        //-----------BOTTON DE GUADAR TIENE VALIDAR Y SI EL ID ES NULL ENTONCES GUARDA
        this.$validate().then((success) => {
          //METODO PARA GUARDAR
          if (!success) {
            this.isDoble= true;
            return;
          }
          if (this.model._id) {
            this.algorotmoNotas();
            if(this.algoritmoDuplicados(this.model.notas.quimestre)) {
                this.isDuplicado=true;
                return;
            }
            this.model.notas.materia = this.mate;
            this.model.notas.docente = this.docentes;
            this.ifLoad = true;
            this.$proxies._notasProxi
              .update(this.model._id, this.model) //-----------EDITAR CON AXIOS
              .then(() => {
                this.ifLoad = false;
                this.isVisible='pane5';
                this.getData();
                
              })
              .catch((err) => {
                console.log("Error", err);
                this.ifLoad = false;
                this.tab='salida';
              });
           } 
        });
      },
      OptenerMatricula(obj){
        this.__limpiarCampos();
        this.model._id = obj._id;
        this.coleccionNotas = obj;
        this.isAlumno = obj.fkestudiante.apellidos;
        this.isFoto = obj.fkestudiante.foto;
        this.tab = 'inicios';
        this.isVisible = 'pane1';
      },
      algorotmoNotas(){
          let suma = parseFloat(this.model.notas.aporte11) + parseFloat(this.model.notas.aporte12) + parseFloat(this.model.notas.aporte13)
                     + parseFloat(this.model.notas.aporte14) + parseFloat(this.model.notas.aporte15) + 
                     parseFloat(this.model.notas.aporte21) +  parseFloat(this.model.notas.aporte22) +  parseFloat(this.model.notas.aporte23)
                     + parseFloat(this.model.notas.aporte24) +  parseFloat(this.model.notas.aporte25) + 
                     parseFloat(this.model.notas.aporte31) + parseFloat(this.model.notas.aporte32) + parseFloat(this.model.notas.aporte33)
                     + parseFloat(this.model.notas.aporte34) + parseFloat(this.model.notas.aporte35);

         let promedio = (suma / 15).toFixed(2);
         let proNotas = (promedio * 8) / 10;
         let proExamen = (this.model.notas.examen * 2) / 10;
         this.model.notas.suma = suma
         this.model.notas.promedio = (proNotas + proExamen).toFixed(2);
      },
      algoritmoDuplicados(quim){
        let data = this.coleccionNotas.notas.filter((x)=>x.quimestre==quim && x.materia==this.mate);
        if(data.length > 0){
            return true;
        }else{
            return false;
        }
      },
      ConfirmarNota(obj){
        if (confirm('ESTA SEGURO QUE QUIERE CONFIRMAR ESTAS CALIFICACIONES?')) {
            let quim1 = obj.notas.filter((x)=>x.materia == this.mate && x.quimestre=='p1');
            let quim2 = obj.notas.filter((x)=>x.materia == this.mate && x.quimestre=='p2');
            let total = parseFloat(quim1[0].promedio) + parseFloat(quim2[0].promedio);
            let promedio = (total / 2).toFixed(2);
            this.confirma._id = obj._id;
            this.confirma.confirmar.materia = this.mate;
            this.confirma.confirmar.promedio = promedio;
            this.$proxies._notasProxi
              .confirm(this.confirma._id, this.confirma) //-----------EDITAR CON AXIOS
              .then(() => {
                this.getData();
              })
              .catch((err) => {
                console.log("Error", err);
              });
        }
         
      },
      DetalleNotas(obj){
        this.__limpiarCampos();
         this.detalleNotas = obj;
         this.model.notas = obj;
         this.tab = 'inicios';
         this.isVisible = 'pane1';
      },
     __limpiarCampos(){
        this.model._id = '';
        this.model.notas.quimestre = '';
        this.model.notas.aporte11  = '';
        this.model.notas.aporte12  = '';
        this.model.notas.aporte13  = '';
        this.model.notas.aporte14  = '';
        this.model.notas.aporte15  = '';
        this.model.notas.aporte21  = '';
        this.model.notas.aporte22  = '';
        this.model.notas.aporte23  = '';
        this.model.notas.aporte24  = '';
        this.model.notas.aporte25  = '';
        this.model.notas.aporte31  = '';
        this.model.notas.aporte32  = '';
        this.model.notas.aporte33  = '';
        this.model.notas.aporte34  = '';
        this.model.notas.aporte35  = '';
        this.model.notas.suma  = '';
        this.model.notas.promedio = '';
        this.model.notas.examen = '';
        this.isError= '';
        this.coleccionNotas = null;
        this.isDoble = false;
        this.isDuplicado=false;
        this.isAlumno = '';
     }
  },
  created() {
    this.getData();
  },

  validators: {

    "model.notas.quimestre"(value) {
        return this.$validator.value(value).required();
    },
   
      "model.notas.aporte11": function(value) {
        return this.$validator.value(value).required().regex('^[0-9.]*$', 'Para decimales así 7.5');
      },
      "model.notas.aporte12"(value) {
        return this.$validator.value(value).required().regex('^[0-9.]*$', 'Para decimales así 7.5');
      },
      "model.notas.aporte13"(value) {
        return this.$validator.value(value).required().regex('^[0-9.]*$', 'Para decimales así 7.5');
      },
      "model.notas.aporte14"(value) {
        return this.$validator.value(value).required().regex('^[0-9.]*$', 'Para decimales así 7.5');
      },
      "model.notas.aporte15"(value) {
        return this.$validator.value(value).required().regex('^[0-9.]*$', 'Para decimales así 7.5');
      },
      "model.notas.aporte21"(value) {
        return this.$validator.value(value).required().regex('^[0-9.]*$', 'Para decimales así 7.5');
      },
      "model.notas.aporte22"(value) {
        return this.$validator.value(value).required().regex('^[0-9.]*$', 'Para decimales así 7.5');
      },
      "model.notas.aporte23"(value) {
        return this.$validator.value(value).required().regex('^[0-9.]*$', 'Para decimales así 7.5');
      },
      "model.notas.aporte24"(value) {
        return this.$validator.value(value).required().regex('^[0-9.]*$', 'Para decimales así 7.5');
      },
      "model.notas.aporte25"(value) {
        return this.$validator.value(value).required().regex('^[0-9.]*$', 'Para decimales así 7.5');
      },
      "model.notas.aporte31"(value) {
        return this.$validator.value(value).required().regex('^[0-9.]*$', 'Para decimales así 7.5');
      },
      "model.notas.aporte32"(value) {
        return this.$validator.value(value).required().regex('^[0-9.]*$', 'Para decimales así 7.5');
      },
      "model.notas.aporte33"(value) {
        return this.$validator.value(value).required().regex('^[0-9.]*$', 'Para decimales así 7.5');
      },
      "model.notas.aporte34"(value) {
        return this.$validator.value(value).required().regex('^[0-9.]*$', 'Para decimales así 7.5');
      },
      "model.notas.aporte35"(value) {
        return this.$validator.value(value).required().regex('^[0-9.]*$', 'Para decimales así 7.5');
      },
      "model.notas.examen"(value) {
        return this.$validator.value(value).required().regex('^[0-9.]*$', 'Para decimales así 7.5');
      },
  },
}