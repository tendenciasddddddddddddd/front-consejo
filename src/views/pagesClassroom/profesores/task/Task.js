import ProgressBar from "../../../../shared/ProgressBar";
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
  components: { ProgressBar, VueEditor, DatePicker, vueDropzone, 
  TaskReview: () => import( /* webpackChunkName: "TaskReview" */ "../../../../components/componentClassroom/grupDocente/TaskReview"),
   },
  data() {
    return {
      info: null,
      isData: false,
      isTask: "closed",
     // image: img,
      ifLoad : false,
      ifLoad2: false,
      isPlaso: 'Sin plazo',
      dropOptions: {
        url: "https://httpbin.org/post",

        dictDefaultMessage: `
        <img alt='Image placeholder' style='padding-top:-12px;' height='130px;' class='mx-4 mt-n6' src='${image}'>
        <p class='text-sm fuente links'><i class='fa fa-cloud-upload mr-2'></i>&nbsp;&nbsp;Seleccionar un archivo </p>
        `,
        maxFilesize: 1,
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
      clickme: false,
      dateTask: '',
      idtask: null,
      searchQuery: '',
       //Pagina 
       page: 1,
       perPage: 8,
       pages: [],
       numPages:null,
       //CHILD COMPONENT
       ifChildRevision: false,
       idAula: '',
       idTasks: '',
    };
  },
  computed: {
    displayedArticles: function () {
      if (this.searchQuery.length>1) {
        return this.info.task.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.nombre.toLowerCase().includes(v));
        });
      }else{
        return this.paginate(this.info.task);
      }
      
    }
  },
  methods: {
    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      this.numPages = Math.ceil(articles.length/this.perPage);
      return articles.slice(from, to);
  },
    getData() {
      this.isData = true;
      this.$Progress.start();
      if (this.$route.params.id) {
        this.$proxies._aulaProxi
          .get(this.$route.params.id)
          .then((x) => {
            this.info = x.data;
            this.isData = false;
            this.$Progress.finish();
          })
          .catch(() => {
            alert("En esta ruta no hay nada que mostrar");
            this.isData = true;
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
          let keys = this.$route.params.id +','+ this.idtask
          this.$proxies._aulaProxi
              .editTask(keys, this.model) //-----------EDITAR CON AXIOS
              .then(() => {
                this.ifLoad = false;
                this.isTask= "closed";
                this.isSelecUsers = [];
                this.getData();
                this.toast('Actualizaste exitosamente una tarea');
              })
              .catch(() => {
                this.$dialog.alert("El servidor responde con un codigo de estado 413. Su solicitud no fue procesada");
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
                this.toast('Listo. Creaste una nueva tarea para tus estudiantes');
              })
              .catch(() => {
                this.$dialog.alert("El servidor responde con un codigo de estado 413. Su solicitud no fue procesada");
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
      let message = {
        title: "¿Esta seguro que quiere eliminar?",
        body: " Esta acción no se puede deshacer",
      };
      let options = {
        loader: true,
        okText: "Continuar",
        cancelText: "Cancelar",
        animation: "bounce",
      };
      this.$dialog
        .confirm(message, options)
        .then((dialog) => {
          this.dialogDelete();
          this.numPages=1;
            this.page=1;
          setTimeout(() => {
            dialog.close();
            
          }, 1200);
         
        })
        .catch(function() {
         
        });
    },

    dialogDelete() {
      
      let isArray = this.isSelecUsers.length;
      if (isArray > 0) {
        this.isLoading = true;
        this.$proxies._aulaProxi
        .removeTask(this.$route.params.id, this.isSelecUsers) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
        .then(() => {
          this.isLoading = false;
          this.isSelecUsers = [];
          this.page =1;
          this.getData();
          this.toast('Se eliminó '+isArray+' tareas de este curso');
        })
        .catch((x) => {
          this.isLoading = false;
          alert("Error server not found", x.response);
        });
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
       this.clickme = false;
    },
    selectOne(ids) {
      if (!this.isSelecUsers.includes(ids)) {
        this.isSelecUsers.push(ids);
      } else {
        this.isSelecUsers.splice(this.isSelecUsers.indexOf(ids), 1);
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
              this.model.task.estado = arrasTask[0].estado;
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
      
    },
    toast(message) {
      this.$toasted.info(message, {
        duration: 2100,
        position : 'bottom-center',
        icon: "check-circle",
        theme: "toasted-primary",
        action : {
          text : 'CERRAR',
          onClick : (e, toastObject) => {
              toastObject.goAway(0);
          }
        }
      });
    },
    openCont : function(){
      this.clickme = !this.clickme
    },
    openChildRewiewTrask: function(key){
      this.ifChildRevision = true;
      this.idAula = this.$route.params.id;
      this.idTasks= key;
    },
    closedChildRewiewTrask: function(){
      this.ifChildRevision = false;
    },
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
