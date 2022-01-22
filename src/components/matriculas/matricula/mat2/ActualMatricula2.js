
//import Espera from "../../../../shared/Espera";
import Spinner from "../../../../shared/Spinner.vue";
export default {
  name: "ListaMatricula",
  components: {
    //Espera,
    Spinner,
  },
  data() {
    return {
      tab: "inicio",
      isVisible: "panel1",
      isLoading1: false,
      isLoading2: false,
      isTabla: true,
      check: null,
      select: null,
      infoMat: null,
      listniveles: null,
      isSelecMatricula: [],
      iseliminaddo: false,
       nombre_curso: '',
      index: "0",
    };
  },
  methods: {

    __listNivele() {
      //-----------TRAE LA LISTA DE LOS ROLES
      this.isLoading1 = true;

      this.$proxies._gestionProxi
        .getNiveles()
        .then((x) => {
          let filtros = x.data;
          this.listniveles = filtros.filter(
            (x) => x.modalidad == "Extraordinaria"
          );
          // this.isTabla = false;
          this.isLoading1 = false;
        })
        .catch((err) => {
          console.log("Error", err);
          // this.isTabla = false;
          this.isLoading1 = false;
        });
    },
    __cambios(cursos) {
      this.isTabla = true;
      //let modalidad = "m2";
      this.$proxies._matriculaProxi
        .getFullMatricula( cursos)
        .then((x) => {
          this.infoMat = x.data.matriculados;
          this.isTabla = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isTabla = false;
        });
    },
    selectcursos(key) {
      let longitud = this.isSelecMatricula.length;
      let isExiste = 0;
      if (longitud > 0) {
        for (let i = 0; i < this.isSelecMatricula.length; i++) {
          if (this.isSelecMatricula[i] == key) {
            this.isSelecMatricula.splice(i, 1);
            isExiste = 1;
            break;
          }
        }
        if (isExiste === 0) {
          this.isSelecMatricula.push(key);
        }
      } else {
        this.isSelecMatricula.push(key);
      }
    },

    remove() {
      //METODO PARA ELIMINAR  ROW
      if (
        confirm(
          "ESTA SEGURO QUE QUIERE ELIMINAR? YA QUE ESOS CAMBIOS NO SE PUEDE REVERTIR"
        )
      ) {
        this.iseliminaddo = true;
        let isArray = this.isSelecMatricula.length;
        if(isArray>0){
          for(let i=0; i<this.isSelecMatricula.length; i++){
            this.$proxies._matriculaProxi
            .removeMatricula(this.isSelecMatricula[i])
            .then(() => {
              
            })
            .catch(() => {
              console.log("Error imposible");
              
            });
          }
          this.iseliminaddo = false;
         this.isVisible = "panel1";
       }
      }
    },

    verLista() {
      if (this.index != "0") {
        this.__cambios(this.index);
        this.isVisible = "panel2";
        this.isSelecMatricula = [];
      }
    },
    clicMe(keys, nombreCurso) {
      this.index = keys;
      this.nombre_curso = nombreCurso;
    },
  },
  created() {
    this.__listNivele();
  },
};
