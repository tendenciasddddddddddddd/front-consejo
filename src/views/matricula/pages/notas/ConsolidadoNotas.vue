<template>
    <div>
        <div v-if="ifload">Trabajando...</div>
        <section v-else>
                <section slot="pdf-content">
                    <div v-for="item in info" :key="item.id" class="my-sm-5" >
                       
                        <div  class="card-header text-center ">
                            <div class="row justify-content-between">
                                <div class="col-md-1 text-start">
                                    <img class=" w-100 " src="../../../../assets/img/alfonso/alfonso.jpg" alt="Logo" />
                                </div>
                                <div class="col-md-11">
                                    <span class="h6 negros">
                                        UNIDAD EDUCATIVA DEL MILENIO "ALFONSO HERRERA"
                                    </span><br>
                                    <p  class="text-xs text-center negros">
                                        Dirección: Panamericana y Avenida Espejo Teléf: 063731060 - 062977118/119 <br>
                                        El Ángel - Carchi - Ecuador
                                    </p> 
                                   
                                </div> 
                            </div>
                            <div class="row ">
                                       <div class="col-lg-6 text-xs negros text-start"> <span>CURSO : <b>{{ item.fknivel.nombre }} {{ item.curso }}</b></span> <br>
                                        <span>ESTUDIANTE:  <b>{{ item.nombre }}</b></span>
                                       </div>
                                       <div class="col-lg-2 text-xs negros text-start"> CÓDIGO : 250
                                       </div>
                                       <div class="col-lg-4 text-xs negros text-end"><span>PERIODO: <b>{{ item.academico.nombre
                                    }}</b></span><br>
                                        <span>FECHA: {{ fechasActual }}</span>
                                       </div>
                                    </div>
                            <div class="row">
                                <div class="col-lg-12 col-12 mx-auto">
                                   
                                    <div class="">
                                        <table class="dataTable-table table s-table-flush "
                                            style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                                            <thead>
                                                <tr>
                                                    <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);"></th>
                                                    
                                                    <th  class="text-uppercase text-end negros text-xxs font-weight-bolder" style="padding: 4px 5px;border-top: 1px solid #d9d9d9;">
                                                        CIENCIAS NATURALES
                                                    </th>
                                                    <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"></th>
                                                </tr>
 
                                                <tr >
                                                    <th style="padding: 4px 5px;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                        LISTADO DE ESTUDIANTES
                                                    </th>
                                                   
                                                    <th style="padding: 4px 5px;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                        PRIMER QUIMESTRE
                                                    </th>
                                                    <th style="padding: 4px 5px;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                        SEGUNDO QUIMESTRE
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th style="padding: 4px 5px;border-right: 1px solid rgb(223 227 235);"></th>
                                                   
                                                    <th style="padding: 4px 5px;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                        <div class="row">
                                                            <div class="col">p1</div>
                                                            <div class="col">p2</div>
                                                            <div class="col">pro</div>
                                                            <div class="col">pro(80%)</div>
                                                            <div class="col">exa</div>
                                                            <div class="col">exa(80%)</div>
                                                            <div class="col">qui</div>
                                                        </div>
                                                    </th>
                                                    <th style="padding: 4px 5px;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                        <div class="row">
                                                            <div class="col">p1</div>
                                                            <div class="col">p2</div>
                                                            <div class="col">pro</div>
                                                            <div class="col">pro(80%)</div>
                                                            <div class="col">exa</div>
                                                            <div class="col">exa(80%)</div>
                                                            <div class="col">qui</div>
                                                           
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr v-for="ite in item.calificaciones" :key="ite.id">
                                                    <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);" class="mb-0 text-start ms-3 text-xs negros fuente">{{ite.materia}}</td>
                                                    <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);" class="mb-0 ms-3 text-start text-xs negros fuente">
                                                        <div class="row negros">
                                                            <div class="col">{{ite.notas[numQuimestre].a1}}</div>
                                                            <div class="col">{{ite.notas[numQuimestre].a2}}</div>
                                                            <div class="col">{{ite.notas[numQuimestre].a3}}</div>
                                                            <div class="col">{{ite.notas[numQuimestre].a4}}</div>
                                                            <div class="col">{{ite.notas[numQuimestre].a5}}</div>
                                                            <div class="col">{{prom1=calcularPromedio(ite.notas[numQuimestre].a1,ite.notas[numQuimestre].a2,ite.notas[numQuimestre].a3,ite.notas[numQuimestre].a4,ite.notas[numQuimestre].a5)}}</div>
                                                            <div class="col font-weight-bolder">
                                                                {{calcularEquivalente(ite.notas[numQuimestre].a1,ite.notas[numQuimestre].a2,ite.notas[numQuimestre].a3,ite.notas[numQuimestre].a4,ite.notas[numQuimestre].a5)}}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style="padding: 4px 5px;border-bottom-width: 0px;" class="mb-0 ms-3 text-start text-xs negros fuente">
                                                        <div class="row negros">
                                                            <div class="col">{{ite.notas[numQuimestre].b1}}</div>
                                                            <div class="col">{{ite.notas[numQuimestre].b2}}</div>
                                                            <div class="col">{{ite.notas[numQuimestre].b3}}</div>
                                                            <div class="col">{{ite.notas[numQuimestre].b4}}</div>
                                                            <div class="col">{{ite.notas[numQuimestre].b5}}</div>
                                                            <div class="col">{{prom2=calcularPromedio(ite.notas[numQuimestre].b1,ite.notas[numQuimestre].b2,ite.notas[numQuimestre].b3,ite.notas[numQuimestre].b4,ite.notas[numQuimestre].b5)}}</div>
                                                            <div class="col font-weight-bolder">
                                                                {{calcularEquivalente(ite.notas[numQuimestre].b1,ite.notas[numQuimestre].b2,ite.notas[numQuimestre].b3,ite.notas[numQuimestre].b4,ite.notas[numQuimestre].b5)}}
                                                            </div>
                                                        </div>
                                                    </td>
                                                
                                                </tr> 
                                              
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                           
                            <div class="d-flex justify-content-around mt-3">
                                <div class="text-center">
                                    <span class="h6 pb-0">
                                        <b>__________________________________</b>
                                    </span> <br>
                                    <span class="negros text-sm"><b>RECTOR(A)</b></span>
                                </div>
                                <div >
                                    <div class="text-center" >
                                        <span class="h6 pb-0">
                                            <b>__________________________________</b>
                                        </span> <br>
                                        <span class="negros text-sm"><b>DOCENTE GUIA</b></span>
                                    </div>
                                  
                                </div>
                            </div><br>
                           
                        </div>
                       
                    </div>
                   
                </section>

        </section>
    </div>
