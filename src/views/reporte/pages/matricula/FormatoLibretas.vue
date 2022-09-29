<template>
    <div>
        <div v-if="ifload">Trabajando...</div>
        <section v-else>
            <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
                :paginate-elements-by-height="1400" :filename="'libretas'" :pdf-quality="2" :manual-pagination="false"
                pdf-format="a4" :pdf-margin="10" pdf-orientation="landscape" pdf-content-width="1128px"
                @progress="onProgress($event)" ref="html2Pdf">
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
                                                    <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"></th>
                                                    <th  class="text-uppercase text-center negros text-xxs font-weight-bolder" style="padding: 4px 5px;border-top: 1px solid #d9d9d9;">
                                                      <span v-if="numQuimestre==0">PRIMER QUIMESTRE</span>  
                                                      <span v-else>SEGUNDO QUIMESTRE</span>
                                                    </th>
                                                    <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"></th>
                                                </tr>
                                                <tr>
                                                    <th style="padding: 4px 5px;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);"></th>
                                                    <th style="padding: 4px 5px;"></th>
                                                    <th style="padding: 4px 5px;" class=" text-center negros text-xxs font-weight-bolder">
                                                        Evaluaciones formativas 80%
                                                    </th>
                                                    <th style="padding: 4px 5px;" class=" text-center negros text-xxs font-weight-bolder">
                                                       SUM 20%
                                                    </th>
                                                </tr>
                                                <tr >
                                                    <th style="padding: 4px 5px;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                        ASIGNATURAS
                                                    </th>
                                                    <th style="padding: 4px 5px;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                       PARCIAL 1
                                                    </th>
                                                    <th style="padding: 4px 5px;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                       PARCIAL 2
                                                    </th>
                                                    <th style="padding: 4px 5px;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                       RESULTADOS
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th style="padding: 4px 5px;border-right: 1px solid rgb(223 227 235);"></th>
                                                    <th style="padding: 4px 5px;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                        <div class="row">
                                                            <div class="col">a1</div>
                                                            <div class="col">a2</div>
                                                            <div class="col">a3</div>
                                                            <div class="col">a4</div>
                                                            <div class="col">a5</div>
                                                            <div class="col">pr</div>
                                                            <div class="col">eq</div>
                                                        </div>
                                                    </th>
                                                    <th style="padding: 4px 5px;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                        <div class="row">
                                                            <div class="col">b1</div>
                                                            <div class="col">b2</div>
                                                            <div class="col">b3</div>
                                                            <div class="col">b4</div>
                                                            <div class="col">b5</div>
                                                            <div class="col">pr</div>
                                                            <div class="col">eq</div>
                                                        </div>
                                                    </th>
                                                    <th style="padding: 4px 5px;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                        <div class="row">
                                                            <div class="col">eq</div>
                                                            <div class="col">ex</div>
                                                            <div class="col">eq</div>
                                                            <div class="col">pr</div>
                                                            <div class="col">cu</div>
                                                           
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
                                                    <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);" class="mb-0 ms-3 text-start text-xs negros fuente">
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
                                                    <td style="padding: 4px 5px;border-bottom-width: 0px;" class="mb-0 ms-3 text-start text-xs negros fuente">
                                                        <div class="row negros">
                                                            <div class="col font-weight-bolder">
                                                                {{calcularPromedio80(
                                                                    ite.notas[numQuimestre].a1,ite.notas[numQuimestre].a2,ite.notas[numQuimestre].a3,ite.notas[numQuimestre].a4,ite.notas[numQuimestre].a5,
                                                                    ite.notas[numQuimestre].b1,ite.notas[numQuimestre].b2,ite.notas[numQuimestre].b3,ite.notas[numQuimestre].b4,ite.notas[numQuimestre].b5
                                                                )}}
                                                            </div>
                                                            <div class="col">{{ite.notas[0].examen}}</div>
                                                            <div class="col font-weight-bolder">{{calcularEquivalenteExamen(ite.notas[0].examen)}}</div>
                                                            <div class="col font-weight-bolder">
                                                                {{calcularPromedioTotal(
                                                                     ite.notas[numQuimestre].a1,ite.notas[numQuimestre].a2,ite.notas[numQuimestre].a3,ite.notas[numQuimestre].a4,ite.notas[numQuimestre].a5,
                                                                    ite.notas[numQuimestre].b1,ite.notas[numQuimestre].b2,ite.notas[numQuimestre].b3,ite.notas[numQuimestre].b4,ite.notas[numQuimestre].b5,
                                                                    ite.notas[numQuimestre].examen
                                                                )}}
                                                            </div>
                                                            <div class="col">AA</div>
                                                            
                                                        </div>
                                                    </td>
                                                </tr> 
                                                <tr >
                                                    <td style="padding: 4px 5px;border-top: 1px solid rgb(223 227 235);" class="mb-0 ms-3 text-start text-xs negros fuente">PROYECTOS ESCOLARES</td>
                                                    <td style="padding: 4px 5px;border-top: 1px solid rgb(223 227 235);" class="mb-0 ms-3 text-start text-xs negros ">EX </td>
                                                    <td style="padding: 4px 5px;border-top: 1px solid rgb(223 227 235);" class="mb-0 ms-3 text-start text-xs negros ">EX </td>
                                                    <td style="padding: 4px 5px;border-top: 1px solid rgb(223 227 235);" class="mb-0 ms-3 text-start text-xs negros fuente">
                                                        EX 
                                                    </td>
                                                </tr>
                                                <tr >
                                                    <td style="padding: 4px 5px;" class="mb-0 ms-3 text-start text-xs negros fuente">COMPORTAMIENTO </td>
                                                    <td style="padding: 4px 5px;" class="mb-0 ms-3 text-start text-xs negros fuente">A </td>
                                                    <td style="padding: 4px 5px;" class="mb-0 ms-3 text-start text-xs negros fuente">
                                                        A
                                                    </td>
                                                    <td style="padding: 4px 5px;" class="mb-0 ms-3 text-start text-xs negros fuente">
                                                        A
                                                    </td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                        <table style="margin-top: -16px;border-top: 0px;" class="dataTable-table table s-table-flush ">
                                            <tbody>
                                                <tr >
                                                    <td style="border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);" class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                        <b>Informe de Aprendizaje: Art. 209 numeral 1, 2 R/LOEI</b> 
                                                        <div class="row">
                                                           <div class="col-sm-4">
                                                            TAI = Tareas <br>
                                                            L = Lecciones.
                                                           </div>
                                                           <div class="col-sm-4">
                                                            AIC = Actividades Individ.Clase <br>
                                                            ESE= Evaluación sumativa escrita
                                                           </div>
                                                           <div class="col-sm-4">
                                                            AGC = Actividades Grupales <br>
                                                            PR = Promedio
                                                           </div>
                                                        </div>
                                                       <b>Escala de Calificaciones Art. 194, reformado, Decreto presidencial No. 366-13 (Art.9)</b> 
                                                        <div class="row">
                                                           <div class="col-sm-4">
                                                            DA = Domina Aprend.(10-9) <br>
                                                            NA = No Alcanza(&lt;=4) <br>
                                                            C = Poco Satisfactorio
                                                           </div>
                                                           <div class="col-sm-4">
                                                            AA = Alcanza Aprend.(7-8.99) <br>
                                                            A = Muy Satisfactorio <br>
                                                            D = Mejorable
                                                           </div>
                                                           <div class="col-sm-4">
                                                            PA = Próximo Alcanzar(4.01-6.99) <br>
                                                            B = Satisfactorio <br>
                                                            E = Insatisfactori
                                                           </div>
                                                        </div>
                                                    </td>
                                                    <td style="border-bottom-width: 0px;" class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                       <b>Evaluación Comportamiento: Art. 222- R/LOEI para sana convivencia social</b> 
                                                       <div class="row">
                                                           <div style="width: 160px;" class="col-sm-6">
                                                            A = Muy Satisfactorio <br>
                                                            B = Satisfactorio  <br>
                                                            C = Poco Satisfactorio <br>
                                                            D = Mejorable <br>
                                                            E = Insatisfactorio
                                                           </div>
                                                           <div class="col-sm-6">
                                                            Lidera el cumplimiento compromisos establecidos <br>
                                                            Cumple con los compromisos establecidos <br>
                                                            Falla ocasionalmente compromisos establecidos <br>
                                                            Falla reiteradamente los compromisos establecidos <br>
                                                            No cumple los compromisos establecidos
                                                           </div>
                                                           
                                                        </div>
                                                        <b>Evaluación Proyectos Educativos</b> 
                                                       <div class="row">
                                                           <div class="col-sm-3">
                                                            EX =Excelente
                                                           </div>
                                                           <div class="col-sm-3">
                                                            MB = Muy Buena 
                                                           </div>
                                                           <div class="col-sm-3">
                                                            B=Buena
                                                           </div>
                                                           <div class="col-sm-3">
                                                            R=Regular 
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

            </vue-html2pdf>

        </section>
    </div>
</template>
  
<script>
import VueHtml2pdf from "vue-html2pdf";
export default {
    components: { VueHtml2pdf },
    props: {
        rowData: Array,
        nextCourse: String,
        numQuimestre: Number
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
                   // console.log(this.info)
                    setTimeout(() => this.generatePDF(), 600);
                })
                .catch((x) => {
                    console.log("Error", x);
                    this.ifload = false;
                });
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
  