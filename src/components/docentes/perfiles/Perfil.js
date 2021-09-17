const info = JSON.parse(localStorage.getItem("Xf"));

import Skeleton from "../../../shared/Skeleton";
import Spinner from "../../../shared/Spinner";
import { StorageRef } from "../../../boot/firebase";
import * as axios from "axios";
export default {
  name: "Perfil",
  components: {
    Skeleton,
    Spinner
  },
  data() {
    return {
      user: this.$store.state.user,
      foto: info.foto,
      name: info.nombre,
      file: "",
      uploads: "100x100.png",
      tabla: "perfile",
      isVisible: 'pan1',
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
      infos:{
        foto: null,
        nombre: null,
        correo: null,
      }
    };
  },
  methods: {
    get() {
        //-----------EN CASO DE QUE SE QUIERA EDITAR EL ID TIENE UN VALOR Y HACE UNA CONSULTA GET
        this.isVisile= false;
        if (this.user.id) {
          this.ifcarga = true;
          this.tabla= 'perfiles'
          this.isVisible= 'pan1';
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
                this.isVisible = 'pan3';
              })
              .catch((err) => {
                console.log("Error", err);
                this.ifLoad = false;
              });
           } 
        });
      },

    previewImage(event) {
      this.uploadValue = 0;
      this.imageData = event.target.files[0];
      if (!window.FileReader) {
        alert('El navegador no soporta la lectura de archivos');
        return;
      }
      if (!(/\.(jpg|png)$/i).test(this.imageData.name)) {
        alert('El archivo a adjuntar no es una imagen');
        return ;
      }
      var sizeByte = event.target.files[0].size;
       var sizekiloBytes = parseInt(sizeByte / 1024);
       if(sizekiloBytes>=50){
        alert('La Imagen es muy pesada por favor redusca el tamaño y el peso');
        return;
       }
       
      this.onUpload();
      
    },

    //////
    onChangeFileUpload() {
      this.isImageUploads = true;
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("myFile", this.file);
      axios
        .post("http://localhost:3000/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(x => {
          this.img1 = x.data;
          this.isImageUploads = false;
          this.model.foto = this.img1;
         
        }).catch(x => {
          
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
    //////
    __validarImagen(){
        if (!window.FileReader) {
            alert('El navegador no soporta la lectura de archivos');
            return false;
          }
          if (!(/\.(jpg|png)$/i).test(this.imageData.name)) {
            alert('El archivo a adjuntar no es una imagen');
            return false;
          }
          else {
          var  img = new Image();
              img.onload = function () {
                if (this.width.toFixed(0) != 200 && this.height.toFixed(0) != 200) {
                    alert('Las medidas deben ser: 200 * 200');
                    return false
                } else{
                    return true;
                }  
            };
            img.src = URL.createObjectURL(this.imageData);

        }   
    },
    onUpload() {
      this.isImageUploads = true;
      this.imageData = event.target.files[0];
      const storageRef = StorageRef.ref(`${this.imageData.name}`).put(
        this.imageData
      );
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.img1 = url;
            this.isImageUploads = false;
            this.model.foto = this.img1;
          });
        }
      );
    },
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
