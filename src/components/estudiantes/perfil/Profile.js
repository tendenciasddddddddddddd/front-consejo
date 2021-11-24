function dataURLtoFile(dataurl, filename) {
 
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, {type:mime});
}

import Spinner from "../../../shared/Spinner";
import * as axios from "axios";
import { Cropper, Preview } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import Stencil from "../../../shared/Stencil";
const avat = require('../../../assets/img/icons/profile.jpg');
import RestResource from '../../../service/isAdmin'
const restResourceService = new RestResource();
export default {
  name: "Perfil",
  components: {
    Spinner,
    Cropper,
    Stencil,
    Preview
  },
  data() {
    return {
      img: avat,
      user: this.$store.state.user,
      roles: this.$store.state.user.roles,
      foto: '',
      name: '',
      file: "",
      tabla: "perfile",
      isVisible: 'pan1',
      istabs : '1',
      isUploading: null,
      nombreimagen: null,
      imageData: null,
      uploadValue: 0,
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
        nombres: null,
        apellidos: null,
        cedula: null,
        foto: null,
        sexo: null,
        fketnia: null,
        fknacionalidad: null,
        fkparroquia: null,
        titulo: null,
        role: null,
      },
      modelFotos :{
        foto:null,
    },
      infos:{
        foto: null,
        nombre: null,
        correo: null,
      },
      isCambios: false, //FOTER
      result: {
				coordinates: null,
				image: null
			},
      isFile: false, 
      iscroper : false,
    };
  },
  methods: {
    verificarUsuario(){
      if(!restResourceService.estudiante(this.roles)){
        this.$router.push("/");
      }
    },
    change({coordinates, image}) {
      this.result = {
				coordinates,
				image
			};
    },
    inforUsers(){
      const info = JSON.parse(localStorage.getItem('Xf'));
      const avatar = JSON.parse(localStorage.getItem('Avatar'));
      this.foto = avatar
      this.name = info.nombre;
    },

    cropImage() {
      const result =  this.$refs.cropper.getResult();
      //console.log(result.canvas.toDataURL(this.img.type))
       //  this.img = result.canvas.toDataURL();
         let imagen = result.canvas.toDataURL();
         this.file =  dataURLtoFile(imagen, 'hola.png');
         //this.img =  result.canvas.toDataURL();
         this.onChangeFileUpload(this.file)
    },

    uploadImage(event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
       let format = event.target.files[0];
       if (!window.FileReader) {
        alert('El navegador no soporta la lectura de archivos');
        return;
      }
      if (!(/\.(jpg|png)$/i).test(format.name)) {
        alert('El archivo a adjuntar no es una imagen con formato PNG o JPG ');
        return ;
      }
       this.isFile = true;
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.img = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },

    get() {
        //-----------EN CASO DE QUE SE QUIERA EDITAR EL ID TIENE UN VALOR Y HACE UNA CONSULTA GET
        this.isVisile= false;
        if (this.user.id) {
          this.ifcarga = true;
         
          this.$proxies._registroProxi
            .getDocentes(this.user.id)
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
            this.ifLoad = true;
            this.$proxies._registroProxi
              .updateDocentes(this.model._id, this.model) //-----------EDITAR CON AXIOS
              .then(() => {
                this.ifLoad = false;
                this.isCambios = false;
                this.get();
                this.$notify({
                  group: "global",
                  text: "Actualización exitosa",
                });
              })
              .catch((err) => {
                console.log("Error", err);
                this.ifLoad = false;
              });
           } 
        });
      },


    //////
    onChangeFileUpload(info) {
      this.isImageUploads = true;
      let formData = new FormData();
      formData.append("myFile", info);
      axios
        .post("https://pcei-tulcan.com/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(x => {
          this.img1 = x.data;
          
          this.uploadFoto(this.img1);
        }).catch(x => {
          this.isImageUploads = false;
          if (x.response.status == 500) {
              //Los formatos aceptados son .png .jpg .jpeg
              this.$notify({
                  group: "global",
                  text: "Los formatos aceptados son .png .jpg .jpeg",
                });
            }else{
              alert("Notifique el administrador el error");
            }
        })
    },
    uploadFoto(img){
      if (this.user.id && img != null) {
        this.modelFotos.foto = img;
        this.$proxies._registroProxi
          .updateDocentes(this.user.id, this.modelFotos) //-----------EDITAR CON AXIOS
          .then(() => {
            this.$store.commit('agregar2',{img})
            this.isImageUploads = false;
            this.tabla = 'none';
            localStorage.setItem('Avatar', JSON.stringify(img));
          })
          .catch(() => {
            alert("Error al intentar actualizar la imagen");
            this.isImageUploads = false;
          });
       } 
    },
    actuliarStores(){
      let num = 10;
      this.$store.commit('agregar2',{num})
    },
    limpiar(){
      this.tabla= "perfiles";
      this.file = '';
      this.isFile = false;
      this.isCambios = false;
    },
    OnEdit(){
     
      this.isCambios = true;
    },
  },
  created() {
    this.verificarUsuario();
    this.get();
    this.inforUsers();
  },
 
  validators: {
    //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
 
    "model.nombres"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(3)
        .maxLength(50);
    },
    "model.apellidos"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(3)
        .maxLength(50);
    },
    "model.telefono"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(9)
        .maxLength(20);
    },
    ////////////////////////////////////////////////////////////////

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
