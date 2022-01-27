
import Spinner from "../../../shared/Spinner";
export default {
  name: "Nivel",
  components: {
    Spinner,
  },
  data() {
    return {
      totalNotas: 0,
      paginaActual: 1,
      info: null,
      ifLoad: false,
      pagg: null,
      MsmError: "",
      pagina: 0,
      checked: "",
      paginas: 0,
      isLoading: false, //EL SNIPPER CARGA EN FALSO
      isModalVisible: false,
      model: {
        //-----------VARIABLES DEL MODELO A GUARDAR
        _id: null,
        nombres: null,
        modalidad: null,
        estado: null,
      },
      modalidad: [
        { name: "Intensivo", id: "1" },
        { name: "Extraordinaria", id: "2" },
      ],
      isSelecUsers: [],
      modals: 'closed',
      subtitulo: 'none',
      iseliminaddo : false,
      isCarga: false,
    };
  },
  methods: {
    getAll(pag, lim) {
      this.isLoading = true;
      this.subtitulo = lim + ' filas por página';
      this.$proxies._gestionProxi
        .getAll(pag, lim) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
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
   
    save() {
      this.isSelecUsers= [];
      this.$validate().then((success) => {
        if (!success) {
          this.$notify({
            group: "global",
            text: "Por favor llena correctamente los campos solicitados",
          });
          return;
        }
        if (this.model._id) {
          this.ifLoad = true;
          this.model.modalidad = this.checked;
          this.$proxies._gestionProxi
            .update(this.model._id, this.model)
            .then(() => {
              this.modals = 'cls';
                      this.MsmError ="";
                      this.ifLoad = false;
                      this.getAll(this.pagina,6); 
            })
            .catch(() => {
              console.log("Error");
            });
        } else {
          this.ifLoad = true;
          if (this.model.estado == true) {
            this.model.estado = 1;
          } else {
            this.model.estado = 0;
          }
          if (!this.checked) {
            this.MsmError = "Elegir la modalidad";
            this.ifLoad = false;
            return;
          }
          this.model.modalidad = this.checked;
          this.$proxies._gestionProxi
            .create(this.model) //-----------GUARDAR CON AXIOS
            .then(() => {
              this.ifLoad = false;
              this.modals = 'cls';
              this.getAll(this.pagina,6); 
            })
            .catch((error) => {
              //-----------EN CASO DE TENER DUPLICADO LOS DOCUMENTOS EL SERVIDOR LANZARA LA EXEPCION
              this.ifLoad = false;
              if (error.response) {
                if (error.response.status == 500) {
                  this.MsmError = "Error ese registro ya existe";
                }
              } else {
                console.log("Error", error.message);
              }
            });
        }
      });
    },
    gets() {
      let isArray = this.isSelecUsers.length;
      if(isArray===1){
        this.isCarga = true; 
      this.__limpiarCampos();
      this.$proxies._gestionProxi.get(this.isSelecUsers[0])
          .then((x) => {
              this.model = x.data;
              this.isCarga = false; 
              this.checked = this.model.modalidad;
          }).catch(() => {
              console.log("Error")
              this.isCarga = false; 
          });
      }
    },
    selectUser(key){
      let longitud = this.isSelecUsers.length;
      let isExiste = 0;
      if(longitud>0){
         for (let i = 0; i < this.isSelecUsers.length; i++) {
            if(this.isSelecUsers[i]==key){
             this.isSelecUsers.splice(i, 1); 
             isExiste = 1;
             break;
            }
         }
         if(isExiste===0){ 
           this.isSelecUsers.push(key);
         }
      }else{
       this.isSelecUsers.push(key);
      } 
    },
    remove() {
      //METODO PARA ELIMINAR  ROW
      if (
        confirm(
          "ESTA SEGURO QUE QUIERE ELIMINAR? YA QUE ESOS CAMBIOS NO SE PUEDE REVERTIR"
        )
      ) {
        this.iseliminaddo = true;
        let isArray = this.isSelecUsers.length;
        if(isArray>0){
          this.$proxies._gestionProxi
            .remove(this.isSelecUsers)
            .then(() => {
              this.iseliminaddo = false;
              this.isSelecUsers= [];
              this.getAll(this.pagina,6); 
               
            })
            .catch(() => {
              console.log("Error imposible");
            });
          this.$notify({
            group: "global",
            text: "Registro destruido",
          });
          
       }
      }
    },
   
    __limpiarCampos() {
      //LIMPIAR CAMPOS DE EL MODAL
      this.model._id = "";
      this.model.nombres = "";
      this.model.estado = 0;
      this.MsmError = "";
      this.checked = "";
      this.modals = 'openn';
    }, //----FIN----
  },
  watch: {
    "$route.query.pagina": {
      immediate: true,
      handler(pagina) {
        pagina = parseInt(pagina) || 1;
        this.isSelecUsers= [];
        this.getAll(pagina, 6);
        this.paginaActual = pagina;
      },
    },
  },
  validators: {
    //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
    "model.nombres"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(3)
        .maxLength(50);
    },
  },
};
