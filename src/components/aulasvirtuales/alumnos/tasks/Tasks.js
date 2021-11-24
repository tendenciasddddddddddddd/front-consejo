import Spinner from "../../../../shared/Spinner";
import { StorageRef } from "../../../../boot/firebase";
import vueDropzone from "vue2-dropzone";
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
let image= require('../../../../assets/img/usados/all.svg')
export default {
  name: "Task",
  components: { Spinner, vueDropzone},
  data() {
    return {
      info: {},
      isData: false,
      
      dropOptions: {
        url: "https://httpbin.org/post",
        dictDefaultMessage: `
        <img alt='Image placeholder' style='padding-top:-12px;' height='130px;' class='mx-4 mt-n6' src='${image}'>
        <p class='text-default fuente'><i class='fa fa-cloud-upload mr-2'></i>&nbsp;&nbsp;Subir un archivo 👆 (Opcional)</p>
        `,
        maxFilesize: 2,
        maxFiles: 2,
        thumbnailHeight: 140,
      },
      //INPUT FILE
      isImageUploads: false,
      imageData: null,
      uploadValue: 0,
      img1 : '',  
      usuario: this.$store.state.user.id,
      //SEND TASK
      tabla: "offtask",
      ifcarga: false,
      title : '',
      descrition : '',
      recursos : '',
      datetimes : '',
      isPlaso : '',
      idSubColeccion: '',
      model: {
        _id: null,
        task: {
          _id: null,
            entrega: {
             idUser: this.$store.state.user.id,
             nombres: '',
             link: "",
          },
        },
      },
      ifLoad: false,
      fullTask: [],
    };
  },
  methods: {
    appInit(){
      const infor = JSON.parse(localStorage.getItem("Xf"));
      this.model.task.entrega.nombres = infor.nombre;
    },
    getData() {
      this.isData = true;
      if (this.$route.params.id) {
        this.$proxies._aulaProxi
          .get(this.$route.params.id)
          .then((x) => {
            this.info = x.data;
            console.log(this.info)
            this.runTask();
            this.isData = false;
          })
          .catch((err) => {
            console.log("Error", err);
            this.isData = false;
          });
      }
    },

    runTask(){
        this.fullTask= [];
        let tareas = this.info.task
        for (let i = 0; i < tareas.length; i++){
           let  idA = tareas[i]._id;
           let nameTask = tareas[i].nombre;
           let fechalim = tareas[i].finicio;
           let descrition = tareas[i].descripcion;
           let arci = tareas[i].archivo;
           let idB = 0;
           let isSend = false;
           let entregas = tareas[i].entrega;
           for (let j = 0; j < entregas.length; j++) {
               idB = entregas[j]._id;
               if (entregas[j].idUser == this.usuario) {
                   isSend = true;
                   break;
               }
           }
           this.fullTask.push({id: idA, id2: idB, nombre : nameTask,fecha: fechalim, estado : isSend, desc : descrition, archivo: arci});
        }
    },

    removeAllFiles() {
        this.$refs.dropzone.removeAllFiles();
      },

    afterComplete(upload) {
      
      var date = new Date();
      let result = date.toISOString();
      const storageRef = StorageRef.ref(`archivos/${result}`).put(
        upload
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
            this.model.task.entrega.link = this.img1;
          });
        }
      );
    },

    //----------------------------------------------------------ENVIAR TAREA DE ESTUDIANTE---------------------------------
    openModal(key){
      this.__limpiarCampos();
     console.log(key)
     this.idSubColeccion = key.id;
     this.title = key.nombre;
     this.descrition = key.desc;
     this.recursos = key.archivo;
     this.datetimes = key.fecha;
     this.isPlaso = this.fechas(this.datetimes);
     this.tabla= "ontask";
    },
     
    saveArbolEntrega(){
        if(this.model.task.entrega.link!=''){
          this.ifLoad = true;
          this.$proxies._aulaProxi
            .sendTask(this.idSubColeccion, this.model) //-----------EDITAR CON AXIOS
            .then(() => {
              this.ifLoad = false;
              this.tabla= "offtask";
              this.getData();
            })
            .catch((err) => {
              console.log("Error", err);
              this.ifLoad = false;
              
            });
        }else{
           alert('CARGAR UN ARCHIVO')
        }
    },

    __limpiarCampos(){
      this.idSubColeccion = '';
     this.title = '';
     this.descrition = '';
     this.recursos = '';
     this.datetimes = '';
     this.isPlaso = '';
     this.model.task.entrega.link = '';
    },

    //----------------------------------------------------------------CALCULO DE HORAS ----------------------------------------
    fechas(event){
      if(event!=null){
       var today = new Date(event);
       let horaA = new Date();
       let diferenciaHoras = today - horaA;
       let days = Math.floor(diferenciaHoras / (24*60*60*1000));
       let daysms=diferenciaHoras % (24*60*60*1000);
       let hours = Math.floor((daysms)/(60*60*1000));
       let hoursms=diferenciaHoras % (60*60*1000);
       let minutes = Math.floor((hoursms)/(60*1000));
       let minutesms=diferenciaHoras % (60*1000);
       let sec = Math.floor((minutesms)/(1000));
       return 'Dias '+ days+", Horas "+hours+", Minutos "+minutes+", y Segundos "+sec;
     
      } 
   },
  },
  created() {
    this.appInit();
    this.getData();
  },
};
