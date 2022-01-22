import RestResource from "../../../../service/isAdmin";
const restResourceService = new RestResource();
import IsSelect from "../../../../shared/IsSelect";
import Spinner from "../../../../shared/Spinner.vue";
export default {
  name: "EslistarParalelo",
  components: {
    IsSelect,
    Spinner
  },
  data() {
    return {
      roles: this.$store.state.user.roles,
      tab: "inicio",
      isVisible: "panel1",
      tabla: "1",
      idds: null,
      istabs : '1',
      paralelos: [
        {
          value: "0",
          nombre: "B",
        },
        {
          value: "1",
          nombre: "G",
        },
      ],
      check: {
        id: null,
        nombre: null,
      },
      check2: {
        _id: null,
        nombres: null,
      },
      listPeriodo: null,
      isLoading1: false,
      listniveles: null,
      isTabla: null,
      isAccesible: false,
      isConfig: null,
      filtros: null,
      infoMat: null,
      infoMat2: null,
      isExcel: false,
      model: {
        curso: null,
      },
      dataFinal: {
        nombres: null,
        curso: null,
        Paralelo: null,
      },
      isSelecCurosos: null,
      isClick : false,
      isClick2 : false,
      isRemoveSelecC: [],
      isError: '',

      index: "0",
      nombre_curso : "",
      isSelected: false,
    };
  },
  methods: {
    verificarUsuario() {
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      }
    },
    __listNivele() {
      //-----------TRAE LA LISTA DE LOS CURSOS
      this.isLoading1 = true;
      this.$proxies._gestionProxi
        .getNiveles()
        .then((x) => {
          let filtross = x.data;
          this.listniveles = filtross.filter((x) => x.modalidad == "Intensivo");
          this.isLoading1 = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isLoading1 = false;
        });
    },
    __cambios(cursos) {
      this.isTabla = true;
     // let modalidad = "m1";
      this.$proxies._matriculaProxi
        .getFullMatricula(cursos)
        .then((x) => {
          this.filtros = x.data.matriculados;
          this.infoMat = this.filtros.filter((x) => x.curso == "Undefined");
          this.isTabla = false;
          this.isAccesible = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isTabla = false;
        });
    },
    selectcursos(key){
       let longitud = this.isSelecCurosos.length;
       let isExiste = 0;
       if(longitud>0){
          for (let i = 0; i < this.isSelecCurosos.length; i++) {
             if(this.isSelecCurosos[i]==key){
              this.isSelecCurosos.splice(i, 1); 
              isExiste = 1;
              break;
             }
          }
          if(isExiste===0){ 
            this.isSelecCurosos.push(key);
          }
       }else{
        this.isSelecCurosos.push(key);
       } 
    },
    remove() {
      //METODO PARA ELIMINAR  ROW
      this.isClick = true;
      let isArray = this.isSelecCurosos.length;
      this.model.curso = this.check;
      if(isArray>0&&this.isSelected){
            this.$proxies._matriculaProxi
            .updateMatricula(this.isSelecCurosos, this.model)
            .then(() => {
              this.__cambios(this.idds);
              this.isClick = false;
              this.isSelecCurosos= []
              this.isError= '';
              this.toast('Se asigno a '+ isArray+' estudiantes al paralelo '+ this.model.curso)
            })
            .catch(() => {
              alert("Error algo salio mal!! envie un sms en el chat para que le den soporte");
              this.isClick = false;
            });
          
      }else{
        alert('TIENE QUE SELECIONAR UN PARALELO')
      }
 
    },


    onChange(event) {
      this.iftable='1';
      this.check=event.target.value;
      this.isSelected = true;
  },

    verLista() {
      if (this.index != "0") {
        this.__cambios(this.index);
        this.idds = this.index;
        this.isVisible = "panel2";
        this.istabs = '1';
        this.check= '';
        this.isSelected = false;
        this.isSelecCurosos= []
      }
    },
    clicMe(keys, nombreCurso) {
      this.index = keys;
      this.nombre_curso = nombreCurso;
    },

    __volverAsignacion(){
      this.istabs = '1';
      this.isSelecCurosos= [];
      this.check= '';
      this.isSelected = false;
      this.isRemoveSelecC= [];
      this.isError= '';
      
    },
    //------------------------------------CONFIGURAR MATRICULA---------------isConfig
    __mostrarConf(curse) {
      this.istabs = '2';
      this.infoMat2 = this.filtros.filter((x) => x.curso == curse);
      this.isRemoveSelecC= [];
    },
    __mostrarConf2(curse) {
      this.istabs = '3';
      this.infoMat2 = this.filtros.filter((x) => x.curso == curse);
      this.isRemoveSelecC= [];
    },
    removeSelectCursos(key){
      let longitud = this.isRemoveSelecC.length;
      let isExiste = 0;
      if(longitud>0){
         for (let i = 0; i < this.isRemoveSelecC.length; i++) {
            if(this.isRemoveSelecC[i]==key){
             this.isRemoveSelecC.splice(i, 1); 
             isExiste = 1;
             break;
            }
         }
         if(isExiste===0){ 
           this.isRemoveSelecC.push(key);
         }
      }else{
       this.isRemoveSelecC.push(key);
      } 
   },

   remove2() {
    //METODO PARA ELIMINAR  ROW
    this.isClick2 = true;
    let isArray = this.isRemoveSelecC.length;
    this.model.curso = "Undefined";
    if(isArray>0){
          this.$proxies._matriculaProxi
          .updateMatricula(this.isRemoveSelecC, this.model)
          .then(() => {
            this.isClick2 = false;
            this.isRemoveSelecC= [];
            this.__cambios(this.idds); 
            this.__volverAsignacion()
            this.toast('Se removio de paralelo a  '+ isArray+' estudiantes');
          })
          .catch(() => {
            alert("Error algo salio mal!! envie un sms en el chat para que le den soporte");
            this.isClick2 = false;
          });  
    }
  },
  toast(message) {
    this.$toasted.info(message, {
      duration: 2500,
      position : 'top-center',
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
  },

  created() {
    this.verificarUsuario();
    this.__listNivele();
  },
};




