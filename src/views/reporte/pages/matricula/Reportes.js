import Spinner from "../../../../shared/Spinner.vue";
import ScrimModal from "../../../../shared/ScrimModal"
import Dropdown from "../../../../shared/Dropdown.vue";
import NoFound from "../../../../shared/NoFound"
import Paginate from "../../../../shared/Paginate.vue";
import Astronauta from "../../../../shared/Astronauta"
import Modal from "../../../../shared/Modal"
export default {
  name: 'Report',
  components: {
    Spinner, ScrimModal, Dropdown, NoFound,Paginate,Astronauta,Modal,
    FormatoMatricula: () => import( /* webpackChunkName: "FormatoMatricula" */ "./FormatoMatricula.vue"),
    FormatoPromocion: () => import( /* webpackChunkName: "FormatoPromocion" */ "./FormatoPromocion.vue"),
    FormatoLibretas: () => import( /* webpackChunkName: "FormatoLibretas" */ "./FormatoLibretas.vue"),
    LibretasConducta: () => import( /* webpackChunkName: "LibretasConducta" */ "./LibretasConducta.vue"),
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
      isPrint: false,
      searchQuery: '',
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
    }
  },
  watch: {
    curso: function (value) {
      this.isSelecMatricula = [];
      this.__cambios(value._id, value.num);
    }
  },
  computed: {
    displayedArticles: function () {
      if (this.searchQuery.length>0) {
        return this.infoMat.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.curso.toLowerCase().includes(v));
        });
      }else{
        return this.paginate(this.infoMat);
      }
      
    }
  },
  methods: {
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
              const {rector, secretario,} = x.data[0];
              this.settings = {
                secretario : secretario,
                rector : rector,
              }  
          }).catch(() => {
              console.log("Error")
          });
    },
    changeStatus(ev){
      if (ev=='100') {
        this.isPrint = false;
      }
    },
    __listNivele() {
      this.isLoading1 = true;
      this.$proxies._gestionProxi
        .getNiveles()
        .then((x) => {
          this.listniveles = x.data;
          this.isLoading1 = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isLoading1 = false;
        });
    },

    __cambios(cursos, num) {
      this.infoMat = []
      this.selectPromocion(num)
      this.isTabla = true;
      this.$proxies._matriculaProxi
        .getInfoListReport(cursos)
        .then((x) => {
          this.infoMat = x.data;
          this.isTabla = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isTabla = false;
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
        this.ifmatricula = false
        this.ifpromocion = false
        this.iflibretas = false
        this.ifconducta = false
        this.isPrint = true;
        this.rowData = this.isSelecMatricula
        setTimeout(() => this.callReport(), 150);
      } else {
        this.$dialog.alert("Seleccione un estudiante al menos");
      }
    },
    get2: function () {
      if (this.isSelecMatricula.length > 0) {
        this.ifmatricula = false
        this.ifpromocion = false
        this.iflibretas = false
        this.ifconducta = false
        this.isPrint = true;
        this.rowData = this.isSelecMatricula
        setTimeout(() => this.callReport2(), 150);
      } else {
        this.$dialog.alert("Seleccione un estudiante al menos");
      }
    },
    libretas_pdf: function () {
      if (this.isSelecMatricula.length > 0) {
        if (this.parcial !='' || this.parcial2 !='') {
          this.numQuimestre = this.checked;
          this.ifmatricula = false
          this.ifpromocion = false
          this.iflibretas = false
          this.ifconducta = false
          this.closeModal();
          this.isPrint = true;
          this.rowData = this.isSelecMatricula
          setTimeout(() => this.callLibretas(), 150);
        }else {
          this.$dialog.alert("Seleccionar un parcial");
        }
      }else {
        this.$dialog.alert("Seleccione un estudiante al menos");
      }
    },
    conducta_pdf: function () {
      if (this.isSelecMatricula.length > 0) {
          this.ifmatricula = false
          this.ifpromocion = false
          this.iflibretas = false
          this.ifconducta = false
          this.isPrint = true;
          this.rowData = this.isSelecMatricula
          setTimeout(() => this.callConducta(), 150);
      }else {
        this.$dialog.alert("Selecione un estudiante por lo menos");
      }
    },
    callReport() {
      if (this.rowData.length > 0) this.ifmatricula = true
      if (this.rowData.length == 0)  this.isPrint = false;
    },
    callReport2() {
      if (this.rowData.length > 0) this.ifpromocion = true
      if (this.rowData.length == 0)  this.isPrint = false;
    },
    callLibretas() {
      if (this.rowData.length > 0) this.iflibretas = true
      if (this.rowData.length == 0)  this.isPrint = false;
    },
    callConducta() {
      if (this.rowData.length > 0) this.ifconducta = true
      if (this.rowData.length == 0)  this.isPrint = false;
    },
    
  },
  created() {
    this.verificarUsuario();
    this.__listNivele();
  },
};

