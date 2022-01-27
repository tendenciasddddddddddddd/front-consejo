import Spinner from '../../../shared/Spinner'
import RestResource from '../../../service/isAdmin'
const restResourceService = new RestResource();
export default {
  name: "Matriculas2",
  components: {
    Spinner,
    CreateMatricula2: () =>
    import(
      /* webpackChunkName: "CreateMatricula1" */ "../../../components/matriculasComp/matricula2/CreateMatricula2.vue"
    ),
    ListRemoveMatricula2: () =>
      import(
        /* webpackChunkName: "ListRemoveMatricula2" */ "../../../components/matriculasComp/matricula2/ListRemoveMatricula2.vue"
      ),
      ParaleloMatricula2: () =>
      import(
        /* webpackChunkName: "EnlistarParalelom2" */ "../../../components/matriculasComp/paralelo/paralelov2/EnlistarParalelom2.vue"
      ),
},
  data() {
    return {

      roles: this.$store.state.user.roles,
       //CHILD COMPONENT
      ifCreateUpdate: false,
      ifRemoveMatricula: false,
      ifParalelo2: false,
    };
  },
  methods: {
    verificarUsuario(){
      if(!restResourceService.admin(this.roles)){
        this.$router.push("/");
      }
    },
    openChildMatricula: function() {
      this.ifCreateUpdate = true;
    },
    closedChildMatricula: function() {
      this.ifCreateUpdate = false;
    },
    openChildRemoveMa2: function() {
      this.ifRemoveMatricula = true;
    },
    closedChildRemoveMa2: function() {
      this.ifRemoveMatricula = false;
    },
    openChildParalelo2: function() {
      this.ifParalelo2 = true;
    },
    closedChildParalelo2: function() {
      this.ifParalelo2 = false;
    },
  },
  created() {
    this.verificarUsuario();
  },

};
