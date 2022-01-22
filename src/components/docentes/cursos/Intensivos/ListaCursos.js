
import ProgressBar from '../../../../shared/ProgressBar'
import RestResource from '../../../../service/isAdmin'
const restResourceService = new RestResource();
let img = require('../../../../assets/img/icons/Desktop.svg')
let img2 = require('../../../../assets/img/icons/middle-blob.svg')

export default {
  name: 'ListaCursos',
  components:{
     ProgressBar
   },
  data() {
      return {
         roles: this.$store.state.user.roles,
          info: {},
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
          nombreimagen:null,
          imgs: img,
          imgs2: img2,
      }
  },
  methods: {
    verificarUsuario(){
      if(!restResourceService.docente(this.roles)){
        this.$router.push("/");
      }
    },
      gets() {   
        if(this.$route.params.id){
            this.isData = true;
            this.$Progress.start();
            this.$proxies._gestionProxi.getDistributivo(this.$route.params.id)
            .then((x) => {
                this.info = x.data;
                this.model.icono = this.info.icono;
                this.ids = this.info._id;
                this.isData = false;
                this.$Progress.finish();
            }).catch(() => {
                console.log("Error")
                this.isData = false;
            });
        }
      },
      mostrarFormulario(){
          this.isEdit = true;
      },
      nextPage(){
        var myCourse = {
        paralelo: this.info.paralelo,
        nombre:   this.info.nombre,
        materia:  this.info.fmateria.nombre,
       }
       let id= this.info.fnivel._id;
       localStorage.removeItem('myCourse');
       if (!localStorage.getItem("myCourse")) {
         localStorage.setItem("myCourse", JSON.stringify(myCourse));
         this.$router.push({ path: `/qualifys/${id}` });
       
       }
      
      },
     
  },
  created() {
    this.verificarUsuario();
      this.gets();
  }
};