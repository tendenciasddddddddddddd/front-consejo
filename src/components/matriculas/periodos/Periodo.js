
import Spinner from '../../../shared/Spinner'
import Navss from '../../../shared/Navss'
//import VueTimepicker from 'vue2-timepicker'
//import 'vue2-timepicker/dist/VueTimepicker.css'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    name: 'Materias',
    components: {
        Spinner,Navss,DatePicker
    },
    data() {
        return {
            tabbla: "cier",
            time1: null,
            modals1 : 'openP',
            ids : '',
            name : '',
            totalNotas: 0,
            paginaActual: 1,
            info: null,
            ifLoad:false,
            checked:"",
            pagg: null,
            MsmError : "",
            pagina: 0,
            paginas: 0,
            modalidad:[
                {name: "Intensivo", id:"1"},
                {name: "Extraordinaria", id:"2"}
            ],
            isLoading: false, //EL SNIPPER CARGA EN FALSO
            isModalVisible: false,
            model: {//-----------VARIABLES DEL MODELO A GUARDAR
              _id: null, 
              nombre: null,  
              estado: null,
              inicia: null,
              finaliza: null,
              typo: null,
           },
          
        }
    },
    methods: {
        getAll(pag) {
            this.isLoading = true;
            this.$proxies._matriculaProxi
              .getAll(pag, 6) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
              .then((x) => {
                this.info = x.data.niveles;
                this.pagg = x.data;
                this.pagina = this.pagg.pagina;
                this.paginas = this.pagg.paginas;
                this.totalNotas = this.pagg.total;
                this.isLoading = false;
              })
              .catch(() => {
                console.log("Error imposible");
                this.isLoading = false;
              });
          },
          showModal() {
            this.isModalVisible = true;
          },
          save() {
            this.$validate().then(success => { 
              if (!success){ 
                this.$notify({
                    group: "global",
                    text: "Por favor llena correctamente los campos solicitados",
                  });
                  return
              }
                if(this.model._id){
                  this.ifLoad = true;
                  this.model.typo = this.checked
                  this.$proxies._matriculaProxi.update(this.model._id, this.model)
                    .then(() => {
                      
                      this.tabbla = 'cier';
                      this.ifLoad = false;
                      this.getAll(1);
                    })
                    .catch(() => {
                      console.log("Error")
                    });    
                }else{
                  this.ifLoad = true;
                  if(this.model.estado==true){
                    this.model.estado=1
                  }else{
                    this.model.estado =0
                  }
                  this.model.typo = this.checked
                  this.$proxies._matriculaProxi.create(this.model) //-----------GUARDAR CON AXIOS
                  .then(() => {
                    this.ifLoad = false;
                    
                    this.tabbla = 'cier';
                    this.getAll(1);
                  })
                  .catch((error) => {//-----------EN CASO DE TENER DUPLICADO LOS DOCUMENTOS EL SERVIDOR LANZARA LA EXEPCION
                    this.ifLoad = false;
                    if(error.response){
                      if(error.response.status==500){
                        this.MsmError = "Error ese registro ya existe"
                      }
                    }else{
                      console.log('Error', error.message); 
                    }
                  }); 
                }
           
            });
          },
          gets(id) { 
            this.__limpiarCampos();
            this.$proxies._matriculaProxi.get(id)
                .then((x) => {
                    this.model = x.data;
                    this.checked= this.model.typo;
                }).catch(() => {
                    console.log("Error")
                });
          },

          openModal(ids, name){
            this.ids = ids;
            this.name = name;
            this.modals1 = 'opennn';
          },
          __eliminar() {
            this.isLoading = true;
              this.$proxies._matriculaProxi
              .remove(this.ids) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
              .then(() => {
                this.$notify({
                  group: "global",
                  text: "Registro destruido",
                  
                });
                this.isLoading = false;
                this.getAll(1);
                this.modals1 = 'closedP';
              })
              .catch((x) => {
                alert("Error 401", x.response);
                this.modals1 = 'closedP';
              });
          },
          __limpiarCampos() { //LIMPIAR CAMPOS DE EL MODAL
            this.model._id = "";
            this.model.nombre = "";
            this.model.estado = 0;
            this.MsmError ="";
            this.model.inicia=null;
            this.model.finaliza=null;
            this.checked= "";
            this.tabbla = 'abre';
        }, //----FIN----
    },
    watch: {
        "$route.query.pagina": {
          immediate: true,
          handler(pagina) {
            pagina = parseInt(pagina) || 1;
            this.getAll(pagina);
            this.paginaActual = pagina;
          },
        },
     
      },
      validators: { //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
        'model.nombre'(value) {
          return this.$validator
            .value(value)
            .required()
            .minLength(3)
            .maxLength(30);
        },
        'model.inicia'(value) {
            return this.$validator
              .value(value)
              .required()
          },
          'model.finaliza'(value) {
            return this.$validator
              .value(value)
              .required()
          },
    },
}