import Spinner from "../../../../shared/Spinner.vue";
import ScrimModal from "../../../../shared/ScrimModal"
import Dropdown from "../../../../shared/Dropdown.vue";
import NoFound from "../../../../shared/NoFound"
import RestResource from "../../../../service/isAdmin";
import Paginate from "../../../../shared/Paginate.vue";
import Astronauta from "../../../../shared/Astronauta"
const restResourceService = new RestResource();
export default {
  name: 'Report',
  components: {
    Spinner, ScrimModal, Dropdown, NoFound,Paginate,Astronauta,
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
      roles: this.$store.state.user.roles,
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
      if (this.searchQuery.length>1) {
        return this.infoMat.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.nombre.toLowerCase().includes(v));
        });
      }else{
        return this.paginate(this.infoMat);
      }
      
    }
  },
  methods: {
    activar(){
      if (this.isActive) {
        this.isActive=false;
      }else{
        this.isActive=true;
      }
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
        for (let user in this.infoMat) {
          this.isSelecMatricula.push(this.infoMat[user]._id);
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
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      }
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
          // this.isTabla = false;
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
        this.$dialog.alert("Selecione un estudiante por lo menos");
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
        this.$dialog.alert("Selecione un estudiante por lo menos");
      }
    },
    libretas_pdf: function (row) {
      if (this.isSelecMatricula.length > 0) {
        if (row == '0') {
          this.numQuimestre = 0;
        }
        if (row == '1') {
          this.numQuimestre = 1;
        }
        this.ifmatricula = false
        this.ifpromocion = false
        this.iflibretas = false
        this.ifconducta = false
        this.isPrint = true;
        this.rowData = this.isSelecMatricula
        setTimeout(() => this.callLibretas(), 150);
      }else {
        this.$dialog.alert("Selecione un estudiante por lo menos");
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

