import Spinner from '../../../../shared/Spinner';
import IsSelect from '../../../../shared/IsSelect';
import CustomInput from "../../../../shared/CustomInput.vue";
import ButtonLoading from "../../../../shared/ButtonLoading.vue";
import Paginate2 from "../../../../shared/Paginate2.vue";
import AlertHeader from "../../../../shared/AlertHeader.vue";
import ActionsRow from "../../../../shared/ActionsRow.vue";
export default {
    name: 'ListCanton',
    components: {
        Spinner,IsSelect, CustomInput,
        ButtonLoading,
        Paginate2,
        AlertHeader,
        ActionsRow,
        Modal: () => import(/* webpackChunkName: "Modal" */ "../../../../shared/Modal.vue"),
        Dropdown: () => import(/* webpackChunkName: "Dropdown" */ "../../../../shared/Dropdown.vue"),
    },
    data() {
        return {
            totalNotas: 0,
            paginaActual: 1,
            info: {}, 
            listprov:{},
            ifLoad:false,
            MsmError : "",
            pagina: 0,
            paginas: 0,
            isLoading: false, //EL SNIPPER CARGA EN FALSO
            isProvincia: false,
            model: {//-----------VARIABLES DEL MODELO A GUARDAR
              _id: null, 
              nombre: null,  
              fkProvincia:null,
              prov:null,
           },
           isSelecUsers: [],
           subtitulo: 'none',
           iseliminaddo : false,
           isCarga: false,
           visible: false,
           rows: 6,
           allSelected: false,
           isSearch: false,
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
                this.toast('Por favor llena correctamente los campos solicitados');
                  return
              }
                if(this.model._id){
                  this.ifLoad = true;
                  this.model.prov = this.model.fkProvincia._id;
                  this.model.fkProvincia = this.model.fkProvincia.nombre;
                  this.$proxies._zonasProxi.updateCanton(this.model._id, this.model)
                    .then(() => {
                      this.close();
                      this.MsmError ="";
                      this.ifLoad = false;
                      this.getAll(this.pagina,6); 
                    })
                    .catch(() => {
                      console.log("Error")
                    });    
                }else{
                  this.ifLoad = true;
                  this.model.prov = this.model.fkProvincia._id;
                  this.model.fkProvincia = this.model.fkProvincia.nombre;
                  this.$proxies._zonasProxi.createCanton(this.model) //-----------GUARDAR CON AXIOS
                  .then(() => {
                    this.ifLoad = false;
                    this.close();
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
              this.openModal();
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
          changeSearch(textSearch) { //queryUsuario
            if (textSearch.length > 3) {
              this.isSearch = true;
              this.isLoading = true;
              this.$proxies._zonasProxi
                .queryCanton(textSearch) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
                .then((x) => {
                  this.info = x.data;
                  this.isLoading = false;
                })
                .catch(() => {
                  console.log("Error imposible");
                  this.isLoading = false;
                });
            }
          },
          salirBusqueda: function() {
            this.getAll(1, 6);
            this.isSearch = false;
          },
          changedQuery(num) {
            this.rows = num;
            this.getAll(1, num);
          },
          onPageChange(page) {
            this.getAll(page, this.rows);
          },
          selectUser(ids) {
            if (!this.isSelecUsers.includes(ids)) {
              this.isSelecUsers.push(ids);
            } else {
              this.isSelecUsers.splice(this.isSelecUsers.indexOf(ids), 1);
            }
          },
          selectAll: function() {
            this.allSelected= true;
            this.isSelecUsers = [];
            if (this.allSelected) {
              for (let user in this.info) {
                this.isSelecUsers.push(this.info[user]._id);
              }
            } 
          },
          deletedSelected: function() {
            this.allSelected= false;
            this.isSelecUsers = [];
          },
          remove() {
            let message = {
              title: "¿Destruir registro?",
              body: " Esta acción no se puede deshacer",
            };
            let options = {
              loader: true,
              okText: "Continuar",
              cancelText: "Cancelar",
              animation: "bounce",
            };
            this.$dialog
              .confirm(message, options)
              .then((dialog) => {
                this.dialogDelete();
                setTimeout(() => {
                  dialog.close();
                  this.toast("Se elimino registro de sistema con su cuenta");
                }, 600);
              })
              .catch(function() {});
          },
          dialogDelete() {
            this.iseliminaddo = true;
            if (this.isSelecUsers.length > 0) {
              this.$proxies._zonasProxi
                .removeCanton(this.isSelecUsers)
                .then(() => {
                  this.iseliminaddo = false;
                  this.isSelecUsers = [];
                  this.getAll(this.pagina, 6);
                  this.allSelected= false;
                })
                .catch(() => {
                  console.log("Error imposible");
                });
            }
          },
          desactiveState(){//activateNivel
            let message = {
              title: "¿Cambiar el estado?",
              body: " Esta acción cambiara el estado de los registros",
            };
            let options = {
              loader: true,
              okText: "Continuar",
              cancelText: "Cancelar",
              animation: "bounce",
            };
            this.$dialog
              .confirm(message, options)
              .then((dialog) => {
                this.dialogState();
                setTimeout(() => {
                  dialog.close();
                  this.toast("Se cambio el estado del registro");
                }, 600);
              })
              .catch(function() {});
          },
          dialogState() {
            if (this.isSelecUsers.length > 0) {
              let reg = this.info.filter((x)=> x._id == this.isSelecUsers[0]);
              let state = reg[0].estado == 1 ? 0 : 1;
              this.$proxies._zonasProxi
               .activateCanton(this.isSelecUsers, state)
                .then(() => {
                  this.iseliminaddo = false;
                 this.isSelecUsers = [];
                  this.getAll(this.pagina, 6);
                })
                 .catch(() => {
                   console.log("Error imposible");
                 });
            }
          },
          openModal() {
            this.visible = true;
            this.model._id = "";
            this.model.nombre = "";
            this.model.prov="";
            this.model.fkProvincia="";
            this.MsmError="";
          },
          close() {
            this.visible = false;
          }, 
        toast(message) {
          this.$toasted.info(message, {
            duration: 2600,
            position: "top-center",
            icon: "check-circle",
            theme: "toasted-primary",
            action: {
              text: "CERRAR",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
        },
        verificarUsuario(){
          let text_1 = 'Zonas'
        let text_2 = 'Cantón'
        this.$store.commit('updateHeader',{text_1, text_2})
        },
    },
    created() {
      this.verificarUsuario();
          this.getListProv();
          this.getAll(1,6);
      },
      validators: { //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
        'model.nombre'(value) {
          return this.$validator
            .value(value)
            .required()
            .minLength(3)
            .maxLength(20);
        },
        'model.fkProvincia'(value) {
          return this.$validator
            .value(value)
            .required()
        },
    },
}