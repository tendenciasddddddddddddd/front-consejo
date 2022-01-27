
import Spinner from '../../../../shared/Spinner'
import IsSelect from '../../../../shared/IsSelect'
export default {
    name: 'ListCanton',
    components: {
        Spinner,IsSelect
    },
    data() {
        return {
            totalNotas: 0,
            paginaActual: 1,
            info: null, 
            listprov:{
                _id:null,
                nombre: null
            },
            ifLoad:false,
            MsmError : "",
            pagina: 0,
            paginas: 0,
            isLoading: false, //EL SNIPPER CARGA EN FALSO
            isProvincia: false,
            model: {//-----------VARIABLES DEL MODELO A GUARDAR
              _id: null, 
              nombre: null,  
              estado: null,
              fkProvincia:null,
              prov:null,
           },
           isSelecUsers: [],
           modals: 'closed',
           subtitulo: 'none',
           iseliminaddo : false,
           isCarga: false,
        }
    },
    methods: {
        getAll(pag, lim) {
            this.isLoading = true;
            this.subtitulo = lim + ' filas por página';
            this.$proxies._zonasProxi
              .getAllCanton(pag, lim) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
              .then((x) => {
                this.info = x.data.datas;
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
          getListProv(){
            this.isProvincia = true;
            this.$proxies._zonasProxi
            .getListProvicnias() //EJECUTA LOS PROXIS QUE INYECTA AXIOS
            .then((x) => {
              this.listprov = x.data;
              this.isProvincia = false;
            })
            .catch(() => {
              console.log("Error imposible");
              this.isLoading = false;
              this.isProvincia = false;
            });
          },
          save() {
            this.isSelecUsers= [];
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
                  this.model.prov = this.model.fkProvincia._id;
                  this.model.fkProvincia = this.model.fkProvincia.nombre;
                  this.$proxies._zonasProxi.updateCanton(this.model._id, this.model)
                    .then(() => {
                      this.modals = 'cls';
                      this.MsmError ="";
                      this.ifLoad = false;
                      this.getAll(this.pagina,6); 
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
                  this.model.prov = this.model.fkProvincia._id;
                  this.model.fkProvincia = this.model.fkProvincia.nombre;
                  
                  
                  this.$proxies._zonasProxi.createCanton(this.model) //-----------GUARDAR CON AXIOS
                  .then(() => {
                    this.ifLoad = false;
                    this.modals = 'cls';
                    this.getAll(this.pagina,6); 
                  })
                  .catch((error) => {//-----------EN CASO DE TENER DUPLICADO LOS DOCUMENTOS EL SERVIDOR LANZARA LA EXEPCION
                    this.ifLoad = false;
                    if(error.response){
                      if(error.response.status==500){
                        this.MsmError = "Error "+ this.model.nombre + " ya esta registrado"
                      }
                    }else{
                      console.log('Error', error.message); 
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
            this.$proxies._zonasProxi.getId(this.isSelecUsers[0])
                .then((x) => {
                    this.model = x.data;
                    this.isCarga = false; 
                }).catch(() => {
                    console.log("Error")
                    this.isCarga = false; 
                });
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
                this.$proxies._zonasProxi
                  .removeCanton(this.isSelecUsers)
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
          __limpiarCampos() { //LIMPIAR CAMPOS DE EL MODAL
            this.model._id = "";
            this.model.nombre = "";
            this.model.estado = 0;
            this.MsmError ="";
            this.model.prov="";
            this.model.fkProvincia="";
            this.modals = 'openn';
        }, //----FIN----
    },
    watch: {
        "$route.query.pagina": {
          immediate: true,
          handler(pagina) {
            
            pagina = parseInt(pagina) || 1;
            this.getAll(pagina,6);
            this.isSelecUsers= [];
            this.paginaActual = pagina;
          },
        },
      },
      mounted() {
          this.getListProv();
      },
      validators: { //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
        'model.nombre'(value) {
          return this.$validator
            .value(value)
            .required()
            .minLength(3)
            .maxLength(20);
        },
    },
}