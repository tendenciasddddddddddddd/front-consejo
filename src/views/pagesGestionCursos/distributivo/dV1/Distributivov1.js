import Spinner from "../../../../shared/Spinner";
import IsSelect from '../../../../shared/IsSelect';
import CustomInput from "../../../../shared/CustomInput.vue";
import ButtonLoading from "../../../../shared/ButtonLoading.vue";
import Paginate2 from "../../../../shared/Paginate2.vue";
import AlertHeader from "../../../../shared/AlertHeader.vue";
import ActionsRow from "../../../../shared/ActionsRow.vue";
export default {
    name: 'Distrivutivov1',
    components: {
        Spinner,IsSelect, CustomInput,
        ButtonLoading,
        Paginate2,
        AlertHeader,
        Modal: () => import(/* webpackChunkName: "Modal" */ "../../../../shared/Modal.vue"),
        Dropdown: () => import(/* webpackChunkName: "Dropdown" */ "../../../../shared/Dropdown.vue"),
        ActionsRow
      },
    data(){
      return {
          isPeriodo: false,
          isCurso: false,
          isMateria: false,
          isDocente: false,
          ifLoad: false,
          isLoading: false,
          info: {},
          model:{
            nombre: 'Intensivo',
            fnivel: null,
            fdocente: null,
            fmateria: null,
            facademicos: null,
            paralelo: null,
          },
          listPeriodo: {},
          listniveles: {},
          listDocentes: {},
          listMaterias: {},
          paralelos: [
            {
              value: "0",
              nombre: "B",
            },
            {
              value: "1",
              nombre: "G",
            },

          ],
          isSelecUsers: [],
          subtitulo: 'none',
          iseliminaddo : false,
          isCarga: false,
          selected: [],
          allSelected: false,
          userIds: [],
          visible: false,
          selecDocente: '',
          selecParalelos: '',
          idperiodoActualIntensivo: null,
          rows: 6,
      }
    },
    methods: {
      __getPeriodo() {
        this.isPeriodo = true;
        this.$proxies._matriculaProxi
          .getFull()
          .then((x) => {
            const filtro = x.data.niveles;
            if (!filtro.length) {
              this.$dialog.alert('NO HAY REGISTROS EN PERIODOS ACADÉMICOS !!');
              this.$router.push("/").catch(() => {});
              return;
            }
            let listPeriodoIntensivo = filtro.filter((x) => x.typo == "Intensivo" && x.estado == '1');
            if (listPeriodoIntensivo.length==0) {
              this.$dialog.alert('¡¡¡--NO EXISTE UN PERIODO ACADÉMICO ACTIVO PARA ESTA MODALIDAD.. REGISTRE O ACTIVE UN PERIODO ACADÉMICO--!!!')
              this.$router.push("/").catch(() => {});
              return;
            }
            this.idperiodoActualIntensivo = listPeriodoIntensivo[0]._id;
            this.isPeriodo = false;
          })
          .catch((err) => {
            console.log("Error", err);
            this.isPeriodo = false;
          });
      },
      selectOne(ids) {
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
      changedQuery(num) {
        this.rows = num;
        this.getAll(1, num);
      },
      onPageChange(page) {
        this.getAll(page, this.rows);
      },
       __listNivele() {
        //-----------TRAE LA LISTA DE LOS ROLES
        this.isCurso = true;
        this.$proxies._gestionProxi
          .getNiveles()
          .then((x) => {
            let filtrosNiveles = x.data;
            this.listniveles = filtrosNiveles.filter((x) => x.modalidad == 'Intensivo');
            this.isCurso = false;
          })
          .catch((err) => {
            console.log("Error", err);
            this.isCurso = false;
          });
      },
      __listdocentes() {
        //-----------TRAE LA LISTA DE LOS ROLES
        this.isDocente = true;
        this.$proxies._registroProxi
          .getListDocentes()
          .then((x) => {
            this.listDocentes = x.data;
            this.isDocente = false;
          })
          .catch((err) => {
            console.log("Error", err);
            this.isDocente = false;
          });
      },
      __listmaterias() {
        //-----------TRAE LA LISTA DE LOS ROLES
        this.isMateria = true;
        this.$proxies._gestionProxi
          .getListMaterias()
          .then((x) => {
            this.listMaterias = x.data;
            this.isMateria = false;
          })
          .catch((err) => {
            console.log("Error", err);
            this.isMateria = false;
          });
      },
      save() {
        //-----------BOTTON DE GUADAR TIENE VALIDAR Y SI EL ID ES NULL ENTONCES GUARDA
        this.isSelecUsers= [];
        this.$validate().then((success) => {
          //METODO PARA GUARDAR
          if (!success) {
            this.toast("Por favor llena correctamente los campos solicitados");
            return;
          }
          if(this.model._id){
            this.ifLoad = true;
            this.model.fnivel = this.model.fnivel._id;
            this.model.fdocente = this.selecDocente._id;
            this.model.fmateria = this.model.fmateria._id;
            this.model.facademicos = this.idperiodoActualIntensivo;
            this.model.paralelo = this.selecParalelos.nombre;
            this.$proxies._gestionProxi.updateDistributivo(this.model._id, this.model)
              .then(() => {
                this.toast("REGISTRO EXITOSO!");
                this.__clear();
                this.ifLoad = false;
                this.getAll(this.pagina,6);
              })
              .catch((x) => {
                alert("Error"+x);
                this.ifLoad = false;
              });    
          }else{
            this.ifLoad = true;
            this.model.fnivel = this.model.fnivel._id;
            this.model.fdocente = this.selecDocente._id;
            this.model.fmateria = this.model.fmateria._id;
            this.model.facademicos = this.idperiodoActualIntensivo;
            this.model.paralelo = this.selecParalelos.nombre;
            this.$proxies._gestionProxi
              .createDistributivo(this.model) //-----------GUARDAR CON AXIOS
              .then(() => {
                this.ifLoad = false;
                this.toast("REGISTRO EXITOSO!");
                this.__clear();
                this.getAll(this.pagina,6);
              })
              .catch(() => {
                this.ifLoad = false;
                this.$dialog.alert('ERROR SERVER NOT FOUND')
              });
          }      
        });
      },
      getAll(pag, lim) {
        this.isLoading = true;
        this.subtitulo = lim + ' filas por página';
          let modalidad = 'Intensivo';
          this.$proxies._gestionProxi
            .getAllDistributivo(pag, lim, modalidad) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
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

      gets() { 
        let isArray = this.isSelecUsers.length;
        if(isArray===1){
          this.isCarga = true; 
        this.openModal();
        this.$proxies._gestionProxi.getDistributivo(this.isSelecUsers[0])
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
              this.toast("Se elimino registros de esta tabla!");
            }, 600);
          })
          .catch(function() {});
      },
      dialogDelete() {
          this.iseliminaddo = true;
          let isArray = this.isSelecUsers.length;
          if(isArray>0){
            this.$proxies._gestionProxi
          .removeDistributivo(this.isSelecUsers)
              .then(() => {
                this.iseliminaddo = false;
                this.isSelecUsers= [];
                this.getAll(this.pagina,6); 
                this.allSelected = false;
              })
              .catch(() => {
                console.log("Error imposible");
              });
         }
      },
      openModal() {
        this.visible = true;
        this.model._id = "";
        this.model.fnivel = null;
        this.model.paralelo = null;
        this.model.fdocente = null;
        this.model.fmateria = null;
      },
      close() {
        this.visible = false;
      },
      __clear(){
        this.model._id = "";
        this.model.fnivel = null;
        this.model.fmateria = null;
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
    },
    created() {
        this.__getPeriodo();
        this.getAll(1,6);
        this. __listNivele();
            this.__listdocentes();
            this. __listmaterias();
    },
  
    validators: {
        "model.fnivel"(value) {
            return this.$validator.value(value).required();
          },
          "selecParalelos"(value) {
            return this.$validator.value(value).required();
          },
          "selecDocente"(value) {
            return this.$validator.value(value).required();
          },
          "model.fmateria"(value) {
            return this.$validator.value(value).required();
          },
      },
}