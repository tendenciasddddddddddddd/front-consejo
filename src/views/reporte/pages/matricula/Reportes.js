import Spinner from "../../../../shared/Spinner.vue";
import ScrimModal from "../../../../shared/ScrimModal"
import Dropdown from "../../../../shared/Dropdown.vue";
import NoFound from "../../../../shared/NoFound"
import RestResource from "../../../../service/isAdmin";
import Paginate from "../../../../shared/Paginate.vue";
const restResourceService = new RestResource();
export default {
  name: 'Report',
  components: {
    Spinner, ScrimModal, Dropdown, NoFound,Paginate,
    FormatoMatricula: () => import( /* webpackChunkName: "FormatoMatricula" */ "./FormatoMatricula.vue"),
    FormatoPromocion: () => import( /* webpackChunkName: "FormatoPromocion" */ "./FormatoPromocion.vue"),
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
      isPrint: false,
      searchQuery: '',
      //Pagina 
    page: 1,
    perPage: 8,
    pages: [],
    numPages:0,
    totalNotas: 0,
    nextCourse: ''
    }
  },
  watch: {
    curso: function (value) {
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
    get: function (ids) {
      if (this.infoMat.length > 0) {
        this.ifmatricula = false
      this.isPrint = true;
      this.rowData = []
      if (ids == 'all') {
        for (let i = 0; i < this.infoMat.length; i++) {
          this.rowData.push(this.infoMat[i]._id);
        }
      } else {
        this.rowData.push(ids);
      }
      setTimeout(() => this.callReport(), 150);
      }
    },
    get2: function (ids) {
      if (this.infoMat.length > 0) {
        this.ifpromocion = false
        this.isPrint = true;
        this.rowData = []
        if (ids == 'all') {
          for (let i = 0; i < this.infoMat.length; i++) {
            this.rowData.push(this.infoMat[i]._id);
          }
        } else {
          this.rowData.push(ids);
        }
        setTimeout(() => this.callReport2(), 150);
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
  },
  created() {
    this.verificarUsuario();
    this.__listNivele();
  },
};

