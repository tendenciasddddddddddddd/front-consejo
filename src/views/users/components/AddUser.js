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
      listRol: [],
      isLoading: false, ifLoad: false,
      checked: "",
      isRol: "",
      model: {
        _id: null, email: null,
        password: null, nombres: null, apellidos: null,
        cedula: null, foto: 'https://res.cloudinary.com/dvpp07pji/image/upload/v1666453678/avatar_didazq.webp', typo: 'ADMS',
        telefono: null,
        updatedAt: null, role: null, fullname: null,
      },
      isedit: false,
      isRole: false
    };
  },
  methods: {
    verificarUsuario() {
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      }
    },
    get() {
      if (this.idKey) {
        this.isedit = true;
        this.$proxies._usuarioProxi.get(this.idKey)
          .then((x) => {
            this.model = x.data;
            this.isRol = x.data.roles[0]
            this.checked = this.isRol
            this.isedit = false;
          }).catch(() => {
            this.isedit = false;
          });
      }
    },
    save() {
      this.$validate().then(success => {
        if (!success) {
          this.toast('Por favor llena correctamente los campos solicitados')
          return
        }
        if (this.checked=='') {
          this.toast('Por favor llena correctamente los campos solicitados')
          return
        }
        if (this.model._id) {
          this.ifLoad = true;
          this.model.apellidos = this.model.apellidos.trim();
          this.model.nombres = this.model.nombres.trim();
          this.model.cedula = this.model.cedula.trim();
          this.model.role = this.checked;
          this.model.fullname = this.model.apellidos + " " + this.model.nombres;
          this.$proxies._usuarioProxi.update(this.model._id, this.model)
            .then(() => {
              this.ifLoad = false;
              this.$emit('clickUser')
            })
            .catch((error) => {
              this.ifLoad = false;
              if (error.response) {
                if (error.response.status == 400) {
                  this.toast(error.response.data.message);
                }
                if (error.response.status == 500) {
                  this.toast(error.response.data.message);
                }
              }
              else if (error.request) {
                this.$dialog.alert('❌ Error en el servidor no se pudo completar la solicitud')
              } 
              this.toast('CEDULA YA EXISTE');
            });
        } else {
          this.ifLoad = true;
          this.model.apellidos = this.model.apellidos.trim();
          this.model.nombres = this.model.nombres.trim();
          this.model.cedula = this.model.cedula.trim();
          this.model.password = this.__getPasswods(this.model.apellidos, this.model.cedula);
          this.model.role = this.checked;
          this.model.fullname = this.model.apellidos + " " + this.model.nombres;
          this.$proxies._usuarioProxi.create(this.model)
            .then(() => {
              this.ifLoad = false;
              this.$emit('clickUser')
            })
            .catch((error) => {
              this.ifLoad = false;
              if (error.response) {
                if (error.response.status == 400) {
                  this.toast(error.response.data.message);
                }
              }
              else if (error.request) {
                this.$dialog.alert('❌ Error en el servidor no se pudo completar la solicitud')
              } else {
                console.log('Error', error.message);
              }
            });
        }
      });
    },
    __listRol() {
      this.isRole = true;
      this.$proxies._usuarioProxi.getRoles()
        .then((x) => {
          this.listRol = x.data;
          this.isRole = false;
        })
        .catch(() => {
          this.isRole = false;
        });
    },
    __getPasswods(apell, ced) {
      let l = apell.toLowerCase().charAt(0);
      let result = l + ced;
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
    close() {
      this.$emit('myEventClosedMOdalUser');
    }
  },
  mounted() {
    this.verificarUsuario();
    this.get();
    this.__listRol();
  },
  validators: {
    'model.cedula'(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(6)
        .maxLength(20);
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
        .integer()
        .minLength(9)
        .maxLength(12);
    },

  },
};
