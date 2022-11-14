import Spinner from "../../../shared/Spinner";
import RestResource from "../../../service/isAdmin";
const restResourceService = new RestResource();
import ServiceRegiste from "../../../service/funcions";
const ResultServiceEstudiante = new ServiceRegiste();
import FullModal from "../../../shared/FullModal.vue";
import CustomInput from "../../../shared/CustomInput.vue";
import ButtonLoading from "../../../shared/ButtonLoading.vue";
export default {
  name: "CreaUsuario",
  components: {
    Spinner,
    FullModal, CustomInput, ButtonLoading,
    
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
      info: null,
      isLoading: false,
      ifLoad: false,
      mensaje: "",
      ifcarga: false,
      isParroquia: true,
      model: {
        _id: null,
        email: '',
        password: null,
        cedula: null,
        foto:
          "https://res.cloudinary.com/dvpp07pji/image/upload/v1666453678/avatar_didazq.webp",
        typo: "ESTS",
        telefono: '',
        updatedAt: null,
        role: null,
        fullname: null,
        sexo: '',
        fketnia: '',
        fknacionalidad: '',
        fkparroquia: null,
      },
      checked: "",
      valido: false,
    };
  },
  methods: {
    get() {
      if (this.idKey) {
        this.ifcarga = true;
        this.$proxies._registroProxi
          .get(this.idKey)
          .then((x) => {
            this.model = x.data;
            this.ifcarga = false;
          })
          .catch(() => {
            this.ifcarga = false;
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
          this.model.fullname = this.model.fullname.trim();
          this.model.cedula = this.model.cedula.trim();
           this.$proxies._registroProxi
             .update(this.model._id, this.model) 
             .then(() => {
               this.ifLoad = false;
               this.$emit('clickAlumnos')
               this.close();
             })
             .catch(() => {
              this.toast("CEDULA DUPLICADA");
              this.ifLoad = false;
            });
        } else {
          this.ifLoad = true;
          this.model.fullname = this.model.fullname.trim();
          this.model.cedula = this.model.cedula.trim();
          this.model.password = this.__getPasswods(
            this.model.fullname,
            this.model.cedula
          );
          this.$proxies._registroProxi
            .create(this.model) 
            .then(() => {
              this.ifLoad = false;
              this.$emit('clickAlumnos')
               this.close();
            })
            .catch((error) => {
              this.ifLoad = false;
              if (error.response) {
                if (error.response.status == 400) {
                  this.toast(error.response.data.message);
                }
                if (error.response.status == 500) {
                  this.toast("No se puede procesar los datos");
                }
              } else if (error.request) {
                alert("duplicado 2");
              } else {
                console.log("Error", error.message);
              }
            });
        }
      });
    },

    clickAlumnos(){
      this.$emit('clickAlumnos');
    },

    __getPasswods(apell, ced) {
      let l = apell.toLowerCase().charAt(0);
      let result = l + ced;
      return result;
    },
    __validarCedula(event) {
      let ced = event.target.value;
      if (ced.length > 8) {
        this.mensaje = ResultServiceEstudiante.verificarCedula(ced);
      }
    },

    onChange(event) {
      let email = event.target.value;
      if (email.length>7) {
       this.valido = ResultServiceEstudiante.validarEmail(email);
      }
    },
    verificarUsuario() {
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      }
    },
 
    close(){
      this.$emit('myEventClosedMOdalAlumno');
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
    this.verificarUsuario();
    this.get();
  },

  validators: {
    "model.cedula"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(2)
        .maxLength(20);
    },
    "model.fullname"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(5)
        .maxLength(50);
    },
  },
};
