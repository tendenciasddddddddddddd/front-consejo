import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Default from '../components/Default.vue'
import store from '../store/index'
//HELP
import PageNotFound from '../components/help/NoFound.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'default',
    component: Default
  },
  {
    path: '/Users',
    name: '1',
    component: () => import( /* webpackChunkName: "Usuario" */ '../views/pagesAdmin/users/Users.vue'),
    beforeEnter: authorization
  },
 
  { //-------ZONAS------
    path: '/option-zonas',
    name: '000',
    component: () => import( /* webpackChunkName: "OptionZoan" */ '../views/pagesRegister/zonas/OptionZoan.vue'),
  },
  { //-------------------------------------ZONAS------------------------------
    path: '/List-Provincias',
    name: '000',
    component: () => import( /* webpackChunkName: "ListProvincias" */ '../views/pagesRegister/zonas/provincias/ListProvincias.vue'),
  },
  { //-------------------------------------ZONAS------------------------------
    path: '/List-Canton',
    name: '000',
    component: () => import( /* webpackChunkName: "ListCanton" */ '../views/pagesRegister/zonas/cantones/ListCanton.vue'),
  },
  { //-------------------------------------ZONAS------------------------------
    path: '/List-Parroquia',
    name: '000',
    component: () => import( /* webpackChunkName: "Parroquias" */ '../views/pagesRegister/zonas/parroquias/Parroquias.vue'),
  },
  { //-------------------------------------ZONAS------------------------------
    path: '/List-Nacionalidad',
    name: '000',
    component: () => import( /* webpackChunkName: "Nacionalidad" */ '../views/pagesRegister/zonas/nacionalidad/Nacionalidad.vue'),
  },
  { //-------------------------------------ZONAS------------------------------
    path: '/List-Etnias',
    name: '000',
    component: () => import( /* webpackChunkName: "Etnias" */ '../views/pagesRegister/zonas/etnias/Etnias.vue'),
  },
  { //-------------------------------------REGISTROS------------------------------
    path: '/List-Estudiate',
    name: '222',
    component: () => import( /* webpackChunkName: "Estudiante" */ '../views/pagesRegister/estudiantes/Estudiante.vue'),
  },
  { //-------------------------------------REGISTROS------------------------------
    path: '/List-Docente',
    name: '333',
    component: () => import( /* webpackChunkName: "Docentes" */ '../views/pagesRegister/docentes/Docentes.vue'),
  },


  { //-------------------------------------GESTION------------------------------
    path: '/Nivel',
    name: '1111',
    component: () => import( /* webpackChunkName: "Nivel" */ '../views/pagesGestionCursos/nivel/Nivel.vue'),
  },
  { //-------------------------------------GESTION------------------------------
    path: '/Materias',
    name: '1234',
    component: () => import( /* webpackChunkName: "Materias" */ '../views/pagesGestionCursos/materia/Materias.vue'),
  },

  { //-------------------------------------MATRICULA------------------------------
    path: '/Periodo',
    name: '11',
    component: () => import( /* webpackChunkName: "Periodo" */ '../views/pagesMatriculas/periodos/Periodo.vue'),
  },
  { //-------------------------------------MATRICULA------------------------------
    path: '/Matricula-1',
    name: '77',
    component: () => import( /* webpackChunkName: "Matriculas1" */ '../views/pagesMatriculas/matricula1/Matriculas1.vue'),
  },
  { //-------------------------------------MATRICULA------------------------------
    path: '/Matricula-2',
    name: '71',
    component: () => import( /* webpackChunkName: "Matriculas2" */ '../views/pagesMatriculas/matricula2/Matriculas2.vue'),
  },

  { //-------------------------------------ERROR PERMISO------------------------------
    path: '/page-not-found',
    name: '/page-not-found',
    component: () => import( /* webpackChunkName: "NoFound" */ '../components/help/NoFound.vue'),
  },
  { //-------------------------------------DISTRIBUTIVO------------------------------
    path: '/Distributivo-v1',
    name: '2222',
    component: () => import( /* webpackChunkName: "Distributivov1" */ '../views/pagesGestionCursos/distributivo/dV1/Distributivov1.vue'),
  },
  { //-------------------------------------DISTRIBUTIVO------------------------------
    path: '/Distributivo-v2',
    name: '2223',
    component: () => import( /* webpackChunkName: "Distributivov2" */ '../views/pagesGestionCursos/distributivo/dV2/Distributivov2.vue'),
  },


  ////------------------------------------REPORTES-----------------------------
  {
    path: '/opciones-reportes',
    name: 'r2',
    component: () => import( /* webpackChunkName: "MenuReportes" */ '../views/pagesMatriculas/reportes/MenuReportes.vue'),
  },

 
  ////------------------------------------DOCENTES-----------------------------
  {
    path: '/perfil-docente',
    name: 'd1',
    component:() => import( /* webpackChunkName: "Perfil" */ '../views/pagesDocentes/perfiles/Perfil.vue'),
  },
  {
    path: '/opciones-curso',
    name: 'd2',
    component: () => import( /* webpackChunkName: "Perfil" */ '../views/pagesDocentes/cursos/MenuCursos.vue'),
  },
  {
    path: '/reporte-docente',
    name: 'dr',
    component: () => import( /* webpackChunkName: "Perfil" */ '../views/pagesDocentes/reportesdoc/ReporteDoc.vue'),
  },

  {
    path: '/qualifys/:id',
    name: 'd4',
    component: () => import( /* webpackChunkName: "Qualifys" */ '../views/pagesDocentes/qualify/Qualifys.vue'),
  },
  
  {
    path: '/asistencias/:id',
    name: 'asistencia',
    component: () => import( /* webpackChunkName: "Asiste" */ '../views/pagesDocentes/asistencias/Asiste.vue'),
    props: true
  },
  //--------------------------------------ESTUDIANTES-----------
  {
    path: '/perfil-estudiante',
    name: 'e1',
    component: () => import( /* webpackChunkName: "Profile" */ '../views/pagesAlumnos/perfil/Profile.vue'),
  },
  {
    path: '/Consultar-nota',
    name: 'e2',
    component: () => import( /* webpackChunkName: "Nota" */ '../views/pagesAlumnos/notas/Nota.vue'),
  },
  {
    path: '/Repote-estudiante',
    name: 'e3',
    component: () => import( /* webpackChunkName: "Report" */ '../views/pagesAlumnos/reportes/Report.vue'),
  },
  {
    path: '/Historia-estudiante',
    name: 'e4',
    component:() => import( /* webpackChunkName: "HistoriaEst" */ '../views/pagesAlumnos/historialE/HistoriaEst.vue'),
  },
  
  ////------------------------------------AULAS VIRTUALES DOCENTES-----------------------------
  {
    path: '/aulas-lista',
    name: 'al',
    component: () => import( /* webpackChunkName: "AulasListas" */ '../views/pagesClassroom/profesores/manu/AulasListas.vue'),
  },
  {
    path: '/modulo-aula/:id',
    name: 'al',
    component: () => import( /* webpackChunkName: "ModuloAula" */ '../views/pagesClassroom/profesores/Modulos/ModuloAula.vue'),
  },
 
   ////------------------------------------AULAS VIRTUALES ESTUDIANTES-----------------------------
  {
    path: '/all-lista',
    name: 'es2',
    component: () => import( /* webpackChunkName: "AllAulas" */ '../views/pagesClassroom/alumnos/allAulas/AllAulas.vue'),
  },
  {
    path: '/my-lista',
    name: 'es1',
    component: () => import( /* webpackChunkName: "MyAulas" */ '../views/pagesClassroom/alumnos/myAulas/MyAulas.vue'),
  },
  {
    path: '/module-aulas/:id',
    name: 'es1',
    component: () => import( /* webpackChunkName: "ModuleAulas" */ '../views/pagesClassroom/alumnos/Modulo/ModuleAulas.vue'),
  },
  
  { path: "*", component: PageNotFound },

 
]

function authorization(to, from, next) {
  let user = store.getters.user;

  if (user) {
    if (to.name === 'users' && !user.roles.includes('Admin')) {
      return next('/');
    }
  }

  return next();
}


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router