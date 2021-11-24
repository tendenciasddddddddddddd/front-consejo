import Spinner from '../../../../shared/Spinner'
import RestResource from '../../../../service/isAdmin'
const restResourceService = new RestResource();
export default {
  name: "Matriculas2",
  components: {
    Spinner
},
  data() {
    return {

      roles: this.$store.state.user.roles,
       
    };
  },
  methods: {
    verificarUsuario(){
      if(!restResourceService.admin(this.roles)){
        this.$router.push("/");
      }
    },

  },
  created() {
    this.verificarUsuario();
  },

};
