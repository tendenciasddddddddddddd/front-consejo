<template>
  <div class="row ">
    <div class="col-lg-9 col-12 mx-auto">
      <div class="row">
        <div class="col-sm-12 ">
          <h3 class="mt-1 fuente" style="font-weight: 400;">Distributivo</h3>
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="mt-2">
          <div
            class=""
            style="background-color: #e5f5f8; padding:7px;  border-color: #7fd1de; border-style: solid;
              border-width: 1px; text-align: left;"
          >
            <div>
              <p class="parrafo" style="margin:7px; ">
                <strong>Nota:</strong> Asignar cursos/paralelos con docentes y materias..
              </p>
            </div>
          </div>
        </div>

        <div class="col-sm-4 mt-3">
          <br />
          <Skeleton v-if="isPeriodo"></Skeleton>
          <div
            v-else
            class="border-dashed border-1 border-secondary border-radius-md p-3 mole w-90"
          >
            <div class="card card-plain card-blog">
              <div class="text-center position-relative">
                <router-link
                  :to="`/Distributivo-v1/${idperiodoActualIntensivo}`"
                  href="javascript:;"
                >
                  <div class="blur-shadow-image">
                    <img
                      height="170px"
                      class="img border-radius-lg move-on-hover"
                      src="../../assets/img/logs/crm.svg"
                    />
                  </div>
                </router-link>
              </div>
              <div class="card-body px-0 text-center" style="padding:2px;">
                <h5>
                  <router-link
                    :to="`/Distributivo-v1/${idperiodoActualIntensivo}`"
                    href="javascript:;"
                    class="text-dark fuente" style="font-weight: 400;"
                    >Intensivo</router-link
                  >
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-4 mt-3">
          <br />
          <Skeleton v-if="isPeriodo"></Skeleton>
          <div
            v-else
            class="border-dashed border-1 border-secondary border-radius-md p-3 mole w-90"
          >
            <div class="card card-plain card-blog">
              <div class="text-center position-relative">
                <router-link
                  :to="`/Distributivo-v2/${idperiodoActualExtra}`"
                  href="javascript:;"
                >
                  <div class="blur-shadow-image">
                    <img
                      height="170px"
                      class="img border-radius-lg move-on-hover"
                      src="../../assets/img/logs/segmented-lists.svg"
                    />
                  </div>
                </router-link>
              </div>
              <div class="card-body text-center px-0" style="padding:2px;">
                <h5>
                  <router-link
                    :to="`/Distributivo-v2/${idperiodoActualExtra}`"
                    href="javascript:;"
                     class="text-dark fuente" style="font-weight: 400;"
                    >Extraordinario</router-link
                  >
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Skeleton from "../../shared/Skeleton";
export default {
  name: "MenuZonas",
  components: {
    Skeleton,
  },
  data() {
    return {
      info: null,
      isPeriodo: false,
      idperiodoActualIntensivo: null,
      idperiodoActualExtra: null,
    };
  },
  methods: {
    __getperiodo() {
      this.isPeriodo = true;
      this.$proxies._matriculaProxi
        .getFull()
        .then((x) => {
          const filtro = x.data.niveles;
          let listPeriodoIntensivo = filtro.filter(
            (x) => x.typo == "Intensivo" && x.estado == "1"
          );
          this.idperiodoActualIntensivo = listPeriodoIntensivo[0]._id;

          let listPeriodoExtra = filtro.filter(
            (x) => x.typo == "Extraordinaria" && x.estado == "1"
          );
          this.idperiodoActualExtra = listPeriodoExtra[0]._id;
          this.isPeriodo = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isPeriodo = false;
        });
    },
  },
  mounted() {
    this.__getperiodo();
  },
};
</script>
<style>
.mole {
  background-color: white;
  transition: background-color 0.5s;
}

.mole:hover {
  background-color: #f5f5f5;
  box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

.bd-example {
  position: relative;
  padding: 2rem;
  border: 3px solid #eee;
}
</style>
