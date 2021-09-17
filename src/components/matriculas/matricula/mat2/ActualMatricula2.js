
import "datatables.net-dt/js/dataTables.dataTables.min.js"

import Espera from "../../../../shared/Espera";
import Navss from "../../../../shared/Navss";
import Spinner from "../../../../shared/Spinner.vue";
export default {
  name: "ListaMatricula",
  components: {
    Espera,
    Navss, Spinner
  },
  data() {
    return {
      tab: "inicio",
      isVisible: 'panel1',
      isLoading1: false,
      isLoading2: false,
      isTabla: true,
      listPeriodo: null,
      check: null,
      select:null,
      infoMat: null,
      listniveles: null,
      
    };
  },
  methods: {
    __listPeriodo() {
      //-----------TRAE LA LISTA DE LOS ROLES h
      this.$proxies._matriculaProxi
        .getFull()
        .then((x) => {
          let filtro = x.data.niveles;
          this.listPeriodo = filtro.filter((x) => x.typo == "Extraordinaria" && x.estado == "1");
        })
        .catch((err) => {
          console.log("Error", err);
         
        });
    },
    __listNivele() {
      //-----------TRAE LA LISTA DE LOS ROLES 
      this.isLoading1 = true;

      this.$proxies._gestionProxi
        .getNiveles()
        .then((x) => {
          let filtros = x.data;
          this.listniveles = filtros.filter((x) => x.modalidad == 'Extraordinaria');
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
      let modalidad = "m2";
      this.$proxies._matriculaProxi
        .getFullMatricula(modalidad, cursos)
        .then((x) => {
          this.infoMat = x.data.matriculados;
          this.isTabla = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isTabla = false;
        });
    },

          remove(id) { //METODO PARA ELIMINAR  ROW
           if (confirm('ESTA SEGURO QUE QUIERE ELIMINAR? YA QUE ESOS CAMBIOS NO SE PUEDE REVERTIR')) {
            this.$proxies._matriculaProxi.removeMatricula(id)
            .then(() => {
                 this.isVisible= 'panel1';
                this.$notify({
                    group: "global",
                    text: "Registro Destruido",
                 });
                  
            })
            .catch(() => {
             alert("Error");
            
           });
           }
        
      },
/*     checkExist(event) {

      if (event) {
          if(this.listPeriodo[0]._id){
             this.__cambios(this.check._id);
              
          }
      }
    }, */

    checkClick(curso){
      if(curso){
         this.__cambios(curso);
      }
    },
    onChange(event) {
      if (event) {
          if(this.check._id){
              if(event.target.value!='Seleccione un curso'){
                  let curso=event.target.value;
                  this.__cambios(this.check._id, curso);
              }
              
          }
      }
    },
    __verLista(obj){
         if(obj){
         this.__cambios(obj);
         this.isVisible= 'panel2';
      }
    },
  },
  created() {
    this.__listPeriodo();
    this.__listNivele();
  },
};