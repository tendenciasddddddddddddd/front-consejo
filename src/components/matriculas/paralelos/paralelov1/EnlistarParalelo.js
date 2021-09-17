
import "datatables.net-dt/js/dataTables.dataTables.min.js";
import Espera from "../../../../shared/Espera";
import Navss from "../../../../shared/Navss";
import Skeleton from "../../../../shared/Skeleton";
import IsSelect from "../../../../shared/IsSelect";
export default {
  name: "EslistarParalelo",
  components: {
    Espera,
    Navss,
    Skeleton,
    IsSelect,
  },
  data() {
    return {
      tab: "inicio",
      isVisible: "panel1",
      tabla: "1",
      idds: null,
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
      isSelecCurosos: [],
      isClick : false,
      isClick2 : false,
      isRemoveSelecC: [],
      isError: '',
    };
  },
  methods: {
    __listPeriodo() {
      //-----------TRAE LA LISTA DE LOS ROLES h
      this.$proxies._matriculaProxi
        .getFull()
        .then((x) => {
          let filtro = x.data.niveles;
          this.listPeriodo = filtro.filter(
            (x) => x.typo == "Intensivo" && x.estado == "1"
          ); //este no se toca
        })
        .catch((err) => {
          console.log("Error", err);
        });
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
      let modalidad = "m1";
      this.$proxies._matriculaProxi
        .getFullMatricula(modalidad, cursos)
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
      if(isArray>0){
          for(let i=0; i<this.isSelecCurosos.length; i++){
            this.$proxies._matriculaProxi
            .updateMatricula(this.isSelecCurosos[i], this.model)
            .then(() => {
             
            })
            .catch(() => {
              console.log("Error imposible");
            });
          }
          this.__cambios(this.idds);
          this.isClick = false;
          this.isError= '';
      }
 
    },
    checkExist(event) {
      if (event) {
        if (this.listPeriodo[0]._id) {
          this.__cambios(this.check2._id);
        }
      }
    },

    __verLista(obj) {
      if (obj) {
        this.__cambios(obj);
        this.idds = obj;
        this.isVisible = "panel2";
        this.check = 'N';
        this.isSelecCurosos= []
      }
    },
    __volverAsignacion(){
      this.isVisible = "panel2";
      this.isSelecCurosos= [];
      this.check = 'N';
      this.isRemoveSelecC= [];
      this.isError= '';
    },
    //------------------------------------CONFIGURAR MATRICULA---------------isConfig
    __mostrarConf() {
      this.isVisible = "panel3";
      this.__configuramatricula();
    },
    __configuramatricula() {
      this.infoMat2 = this.filtros.filter((x) => x.curso == this.check);
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
        for(let i=0; i<this.isRemoveSelecC.length; i++){
          this.$proxies._matriculaProxi
          .updateMatricula(this.isRemoveSelecC[i], this.model)
          .then(() => {
           
          })
          .catch(() => {
            console.log("Error imposible");
          });
        }
        this.isClick2 = false;
        this.isVisible = "panel2";
        this.__cambios(this.idds);
        
       
    }
  },
    
  },

  created() {
    this.__listPeriodo();
    this.__listNivele();
  },
};




