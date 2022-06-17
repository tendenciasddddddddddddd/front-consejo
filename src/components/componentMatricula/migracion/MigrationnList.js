import ScrimModal from "../../../shared/ScrimModal";
import Spinner from "../../../shared/Spinner";
import Paginate2 from "../../../shared/Paginate2.vue";
import Dropdown from "../../../shared/Dropdown.vue";
export default {
  name: "MigrationnList",
  components: {
    Spinner,
    ScrimModal,
    Paginate2,
    Dropdown,
  },
  data() {
    return {
      collections: {},
      pagg: null,
      pagina: 0,
      paginas: 0,
      isLoading: false,
      totalNotas: 0,
      isSearch: false,
      search: '',
      arrayDocumentsCourse: [],
      arrayDocumentsLevel: [],
      ifLoadPeriodo: false,
      ifLoadCourse: false,
      nameCourse: '',
      namePeriodo: '',
    };
  },
  watch: {
    search: function (value) {
         this.changeSearch(value);
    }
  },
  computed: {
    isComplete () {
      return this.nameCourse && this.namePeriodo;
    }
  },
  methods: {
    close() {
      this.$emit("myEventClosedModalMigracion2");
    },
    getAll(pag, lim) {
      this.isLoading = true;
      this.subtitulo = lim + " filas por página";
      this.$proxies._migracionProxi
        .getAll(pag, lim) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
        .then((x) => {
          this.collections = x.data.usuarios;
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
    changeSearch(textSearch) { //queryUsuario
      if (textSearch.length > 3) {
        this.isSearch = true;
        this.isLoading = true;
        this.$proxies._migracionProxi
          .queryMatriculas(textSearch) //EJECUTA LOS PROXIS QUE INYECTA AXIOS
          .then((x) => {
            this.collections = x.data;
            this.isLoading = false;
            this.search= '';
          })
          .catch(() => {
            console.log("Error imposible");
            this.isLoading = false;
          });
      }
    },
    __getPeriodo() {
      this.ifLoadPeriodo = true;
      this.$proxies._matriculaProxi
        .getFull()
        .then((x) => {
          this.arrayDocumentsLevel = x.data.niveles;
          this.ifLoadPeriodo = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.ifLoadPeriodo = false;
        });
    },
    __listNivele() {
      this.ifLoadCourse = true;
      this.$proxies._gestionProxi
        .getNiveles()
        .then((x) => {
          this.arrayDocumentsCourse = x.data;
          this.ifLoadCourse = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.ifLoadCourse = false;
        });
    },
    searchForCourseAndLever: function(){
      this.isLoading = true;
      this.isSearch = true;
      this.$proxies._migracionProxi
        .getByIdOfCourseAndPeriod(this.namePeriodo._id, this.nameCourse._id)
        .then((x) => {
          this.collections = x.data;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isLoading = false;
        });
    },

    onPageChange(page) {
      this.getAll(page, 8);
    },
    changedQuery(num) {
      this.getAll(1, num);
    },
    killQuery() {
      this.isSearch = false;
     this.getAll(1,8)
    }
  },
  created() {
    this.getAll(1, 8);
    this.__getPeriodo();
    this.__listNivele();
  },
};
