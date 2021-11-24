import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Default from '../components/Default.vue'
import store from '../store/index'
//DOCENTES
import Perfil from '../components/docentes/perfiles/Perfil.vue'
import MenuCursos from '../components/docentes/cursos/MenuCursos.vue'
import ListaCursos from '../components/docentes/cursos/Intensivos/ListaCursos.vue'
import MenuReportes from '../components/reportes/matriculas/MenuReportes.vue'
import Consolidado from '../components/reportes/matriculas/consolidado/Consolidados.vue'
import ReporteDoc from '../components/docentes/reportesdoc/ReporteDoc.vue'
//DOCENTES-CALIFICAR

import Asiste from '../components/docentes/asistencias/Asiste.vue'
import Notas from '../components/docentes/notas/Notas.vue'
//ESTUDIANTES
import Profile from '../components/estudiantes/perfil/Profile.vue'
import Nota from '../components/estudiantes/notas/Nota.vue'
import Report1 from '../components/estudiantes/reportes/Report.vue'
import HistoriaEst from '../components/estudiantes/historialE/HistoriaEst.vue'
//AULAS VIRTUALES DOCENTES
import AulasListas from '../components/aulasvirtuales/profesores/manu/AulasListas.vue'
import AulaCreate from '../components/aulasvirtuales/profesores/aulacreate/AulaCreate.vue'
import Report from '../components/reportes/matriculas/pdfs/Report.vue'
import Aulaprincipal from '../components/aulasvirtuales/profesores/aulaprincipal/Aulaprincipal.vue'
import Task from '../components/aulasvirtuales/profesores/task/Task.vue'
import ReviewTasks from '../components/aulasvirtuales/profesores/reviewtask/ReviewTasks.vue'
//AULAS VIRTUALES ESTUDIANTES
import AllAulas from '../components/aulasvirtuales/alumnos/allAulas/AllAulas.vue'
import MyAulas from '../components/aulasvirtuales/alumnos/myAulas/MyAulas.vue'
import HomeAulas from '../components/aulasvirtuales/alumnos/homeAulas/HomeAulas.vue'
import Tasks from '../components/aulasvirtuales/alumnos/tasks/Tasks.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'default',
    component: Default
  },
  {
    path: '/usuarios/Usuario',
    name: '1',
    component: require('../components/administracion/usuarios/indexUsiario.vue').default,
    beforeEnter: authorization
  },
  {
    path: '/usuarios/creausuario',
    name: 'crea-usuario',
    component: require('../components/administracion/usuarios/CreaUsuario.vue').default
  },
  {
    path: '/usuarios/:id/edit',
    name: 'edita-usuario',
    component: require('../components/administracion/usuarios/CreaUsuario.vue').default
  },
  {
    path: '/Cuentas-Usuarios',
    name: '2',
    component: require('../components/administracion/cuentas/cuenta.vue').default
  },
  { //-------ZONAS------
    path: '/MenuZonas',
    name: '000',
    component: require('../components/bases/zonas/MenuZonas.vue').default
  },
  { //-------------------------------------ZONAS------------------------------
    path: '/List-Provincias',
    name: '000',
    component: require('../components/bases/zonas/provincias/ListProvincias.vue').default
  },
  { //-------------------------------------ZONAS------------------------------
    path: '/List-Canton',
    name: '000',
    component: require('../components/bases/zonas/cantones/ListCanton.vue').default
  },
  { //-------------------------------------ZONAS------------------------------
    path: '/List-Parroquia',
    name: '000',
    component: require('../components/bases/zonas/parroquias/Parroquias.vue').default
  },
  { //-------------------------------------ZONAS------------------------------
    path: '/List-Nacionalidad',
    name: '000',
    component: require('../components/bases/zonas/nacionalidad/Nacionalidad.vue').default
  },
  { //-------------------------------------ZONAS------------------------------
    path: '/List-Etnias',
    name: '000',
    component: require('../components/bases/zonas/etnias/Etnias.vue').default
  },
  { //-------------------------------------REGISTROS------------------------------
    path: '/List-Estudiate',
    name: '222',
    component: require('../components/registros/estudiantes/Estudiante.vue').default
  },
  { //-------------------------------------REGISTROS------------------------------
    path: '/Add-Estudiate',
    name: 'addestudiante',
    component: require('../components/registros/estudiantes/AddEstudiante.vue').default
  },
  { //-------------------------------------REGISTROS------------------------------
    path: '/Estudiate/:id/edit',
    name: 'editestudiante',
    component: require('../components/registros/estudiantes/AddEstudiante.vue').default
  },
  { //-------------------------------------REGISTROS------------------------------
    path: '/List-Docente',
    name: '333',
    component: require('../components/registros/docentes/Docentes.vue').default
  },
  { //-------------------------------------REGISTROS------------------------------
    path: '/Add-Docente',
    name: 'adddocente',
    component: require('../components/registros/docentes/AddDocentes.vue').default
  },
  { //-------------------------------------REGISTROS------------------------------
    path: '/Docente/:id/edit',
    name: 'editdocente',
    component: require('../components/registros/docentes/AddDocentes.vue').default
  },
  { //-------------------------------------GESTION------------------------------
    path: '/MenuGestion',
    name: '1111',
    component: require('../components/gestion/Menu1Gestion.vue').default
  },
  { //-------------------------------------GESTION------------------------------
    path: '/Nivel',
    name: '1111',
    component: require('../components/gestion/nivel/Nivel.vue').default
  },
  { //-------------------------------------GESTION------------------------------
    path: '/Materias',
    name: '1111',
    component: require('../components/gestion/materia/Materias.vue').default
  },
  { //-------------------------------------MATRICULA------------------------------
    path: '/Periodo',
    name: '11',
    component: require('../components/matriculas/periodos/Periodo.vue').default
  },
  { //-------------------------------------MATRICULA------------------------------
    path: '/Opciones-Matricula',
    name: '77',
    component: require('../components/matriculas/Menu1Matricula.vue').default
  },
  { //-------------------------------------MATRICULA------------------------------
    path: '/Matricula-1',
    name: '77',
    component: require('../components/matriculas/matricula/mat1/Matriculas1.vue').default
  },
  { //-------------------------------------MATRICULA------------------------------
    path: '/Actual-Matricula',
    name: 'actualmatricula1',
    component: require('../components/matriculas/matricula/mat1/ActualMatricula.vue').default
  },
  { //-------------------------------------MATRICULA------------------------------
    path: '/Create-Matricula-v1',
    name: 'matri1',
    component: require('../components/matriculas/matricula/mat1/CreateMatricula.vue').default,
  },
  { //-------------------------------------MATRICULA------------------------------
    path: '/Matricula-2',
    name: '71',
    component: require('../components/matriculas/matricula/mat2/Matriculas2.vue').default
  },
  { //-------------------------------------MATRICULA------------------------------
    path: '/Create-Matricula-v2',
    name: 'matri2',
    component: require('../components/matriculas/matricula/mat2/CreateMatricula2.vue').default
  },

  { //-------------------------------------MATRICULA PARALELO------------------------------
    path: '/Lista-Paralelo-v1',
    name: 'paralelos1',
    component: require('../components/matriculas/paralelos/paralelov1/EnlistarParalelo.vue').default
  },
  { //-------------------------------------MATRICULA PARALELO------------------------------
    path: '/Lista-Paralelo-v2',
    name: 'paralelos2',
    component: require('../components/matriculas/paralelos/paralelov2/EnlistarParalelom2.vue').default
  },
  { //-------------------------------------MATRICULA------------------------------
    path: '/Actual-Matricula-m2',
    name: 'actualmatricula3',
    component: require('../components/matriculas/matricula/mat2/ActualMatricula2.vue').default
  },
  { //-------------------------------------MATRICULA ERROR------------------------------
    path: '/Error-reg',
    name: '404',
    component: require('../components/help/error.vue').default
  },
  { //-------------------------------------MATRICULA ERROR------------------------------
    path: '/507',
    name: '/500-working',
    component: require('../components/help/working.vue').default
  },
  { //-------------------------------------DISTRIBUTIVO------------------------------
    path: '/Menu-Distributivo',
    name: '2222',
    component: require('../components/gestion/MenuDistributivo.vue').default
  },
  { //-------------------------------------DISTRIBUTIVO------------------------------
    path: '/Distributivo-v1/:id',
    name: '2222',
    component: require('../components/gestion/distributivo/dV1/Distributivov1.vue').default
  },
  { //-------------------------------------DISTRIBUTIVO------------------------------
    path: '/Distributivo-v2/:id',
    name: '2222',
    component: require('../components/gestion/distributivo/dV2/Distributivov2.vue').default
  },
  { //-------------------------------------REPORTES------------------------------
    path: '/Reporte-matricula-v1/:id/report',
    name: '3A',
    component: require('../components/reportes/reporte1.vue').default
  },

  ////------------------------------------DOCENTES-----------------------------
  {
    path: '/perfil-docente',
    name: 'd1',
    component: Perfil
  },
  {
    path: '/opciones-curso',
    name: 'd2',
    component: MenuCursos
  },
  {
    path: '/lista-curso-m1/:id/historia',
    name: 'd2',
    component: ListaCursos
  },
  {
    path: '/reporte-docente',
    name: 'dr',
    component: ReporteDoc
  },
  {
    path: '/dnotas/:id',
    name: 'd4',
    component: Notas,
    props: true
  },
  {
    path: '/asistencias/:id',
    name: 'asistencia',
    component: Asiste,
    props: true
  },
  //--------------------------------------ESTUDIANTES-----------
  {
    path: '/perfil-estudiante',
    name: 'e1',
    component: Profile
  },
  {
    path: '/Consultar-nota',
    name: 'e2',
    component: Nota
  },
  {
    path: '/Repote-estudiante',
    name: 'e3',
    component: Report1
  },
  {
    path: '/Historia-estudiante',
    name: 'e4',
    component: HistoriaEst
  },
  ////------------------------------------REPORTES-----------------------------
  {
    path: '/opciones-reportes',
    name: 'r2',
    component: MenuReportes
  },
  {
    path: '/consolidado',
    name: 'r2',
    component: Consolidado
  },
  {
    path: '/list-report',
    name: 'ListaReporte',
    component: Report
  },
  ////------------------------------------AULAS VIRTUALES DOCENTES-----------------------------
  {
    path: '/aulas-lista',
    name: 'al',
    component: AulasListas
  },
  {
    path: '/crear-aula',
    name: 'alce',
    component: AulaCreate
  },
  {
    path: '/aula-principal/:id',
    name: 'al',
    component: Aulaprincipal
  },
  {
    path: '/task-config/:id',
    name: 'al',
    component: Task
  },
  {
    path: '/review-task/:id',
    name: 'reviews',
    component: ReviewTasks
  },
   ////------------------------------------AULAS VIRTUALES ESTUDIANTES-----------------------------
  {
    path: '/all-lista',
    name: 'es2',
    component: AllAulas
  },
  {
    path: '/my-lista',
    name: 'es1',
    component: MyAulas
  },
  {
    path: '/home-aula/:id',
    name: 'es1',
    component: HomeAulas
  },
  {
    path: '/task-config2/:id',
    name: 'es1',
    component: Tasks
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }
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
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router