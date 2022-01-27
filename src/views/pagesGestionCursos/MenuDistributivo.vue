<template>
  <div class="row ">
    <div class="col-lg-11 col-12 mx-auto">
     
          
         <div class=" mt-3">
        <span class="fuente h3 " style="font-weight: 700;color:#181B32; font-size: 21px;"
          >Distributivo de las dos modalidades</span
        >
         <p class="parrafo mt-2" style="margin:7px; color: #33475b; ">
          Asignar cursos y  paralelos con docentes y materias para las dos modalidades..👌
          </p>
      </div>
       <vue-progress-bar ></vue-progress-bar>
       <ProgressBar v-if="isPeriodo"></ProgressBar>
       <div v-else class="row">
        <section class="flex-containes2 mt-4">
          <div class="">
            <router-link :to="`/Distributivo-v1/${idperiodoActualIntensivo}`" href="javascript:;">
              <div
                class="cajas foco2 borde1 text-center fadeIn1 fadeInBottom animation-1"
                style="max-width: 200px;margin-right: 23px!important;"
              >
                <img
                  class="w-70"
                  src="../../assets/img/logs/crm.svg"
                  alt="fondo"
                />
                <p class="cardTitle fuente mt-3">Intensivo</p>
                <p class="parrafo">
                  Vincular a los docentes con sus materias 👆
                </p>
                
              </div>
            </router-link>
          </div>
          <div class="">
            <router-link :to="`/Distributivo-v2/${idperiodoActualExtra}`" href="javascript:;">
              <div
                class="cajas foco2 borde2 text-center fadeIn1 fadeInBottom animation-2"
                style="max-width: 200px;margin-right: 13px!important;"
              >
                <img
                  class="w-40"
                  src="../../assets/img/logs/segmented-lists.svg"
                  alt="fondo"
                />
                <p class="cardTitle fuente mt-3">Extraordinaria</p>
                <p class="parrafo">
                 Vincular a los docentes con sus materias 👆
                </p>
               
              </div>
            </router-link>
          </div>
         
          
        </section>
      </div>
      
    </div>
  </div>
</template>

<script>
import ProgressBar from "../../shared/ProgressBar";
import RestResource from '../../service/isAdmin'
const restResourceService = new RestResource();
export default {
  name: "MenuZonas",
  components: {
    ProgressBar,
  },
  data() {
    return {
      roles: this.$store.state.user.roles,
      info: null,
      isPeriodo: false,
      idperiodoActualIntensivo: null,
      idperiodoActualExtra: null,
    };
  },
  methods: {
    __getperiodo() {
      this.isPeriodo = true;
       this.$Progress.start();
      this.$proxies._matriculaProxi
        .getFull()
        .then((x) => {
          const filtro = x.data.niveles;
          if (!filtro.length) {
            alert("ANTES DE ENTRAR AQUI HAY QUE CREAR UN PERIODO ACADEMICO PARA CADA MODALIDAD !!");
          }
          else{
              let listPeriodoIntensivo = filtro.filter(
            (x) => x.typo == "Intensivo" && x.estado == "1"
          );
          this.idperiodoActualIntensivo = listPeriodoIntensivo[0]._id;

          let listPeriodoExtra = filtro.filter(
            (x) => x.typo == "Extraordinaria" && x.estado == "1"
          );
          this.idperiodoActualExtra = listPeriodoExtra[0]._id;
         
          this.isPeriodo = false;
           this.$Progress.finish();
          }
        
        })
        .catch((err) => {
          console.log("Error", err);
          this.isPeriodo = false;
          this.$Progress.finish();
        });
    },
    verificarUsuario(){
       if(!restResourceService.admin(this.roles)){
         this.$router.push("/");
       }
     }
  },
  mounted() {
    this.verificarUsuario();
    this.__getperiodo();
  },
};
</script>

