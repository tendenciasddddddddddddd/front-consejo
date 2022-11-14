import Spinner from '../../../shared/Spinner';
import RestResource from '../../../service/isAdmin'
const restResourceService = new RestResource();
//IMPORTAR HIJOS
import FullModal from "../../../shared/FullModal.vue";
import CustomInput from "../../../shared/CustomInput.vue";
import ButtonLoading from "../../../shared/ButtonLoading.vue";
export default {
  name: "AddDocentes",
  components:{
      Spinner,
      FullModal, CustomInput, ButtonLoading
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
      tab: "init",
      tabla: "ontask",
      info: null,
      isLoading: false,
      popular:'Crear Docente',
      ifLoad: false,
      ifcarga: false,
      model: {
        _id: null,
        email: null,
        password: null,
        cedula: null,
        foto: "https://res.cloudinary.com/dvpp07pji/image/upload/v1666453678/avatar_didazq.webp",
        typo: "DOCS",
        telefono: null,
        updatedAt: null,
        role: null,
        fullname: null,
        sexo: '',
        fketnia: '',
        fknacionalidad: '',
        fkparroquia: null,
        titulo: null,
      },
    };
  },
  methods: {
    get() {
      if (this.idKey) {
        this.popular ="Editar Docente"
        this.ifcarga = true;
        this.$proxies._registroProxi
          .getDocentes(this.idKey)
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
            .updateDocentes(this.model._id, this.model) 
            .then(() => {
              this.ifLoad = false;
              this.$emit('clickDocente')
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
            .createDocentes(this.model)
            .then(() => {
              this.ifLoad = false;
              this.$emit('clickDocente')
            })
            .catch((error) => {
              this.ifLoad = false;
              if (error.response) {
                if (error.response.status == 400) {
                  this.toast(' error.response.data.message');
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

    __getPasswods(apell, ced) {
      let l = apell.toLowerCase().charAt(0);
      let result = l + ced;
      return result;
    },
    onChange(event) {
      let hoy = new Date();
      let fechaNacimiento = new Date(event.target.value);
      let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
      if (
        diferenciaMeses < 0 ||
        (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
      ) {
        edad--;
      }
      this.model.edad = edad;
    },
    close(){
      this.$emit('myEventClosedMOdalDocente');
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
      if(!restResourceService.admin(this.roles)){
        this.$router.push("/");
      }
    }
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
        .maxLength(50);
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
