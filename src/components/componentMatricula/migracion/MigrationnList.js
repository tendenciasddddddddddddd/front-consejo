import ScrimModal from "../../../shared/ScrimModal"
import Spinner from "../../../shared/Spinner";
export default {
    name: "MigrationnList",
    components: {
      Spinner, ScrimModal
    },
    data() {
        return {

        }
    },
    methods: {
        close(){
            this.$emit('myEventClosedModalMigracion2');
          },
    }
}