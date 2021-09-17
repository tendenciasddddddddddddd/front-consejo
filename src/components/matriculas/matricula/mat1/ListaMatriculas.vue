<template>
  <div class="row mb-5">
    <div class="col-12 ">
      <!-- Card Profile -->

      <div class="card  mol" id="accounts">
        <div class="card-header">
          <Navss :actualText="'Lista Matriculados'" :rutas="rutass"></Navss>

          <div v-if="isLoading1">
            .....
          </div>
          <div v-else>
            <br />
            <v-select
              v-model="check"
              :options="listPeriodo"
              @input="checkExist($event)"
              label="nombre"
              placeholder="Elejir un periodo"
            >
              <template #option="{ nombre }">
                <h6 style="margin: 0">{{ nombre }}</h6>
              </template>
              <template #no-options="{ }">
                Lo siento, no hay opciones de coincidencia.
              </template>
            </v-select>
          </div>
        </div>
        <Espera v-if="isTabla"></Espera>
        <div v-else class="table-responsive">
            <div class="caja">
                <select class="" @change="onChange($event)" v-model="select" placeholder="Elegir el Curso"  >
                    <option>Seleccione un curso</option>
             <option v-for="option in listniveles" v-bind:value="option._id" :key="option._id">
               {{ option.nombres }}
            </option>
          </select>
            </div>
          
          <table class="table table-flush" id="datatable-basic">
            <thead class="thead-light">
              <tr>
                 <th
                  class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                >
                # Matricula
                </th>
                <th
                  class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Nombres
                </th>
                <th
                  class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Curso
                </th>

                <th
                  class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Fecha Modificación
                </th>
                <th
                  class="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Accion
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in infoMat" :key="item.id">
                <td class="text-sm text-center font-weight-normal">
                  {{ item.nmatricula}}
                </td>
                <td class="text-sm text-center font-weight-normal">
                  {{ item.fkestudiante.apellidos }}
                  {{ item.fkestudiante.nombres }}
                </td>
                <td class="text-sm text-center font-weight-normal">
                  {{ item.fknivel.nombres }}
                </td>

                <td class="text-sm text-center font-weight-normal">
                  {{ item.updatedAt.substring(0, 10) }}
                </td>
                <td class="text-sm text-center font-weight-normal">
                  <router-link :to="`/Reporte-matricula-v1/${item._id}/report`" class="px-3 text-primary mb-0">
                    <i class="fas fa-file-pdf text-lg me-1" aria-hidden="true"></i>
                  </router-link>
            
       
                </td>
              </tr>
            </tbody>
          </table>
          <!--  <Paginacion :paging="p => getAll(p)" :page="pagina" :pages="paginas"/> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Espera from "../../../../shared/Espera";
import Navss from "../../../../shared/Navss";
export default {
  name: "ListaMatricula",
  components: {
    Espera,
    Navss,
  },
  data() {
    return {
      isLoading1: false,
      isLoading2: false,
      isTabla: true,
      listPeriodo: null,
      check: null,
      select:null,
      infoMat: null,
      listniveles: null,
      rutass: [
        {
          id: "0",
          nombre: "Home",
          url: "/",
        },
        {
          id: "1",
          nombre: "Opciones de Matricula",
          url: "/Opciones-Matricula",
        },
        {
          id: "2",
          nombre: "Intensivo",
          url: "/Matricula-1",
        },
      ],
    };
  },
  methods: {
    __listPeriodo() {
      //-----------TRAE LA LISTA DE LOS ROLES
      this.isLoading1 = true;
      this.$proxies._matriculaProxi
        .getAll()
        .then((x) => {
          let filtro = x.data.niveles;
          this.listPeriodo = filtro.filter((x) => x.typo == "Intensivo");
          this.isLoading1 = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isLoading1 = false;
        });
    },
    __listNivele() {
      //-----------TRAE LA LISTA DE LOS ROLES
      this.listniveles = null;
      this.select =null;
      this.infoMat = null;
      this.isTabla = true;
      this.$proxies._gestionProxi
        .getNiveles()
        .then((x) => {
          let filtros = x.data;
          this.listniveles = filtros.filter((x) => x.modalidad == 'Intensivo');
          this.isTabla = false;
        })
        .catch((err) => {
          console.log("Error", err);
          this.isTabla = false;
        });
    },
    __cambios(h, c) {
      this.isTabla = true;
      let m = "m1";
      this.$proxies._matriculaProxi
        .getInfoListv1Matricula(h, m, c)
        .then((x) => {
          this.infoMat = x.data.matriculados;
          this.isTabla = false;
          console.log(this.infoMat);
        })
        .catch((err) => {
          console.log("Error", err);
          this.isTabla = false;
        });
    },
    checkExist(event) {
      if (event) {
          this.__listNivele();
        //this.__cambios(event._id);
      }
    },
    onChange(event) {
      if (event) {
          if(this.check._id){
              if(event.target.value!='Seleccione un curso'){
                  let curso=event.target.value;
                  this.__cambios(this.check._id, curso);
              }
              
          }
      }
    },
  },
  created() {
    this.__listPeriodo();
  },
};
</script>
 
<style>
.selectore{
    margin-left: 5%;
    width: 90%;
      display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.caja {
   margin:20px auto 40px auto;	
   border:1px solid #d9d9d9;
   height:30px;
   overflow: hidden;
   width: 230px;
   position:relative;
}
select {
   background: transparent;
   border: none;
   font-size: 14px;
   height: 30px;
   padding: 5px;
   width: 250px;
}
select:focus{ outline: none;}

.caja::after{
	content:"\025be";
	display:table-cell;
	padding-top:7px;
	text-align:center;
	width:30px;
	height:30px;
	background-color:#d9d9d9;
	position:absolute;
	top:0;
	right:0px;	
	pointer-events: none;
}
</style>
