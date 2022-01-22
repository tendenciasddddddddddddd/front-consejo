<template>
  <div class="row fondoazul">
    <div class="col-lg-11 col-12 mx-auto">
      <div
        style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
      >
        <p class="parrafo" style="margin:7px; color: #33475b; ">
          <i class="ni ni-air-baloon"></i> &nbsp; Podra imprimir los reportes de
          los periodos vigentes... 👌
        </p>
      </div>

      <div class="text-center mt-6">
        <span class="fuente h3 " style="font-weight: 400;"
          >Opciónes para generar reportes</span
        >
      </div>

      <div class="row">
        <section class="flex-containes mt-4">
          <div class="">
            <router-link to="/consolidado" href="javascript:;">
              <div
                class="cajas foco2 borde1 text-center"
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
            </router-link>
          </div>
          <div class="">
            <router-link to="/list-report" href="javascript:;">
              <div
                class="cajas foco2 borde2 text-center"
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
            </router-link>
          </div>
          <div class="">
            <div
              class="cajas foco2 borde3 text-center"
              style="max-width: 200px;"
            >
              <router-link to="#">
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
              class="cajas foco2 borde4 text-center"
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
    };
  },
  methods: {
    verificarUsuario() {
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      }
    },
  },
  created() {
    this.verificarUsuario();
  },
};
</script>

