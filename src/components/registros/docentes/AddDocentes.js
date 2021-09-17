import Spinner from '../../../shared/Spinner'
import Navss from '../../../shared/Navss'
export default {
  name: "AddDocentes",
  components:{
      Navss,Spinner
  },
  data() {
    return {
      tab: "init",
      info: null,
      listNacionalidad: null,
      listEtnia: null,
      listParroquia: null,
      isLoading: false,
      popular:'Crear Docente',
      ifLoad: false,
      ifcarga: false,
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
        status: null,
        telefono: null,
        updatedAt: null,
        role: null,
        fullname: null,
        ////////////////////////////////
        sexo: null,
        fketnia: null,
        fknacionalidad: null,
        fkparroquia: null,
        titulo: null,

      },
      rutass: [
        {
          id: "0",
          nombre: "Home",
          url:"/",
        },
        {
          id: "2",
          nombre: "Lista Docentes",
          url:"/List-Docente",
        },
        
      ],
      
    };
  },
  methods: {
    get() {
      //-----------EN CASO DE QUE SE QUIERA EDITAR EL ID TIENE UN VALOR Y HACE UNA CONSULTA GET
      
      if (this.$route.params.id) {
        this.popular ="Editar Docente"
        this.ifcarga = true;
        this.$proxies._registroProxi
          .getDocentes(this.$route.params.id)
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
          this.$notify({
            group: "global",
            text: "Por favor llena correctamente los campos solicitados",
          });
          return;
        }
        if (this.model._id) {
          //-----------SI EL ID TIENE VALOR ENTONCES ES EDITAR
          this.ifLoad = true;
          if (!this.model.status) {
            this.model.status = 0;
          } 
          this.model.sexo=this.model.sexo.nombre;
          this.model.fkparroquia = this.model.fkparroquia.nombre;
          this.model.fknacionalidad = this.model.fknacionalidad.nombre;
          this.model.fketnia = this.model.fketnia.nombre;
          this.model.fullname = this.model.apellidos +" "+ this.model.nombres;
          this.$proxies._registroProxi
            .updateDocentes(this.model._id, this.model) //-----------EDITAR CON AXIOS
            .then(() => {
              this.ifLoad = false;
              //this.router.go('/usuarios/Usuario')
              this.$router.push("/List-Docente");
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
          if (!this.model.status) {
            this.model.status = 0;
          } 
          this.model.sexo=this.model.sexo.nombre;
          this.model.fkparroquia = this.model.fkparroquia.nombre;
          this.model.fknacionalidad = this.model.fknacionalidad.nombre;
          this.model.fketnia = this.model.fketnia.nombre;
          this.model.fullname = this.model.apellidos +" "+ this.model.nombres;
          this.$proxies._registroProxi
            .createDocentes(this.model) //-----------GUARDAR CON AXIOS
            .then(() => {
              this.ifLoad = false;
              this.$router.push("List-Docente");
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
    __listNacionalidad() {
      //-----------TRAE LA LISTA DE LOS ROLES
      this.$proxies._registroProxi
        .getNacionalidad()
        .then((x) => {
          this.listNacionalidad = x.data.datas;
        })
        .catch((err) => {
          console.log("Error", err);
        });
    },

    __listEtnias() {
      //-----------TRAE LA LISTA DE LOS ROLES
      this.$proxies._registroProxi
        .getEtnias()
        .then((x) => {
          this.listEtnia = x.data.datas;
        })
        .catch((err) => {
          console.log("Error", err);
        });
    },
    __listParroquias() {
      //-----------TRAE LA LISTA DE LOS ROLES
      this.$proxies._registroProxi
        .getParroquia()
        .then((x) => {
          this.listParroquia = x.data.datas;
        })
        .catch((err) => {
          console.log("Error", err);
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
  },
  mounted() {
    this.get();
    this.__listNacionalidad();
    this.__listEtnias();
    this.__listParroquias();
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
    ////////////////////////////////////////////////////////////////


    "model.titulo"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(6)
        .maxLength(80);
    },

    "model.fknacionalidad"(value) {
        return this.$validator.value(value).required();
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
  },
};
