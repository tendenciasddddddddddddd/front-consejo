 import Spinner from "../../shared/Spinner";
import RestResource from '../../service/isAdmin'
import NoFound from "../../shared/NoFound"
const restResourceService = new RestResource();
const avat = require('../../assets/img/icons/profile.jpg')
import ButtonLoading from "../../shared/ButtonLoading.vue";
import CustomInput from "../../shared/CustomInput.vue";
export default {
  name: "Perfil",
  components: {
    Spinner,
    ButtonLoading, CustomInput,NoFound,
    Avatar: () =>import( /* webpackChunkName: "Avatar" */ "./pages/Avatar.vue"),
  },
  data() {
    return {
      img: avat,
      roles: this.$store.state.user.roles,
      user: this.$store.state.user,
      foto: '',
      name: '',
      file: "",
      isVisible: 'pan1',
      istabs : '1',
      img1: null,
      isImageUploads: false,
      ifcarga: false,
      ifLoad : false,
      isVisile: true,
      model: {
        //-----------VARIABLES DEL MODELO A GUARDAR
        _id: null,
        username: null,
        email: null,
        fullname: null,
        cedula: null,
        sexo: null,
        fketnia: null,
        fknacionalidad: null,
        fkparroquia: null,
      },
      infos:{
        foto: null,
        nombre: null,
        correo: null,
      },
      isAvatar: false,
      nomb: false,
    };
  },
  methods: {
    open(){
      this.isAvatar = true;
    },
    close(){
      this.isAvatar = false;
    },
    inforUsers(){
      const info = JSON.parse(localStorage.getItem('Xf'));
      const avatar = JSON.parse(localStorage.getItem('Avatar'));
      this.foto = avatar
      this.name = info.nombre;
    },

    get() {
        this.isVisile= false;
        this.$Progress.start();
        if (this.user.id) {
          this.ifcarga = true;
          this.$proxies._registroProxi
            .getDocentes(this.user.id)
            .then((x) => {
              this.model = x.data;
              this.ifcarga = false;
              this.$Progress.finish();
            })
            .catch(() => {
              console.log("Error");
              this.$Progress.fail();
            });
        }
      },
      save() {
        this.$validate().then((success) => {
          if (!success) {
            this.toast('Por favor llena correctamente los campos solicitados');
            return;
          }
          if (this.model._id) {
            this.ifLoad = true;
            this.$proxies._registroProxi
              .updateDocentes(this.model._id, this.model) //-----------EDITAR CON AXIOS
              .then(() => {
                this.ifLoad = false;
                this.get();
              })
              .catch((err) => {
                console.log("Error", err);
                this.ifLoad = false;
              });
           } 
        });
      },
      changeAvatar(value){
        this.foto = value;
      },
      toast(message) {
        this.$toasted.info(message, {
            duration: 3000,
            position: 'bottom-center',
            icon: "check-circle",
            theme: "toasted-primary",
            action: {
                text: 'CERRAR',
                onClick: (e, toastObject) => {
                    toastObject.goAway(0);
                }
            }
        });
    },
    verificarUsuario(){
      let text_1 = 'Cuenta'
      let text_2 = 'De perfil'
      this.$store.commit('updateHeader',{text_1, text_2})
      if(!restResourceService.docente(this.roles)&&!restResourceService.estudiante(this.roles)&&!restResourceService.admin(this.roles)){
        this.$router.push("/");
      }
    }
  },
  created() {
    this.verificarUsuario();
    this.get();
    this.inforUsers();
  },
  validators: {
    //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS

    "model.fullname"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(5)
        .maxLength(50);
    },
  },
};
