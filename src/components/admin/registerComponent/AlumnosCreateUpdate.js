import Spinner from "../../../shared/Spinner";
import IsSelect from "../../../shared/IsSelect";
import RestResource from "../../../service/isAdmin";
const restResourceService = new RestResource();
import vueDropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
let image = require("../../../assets/img/usados/all.svg");
//IMPORTAR SERVICIO
import ServiceRegiste from "./ServiceRegister";
const ResultServiceEstudiante = new ServiceRegiste();
//read data
import XLSX from "xlsx";
//IMPORTAR HIJOS
import ChildSexo from "../../../shared/views/ChildSexo"
import ChildEtnia from "../../../shared/views/ChildEtnia"
import ChildNacionalidad from "../../../shared/views/ChildNacionalidad"
//SEND MULTIPLE 
//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export default {
  name: "CreaUsuario",
  components: {
    Spinner,
    IsSelect,
    vueDropzone,
    ChildSexo,
    ChildEtnia,
    ChildNacionalidad
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
      tab: "options",
      tabla: "ontask",
      info: null,
      listParroquia: null,
      isLoading: false,
      popular: "Crear Estudiate",
      ifLoad: false,
      mensaje: "",
      ifcarga: false,
      isParroquia: true,
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
        sexo: '',
        fketnia: '',
        fknacionalidad: '',
        fkparroquia: null,
        modalidad: null,
      },
      modalidad: [
        { name: "Intensivo", id: "1" },
        { name: "Extraordinaria", id: "2" },
      ],

      checked: "",
      valido: false,
      dropOptions: {
        url: "https://httpbin.org/post",
        dictDefaultMessage: `
        <img alt='Image placeholder' style='padding-top:-16px;' height='120px;' class='mx-4 mt-n6' src='${image}'>
        <p class='text-sm fuente'><i class='fa fa-cloud-upload mr-2'></i>&nbsp;&nbsp;Clic o arrastra y suelta. Solo los archivos TXT son compatibles.</p>
        `,
        maxFilesize: 2,
        maxFiles: 1,
        thumbnailHeight: 140,
      },
      isError: "",
      documento: null,
      rows : '',
      isData : [],
      file:File,
      objetoSexos: null,
      objetoEtnia: null,
      objetoNacion: null,
      isProcesDoc : false,
      ifDocListo: false,
      listCorreos: [],
      ifOcultar: false,
      objetosRechasados: [],
      ifDocumentosDuplicados: 0,
      ifmostrarRechasados : false,
    };
  },
  methods: {
    get() {
      //-----------EN CASO DE QUE SE QUIERA EDITAR EL ID TIENE UN VALOR Y HACE UNA CONSULTA GET
      if (this.idKey) {
        this.tab = 'sec3';
        this.popular = "Editar Estudiate";
        this.ifcarga = true;
        this.$proxies._registroProxi
          .get(this.idKey)
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
          this.model.fullname = this.model.apellidos + " " + this.model.nombres;
          if (this.objetoSexos!=undefined) {
            this.model.sexo = this.objetoSexos.nombre
          }
          if (this.objetoEtnia!=undefined) {
            this.model.fketnia = this.objetoEtnia.nombre
          }
          if (this.objetoNacion!=undefined) {
            this.model.fknacionalidad = this.objetoNacion.nombre
          }
          this.model.fkparroquia = this.model.fkparroquia.nombre;
          this.model.modalidad = this.checked;
           if (!this.model.status) {
             this.model.status = 0;
           }
           this.$proxies._registroProxi
             .update(this.model._id, this.model) //-----------EDITAR CON AXIOS
             .then(() => {
               this.ifLoad = false;
               //this.router.go('/usuarios/Usuario')
               this.$emit('clickAlumnos')
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
          if (!this.objetoSexos||!this.objetoEtnia||!this.objetoNacion) 
          {
            this.$notify({
              group: "global",
              text: "Faltan campos por completar",
            });
            this.ifLoad = false;
            return;}
          this.model.sexo = this.objetoSexos.nombre;
          this.model.fkparroquia = this.model.fkparroquia.nombre;
          this.model.fknacionalidad = this.objetoNacion.nombre;
          this.model.fketnia = this.objetoEtnia.nombre;
          this.model.modalidad = this.checked;
          this.model.fullname = this.model.apellidos + " " + this.model.nombres;
         
          this.$proxies._registroProxi
            .create(this.model) //-----------GUARDAR CON AXIOS
            .then(() => {
              this.ifLoad = false;
              this.$emit('clickAlumnos')
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
    afterComplete(upload) {
      if (!/\.(txt)$/i.test(upload.name)) {
        this.isError =
          "El archivo que cargaste no era TXT. Solo admite cargar archivos TXT.";
        this.removeAllFiles();

        return;
      }
      this.isError = "";
      this.ifDocListo = true;
      this.documento = upload;
      this.onChanges(upload);
    },
 
    onChanges(evento) {
      this.file = evento;
      if (this.file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          this.info = data;
          this.rows = this.info.length;
        };

        reader.readAsBinaryString(this.file);
      }
    },
    removeAllFiles() {
      this.rows ='';
      this.isData = [];
      this.$refs.dropzone.removeAllFiles();
      this.ifDocListo = false;
    },

    createDOC(){
      try {
        this.isProcesDoc = true;
        for (let i = 0; i < this.info.length; i++) {
           var element = this.info[i];
           let cedula = '';
           let email = '';
           let apellidos = '';
           let nombres = '';
           let telefono = '';
           let sexo = '';
           let fknacionalidad = '';
           let fkparroquia = '';
           let modalidad = '';
           let fketnia = 'mestizo';
           let typo = 'ESTS';
           let foto = 'https://res.cloudinary.com/stebann/image/upload/v1631310792/profile_b9t64l.png';
           let status = 1;
  
           let num = element[0];
           cedula = num.toString().trim();
           email = element[1].trim();
           apellidos = element[2].trim();
           nombres = element[3].trim();
           telefono = element[4];
           sexo = element[5];
           fknacionalidad = element[6];
           fkparroquia = element[7];
           modalidad = element[8];
           
           if (!cedula||!email||!nombres||!apellidos||!telefono||!sexo||!fknacionalidad||!fkparroquia||!modalidad) {
            this.isError = "ERROR ¡No tiene todos los atributos completos!"
            this.isProcesDoc = false;
            this.removeAllFiles()
            return;
           }
           if (!ResultServiceEstudiante.validarEmail(email)) {
            this.isError = `ERROR, No se puede procesar el correo 😱 👉 ${email}`;
            this.isProcesDoc = false;
            this.removeAllFiles()
            return;
           }
           let password = this.__getPasswods (apellidos, cedula);
           let fullname = apellidos + ' ' + nombres;
           this.isData.push({
            cedula : cedula,
            email : email,
            apellidos : apellidos,
            nombres : nombres,
            telefono : telefono,
            sexo : sexo,
            fknacionalidad : fknacionalidad,
            fkparroquia : fkparroquia,
            modalidad : modalidad,
            fketnia : fketnia,
            typo : typo,
            foto : foto,
            status : status,
            username : cedula,
            password : password,
            fullname: fullname,
            roles: ''
           })
           if(i > 300){
            this.isProcesDoc = false;
            this.ifDocListo = true;
            this.tab ='ViewInport';
             return;
           }
  
        }
        this.isProcesDoc = false;
        this.ifDocListo = true;
        this.tab ='ViewInport';
        //console.log(this.isData)
      }catch(e){
        this.isError = 'ARCHIVO DAÑADO'
        this.removeAllFiles();
        this.isProcesDoc = false;
        console.log(e)
      }
      
    },

    createUserMany(){
        if (this.isData!=null) {
          this.ifOcultar= true;
            this.$proxies._registroProxi
            .createMany(this.isData) //-----------GUARDAR CON AXIOS
            .then((res) => {
              this.ifOcultar= false;
              this.objetosRechasados = res.data.duplicados;
              this.$emit('clickAlumnos');
              this.isData = [];
              this.ifmostrarRechasados= true;
            })
            .catch((error) => {
              if (error.response) {
                if (error.response.status == 500) {
                   alert('error.response.message')
                }
                
              }  else {
                this.$notify({
                  group: "global",
                  text: "ERROR del servidor por favor notificar",
                });
               
              }
            });

       }
    },
    sendAll2() {
      let message = {
        title: "Ingreso masivo de usuarios",
        body: " Puede ingresar hasta 300 usuarios",
      };
      let options = {
        loader: false,
        okText: "Continuar",
        cancelText: "Cancelar",
        animation: "bounce",
      };
      this.$dialog
        .confirm(message, options)
        .then((dialog) => {
          this.createUserMany();
          dialog.close();
          
        })
        .catch(function() {});
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
      if (ced.length > 8) {
        this.mensaje = ResultServiceEstudiante.verificarCedula(ced);
      }
    },

    onChange(event) {
      let email = event.target.value;
      this.valido = ResultServiceEstudiante.validarEmail(email);
    },
    verificarUsuario() {
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      }
    },
    openInport(){
      this.tab ='inport';
      this.rows ='';
      this.isData = [];
      this.ifDocListo = false;
      this.contador = 0;
      this.row = 0;
      this.ifmostrarRechasados = false;
      this.objetosRechasados = [];
      this.ifDocumentosDuplicados =0;
      this.buttonBlock = false;
    }
  },
  created() {
    this.verificarUsuario();
    this.get();
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
        .maxLength(20);
    },
    "model.fkparroquia"(value) {
      return this.$validator.value(value).required();
    },
  },
};
