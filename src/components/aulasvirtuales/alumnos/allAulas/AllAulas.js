import Skeleton from '../../../../shared/Skeleton'
const info = JSON.parse(localStorage.getItem("Xf"));
export default {
    name: 'MenuCursos',
    components:{
     Skeleton
    },
    data() {
        return {
         modals: 'closed',
         info: {},
         isData: false,
         modalidad : info.modalidad,
         //Pagina 
         page: 1,
         perPage: 10,
         pages: [],
         numPages:null,
         nomMateria: 'None',
         keys: '',
         llave : null,
         isError: '',
         isSelect: null,
         model : {
           _id : null,
           estudiantes : {
            usuario : this.$store.state.user.id,
            name : info.nombre,
            email : info.correo,
           }
         },
         ifLoad: false,

        }
    },
    methods: {
        //updateInfoDocentes(id)
        getData(){
            this.isData = true;
            if(this.modalidad){
             this.$proxies._aulaProxi
             .updateAulaEstudantes(this.modalidad)
             .then((x) => {
               this.info = x.data;
               this.numPages = Math.ceil(this.info.length / this.perPage);
               this.isData = false;
               
             })
             .catch((err) => {
               console.log("Error", err);
               this.isData = false;
             });
            }
        },
        verificarCalve(obj){
          this.__limpiarCampos();
          this.keys = obj.codigo;
          this.modals= 'openn';
          this.nomMateria = obj.materia;
          this.model._id = obj._id;
          this.isSelect = obj;
        },
        save(){
          if(this.keys ==this.llave){
              this.ifLoad = true;
              if(this.AlgoritmoEstidanteUnico()){
                this.isError = 'Ya te encuentras matrculado';
                this.ifLoad = false;
                return
              }
              this.$proxies._aulaProxi
              .update(this.model._id, this.model) //-----------EDITAR CON AXIOS
              .then(() => {
                this.ifLoad = false;
                this.modals= 'closed';
              })
              .catch((err) => {
                console.log("Error", err);
                this.ifLoad = false;
              });
          }else{
            this.isError = 'Código Incorrecto';
          }
        },
        AlgoritmoEstidanteUnico(){
             let duplicado = this.isSelect.estudiantes.filter((x)=> x.usuario == this.model.estudiantes.usuario);
             let isExiste = duplicado.length;
             if(isExiste>0){
                  return true;
             }else{
                return false;
             }
        },
        __limpiarCampos(){
          this.keys = ''
          this.nomMateria = '';
          this.model._id = '';
          this.llave = '';
          this.isError= '';
        },
          paginate(articles) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return articles.slice(from, to);
          }
    },
    created() {
        this.getData();
    },
 
      computed: {
        displayedArticles: function () {
          return this.paginate(this.info);
        }
      }
 };