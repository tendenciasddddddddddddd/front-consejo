const $ = require('jquery')
import Spinner from '../../../shared/Spinner'
export default {
    name: 'Nivel',
    components: {
        Spinner
    },
    data() {
        return {
            totalNotas: 0,
            paginaActual: 1,
            info: null,
            ifLoad:false,
            pagg: null,
            MsmError : "",
            pagina: 0,
            checked:"",
            paginas: 0,
            isLoading: false, //EL SNIPPER CARGA EN FALSO
            isModalVisible: false,
            model: {//-----------VARIABLES DEL MODELO A GUARDAR
              _id: null, 
              nombres: null, 
              modalidad: null, 
              estado: null,
           },
           modalidad:[
            {name: "Intensivo", id:"1"},
            {name: "Extraordinaria", id:"2"}
        ],
     
        }
    },
    methods: {
        getAll(pag) {
            this.isLoading = true;
            this.$proxies._gestionProxi
              .getAll(pag, 6) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
              .then((x) => {
                this.info = x.data.niveles;
                this.pagg = x.data;
                this.pagina = this.pagg.pagina;
                this.paginas = this.pagg.paginas;
                this.totalNotas = this.pagg.total;
                this.isLoading = false;
              })
              .catch(() => {
                console.log("Error imposible");
                this.isLoading = false;
              });
          },
          showModal() {
            this.isModalVisible = true;
          },
          save() {
            this.$validate().then(success => { 
              if (!success){ 
                this.$notify({
                    group: "global",
                    text: "Por favor llena correctamente los campos solicitados",
                  });
                  return
              }
                if(this.model._id){
                  this.ifLoad = true;
                  this.model.modalidad = this.checked;
                  this.$proxies._gestionProxi.update(this.model._id, this.model)
                    .then(() => {
                      this.__limpiarCampos();
                      $("#exampleModal #myModalClose").click()//CERRAR MODAL
                      this.ifLoad = false;
                      this.getAll(1);
                    })
                    .catch(() => {
                      console.log("Error")
                    });    
                }else{
                  this.ifLoad = true;
                  if(this.model.estado==true){
                    this.model.estado=1
                  }else{
                    this.model.estado =0
                  }
                  if(!this.checked){
                        this.MsmError="Elegir la modalidad";
                        this.ifLoad = false;
                        return;
                  }
                  this.model.modalidad = this.checked;
                  this.$proxies._gestionProxi.create(this.model) //-----------GUARDAR CON AXIOS
                  .then(() => {
                    this.ifLoad = false;
                    $("#exampleModal #myModalClose").click();
                    this.getAll(1);
                  })
                  .catch((error) => {//-----------EN CASO DE TENER DUPLICADO LOS DOCUMENTOS EL SERVIDOR LANZARA LA EXEPCION
                    this.ifLoad = false;
                    if(error.response){
                      if(error.response.status==500){
                        this.MsmError = "Error ese registro ya existe"
                      }
                    }else{
                      console.log('Error', error.message); 
                    }
                  }); 
                }
           
            });
          },
          gets(id) { 
            this.__limpiarCampos();
            this.$proxies._gestionProxi.get(id)
                .then((x) => {
                    this.model = x.data;
                    this.checked= this.model.modalidad;
                }).catch(() => {
                    console.log("Error")
                });
          },
          __eliminar(idn) {
            this.isLoading = true;
            if (confirm('ESTA SEGURO QUE QUIERE ELIMINAR?')) {
              this.$proxies._gestionProxi
              .remove(idn) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
              .then(() => {
                this.$notify({
                  group: "global",
                  text: "Registro destruido",
                });
                this.isLoading = false;
                this.getAll(1);
              })
              .catch((x) => {
                alert("Error 401", x.response);
              });
            }else{
              this.isLoading = false;
            }
        
          },
          __limpiarCampos() { //LIMPIAR CAMPOS DE EL MODAL
            this.model._id = "";
            this.model.nombres = "";
            this.model.estado = 0;
            this.MsmError ="";
            this.checked= "";
        }, //----FIN----
    },
    watch: {
        "$route.query.pagina": {
          immediate: true,
          handler(pagina) {
            pagina = parseInt(pagina) || 1;
            this.getAll(pagina);
            this.paginaActual = pagina;
          },
        },
      },
      validators: { //ATRIBUTOS RAPA VALIDAR LOS CAMBIOS
        'model.nombres'(value) {
          return this.$validator
            .value(value)
            .required()
            .minLength(3)
            .maxLength(50);
        },

    },
}