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

import Spinner from "../../shared/Spinner";
import RestResource from '../../service/isAdmin'
const restResourceService = new RestResource();
import * as axios from "axios";
//-------RECORTAR IMAGEN-------
import { Cropper, Preview } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import Stencil from "../../shared/Stencil";
const avat = require('../../assets/img/icons/profile.jpg')

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
      roles: this.$store.state.user.roles,
      user: this.$store.state.user,
      foto: '',
      name: '',
      file: "",
      tabla: "perfile",
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
        nombres: null,
        apellidos: null,
        cedula: null,
        sexo: null,
        fketnia: null,
        fknacionalidad: null,
        fkparroquia: null,
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
      image: {
        src: avat,
        type: "image/jpg",
      },
    };
  },
  methods: {
    cropImages() {
      const { canvas } = this.$refs.cropper.getResult();
			if (canvas) {
        this.isImageUploads = true;
				const form = new FormData();
				canvas.toBlob(blob => {
					form.append('myFile', blob);
           axios
            .post("https://pcei-tulcan.com/api/upload", form, {
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
				}, 'image/jpeg');
			}
     
    },

    uploadImage(event) {
      const { files } = event.target;
      let format = event.target.files[0];
      if (!window.FileReader) {
        alert('El navegador no soporta la lectura de archivos');
        return;
      }
      if (!(/\.(jpg|png)$/i).test(format.name)) {
        alert('El archivo a adjuntar no es una imagen con formato PNG o JPG ');
        return ;
      }
      if (files && files[0]) {
        // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
        if (this.image.src) {
          URL.revokeObjectURL(this.image.src);
        }
        // 2. Create the blob link to the file to optimize performance:
        const blob = URL.createObjectURL(files[0]);
        this.isFile = true;
        // 3. Update the image. The type will be derived from the extension and it can lead to an incorrect result:
        this.image = {
          src: blob,
          type: files[0].type,
        };
      }
      
    },
    inforUsers(){
      const info = JSON.parse(localStorage.getItem('Xf'));
      const avatar = JSON.parse(localStorage.getItem('Avatar'));
      this.foto = avatar
      this.name = info.nombre;
    },

    crop2(){ //NO FOUND
      const result = this.$refs.cropper.getResult();
      //console.log(result.canvas.toDataURL(this.img.type))
       //  this.img = result.canvas.toDataURL();
        let imagen = result.canvas.toDataURL();
        this.file = dataURLtoFile(imagen, 'hola.png');
        console.log(this.file)
       this.onChangeFileUpload(this.file)
    },

    get() {
        //-----------EN CASO DE QUE SE QUIERA EDITAR EL ID TIENE UN VALOR Y HACE UNA CONSULTA GET
        this.isVisile= false;
        if (this.user.id) {
          this.ifcarga = true;
         // this.tabla= 'perfiles'
         // this.isVisible= 'pan1';
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
              })
              .catch((err) => {
                console.log("Error", err);
                this.ifLoad = false;
                this.isCambios = false;
              });
           } 
        });
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
    verificarUsuario(){
      let text_1 = 'Cuenta'
      let text_2 = 'Infromación de perfil'
      this.$store.commit('updateHeader',{text_1, text_2})
      if(!restResourceService.docente(this.roles)&&!restResourceService.estudiante(this.roles)){
        this.$router.push("/");
      }
    }
  },
  destroyed() {
    // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
    if (this.image.src) {
      URL.revokeObjectURL(this.image.src);
    }
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
    "model.email"(value) {
      return this.$validator
        .value(value)
        .required()
        .email();
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
