<template>
  <div class="row">
    <div class="col-lg-11 col-12 mx-auto">
     
       <div class=" mt-3">
        <span style="font-weight: 700;color:#181B32; font-size: 21px;"
          >Opciónes para generar reportes</span
        >
         <p class="parrafo mt-2" style="margin:7px; color: #33475b; ">
           Podra imprimir los reportes de
          los periodos vigentes... 
           
          </p>
      </div>
     
      <div class="row">
        <section class="flex-containes2 mt-3">
          <div class="">
            <a @click="openChildiConsolidado" href="javascript:;">
              <div
                class="cajas foco2 borde1 text-center fadeIn1 fadeInBottom animation-1"
                style="max-width: 200px;margin-right: 13px!important;"
              >
                <img
                  class="w-50"
                  src="../../../assets/img/shapes/90260b20-d6c6-418f-9961-9282c5d85d78.png"
                  alt="fondo"
                />
                <p class="cardTitle fuente mt-3">Consolidado</p>
                <p class="parrafo cardSubTitle">
                  Genere documento con datos de estudiantes👆
                </p>
              </div>
            </a>
          </div>
          <div class="">
            <a  @click="openChildReportPdf" href="javascript:;">
              <div
                class="cajas foco2 borde2 text-center fadeIn1 fadeInBottom animation-2"
                style="max-width: 200px;margin-right: 13px!important;"
              >
                <img
                  class="w-50"
                  src="../../../assets/img/icons/pdf.png"
                  alt="fondo"
                />
                <p class="cardTitle fuente mt-3">Matriculas</p>
                <p class="parrafo cardSubTitle">
                  Genere documento de matriculas 👆
                </p>
              </div>
            </a>
          </div>
          <div class="">
            <div
              class="cajas foco2 borde3 text-center fadeIn1 fadeInBottom animation-3"
              style="max-width: 200px;"
            >
              <router-link to="/consolidado">
                <img
                  class="w-50"
                  src="../../../assets/img/logs/add-on-reporting.svg"
                  alt="fondo"
                />
                <p class="cardTitle fuente mt-3">Notas</p>
                <p class="parrafo cardSubTitle">
                  Crear materias para las dos modalidades I y M 👆
                </p>
              </router-link>
            </div>
          </div>
          <div>
            <div
              class="cajas foco2 borde4 text-center fadeIn1 fadeInBottom animation-4"
              style="max-width: 200px;"
            >
              <router-link to="#">
                <img
                  class="w-45"
                  src="../../../assets/img/logs/documents.svg"
                  alt="fondo"
                />
                <p class="cardTitle fuente mt-3">Permisos</p>
                <p class="parrafo cardSubTitle">
                  Mire los informes de permisos pedientes👆
                </p>
              </router-link>
            </div>
          </div>
        </section>
      </div>
       <div v-if="ifReportPdf">
             <ReportePdfAdmin  @myEventClosedModalReporte="closedChildReportPdf" ></ReportePdfAdmin>
         </div>
         <div v-if="ifConsolidado">
             <Consolidado  @myEventClosedModalConsolidado="closedChildConsolidado" ></Consolidado>
         </div>
    </div>
  </div>
</template>

<script>
import RestResource from "../../../service/isAdmin";
const restResourceService = new RestResource();
export default {
  name: "MenuZonas",
  data() {
    return {
      roles: this.$store.state.user.roles,
      ifReportPdf: false,
      ifConsolidado : false,
    };
  },
  components:{
     ReportePdfAdmin: () => import( /* webpackChunkName: "Report" */ "../../../components/matriculasComp/pdfs/Report.vue"),
     Consolidado: () => import( /* webpackChunkName: "Consolidado" */ "../../../components/matriculasComp/consolidado/Consolidado.vue"),
  },
  methods: {
    verificarUsuario() {
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      }
    },
    openChildReportPdf: function() {
      this.ifReportPdf = true;
    },
    closedChildReportPdf: function() {
      this.ifReportPdf = false;
    },
    openChildiConsolidado: function() {
      this.ifConsolidado = true;
    },
    closedChildConsolidado: function() {
      this.ifConsolidado = false;
    },
  },
  created() {
    this.verificarUsuario();
  },
};
</script>

