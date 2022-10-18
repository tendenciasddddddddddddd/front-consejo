<template>
  <Modal @close="close">
  
    <template v-slot:body>
      <section v-if="user.roles.includes('Admin')">
        <div class="input-group">
        <input v-model="searchQuery" type="text" class="form-control buscador" placeholder="Empezar a escribir..." style="background-color: #fff !important"/>
      </div>
      <div class="mt-3" v-if="displayedArticles.length">
        <div class="seachAll mb-3" v-for="item in displayedArticles" :key="item.id">
          <div class="d-flex justify-content-between" style="cursor:pointer;" @click="goToPage(item.url)">
            <span class="text-sm negros font-weight-bolder" style="margin-bottom: 0rem;">
              {{item.txt}} </span>
              <svg data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color: #000;"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
          </div>
        </div>
      </div>
      <section v-else class="text-center mt-5">
        <img width="160" src="../assets/img/usados/undraw_search.svg" alt="">
        <p class="mb-3 mt-3 letra fuente">No hay coincidencia para mostrar</p>
      </section>
      </section>

      <section  v-if="user.roles.includes('Docente')">
        <div class="input-group">
        <input v-model="searchQuery2" type="text" class="form-control buscador" placeholder="Empezar a escribir..." style="background-color: #fff !important"/>
      </div>
      <div class="mt-3" v-if="displayedArticles2.length">
        <div class="seachAll mb-3" v-for="item in displayedArticles2" :key="item.id">
          <div class="d-flex justify-content-between" style="cursor:pointer;" @click="goToPage(item.url)">
            <span class="text-sm negros font-weight-bolder" style="margin-bottom: 0rem;">
              {{item.txt}} </span>
              <svg data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color: #000;"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
          </div>
        </div>
      </div>
      <section v-else class="text-center mt-5">
        <img width="160" src="../assets/img/usados/undraw_search.svg" alt="">
        <p class="mb-3 mt-3 letra fuente">No hay coincidencia para mostrar</p>
      </section>
      </section>
    </template>
    <template v-slot:acccion>
            <a  @click="close()" class="btn btnNaranja mt-2" style="background-color: #0c2ccc !important;">
                Continuar
            </a>
        </template>
  </Modal>
</template>

<script>
import Modal from "./Modal";
export default {
  components: {
    Modal
  },
  data() {
    return {
      user: this.$store.state.user,
      admins: [{
        id: 1, txt: 'Usuarios de sistema', url: '/Users'},
      { id: 2, txt: 'Registro de provincias', url: '/Provincias'},
      { id: 3,txt: 'Registro de cantón', url: '/Canton'},
      { id: 4, txt: 'Registro de parroquias', url: '/Parroquia'},
      { id: 5,txt: 'Registro de nacionalidad', url: '/Nacionalidad'},
      { id: 6, txt: 'Registro de estudiantes', url: '/Estudiate'},
      { id: 7, txt: 'Registro de docentes', url: '/Docente'},
      { id: 8, txt: 'Cursos niveles', url: '/Cursos'},
      { id: 9, txt: 'Materias asignaturas', url: '/Materias'},
      { id: 10, txt: 'Periodo académico', url: '/Periodo'},
      { id: 11, txt: 'Matriculas y generar paralelos', url: '/Intensivo'},
      { id: 12, txt: 'Generar reportes', url: '/opciones-reportes'},
      { id: 13, txt: 'Generar distributivo', url: '/Distributivo-v1'},
      { id: 13, txt: 'Perfil', url: '/Distributivo-v1'},
      ],
      docentes: [{
        id: 1, txt: 'Perfil config', url: '/perfil'},
      { id: 2, txt: 'Notas, supletorios y asistencia', url: '/opciones-curso'},
      { id: 3,txt: 'Clases en linea', url: '/zoom'},
      { id: 4, txt: 'Aulas virtuales', url: '/aulas-lista'},
      ],
      searchQuery: '',
      searchQuery2: '',
    }
  },
  methods: {
    close() {
      this.$emit('CloseSeach')
    },
    goToPage(page){
      this.$router.push({ path: `${page}` });
      this.close();
    }
  },
  computed: {
        displayedArticles2: function () {
            if (this.searchQuery2.length > 1) {
                return this.docentes.filter((item) => {
                    return this.searchQuery2
                        .toLowerCase()
                        .split(" ")
                        .every((v) => item.txt.toLowerCase().includes(v));
                });
            }else {
              return []
            }
        },
        displayedArticles: function () {
            if (this.searchQuery.length > 1) {
                return this.admins.filter((item) => {
                    return this.searchQuery
                        .toLowerCase()
                        .split(" ")
                        .every((v) => item.txt.toLowerCase().includes(v));
                });
            }else {
              return []
            }
        },
    },
}
</script>
<style>
.seachAll {
  padding: 0.75rem 1rem;
  border-radius: 0.1875rem;
  transition: all .15s ease-out;
  background: #eaf0f6;
  text-decoration: none;
}
</style>
