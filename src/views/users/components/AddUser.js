import Spinner from '../../../shared/Spinner'
import CustomInput from "../../../shared/CustomInput.vue";
import RestResource from '../../../service/isAdmin';
import ButtonLoading from "../../../shared/ButtonLoading.vue";
import FullModal from "../../../shared/FullModal.vue";
const restResourceService = new RestResource();
export default {
  name: "CreaUsuario",
  components: {
    Spinner, CustomInput, ButtonLoading, FullModal
  },
  props: {
    idGet: {
      type: String,
    },
  },
  data() {
    return {
      roles: this.$store.state.user.roles,
      idKey: this.idGet,
      tabla: true,
      info: null,
      listRol:[],
      isLoading: false,  ifLoad:false,
      checked:"",
      isRol:"",
      model: {//-----------VARIABLES DEL MODELO A GUARDAR
        _id: null, username: null,  email: null,
        password: null, nombres: null, apellidos: null,
        cedula: null, foto: 'https://res.cloudinary.com/dvpp07pji/image/upload/v1666453678/avatar_didazq.webp', typo: 'ADMS',
        telefono: null,
        updatedAt:null, role:null,fullname : null,
     },
     isedit : false,
     isRole : false
    };
  },
  methods: {
    verificarUsuario(){
      if(!restResourceService.admin(this.roles)){
        this.$router.push("/");
      }
    },
    get (){
          if(this.idKey){
            this.isedit = true;
            this.$proxies._usuarioProxi.get(this.idKey)
            .then((x) => {
                this.model = x.data;
                this.isRol = x.data.roles[0]
                this.checked= this.isRol
                this.isedit= false;
            }).catch(() => {
                console.log("Error")
                this.isedit= false;
            });
          }
    },
    save() {
        this.$validate().then(success => { //METODO PARA GUARDAR 
          if (!success&&this.checked==''){ 
              this.toast('Por favor llena correctamente los campos solicitados')
              return
            }
          if (this.model._id) { //-----------SI EL ID TIENE VALOR ENTONCES ES EDITAR
            this.ifLoad = true;
            this.model.role = this.checked;
            this.model.fullname = this.model.apellidos +" "+ this.model.nombres;
            this.$proxies._usuarioProxi.update(this.model._id, this.model)//-----------EDITAR CON AXIOS
              .then(() => {
                this.ifLoad = false;
                this.$emit('clickUser')
              })
              .catch((err) => {
                console.log("Error",err)
                this.ifLoad = false;
              });
          } else {  //-----------DE LO CONTRARIO ENTRA A SER UN DOCUMENTO NUEVO
            this.ifLoad = true;
            this.model.username = this.model.cedula;
            this.model.password =this.__getPasswods(this.model.apellidos,this.model.cedula);
            this.model.role = this.checked;
            this.model.fullname = this.model.apellidos +" "+ this.model.nombres;
            this.$proxies._usuarioProxi.create(this.model) //-----------GUARDAR CON AXIOS
              .then(() => {
                this.ifLoad = false;
                this.$emit('clickUser')
              })
              .catch((error) => {//-----------EN CASO DE TENER DUPLICADO LOS DOCUMENTOS EL SERVIDOR LANZARA LA EXEPCION
                this.ifLoad = false;
                if(error.response){
                  if(error.response.status==400){
                    this.toast(error.response.data.message);
                  }
                }
                else if(error.request){
                  this.$dialog.alert('❌ Error en el servidor no se pudo completar la solicitud')
                }else{
                  console.log('Error', error.message); 
                }
              }); 
          }
        });
      },
      __listRol(){
        this.isRole = true;
        this.$proxies._usuarioProxi.getRoles()
        .then((x) => {
          this.listRol = x.data;
          this.isRole = false;
        })
        .catch((err) => {
          console.log("Error", err)
          this.isRole = false;
        });
      },
      __getPasswods(apell, ced){//-----------CREA LA CONTRASEÑAS PARA LOS USUARIOS EJMPLO {M1004095632}
         let l = apell.toLowerCase().charAt(0);
         let result = l+ced;
         return result;
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
      close(){
        this.$emit('myEventClosedMOdalUser');
      }
  },
  mounted() {
    this.verificarUsuario();
    this.get ();
    this.__listRol();
  },
  validators: { //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
    'model.cedula'(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(9)
        .maxLength(50);
    },
    'model.email'(value) {
      return this.$validator
        .value(value)
        .required()
        .email();
    },
    'model.nombres'(value) {
        return this.$validator
          .value(value)
          .required()
          .minLength(5)
          .maxLength(50);
    },
    'model.apellidos'(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(5)
        .maxLength(50);
  },
  'model.telefono'(value) {
    return this.$validator
      .value(value)
      .required()
      .minLength(9)
      .maxLength(12);
},

  },
};