</template>
  
<script>
export default {
    components: {  },
    props: {
        rowData: Array,
    },
    data() {
        return {
            info: [],
            ifload: false,
            statusbar: '',
            fechasActual: '',
            texto: '',
            resultado: '',
            prom1: '',
            prom2: '',
            numQuimestre:0,
            nextCourse: ''
        }
    },
    watch: {
        statusbar: function (value) {
            this.$emit("changeStatus", value);
        }
    },
    methods: {
        onProgress(event) {
            this.statusbar = event;
        },
        hasGenerated() {
            alert("PDF generated successfully!");
        },
        initialSetup() {
            let array = this.rowData;
            this.ifload = true;
            this.$proxies._matriculaProxi
                .getMatriculaReporte(array)
                .then((x) => {
                    this.info = x.data;
                    this.ifload = false;
                    this.getDta(this.info);
                    console.log(this.info)
                   // setTimeout(() => this.generatePDF(), 600);
                })
                .catch((x) => {
                    console.log("Error", x);
                    this.ifload = false;
                });
        },
        getDta(arrays){
          var dta = [];
          if (arrays.length > 0) {
            for (let i = 0; i < arrays.length; i++) {
                var  materia = ''
                const element = arrays[i].calificaciones;
                for (let j = 0; j < element.length; j++) {
                    materia= element[j].materia;
                    dta.push({materia: materia});
                }
               break;
            }
          }
        },
        promedio(array){
        let sum = parseFloat(array[0].a1) + parseFloat(array[0].a2) + parseFloat(array[0].a3) + parseFloat(array[0].a4) + parseFloat(array[0].a5) 
        let prom = (sum/5).toFixed(2);
        return prom;
        },
        generatePDF() {
            this.$refs.html2Pdf.generatePdf();
        },
        __calcularfechaActual() {
            const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"];
            const dateObj = new Date();
            const month = monthNames[dateObj.getMonth()];
            const day = String(dateObj.getDate()).padStart(2, '0');
            const year = dateObj.getFullYear();
            const output = month + '\n' + day + ',' + year;
            this.fechasActual = output;
        },
       calcularPromedio: function(a,b,c,d,e){
          let suma = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d) + parseFloat(e);
          let prom = suma/5;
          return prom.toFixed(2);
       },
       calcularEquivalente: function(a,b,c,d,e){
          let suma = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d) + parseFloat(e);
          let prom = suma/5;
          let eq = (prom * 8) / 10;
          return eq.toFixed(2);
       },
       calcularPromedio80: function(a,b,c,d,e,f,g,h,i,j){
        let suma = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d) + parseFloat(e) + parseFloat(f) + parseFloat(g) + parseFloat(h) + parseFloat(i) + parseFloat(j) 
        let prom = suma/10;
        let eq = (prom * 8) / 10;
        return eq.toFixed(2);
       },
       calcularPromedioTotal: function(a,b,c,d,e,f,g,h,i,j, exam){
        let suma = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d) + parseFloat(e) + parseFloat(f) + parseFloat(g) + parseFloat(h) + parseFloat(i) + parseFloat(j) 
        let examen = parseFloat(exam);
        let prom = suma/10;
        let eq = (prom * 8) / 10;
        let eq2 = (examen * 2) / 10;
        let req = eq + eq2;
        return req.toFixed(2);
       },
       calcularEquivalenteExamen: function(a){
          let examen = parseFloat(a);
          let eq = (examen * 2) / 10;
          return eq.toFixed(2);
       },
       
    },
    mounted() {
        this.initialSetup()
        this.__calcularfechaActual()
    }
}
</script>
  