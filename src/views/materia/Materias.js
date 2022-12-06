import Spinner from "../../shared/Spinner";
import CustomInput from "../../shared/CustomInput.vue";
import ButtonLoading from "../../shared/ButtonLoading.vue";
import Paginate2 from "../../shared/Paginate2.vue";
import ActionsRow from "../../shared/ActionsRow.vue";
export default {
    name: 'Materias',
    components: {
      Spinner,
      CustomInput,
      ButtonLoading,
      Paginate2,ActionsRow,
      Modal: () =>
        import(/* webpackChunkName: "Modal" */ "../../shared/Modal.vue"),
    },
    data() {
        return {
            totalNotas: 0,
            paginaActual: 1,
            info: {},
            ifLoad:false,
            pagg: {},
            MsmError : "",
            pagina: 0,
            paginas: 0,
            isLoading: false, //EL SNIPPER CARGA EN FALSO
            isModalVisible: false,
            model: {//-----------VARIABLES DEL MODELO A GUARDAR
              _id: null, 
              nombre: null,  
              area: '',
              estado: ''
           },
           isSelecUsers: [],
           subtitulo: 'none',
           iseliminaddo : false,
           isCarga: false,
           visible: false,
           allSelected: false,
           isComplentaria : ''
        }
    },

    methods: {
      verificarUsuario() {
        let text_1 = 'Gestion'
        let text_2 = 'Materias'
        this.$store.commit('updateHeader',{text_1, text_2})
      },
        getAll(pag, lim) {
          this.$Progress.start();
            this.isLoading = true;
            this.subtitulo = lim + ' filas por página';
            this.$proxies._gestionProxi
              .getAllMaterias(pag, lim)
              .then((x) => {
                this.info = x.data.niveles;
                this.pagg = x.data;
                this.pagina = this.pagg.pagina;
                this.paginas = this.pagg.paginas;
                this.totalNotas = this.pagg.total;
                this.isLoading = false;
                this.$Progress.finish();
              })
              .catch(() => {
                this.isLoading = false;
                this.$Progress.fail();
              });
          },
          changedQuery(num) {
            this.getAll(1, num);
          },
          onPageChange(page) {
            this.getAll(page, 8);
          },
          save() {
            this.isSelecUsers= [];
            this.$validate().then(success => { 
              if (!success){ 
                this.toast("Por favor llena correctamente los campos solicitados");
                  return
              }
                if(this.model._id){
                  this.ifLoad = true;
                  this.model.nombre = this.model.nombre.trim();
                  this.model.area = this.model.area.trim();
                  this.model.estado = this.isComplentaria == 1 ? 0 : 1;
                  this.$proxies._gestionProxi.updateMaterias(this.model._id, this.model)
                    .then(() => {
                      this.close();
                      this.MsmError ="";
                      this.ifLoad = false;
                      this.getAll(this.pagina,8);
                    })
                    .catch((error) => {
                      this.ifLoad = false;
                      if(error.response){
                        if(error.response.status==500){
                          this.MsmError = "Error ese registro ya existe"
                        }
                      }else{
                        console.log('Error', error.message); 
                      }
                    });    
                }else{
                  this.ifLoad = true;
                  this.model.nombre = this.model.nombre.trim();
                  this.model.area = this.model.area.trim();
                  this.model.estado = this.isComplentaria == 1 ? 0 : 1;
                  this.$proxies._gestionProxi.createMaterias(this.model)
                  .then(() => {
                    this.ifLoad = false;
                    this.close();
                    this.getAll(this.pagina,8);
                  })
                  .catch((error) => {
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
          gets() { 
            if(this.isSelecUsers.length===1){
              this.isCarga = true; 
              this.openModal();
              this.$proxies._gestionProxi.getMaterias(this.isSelecUsers[0])
                .then((x) => {
                    this.model = x.data;
                    this.isComplentaria = x.data.estado == 1 ? 0 : 1;
                    this.isCarga = false; 
                }).catch(() => {
                    console.log("Error")
                    this.isCarga = false; 
                });
            }           
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
            this.userIds = [];
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
                  this.toast("Se elimino registro exitosamente");
                }, 600);
              })
              .catch(function() {});
          },
          dialogDelete() {
            this.iseliminaddo = true;
            if (this.isSelecUsers.length > 0) {
              this.$proxies._gestionProxi
                .removeMaterias(this.isSelecUsers)
                .then(() => {
                  this.iseliminaddo = false;
                  this.deletedSelected();
                  this.getAll(this.pagina, 8);
                })
                .catch(() => {
                  this.iseliminaddo = false;
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
                //this.dialogState();
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
              this.$proxies._gestionProxi
               .activateMaterial(this.isSelecUsers, state)
                .then(() => {
                  this.iseliminaddo = false;
                 this.isSelecUsers = [];
                  this.getAll(this.pagina, 8);
                })
                 .catch(() => {
                  this.iseliminaddo = false;
                 });
            }
          },
          toast(message) {
            this.$toasted.info(message, {
              duration: 2600,
              position: "top-right",
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
          openModal() {
            this.visible = true;
            this.model._id = "";
            this.model.nombre = "";
            this.model.area = "";
            this.MsmError = "";
            this.isComplentaria = ""
          },
          close() {
            this.visible = false;
          },
    },
    created() {
      this.verificarUsuario();
      this.getAll(1, 8);
    },
      validators: { //area
        'model.nombre'(value) {
          return this.$validator
            .value(value)
            .required()
            .minLength(3)
            .maxLength(80);
        },
        'model.area'(value) {
          return this.$validator
            .value(value)
            .required()
            .minLength(3)
            .maxLength(80);
        },
    },
}