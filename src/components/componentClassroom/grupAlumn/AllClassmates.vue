<template>
      <div class="fixed-plugin" :class="{ 'show w-100': tabb === true }">
        <div
          class="card shadow-lg  desplega"
          :class="{ 'w-100': tabb === true }"
          style="overflow-y: auto; z-index: 9999;"
        >
          <div
            class=""
            style="margin-left:-20px; margin-right: -10px; border-radius: 0; min-height: 54px;
         padding: 4px 25px 4px 40px;background-color: #253342;"
          >
           <div class="d-flex justify-content-between">
              <div class="h5 text-white">
                ...
              </div>
              <div>
                <h5
                  style="font-weight: 400;"
                  class="mt-2 mb-0 fuente text-white"
                >
                  Estudiantes en este curso
                </h5>
              </div>
              <div class="mt-2">
                <button
                  @click="$emit('myEventAllClassmates')"
                  class="btn btn-link text-dark p-0 fixed-plugin-close-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="32"
                    height="32"
                    viewBox="0 0 172 172"
                    style=" fill:#000000;"
                  >
                    <g
                      fill="none"
                      fill-rule="nonzero"
                      stroke="none"
                      stroke-width="1"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      stroke-miterlimit="10"
                      stroke-dasharray=""
                      stroke-dashoffset="0"
                      font-family="none"
                      font-weight="none"
                      font-size="none"
                      text-anchor="none"
                      style="mix-blend-mode: normal"
                    >
                      <path d="M0,172v-172h172v172z" fill="none"></path>
                      <g fill="#ffffff">
                        <path
                          d="M26.5525,21.6075l-4.945,4.945l59.4475,59.4475l-59.4475,59.4475l4.945,4.945l59.4475,-59.4475l59.4475,59.4475l4.945,-4.945l-59.4475,-59.4475l59.4475,-59.4475l-4.945,-4.945l-59.4475,59.4475z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
            
          </div>

          <div class="card-body pt-sm-3 pt-0">
            <!-- Sidebar Backgrounds -->
             <Spinner v-if="isData"></Spinner>
            <div v-else class="row">
             
              <div class="col-lg-10 col-12 mx-auto">
                <Spinner class="mt-10" v-if="isCargar"></Spinner>
                <section v-else class="flex-containes ">
                  <div
                    v-for="item in inAlumnos"
                    :key="item.id"
                    class="text-center"
                  >
                    <br />

                    <div
                      class="targetas1 cajas "
                      style="min-width:170px;width: 170px!important;min-height: 190px;margin-top: 0px!important;"
                    >
                      
                      <div
                        class="avatar avatar-xl position-relative mt-3"
                        v-bind:style="{ 'background-color': item.colors }"
                        style="border-radius: 100%;"
                      >
                        <p class="text-white h3" style="font-weight: 600;">
                          {{ item.img }}
                        </p>
                      </div>

                      <p class="text-xs fuente mt-3">
                        {{ item.name.slice(0, 30) }}
                      </p>
                    </div>
                  </div>
                </section>
                
              </div>
            </div>
          </div>
          <div class=" modalFooter">
            <div class="text-end">
              <a class="btn btnNaranjaClaro "  @click="$emit('myEventAllClassmates')">
                Volver
              </a>

              
            </div>
          </div>
        </div>
      </div>
</template>
<script >
import Spinner from '../../../shared/Spinner';
export default {
    name : 'Aulaprincipal',
    components:{Spinner},
      props: {
    idGet: {
      type: String,
    },
  },
    data() {
        return {
          roles: this.$store.state.user.roles,
            info: null,
            isData: false,
            tabb: true,
            isTabb: 'un',
            inAlumnos: [],
            isCargar: false,
            colors: ['#00875a', '#00b8d9', '#6554c0', '#ff5630', '#57d9a3'],
            ids: '',
             id : this.idGet,
        }
    },
    methods: {
        getData(){
           this.isData = true;
           if(this.id){
            this.$proxies._aulaProxi
            .get(this.id)
            .then((x) => {
              this.info = x.data;
              this.isData = false;
              this.ids= this.info._id;
              this.empujarAlumnos();
            })
            .catch((err) => {
              console.log("Error", err);
              this.isData = false;
            });
           }
       },

       empujarAlumnos(){
             this.inAlumnos= [];
            
             this.isCargar= true;
            for (let i = 0; i <this.info.estudiantes.length;i++) {
                 let iniciales = this.info.estudiantes[i].name;
                 var arregloDeSubCadenas = iniciales.split(" ");
                 let subcadena = arregloDeSubCadenas[0].substring(0, 1)//+arregloDeSubCadenas[2].substring(0, 1);
                 var random = this.colors[Math.floor(Math.random()*this.colors.length)]
                 this.inAlumnos.push({name:iniciales,img:subcadena,colors: random});
            } 
            this.isCargar= false;
       },

    },
    
    created() {
         this.getData();
         
    },
    
};
</script>