import Spinner from "../../../../shared/Spinner.vue";
import ScrimModal from "../../../../shared/ScrimModal"
import Dropdown from "../../../../shared/Dropdown.vue";
import NoFound from "../../../../shared/NoFound"
import Astronauta from "../../../../shared/Astronauta"
import Modal from "../../../../shared/Modal"
export default {
  name: 'Report',
  components: {
    Spinner, ScrimModal, Dropdown, NoFound,Astronauta,Modal,
    FormatoMatricula: () => import( /* webpackChunkName: "FormatoMatricula" */ "./FormatoMatricula.vue"),
    FormatoPromocion: () => import( /* webpackChunkName: "FormatoPromocion" */ "./FormatoPromocion.vue"),
    FormatoLibretas: () => import( /* webpackChunkName: "FormatoLibretas" */ "./FormatoLibretas.vue"),
    LibretasConducta: () => import( /* webpackChunkName: "LibretasConducta" */ "./LibretasConducta.vue"),
    InicialesPromocion: () => import( /* webpackChunkName: "InicialesPromocion" */ "./InicialesPromocion.vue"),
  },
  data() {
    return {
      listniveles: {},
      isLoading1: false,
      isTabla: false,
      infoMat: {},
      info: null,
      isReporte: false,
      curso: "",
      rowData: [],
      ifmatricula: false,
      ifpromocion: false,
      iflibretas: false,
      ifconducta: false,
      ifPromocionInicial: false,
      isPrint: false,
      searchQuery: 'A',
      //Pagina 
    page: 1,
    perPage: 9,
    pages: [],
    numPages:0,
    totalNotas: 0,
    nextCourse: '',
    isSelecMatricula: [],
    allSelected: false,
    isActive:false,
    numQuimestre: 0,
    settings : {},
    checked : 0,
    parcial: false,
    parcial2: false,
    numActual: 0,
    paralelos: [
      {
        id: "0",
        nombre: "A",
      },
      {
        id: "1",
        nombre: "B",
      },
      {
        id: "2",
        nombre: "C",
      },
      {
        id: "3",
        nombre: "D",
      },
      {
        id: "4",
        nombre: "Undefined",
      },
    ],
    }
  },
  watch: {
    curso: function (value) {
      this.isSelecMatricula = [];
      this.__cambios(value._id, value.num);
      this.numActual = value.num;
    }
  },
  computed: {
    displayedArticles: function () {
      if (this.searchQuery.length>0) {
        this.isSelecMatricula = [];
        return this.infoMat.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.curso.toLowerCase().includes(v));
        });
      }else{
        return this.infoMat;
      }
      
    }
  },
  methods: {
    onChange(nom){
      this.searchQuery = nom;  
  },
    activar(){
      this.isActive=true;
    },
    selectcursos(ids) {
      if (!this.isSelecMatricula.includes(ids)) {
        this.isSelecMatricula.push(ids);
      } else {
        this.isSelecMatricula.splice(this.isSelecMatricula.indexOf(ids), 1);
      }
    },
    selectAll: function () {
      this.allSelected = true;
      this.isSelecMatricula = [];
      if (this.allSelected) {
        for (let user in this.displayedArticles) {
          this.isSelecMatricula.push(this.displayedArticles[user]._id);
        }
      }
    },
    deletedSelected: function () {
      this.allSelected = false;
      this.isSelecMatricula = [];
    },
    paginate(articles) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      
      this.numPages = Math.ceil(articles.length/8);
      return articles.slice(from, to);
  },
  onPageChange: function(page) {
    this.page = page;

  },
    verificarUsuario() {
      this.$proxies._settingProxi.getConfigure()
          .then((x) => {
              const {rector,logo, secretario,unidadeducativa,ubicacion,direccion,telefono} = x.data[0];
              this.settings = {
                secretario : secretario,
                rector : rector,
                unidadeducativa: unidadeducativa,
                ubicacion: ubicacion,
                telefono:telefono,
                direccion: direccion,
                logo : logo,
              }  
          }).catch(() => {
              console.log("Error")
          });
    },
    changeStatus(ev){
      if (ev=='100') {
        this.isPrint = false;
        this.ifmatricula = false
        this.ifpromocion = false
        this.iflibretas = false
        this.ifconducta = false;
        this.ifPromocionInicial = false
      }
    },
    __listNivele() {
      this.$Progress.start();
      this.isLoading1 = true;
      this.$proxies._gestionProxi
        .getNiveles()
        .then((x) => {
          this.listniveles = x.data;
          this.isLoading1 = false;
          this.$Progress.finish();
        })
        .catch((err) => {
          console.log("Error", err);
          this.isLoading1 = false;
          this.$Progress.fail();
        });
    },

    __cambios(cursos, num) {
      this.$Progress.start();
      this.infoMat = []
      this.selectPromocion(num)
      this.isTabla = true;
      this.$proxies._matriculaProxi
        .getInfoListReport(cursos)
        .then((x) => {
          this.infoMat = x.data;
          this.isTabla = false;
          this.$Progress.finish();
        })
        .catch((err) => {
          console.log("Error", err);
          this.isTabla = false;
          this.$Progress.fail();
        });
    },
    selectPromocion: function(promocion) {
     let aux = 1+ parseInt(promocion)
     const res = this.listniveles.filter((x) => x.num == aux);
     if (res.length > 0) {this.nextCourse = res[0].nombre}
     else {this.nextCourse = 'No Promoción'}
     
    },
    close() {
      this.$emit('myEventClosedModalReporte');
    },
    closeModal(){
      this.isActive = false;
    },
    get: function () {
      if (this.isSelecMatricula.length > 0) {
        this.isPrint = true;
        this.ifmatricula = true;
        this.rowData = this.isSelecMatricula
      } else {
        this.$dialog.alert("Seleccione un estudiante al menos");
      }
    },
    get2: function () {
      if (this.isSelecMatricula.length > 0) {
        this.isPrint = true;
        if (this.numActual==1 || this.numActual==2 || this.numActual==3) {this.ifPromocionInicial= true}
        else {this.ifpromocion = true}
        this.rowData = this.isSelecMatricula
      } else {
        this.$dialog.alert("Seleccione un estudiante al menos");
      }
    },
    libretas_pdf: function () {
      if (this.isSelecMatricula.length > 0) {
        if (this.parcial !='' || this.parcial2 !='') {
          this.numQuimestre = this.checked;
          this.closeModal();
          this.isPrint = true;
          this.iflibretas = true
          this.rowData = this.isSelecMatricula
        }else {
          this.$dialog.alert("Seleccionar un parcial");
        }
      }else {
        this.$dialog.alert("Seleccione un estudiante al menos");
      }
    },
    conducta_pdf: function () {
      if (this.isSelecMatricula.length > 0) {
          this.isPrint = true;
          this.ifconducta = true;
          this.rowData = this.isSelecMatricula
      }else {
        this.$dialog.alert("Selecione un estudiante por lo menos");
      }
    },
  },
  created() {
    this.verificarUsuario();
    this.__listNivele();
  },
};

