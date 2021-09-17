import Skeleton from '../../../../shared/Skeleton'
import Navss from '../../../../shared/Navss'
import * as axios from "axios";
export default {
  name: 'ListaCursos',
  components:{
    Skeleton, Navss
   },
  data() {
      return {
        rutass: [
            {
              id: "0",
              nombre: "Home",
              url:"/",
            },
            {
                id: "1",
                nombre: "Mis Cursos",
                url:"/opciones-curso",
              },
          ],
          info: null,
          model: {
              icono: null
          },
          ids: null,
          isData: false,
          isEdit : false,
          //imagen
          file: "",
          uploads: "100x100.png",
          isUploading: null,
          nombreimagen:null
      }
  },
  methods: {
      gets() {   
        if(this.$route.params.id){
            this.isData = true;
            this.$proxies._gestionProxi.getDistributivo(this.$route.params.id)
            .then((x) => {
                this.info = x.data;
                this.model.icono = this.info.icono;
                this.ids = this.info._id;
                this.isData = false;
            }).catch(() => {
                console.log("Error")
                this.isData = false;
            });
        }
      },
      mostrarFormulario(){
          this.isEdit = true;
      },
      save(){
        this.model.curso = 'Undefined';
        this.$proxies._gestionProxi.updateDistributivo(this.ids, this.model)
        .then(() => {
            this.$notify({
                group: "global",
                text: "Actualización exitosa",
              });
              this.isEdit = false;
        })
        .catch(() => {
         alert("Error");
         this.isEdit = false;
       });
      },
      onChangeFileUpload() {
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
           this.nombreimagen = x.data;
           this.model.icono = this.nombreimagen
           
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
  },
  created() {
      this.gets();
  }
};