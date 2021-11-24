import Spinner from "../../../../shared/Spinner";
import { VueEditor } from "vue2-editor";
import DatePicker from 'vue2-datepicker';
import { StorageRef } from "../../../../boot/firebase";
import 'vue2-datepicker/index.css';
import vueDropzone from "vue2-dropzone";
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
let image = require("../../../../assets/img/usados/all.svg");
//Servicios
import serviceTask from './ServiceTASK';
const ResultServiceTask = new  serviceTask();
export default {
  name: "Task",
  components: { Spinner, VueEditor, DatePicker, vueDropzone },
  data() {
    return {
      info: null,
      isData: false,
      isTask: "closed",
      ifLoad : false,
      ifLoad2: false,
      isPlaso: 'Sin plazo',
      dropOptions: {
        url: "https://httpbin.org/post",

        dictDefaultMessage: `
        <img alt='Image placeholder' style='padding-top:-12px;' height='130px;' class='mx-4 mt-n6' src='${image}'>
        <p class='text-sm fuente links'><i class='fa fa-cloud-upload mr-2'></i>&nbsp;&nbsp;Seleccionar un archivo </p>
        `,
        maxFilesize: 2,
        maxFiles: 1,
        thumbnailHeight: 140,
        
      },
      isSelecUsers : [],
      model: {
        _id: null,
        task: {
          nombre: null,
          descripcion: null,
          archivo: null,
          finicio: null,
          estado: null,
        },
      },
      htmlForEditor: "",
      customToolbar: [
      ],
      clickme: '0',
      dateTask: '',
      idtask: null,
       //Pagina 
       page: 1,
       perPage: 7,
       pages: [],
       numPages:null,
    };
  },
  computed: {
    displayedArticles: function () {
      return this.paginate(this.info.task);
    }
  },
  methods: {
    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      this.numPages = Math.ceil(articles.length/7);
      this.isSelecUsers = [];
      return articles.slice(from, to);
  },
    getData() {
      this.isData = true;
      if (this.$route.params.id) {
        this.$proxies._aulaProxi
          .get(this.$route.params.id)
          .then((x) => {
            this.info = x.data;
            this.isData = false;
          })
          .catch((err) => {
            console.log("Error", err);
            this.isData = false;
          });
      }
    },
    save(){
      this.$validate().then((success) => {
        //METODO PARA GUARDAR
        if (!success) {
          this.$notify({
            group: "global",
            text: "Por favor llena correctamente los campos solicitados",
          });
          return;
        }
        if (this.idtask) { //editTask
          this.ifLoad = true;
          this.model.task.estado = 0;
          let keys = this.$route.params.id +','+ this.idtask
          this.$proxies._aulaProxi
              .editTask(keys, this.model) //-----------EDITAR CON AXIOS
              .then(() => {
                this.ifLoad = false;
                this.isTask= "closed";
                this.isSelecUsers = [];
                this.getData();
              })
              .catch((err) => {
                alert("Error", err);
                this.ifLoad = false;
              });
        }else{
          this.ifLoad = true;
          this.model.task.estado = 0;
          this.$proxies._aulaProxi
              .createTask(this.$route.params.id, this.model) //-----------EDITAR CON AXIOS
              .then(() => {
                this.ifLoad = false;
                this.isTask= "closed";
                this.isSelecUsers = [];
                this.getData();
              })
              .catch((err) => {
                alert("Error", err);
                this.ifLoad = false;
              });
        }
        
      }); 
  
    },
    openModals(){
      this.__limpiarCampos();
      this.isTask = 'open';
    },
  
    fechas(event){
       if(event!=null){
        this.isPlaso = ResultServiceTask.calcular_fecha_limite(event);
       } 
    },

    __eliminar() {
      this.isLoading = true;
      if (confirm('ESTA SEGURO QUE QUIERE ELIMINAR?')) {
        let isArray = this.isSelecUsers.length;
        if (isArray > 0) {
          this.$proxies._aulaProxi
          .removeTask(this.$route.params.id, this.isSelecUsers) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
          .then(() => {
            this.$notify({
              group: "global",
              text: "Registros destruidos",
            });
            this.isLoading = false;
            this.isSelecUsers = [];
            this.getData();
          })
          .catch((x) => {
            alert("Error server not found", x.response);
          });
        }
        
      }else{
        this.isLoading = false;
      }
  
    },

    afterComplete(upload) {
      
      this.ifLoad2 = true;
      var date = new Date();
      let result = date.toISOString();
      const storageRef = StorageRef.ref(`arctask/${result}`).put(
        upload
      );
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          this.ifLoad2 = false;
          alert('no se puede subir este archivo revise el internet')
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.img1 = url;
            this.model.task.archivo = this.img1;
            this.ifLoad2 = false;
          });
        }
      );
    },
    removeAllFiles() {
      this.$refs.dropzone.removeAllFiles();
      this.model.task.archivo = '';
    },
    __limpiarCampos() {
      this.idtask = null,
       this.model.task.nombre = '';
       this.model.task.descripcion = '';
       this.model.task.finicio = '';
       this.model.task.archivo = '';
       this.isPlaso = 'Sin plazo';
       this.img1 = '';
       this.clickme = '0';
    },

    selectTask(key){
      let longitud = this.isSelecUsers.length;
      let isExiste = 0;
      if(longitud>0){
         for (let i = 0; i < this.isSelecUsers.length; i++) {
            if(this.isSelecUsers[i]==key){
             this.isSelecUsers.splice(i, 1); 
             isExiste = 1;
             break;
            }
         }
         if(isExiste===0){ 
           this.isSelecUsers.push(key);
         }
      }else{
       this.isSelecUsers.push(key);
      } 
    },
    editTask(){
        let aux = this.isSelecUsers.length
        if (aux==1) {
          let tasks = this.info.task
          if (tasks) {
             let arrasTask = this.info.task.filter((x)=>x._id==this.isSelecUsers[0]);
             if (arrasTask) {
              this.__limpiarCampos();
              this.isTask = 'open';
              this.clickme = '0';
              this.idtask = arrasTask[0]._id;
              this.model.task.nombre = arrasTask[0].nombre;
              this.model.task.descripcion = arrasTask[0].descripcion;
              this.model.task.archivo = arrasTask[0].archivo;
              this.dateTask = arrasTask[0].finicio;
             }
          }
        }
    },
    nextO(key){
      if (this.$route.params.id) {
        let idparam = this.$route.params.id+','+key
        this.$router.push({ path: `/review-task/${idparam}` }) // -> /user/123
      }
      
    }
  },
  created() {
    this.getData();
  },
  validators: {
    //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
    "model.task.nombre"(value) {
      return this.$validator
        .value(value)
        .required()
        .minLength(5)
        .maxLength(50);
    },
    "model.task.descripcion"(value) {
      return this.$validator
        .value(value)
        .required()
    },
    "model.task.finicio"(value) {
      //
      return this.$validator
        .value(value)
        .required()
        .minLength(1)
        .maxLength(150);
    },
   
  },
};
