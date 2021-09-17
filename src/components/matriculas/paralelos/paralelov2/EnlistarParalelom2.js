
import "datatables.net-dt/js/dataTables.dataTables.min.js"
import Espera from "../../../../shared/Espera";
import Navss from "../../../../shared/Navss";
import Skeleton from "../../../../shared/Skeleton";
import IsSelect from "../../../../shared/IsSelect";
export default {
     name: 'EslistarParalelom2',
     components: {
        Espera,
        Navss,
        Skeleton ,IsSelect
      },
     data() {
          return {
            tab: "inicio",
            isVisible : 'panel1',
            tabla: '1',
            idds: null,
            paralelos: [
              {
                value: "0",
                nombre: "A",
              },
              {
                value: "1",
                nombre: "C",
              },
              {
                value: "2",
                nombre: "D",
              },
              {
                value: "3",
                nombre: "E",
              },
              {
                value: "4",
                nombre: "F",
              },
            ],
              check: {
                  id: null,
                  nombre: null
              },
              check2: {
                _id: null,
                nombres: null
            },
              listPeriodo: null,
              isLoading1:false,
              listniveles : null,
              isTabla : null,
              isAccesible: false,
              isConfig: null,
              filtros: null,
              infoMat:null,
              infoMat2: null,
              isExcel: false,
              model:{
                curso:null,
              },
              rutass: [
                {
                  id: "0",
                  nombre: "Home",
                  url: "/",
                },
                {
                  id: "1",
                  nombre: "Opciones de Matricula",
                  url: "/Opciones-Matricula",
                },
                {
                  id: "2",
                  nombre: "Intensivo",
                  url: "/Matricula-1",
                },
              ],

              dataFinal:{
                nombres: null,
                curso: null,
                Paralelo: null
              }
          }
     },
     methods: {
        __listPeriodo() {
            //-----------TRAE LA LISTA DE LOS ROLES h
            this.$proxies._matriculaProxi
              .getAll()
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
         
           // this.isTabla = true;
            this.$proxies._gestionProxi
              .getNiveles()
              .then((x) => {
                let filtross = x.data;
                this.listniveles = filtross.filter((x) => x.modalidad == 'Extraordinaria');
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
            let periodoA = this.listPeriodo[0]._id;
            this.$proxies._matriculaProxi
              .getInfoListv1Matricula(periodoA, modalidad, cursos)
              .then((x) => {
                this.filtros = x.data.matriculados;
                this.infoMat = this.filtros.filter((x) => x.curso=='Undefined');
                this.isTabla = false;
                this.isAccesible ==false;
              })
              .catch((err) => {
                console.log("Error", err);
                this.isTabla = false;
              });
          },

        remove(id) { //METODO PARA ELIMINAR  ROW
        
          if(this.check.nombre){
           
            this.model.curso = this.check.nombre;
            this.$proxies._matriculaProxi.updateMatricula(id, this.model)
            .then(() => {
               this.idds
               this.__cambios(this.idds);  
            })
            .catch(() => {
             alert("Error");
            
           });
           }else{
             alert("SELECCIONE UN PARALELO")
           }
      },
        checkExist(event) {

            if (event) {
                if(this.listPeriodo[0]._id){
                   this.__cambios(this.check2._id);
                    
                }
            }
          },

          __verLista(obj){
            if(obj){
            this.__cambios(obj);
            this.idds = obj;
            this.isVisible= 'panel2';
         }
       },
          //------------------------------------CONFIGURAR MATRICULA---------------isConfig
          __mostrarConf(){
            this.isVisible= 'panel3';
            this. __configuramatricula();
          },
          __configuramatricula(){
             this.infoMat2= this.filtros.filter((x) => x.curso!='Undefined');
            this.isConfig = true;
            let modalidad = "m2";
            let periodoA = this.listPeriodo[0]._id;
            if(this.check.nombre){
              this.$proxies._matriculaProxi
              .getInfoListv1Matricula(periodoA, modalidad, this.idds)
              .then((x) => {
                this.filtros = x.data.matriculados;
                this.infoMat2 = this.filtros.filter((x) => x.curso==this.check.nombre);
                this.isConfig = false;
                this.__desactivarActualizacion(1);
              })
              .catch((err) => {
                console.log("Error", err);
                this.isConfig = false;
              });
            }else{
              this.isVisible= 'panel2';
            }
            
          },
          __quitarParalelo(id){
            if(this.check.nombre){
              this.model.curso = 'Undefined';
              this.$proxies._matriculaProxi.updateMatricula(id, this.model)
              .then(() => {
                 this. __configuramatricula();
                  
                    
              })
              .catch(() => {
               alert("Error");
              
             });
             }else{
               alert("SELECCIONE UN PARALELO")
             }
          },
          __desactivarActualizacion(bit){
            if(bit){
              this.isAccesible ==true;
            }else {
              this.isAccesible ==false;
            }
            
          },
           
    
          
     },
 
     created() {
        this.__listPeriodo();
        this.__listNivele();
      },
} 