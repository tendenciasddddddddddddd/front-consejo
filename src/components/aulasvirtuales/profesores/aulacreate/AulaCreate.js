
import { VueEditor} from "vue2-editor";
export default {
    name: 'AulaCreate',
    components:{
         VueEditor
       },
    data() {
        return {
          tab: "iniciar",
          isVisible: 'ventana1',
           user: this.$store.state.user,
           fistname: '',
           ifLoad: false,
            model: {
              _id: null,
              fecha: null, 
              fdocente: null, 
              nombre: null,
              materia: null, 
              codigo: null, 
              descripcion: null,
              icono: null,
              doc: null,
            },
            htmlForEditor: "",
            
              customToolbar: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                
              ],
        }
    },
    methods: {
      appInit(){
        const info = JSON.parse(localStorage.getItem("Xf"));
        this.fistname = info.nombre;
      },
      save() {
        //-----------BOTTON DE GUADAR TIENE VALIDAR Y SI EL ID ES NULL ENTONCES GUARDA
        this.$validate().then((success) => {
          //METODO PARA GUARDAR
          if (!success) {
            this.$notify({
              group: "global",
              text: "Por favor llena correctamente los campos solicitados",
            });
            return;
          }
          if (this.user.id) {
            this.model.fdocente = this.user.id;
            this.model.fecha = this.__calcularFecha();
            this.ifLoad = true;
            this.model.doc = this.fistname;
            this.$proxies._aulaProxi
              .create(this.model) //-----------EDITAR CON AXIOS
              .then(() => {
                this.ifLoad = false;
                this.$router.push("/aulas-lista");
              })
              .catch((err) => {
                console.log("Error", err);
                this.ifLoad = false;
              });
           } else{
             console.log("No esta identificado")
           }
        });
      },
      __calcularFecha() {
        let tiempoTranscurrido = Date.now();
        let hoy = new Date(tiempoTranscurrido);
        return hoy.toLocaleString();
      },
    },
    created() {
      this.appInit()
    },
    validators: { //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
      'model.nombre'(value) {
        return this.$validator
          .value(value)
          .required()
          .minLength(5)
          .maxLength(50);
      },
      'model.materia'(value) {
          return this.$validator
            .value(value)
            .required()
            .minLength(3)
            .maxLength(50);
      },
      'model.codigo'(value) {//
        return this.$validator
          .value(value)
          .required()
          .minLength(5)
          .maxLength(50);
    },
    'model.descripcion'(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(10)
    },
    'model.icono'(value) {
      return this.$validator
        .value(value)
        .required()
    },
    },
};