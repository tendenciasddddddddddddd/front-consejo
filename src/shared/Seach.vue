<template>
  <div>
    <div class="fixed-plugin show w-100" style=" z-index: 9999;  ">
      <a class="fixed-plugin-button text-dark position-fixed px-3 py-2" style="background-color: #f5f8fa;">
        <i class="fa fa-cog py-2 negros"> </i>
      </a>
      <div class="card shadow-lg  desplega w-100" style="z-index: 99999;top: 57px">
        <div
          style="border: 1px solid #dfe3eb;margin-left: -20px; margin-right: -10px; border-radius: 0px; min-height: 68px; padding: 1px 28px 1px 48px; background-color: #f5f8fa;">
          <div class="d-flex justify-content-between">
            
            <div>
              <h6 style="font-weight: 400;" class="mt-3 mb-0 fuente negros">
                Escribe algo para empezar a buscar
              </h6>
            </div>
            <div class="mt-3">
              <button @click="close()" class="btn btn-link negros p-0 fixed-plugin-close-button">
                <svg data-testid="geist-icon" fill="none" height="36" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="36" style="color:#000"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg>
              </button>
            </div>
          </div>
          <!-- End Toggle Button -->
        </div>
        <div class="card-body pt-sm-3 pt-0 croll" style="overflow-y: auto;height: auto;">
      <div class="mt-2" v-if="displayedArticles.length">
        <div class="seachAll mb-3" v-for="item in displayedArticles" :key="item.id">
          <div class="d-flex justify-content-between" style="cursor:pointer;" @click="goToPage(item.url)">
            <div>
              <svg data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color:#000"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"></path><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"></path><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"></path><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"></path><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"></path><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"></path></svg>
              <span class="h5 negros font-weight-bolder ms-3" style="margin-bottom: 0rem;font-weight: 500 !important;">
              {{item.txt}} </span>
            </div>
          </div>
        </div>
      </div>
      <section v-else>
        <NoFound/>
      </section>
          <!-- fin cuerpo -->
        </div>
        <div class="modalFooter">
          <div class="text-end">
            <a @click="close()" class="btn btnNaranja mt-2" style="background-color: #0c2ccc !important;">
              Continuar
            </a>
          </div>
        </div>
      </div>
    </div>
      </div>
</template>

<script>
import NoFound from "./NoFound.vue";
export default {
  components: {
    NoFound
  },
  props: {
    texto: {
      type: String,
    },
  },
  data() {
    return {
      user: this.$store.state.user,
      admins: [],
      searchQuery: '',
    }
  },
  methods: {
    close() {
      this.$emit('CloseSeach')
    },
    goToPage(page){
      this.$router.push({ path: `${page}` });
      this.close();
    }, 
    createUrl(){
      if (this.user.roles == 'Admin') {
        this.admins.push({
        id: 1, txt: 'Usuarios de sistema', url: '/Users'},
      { id: 6, txt: 'Registro de estudiantes', url: '/Estudiate'},
      { id: 7, txt: 'Registro de docentes', url: '/Docente'},
      { id: 8, txt: 'Cursos niveles', url: '/Cursos'},
      { id: 9, txt: 'Materias asignaturas', url: '/Materias'},
      { id: 10, txt: 'Periodo académico', url: '/Periodo'},
      { id: 11, txt: 'Matriculas y generar paralelos', url: '/Intensivo'},
      { id: 12, txt: 'Generar reportes', url: '/opciones-reportes'},
      { id: 13, txt: 'Generar distributivo', url: '/Distributivo-v1'})

      }
      else if (this.user.roles == 'Docente') {
        this.admins.push({
          id: 1, txt: 'Perfil configurar', url: '/perfil'},
      { id: 2, txt: 'Notas, supletorios y asistencia', url: '/opciones-curso'},
      { id: 3,txt: 'Clases en linea', url: '/zoom'},
      { id: 4, txt: 'Aulas virtuales', url: '/aulas-lista'},
      )
      }
    }
  },
  computed: {
        displayedArticles: function () {
            if (this.texto.length > 1) {
                return this.admins.filter((item) => {
                    return this.texto
                        .toLowerCase()
                        .split(" ")
                        .every((v) => item.txt.toLowerCase().includes(v));
                });
            }else {
              return []
            }
        },
    },
    created() {
    this.createUrl();
  },
}
</script>
<style>
.seachAll {
  padding: 1.5rem;
  border-radius: 0.1875rem;
  border: 1px solid #dfe3eb;
  transition: all .15s ease-out;
  /* background: #eaf0f6; */
  text-decoration: none;
}
.seachAll:hover {
    background: #f6f8fa;
}
</style>
