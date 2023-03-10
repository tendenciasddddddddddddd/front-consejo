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
    component: () => import( /* webpackChunkName: "Usuario" */ '../views/users/Users.vue'),
    beforeEnter: authorization
  },
 
  { //-------------------------------------REGISTROS------------------------------
    path: '/Estudiate',
    name: '222',
    component: () => import( /* webpackChunkName: "Estudiante" */ '../views/estudiante/Estudiante.vue'),
  },
  { //-------------------------------------REGISTROS------------------------------
    path: '/Docente',
    name: '333',
    component: () => import( /* webpackChunkName: "Docentes" */ '../views/docente/Docentes.vue'),
  },


  { //-------------------------------------GESTION------------------------------
    path: '/Cursos',
    name: '1111',
    component: () => import( /* webpackChunkName: "Cursos" */ '../views/cursos/Cursos.vue'),
  },
  { //-------------------------------------GESTION------------------------------
    path: '/Materias',
    name: '1234',
    component: () => import( /* webpackChunkName: "Materias" */ '../views/materia/Materias.vue'),
  },


  { //-------------------------------------MATRICULA------------------------------
    path: '/Intensivo',
    name: '77',
    component: () => import( /* webpackChunkName: "Intensivo" */ '../views/matricula/Intensivo.vue'),
  },


  { //-------------------------------------ERROR PERMISO------------------------------
    path: '/page-not-found',
    name: '/page-not-found',
    component: () => import( /* webpackChunkName: "NoFound" */ '../components/help/NoFound.vue'),
  },
  { //-------------------------------------DISTRIBUTIVO------------------------------
    path: '/Distributivo-v1',
    name: '2222',
    component: () => import( /* webpackChunkName: "Distributivov1" */ '../views/distributivo/GridCargaOraria.vue'),
  },

  { //-------------------------------------DISTRIBUTIVO------------------------------
    path: '/planificacion',
    name: '3333',
    component: () => import( /* webpackChunkName: "Planificacion" */ '../views/distributivo/Planificacion.vue'),
  },

  { //-------------------------------------EATDISTICAS------------------------------
    path: '/estadistica',
    name: '777',
    component: () => import( /* webpackChunkName: "Estadisticas" */ '../views/distributivo/Estadisticas.vue'),
  },

  { //-------------------------------------DISTRIBUTIVO------------------------------
    path: '/tutores',
    name: '4444',
    component: () => import( /* webpackChunkName: "Planificacion" */ '../views/distributivo/GridTutores.vue'),
  },
  ////------------------------------------REPORTES-----------------------------
  {
    path: '/opciones-reportes',
    name: 'r2',
    component: () => import( /* webpackChunkName: "MenuReportes" */ '../views/reporte/Reporte.vue'),
  },

   ////------------------------------------SETTING-----------------------------
   {
    path: '/settings',
    name: 's1',
    component: () => import( /* webpackChunkName: "Setting" */ '../views/settings/Setting.vue'),
  },

   ////------------------------------------SETTING-----------------------------
   {
    path: '/apps',
    name: 'app1',
    component: () => import( /* webpackChunkName: "Setting" */ '../views/settings/Apps.vue'),
  },

  ////------------------------------------DOCENTES-----------------------------
  {
    path: '/perfil',
    name: 'd1',
    component:() => import( /* webpackChunkName: "Perfil" */ '../views/profile/Perfil.vue'),
  },
  {
    path: '/opciones-curso',
    name: 'd2',
    component: () => import( /* webpackChunkName: "Cursos" */ '../modules/cursos/Cursos.vue'),
  },
  {
    path: '/tutoresDocente',
    name: 'dh',
    component: () => import( /* webpackChunkName: "TutoresDocente" */ '../modules/tutores/TutoresDocente'),
  },
  {
    path: '/iniciales/:id',
    name: 'iniciales',
    component: () => import( /* webpackChunkName: "TutoresDocente" */ '../modules/cursos/ini/iniciales.vue'),
  },
  {
    path: '/zoom',
    name: 'dr',
    component: () => import( /* webpackChunkName: "Perfil" */ '../modules/zoom/Zoom.vue'),
  },
  {
    path: '/menuCurso/:id',
    name: 'd4',
    component: () => import( /* webpackChunkName: "MenuCurso" */ '../modules/cursos/MenuCurso.vue'),
  },


  //--------------------------------------ESTUDIANTES-----------

  {
    path: '/Consultar-nota',
    name: 'e2',
    component: () => import( /* webpackChunkName: "Nota" */ '../views/pagesAlumnos/notas/Nota.vue'),
  },
  {
    path: '/Historia-estudiante',
    name: 'e4',
    component:() => import( /* webpackChunkName: "HistoriaEst" */ '../views/pagesAlumnos/historialE/HistoriaEst.vue'),
  },
  

  {
    path: '/crear-asistencia',
    name: 'as1',
    component:() => import( /* webpackChunkName: "CreateAsistencia" */ '../views/asistencias/CreateAsistencia.vue'),
  },
  {
    path: '/lista-asistencia',
    name: 'as2',
    component:() => import( /* webpackChunkName: "ListaAsistencia" */ '../views/asistencias/ListaAsistencia.vue'),
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