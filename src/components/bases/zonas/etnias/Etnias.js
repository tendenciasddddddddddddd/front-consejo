const $ = require('jquery')
import Spinner from '../../../../shared/Spinner'
import Navs from '../../../../shared/Navs'
import Navss from '../../../../shared/Navss'
export default {
    name: 'Etnias',
    components: {
        Spinner,
        Navs, Navss
    },
    data() {
        return {
            totalNotas: 0,
            paginaActual: 1,
            info: null,
            ifLoad: false,
            pagg: null,
            MsmError: "",
            pagina: 0,
            paginas: 0,
            isLoading: false, //EL SNIPPER CARGA EN FALSO
            isModalVisible: false,
            model: { //-----------VARIABLES DEL MODELO A GUARDAR
                _id: null,
                nombre: null,
                estado: null,
            },
            rutass: [
                {
                  id: "0",
                  nombre: "Home",
                  url:"/",
                },
                {
                    id: "2",
                    nombre: "Menu Zonas",
                    url:"/MenuZonas",
                  },
              ],
        }
    },
    methods: {
        getAll(pag) {
            this.isLoading = true;
            this.$proxies._zonasProxi
                .getAllEtnias(pag, 7) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
                .then((x) => {
                    this.info = x.data.datas;
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
                if (!success) {
                    this.$notify({
                        group: "global",
                        text: "Por favor llena correctamente los campos solicitados",
                    });
                    return
                }
                if (this.model._id) {
                    this.ifLoad = true;
                    this.$proxies._zonasProxi.updateEtnias(this.model._id, this.model)
                        .then(() => {
                            this.__limpiarCampos();
                            $("#exampleModal #myModalClose").click() //CERRAR MODAL
                            this.ifLoad = false;
                            this.getAll(1);
                        })
                        .catch(() => {
                            console.log("Error")
                        });
                } else {
                    this.ifLoad = true;
                    if (this.model.estado == true) {
                        this.model.estado = 1
                    } else {
                        this.model.estado = 0
                    }
                    this.$proxies._zonasProxi.createEtnias(this.model) //-----------GUARDAR CON AXIOS
                        .then(() => {
                            this.ifLoad = false;
                            $("#exampleModal #myModalClose").click();
                            this.getAll(1);
                        })
                        .catch((error) => { //-----------EN CASO DE TENER DUPLICADO LOS DOCUMENTOS EL SERVIDOR LANZARA LA EXEPCION
                            this.ifLoad = false;
                            if (error.response) {
                                if (error.response.status == 500) {
                                    this.MsmError = "Error ese registro ya existe"
                                }
                            } else {
                                console.log('Error', error.message);
                            }
                        });
                }

            });
        },
        gets(id) {
            this.__limpiarCampos();
            this.$proxies._zonasProxi.getIdEtnias(id)
                .then((x) => {
                    this.model = x.data;
                }).catch(() => {
                    console.log("Error")
                });
        },
        __eliminar(idn) {
            this.isLoading = true;
            if (confirm('ESTA SEGURO QUE QUIERE ELIMINAR?')) {
                this.$proxies._zonasProxi
                    .removeEtnias(idn) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
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
            } else {
                this.isLoading = false;
            }

        },
        __limpiarCampos() { //LIMPIAR CAMPOS DE EL MODAL
            this.model._id = "";
            this.model.nombre = "";
            this.model.estado = 0;
            this.MsmError = "";
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
        'model.nombre'(value) {
            return this.$validator
                .value(value)
                .required()
                .minLength(3)
                .maxLength(20);
        },
    },
}