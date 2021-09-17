import Spinner from "../../../shared/Spinner";
import IsSelect from "../../../shared/IsSelect";
import Navss from '../../../shared/Navss'
export default {
  name: "CreaUsuario",
  components: {
    Spinner,
    IsSelect,
    Navss
  },
  data() {
    return {
      tab: "sec3",
      info: null,
      listNacionalidad: null,
      listEtnia: null,
      listParroquia: null,
      isLoading: false,
      popular: "Crear Estudiate",
      ifLoad: false,
      mensaje: "",
      ifcarga: false,
      isEtnia: true,
      isNacion: true,
      isParroquia: true,
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
      rutass: [
        {
          id: "0",
          nombre: "Home",
          url:"/",
        },
        {
          id: "2",
          nombre: "Lista estudiantes",
          url:"/List-Estudiate",
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
        foto:
          "https://res.cloudinary.com/stebann/image/upload/v1631310792/profile_b9t64l.png",
        typo: "ESTS",
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
        modalidad: null,

      },
      modalidad: [
        { name: "Intensivo", id: "1" },
        { name: "Extraordinaria", id: "2" },
      ],
    
      checked: "",

    };
  },
  methods: {
    get() {
      //-----------EN CASO DE QUE SE QUIERA EDITAR EL ID TIENE UN VALOR Y HACE UNA CONSULTA GET

      if (this.$route.params.id) {
        this.popular = "Editar Estudiate";
        this.ifcarga = true;
        this.$proxies._registroProxi
          .get(this.$route.params.id)
          .then((x) => {
            this.model = x.data;
            this.ifcarga = false;
            this.checked = this.model.modalidad;
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
          this.model.fullname = this.model.apellidos +" "+ this.model.nombres;
          this.model.sexo = this.model.sexo.nombre;
          this.model.fkparroquia = this.model.fkparroquia.nombre;
          this.model.fknacionalidad = this.model.fknacionalidad.nombre;
          this.model.fketnia = this.model.fketnia.nombre;
          this.model.modalidad = this.checked;
          if (!this.model.status) {
            this.model.status = 0;
          }
          this.$proxies._registroProxi
            .update(this.model._id, this.model) //-----------EDITAR CON AXIOS
            .then(() => {
              this.ifLoad = false;
              //this.router.go('/usuarios/Usuario')
              this.$router.push("/List-Estudiate");
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
          this.model.sexo = this.model.sexo.nombre;
          this.model.fkparroquia = this.model.fkparroquia.nombre;
          this.model.fknacionalidad = this.model.fknacionalidad.nombre;
          this.model.fketnia = this.model.fketnia.nombre;
          this.model.modalidad = this.checked;
          this.model.fullname = this.model.apellidos +" "+ this.model.nombres;
          //

          this.$proxies._registroProxi
            .create(this.model) //-----------GUARDAR CON AXIOS
            .then(() => {
              this.ifLoad = false;
              this.$router.push("List-Estudiate");
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
                if (error.response.status == 500) {
                  this.$notify({
                    group: "global",
                    text: "No se puede procesar los datos",
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

    __listEtnias() {
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
    __listParroquias() {
      //-----------TRAE LA LISTA DE LOS ROLES
      this.isParroquia = true;
      this.$proxies._registroProxi
        .getParroquia()
        .then((x) => {
          this.listParroquia = x.data.datas;
          this.isParroquia = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isParroquia = false;
        });
    },
    __getPasswods(apell, ced) {
      //-----------CREA LA CONTRASEÑAS PARA LOS USUARIOS EJMPLO {m1004095632}
      let l = apell.toLowerCase().charAt(0);
      let result = l + ced;
      return result;
    },
    __validarCedula(event) {
      let ced = event.target.value;
      if (ced.length >= 10) {
        this.verificarCedula(ced);
      } else {
        this.mensaje = event.target.value;
      }
    },
    verificarCedula(cedula) {
      if (cedula.length == 10) {
        var digito_region = cedula.substring(0, 2);
        if (digito_region >= 1 && digito_region <= 24) {
          var ultimo_digito = cedula.substring(9, 10);
          var pares =
            parseInt(cedula.substring(1, 2)) +
            parseInt(cedula.substring(3, 4)) +
            parseInt(cedula.substring(5, 6)) +
            parseInt(cedula.substring(7, 8));
          var numero1 = cedula.substring(0, 1);
          numero1 = numero1 * 2;
          if (numero1 > 9) {
            numero1 = numero1 - 9;
          }

          var numero3 = cedula.substring(2, 3);
          numero3 = numero3 * 2;
          if (numero3 > 9) {
            numero3 = numero3 - 9;
          }

          var numero5 = cedula.substring(4, 5);
          numero5 = numero5 * 2;
          if (numero5 > 9) {
            numero5 = numero5 - 9;
          }

          var numero7 = cedula.substring(6, 7);
          numero7 = numero7 * 2;
          if (numero7 > 9) {
            numero7 = numero7 - 9;
          }

          var numero9 = cedula.substring(8, 9);
          numero9 = numero9 * 2;
          if (numero9 > 9) {
            numero9 = numero9 - 9;
          }

          var impares = numero1 + numero3 + numero5 + numero7 + numero9;

          var suma_total = pares + impares;

          var primer_digito_suma = String(suma_total).substring(0, 1);

          var decena = (parseInt(primer_digito_suma) + 1) * 10;

          digito_validador = decena - suma_total;

          if (digito_validador == 10) var digito_validador = 0;
          if (digito_validador == ultimo_digito) {
            this.mensaje = "la cedula:" + cedula + " es correcta";
          } else {
            this.mensaje = "la cedula:" + cedula + " es incorrecta";
          }
        } else {
          this.mensaje = "Esta cedula no pertenece a ninguna region";
        }
      } else {
        this.mensaje = "Esta cedula tiene menos de 10 Digitos";
      }
    },
  /*   onChange(event) {
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
    }, */
  },
  created() {
    this.get();
    this.__listNacionalidad();
    this.__listEtnias();
    this.__listParroquias();
  },

  validators: {
    //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS parentesc
    
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
