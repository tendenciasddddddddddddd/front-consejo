import Spinner from '../../../shared/Spinner';
import IsSelect from "../../../shared/IsSelect";
import RestResource from '../../../service/isAdmin'
const restResourceService = new RestResource();
//IMPORTAR HIJOS
import FullModal from "../../../shared/FullModal.vue";
import CustomInput from "../../../shared/CustomInput.vue";
import Dropdown from "../../../shared/Dropdown.vue";
import ButtonLoading from "../../../shared/ButtonLoading.vue";
export default {
  name: "AddDocentes",
  components:{
      Spinner,
      FullModal, CustomInput, Dropdown, ButtonLoading,IsSelect
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
      listParroquia: {},
      isParroquia: false,
      isLoading: false,
      popular:'Crear Docente',
      ifLoad: false,
      ifcarga: false,
      
      model: {
        //-----------VARIABLES DEL MODELO A GUARDAR
        _id: null,
        username: null,
        email: null,
        password: null,
        nombres: null,
        apellidos: null,
        cedula: null,
        foto: "https://res.cloudinary.com/stebann/image/upload/v1631310792/profile_b9t64l.png",
        typo: "DOCS",
        telefono: null,
        updatedAt: null,
        role: null,
        fullname: null,
        ////////////////////////////////
        sexo: '',
        fketnia: '',
        fknacionalidad: '',
        fkparroquia: null,
        titulo: null,

      },
      listNacionalidad: {},
      isNacion: false,
      listEtnia: {},
      isEtnia: false,
      sexos: [
        {
          value: "0",
          nombre: "Masculino",
        },
        {
          value: "1",
          nombre: "Femenino",
        },
        {
          value: "2",
          nombre: "Otros",
        },
        {
          value: "3",
          nombre: "No conforme",
        },
      ],
    };
  },
  methods: {
    listEtnias() {
      //-----------TRAE LA LISTA DE LOS ROLES
      this.isEtnia = true;
      this.$proxies._registroProxi
        .getEtnias()
        .then((x) => {
          this.listEtnia = x.data.datas;
          this.isEtnia = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isEtnia = false;
        });
    },
    listNacion() {
      this.isNacion = true;
     this.$proxies._registroProxi
        .getNacionalidad()
        .then((x) => {
          this.listNacionalidad = x.data.datas;
          this.isNacion = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isNacion = false;
        });
    },
    get() {
      //-----------EN CASO DE QUE SE QUIERA EDITAR EL ID TIENE UN VALOR Y HACE UNA CONSULTA GET
      
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
            console.log("Error");
          });
      }
    },
    save() {
      //-----------BOTTON DE GUADAR TIENE VALIDAR Y SI EL ID ES NULL ENTONCES GUARDA
      this.$validate().then((success) => {
        //METODO PARA GUARDAR
        if (!success) {
          this.toast('Por favor llena correctamente los campos solicitados');
          return;
        }
        if (this.model._id) {
          //-----------SI EL ID TIENE VALOR ENTONCES ES EDITAR
          this.ifLoad = true;
          this.model.sexo = this.model.sexo.nombre;
          this.model.fkparroquia = this.model.fkparroquia.nombre;
          this.model.fknacionalidad = this.model.fknacionalidad.nombre;
          this.model.fketnia = this.model.fketnia.nombre;
          this.model.fullname = this.model.apellidos +" "+ this.model.nombres;
          this.$proxies._registroProxi
            .updateDocentes(this.model._id, this.model) //-----------EDITAR CON AXIOS
            .then(() => {
              this.ifLoad = false;
              //this.router.go('/usuarios/Usuario')
              this.$emit('clickDocente')
            })
            .catch((err) => {
              console.log("Error", err);
              this.ifLoad = false;
            });
        } else {
          //-----------DE LO CONTRARIO ENTRA A SER UN DOCUMENTO NUEVO
          this.ifLoad = true;
          this.model.username = this.model.cedula;
          this.model.password = this.__getPasswods(
            this.model.apellidos,
            this.model.cedula
          );
            this.model.sexo = this.model.sexo.nombre;
            this.model.fkparroquia = this.model.fkparroquia.nombre;
            this.model.fknacionalidad = this.model.fknacionalidad.nombre;
            this.model.fketnia = this.model.fketnia.nombre;
          this.model.fullname = this.model.apellidos +" "+ this.model.nombres;
          this.$proxies._registroProxi
            .createDocentes(this.model) //-----------GUARDAR CON AXIOS
            .then(() => {
              this.ifLoad = false;
              this.$emit('clickDocente')
            })
            .catch((error) => {
              //-----------EN CASO DE TENER DUPLICADO LOS DOCUMENTOS EL SERVIDOR LANZARA LA EXEPCION
              this.ifLoad = false;
              if (error.response) {
                if (error.response.status == 400) {
                  this.$notify({
                    group: "global",
                    text: error.response.data.message,
                  });
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

    __listParroquias() {
      this.isParroquia = true;
      this.$proxies._registroProxi
        .getParroquia()
        .then((x) => {
          this.listParroquia = x.data.datas;
          this.isParroquia = false;
        })
        .catch(() => {
          this.isParroquia = false;
        });
    },
    __getPasswods(apell, ced) {
      //-----------CREA LA CONTRASEÑAS PARA LOS USUARIOS EJMPLO {M1004095632}
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
    this.__listParroquias();
    this.listEtnias();
    this.listNacion();
  },

  validators: {
    //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
    "model.cedula"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(9)
        .maxLength(50);
    },
    "model.email"(value) {
      return this.$validator
        .value(value)
        .required()
        .email();
    },
    "model.nombres"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(5)
        .maxLength(50);
    },
    "model.apellidos"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(5)
        .maxLength(50);
    },
    "model.telefono"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(9)
        .maxLength(12);
    },

    "model.titulo"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(2)
        .maxLength(80);
    },
      "model.fkparroquia"(value) {
        return this.$validator.value(value).required();
      },
      "model.fketnia"(value) {
        return this.$validator.value(value).required();
      },
      "model.sexo"(value) {
        return this.$validator.value(value).required();
      },
      "model.fknacionalidad"(value) {
        return this.$validator.value(value).required();
      },
  },
};
