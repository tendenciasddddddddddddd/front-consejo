<template>
    <div>
        <div v-if="ifload">Trabajando...</div>
        <section v-else>
            <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
                :paginate-elements-by-height="1400" :filename="'libro-conducta'" :pdf-quality="2" :manual-pagination="false"
                pdf-format="a4" :pdf-margin="10" pdf-orientation="portrait" pdf-content-width="800px"
                @progress="onProgress($event)" ref="html2Pdf">
                <section slot="pdf-content">
                    <div v-for="item in info" :key="item.id" class="my-sm-5">

                        <div class="card-header text-center ">
                            <div class="row justify-content-between">
                                <div class="col-md-2 text-start">
                                    <img class=" w-70  ms-3" :src="settings.logo" alt="Logo" />
                                </div>
                                <div class="col-md-9">
                  <span class="h6 negros">
                    {{settings.unidadeducativa}}
                  </span><br>
                  <span style="margin-top:-10px" class="text-sm text-center negros">
                    Dirección: {{settings.direccion}} Teléf:  {{settings.telefono}} 
                  </span> <br>
                  <span class="text-xs negros"> {{settings.ubicacion}}</span>
                </div>
                <div class="col-lg-1   ">
                </div>
                            </div>
                            <div class="row mt-2  ms-3  me-4">
                                <div class="col-lg-7 text-xs negros text-start">
                                    <div class="row">
                                       <div class="col-lg-3">
                                        CURSO : <br>
                                        ALUMNO:
                                       </div>
                                       <div class="col-lg-9">
                                        <b>{{ item.fknivel.nombre}}{{ item.curso }}</b> <br>
                                        <b>{{ item.nombre }}</b>
                                       </div>
                                    </div>
                                </div>
                                <div class="col-lg-5 text-xs negros text-end">
                                    <div class="row">
                                       <div class="col">
                                        PERIODO : <br>
                                        FECHA : <br>
                                        CÓDIGO :
                                       </div>
                                       <div class="col">
                                        <b>{{item.academico.nombre}}</b> <br>
                                        <b>{{ fechasActual }}</b> <br>
                                        <b>344</b>
                                       </div>
                                    </div>
                                </div>
                            </div><br>
                            <span class="h6 negros mt-2 mb-2" style="font-weight: 400;">LIBRO QUIMESTRAL DE APRENDIZAJES Y
                                COMPORTAMIENTO</span>
                            <div class="row">
                                <div class="col-lg-11 col-12 mx-auto">

                                    <div class="">
                                        <table class="dataTable-table table s-table-flush "
                                            style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                                            <thead>
                                                <tr>
                                                    <th style="border-top: 1px solid #d9d9d9;padding: 4px 5px;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);"
                                                        class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                        ASIGNATURAS
                                                    </th>
                                                    <th style="border-top: 1px solid #d9d9d9;padding: 4px 5px;"
                                                        class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                        QUIMESTRE 1
                                                    </th>
                                                    <th style="border-top: 1px solid #d9d9d9;padding: 4px 5px;"
                                                        class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                        QUIMESTRE 2
                                                    </th>
                                                    <th style="border-top: 1px solid #d9d9d9;padding: 4px 5px;"
                                                        class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                        RESULTADOS
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style="padding: 4px 5px;border-right: 1px solid rgb(223 227 235);">
                                                    </th>
                                                    <th style="padding: 4px 5px;"
                                                        class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                        <div class="row">
                                                            <div class="col">a1</div>
                                                            <div class="col">a2</div>
                                                            <div class="col">pr</div>
                                                            <div class="col">eq</div>
                                                        </div>
                                                    </th>
                                                    <th style="padding: 4px 5px;"
                                                        class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                        <div class="row">
                                                            <div class="col">b1</div>
                                                            <div class="col">b2</div>
                                                            <div class="col">pr</div>
                                                            <div class="col">eq</div>
                                                        </div>
                                                    </th>
                                                    <th style="padding: 4px 5px;"
                                                        class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                        <div class="row">
                                                            <div class="col">eq</div>
                                                            <div class="col">ex</div>

                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr v-for="ite in item.calificaciones" :key="ite.id">
                                                    <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                                        class="mb-0 text-start ms-3 text-xxs negros fuente">
                                                        {{ite.materia}}</td>
                                                    <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                                        class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                        <div class="row negros">
                                                            <div class="col">{{ite.comportamiento[0].p1}}</div>
                                                            <div class="col">{{ite.comportamiento[0].p2}}</div>

                                                            <div class="col">
                                                                {{calcularPromedio(ite.comportamiento[0].p1,ite.comportamiento[0].p2)}}
                                                            </div>
                                                            <div class="col font-weight-bolder">
                                                                {{calcularEquivalente(ite.comportamiento[0].p1,ite.comportamiento[0].p2)}}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                                        class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                        <div class="row negros">
                                                            <div class="col">{{ite.comportamiento[1].p1}}</div>
                                                            <div class="col">{{ite.comportamiento[1].p2}}</div>
                                                            <div class="col">
                                                                {{calcularPromedio(ite.comportamiento[1].p1,ite.comportamiento[1].p2)}}
                                                            </div>
                                                            <div class="col font-weight-bolder">
                                                                {{calcularEquivalente(ite.comportamiento[1].p1,ite.comportamiento[1].p2)}}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style="padding: 4px 5px;border-bottom-width: 0px;"
                                                        class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                        <div class="row negros">
                                                            <div class="col font-weight-bolder">
                                                                {{calcularPromedio80(
                                                                ite.comportamiento[0].p1, ite.comportamiento[0].p2,
                                                                ite.comportamiento[1].p1, ite.comportamiento[1].p2
                                                                )}}
                                                            </div>

                                                            <div class="col text-xxs">{{calcularPromedioTotal(
                                                                ite.comportamiento[0].p1, ite.comportamiento[0].p2,
                                                                ite.comportamiento[1].p1, ite.comportamiento[1].p2
                                                                )}}</div>

                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 4px 5px;border-top: 1px solid rgb(223 227 235);"
                                                        class="mb-0 ms-3 "></td>
                                                    <td style="padding: 4px 5px;border-top: 1px solid rgb(223 227 235);"
                                                        class="mb-0 ms-3 "> </td>
                                                    <td style="padding: 4px 5px;border-top: 1px solid rgb(223 227 235);"
                                                        class="mb-0 ms-3 text-start text-xxs negros ">PROMEDIOS </td>
                                                    <td style="padding: 4px 5px;border-top: 1px solid rgb(223 227 235);"
                                                        class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                        {{total(item.calificaciones)}}
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                        <table style="margin-top: -16px;border-top: 0px;"
                                            class="dataTable-table table s-table-flush ">
                                            <tbody>
                                                <tr>
                                                    <td style="border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                                        class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                        DESARROLLO HUMANO INTEGRA <br>
                                                        COMPORTAMIENTO
                                                    </td>
                                                    <td style="border-bottom-width: 0px;"
                                                        class="mb-0 ms-3 text-start text-xxs negros ">
                                                        <b>A</b> <br>
                                                        <b>{{totalEquivalente(item.calificaciones)}}</b>
                                                    </td>

                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex justify-content-around mt-7">
                                <div class="text-center">
                                    <span class="h6 pb-0">
                                        <b>__________________________________</b>
                                    </span> <br>
                                    <p class="negros text-sm">
                                                <b>{{settings.rector}}</b><br>
                                                RECTOR/A
                                            </p>
                                </div>
                                <div>
                                    <div class="text-center">
                                        <span class="h6 pb-0">
                                            <b>__________________________________</b>
                                        </span> <br>
                                        <p class="negros text-sm">
                                                    <b>{{settings.secretario}}</b><br>
                                                    SECRETARIO/A
                                                </p>
                                    </div>

                                </div>
                            </div><br><br><br><br>

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
        numQuimestre: Number,
        settings: Object,
    },
    data() {
        return {
            info: [],
            ifload: false,
            statusbar: '',
            fechasActual: '',
            texto: '',
            resultado: '',
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
                      setTimeout(() => this.generatePDF(), 2000);
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
        calcularPromedio: function (a, b) {
            let suma = parseFloat(a) + parseFloat(b);
            let prom = suma / 2;
            return prom.toFixed(2);
        },
        calcularEquivalente: function (a, b) {
            let suma = (parseFloat(a) + parseFloat(b)) / 2;
            let num = suma.toFixed(2);
            let result = ''
            if (num <= 10 && num >= 9) {
                result = 'A'
            } else if (num <= 8.99 && num >= 7) {
                result = 'B'
            } else if (num <= 6.99 && num >= 4.01) {
                result = 'C'
            } else if (num <= 4 && num >= 1) {
                result = 'D'
            } else {
                result = 'NA'
            }
            return `${result}`;
        },
        calcularPromedio80: function (a, b, c, d) {
            let suma = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d)
            let prom = suma / 4;
            return prom.toFixed(2);
        },
        calcularPromedioTotal: function (a, b, c, d) {
            let suma = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d)
            let num = suma / 4;
            let result = ''
            if (num <= 10 && num >= 9) {
                result = 'Domina Aprendizaje'
            } else if (num <= 8.99 && num >= 7) {
                result = 'Alcanza Aprendizaje'
            } else if (num <= 6.99 && num >= 4.01) {
                result = 'Próximo Alcanza'
            } else if (num <= 4 && num >= 1) {
                result = 'No Alcanza'
            } else {
                result = 'undefined'
            }
            return `${result}`;
        },
        total(array){
          let aux = 0
          for (let i = 0; i < array.length; i++) {
            const element = array[i].comportamiento;
            let result = parseFloat(element[0].p1) + parseFloat(element[0].p2) + parseFloat(element[1].p1) + parseFloat(element[1].p2)
            let prom = result / 4
            aux = aux + prom
          }
          let total = (aux / array.length).toFixed(2);
          return total
        },
        totalEquivalente(array){
          let aux = 0
          for (let i = 0; i < array.length; i++) {
            const element = array[i].comportamiento;
            let result = parseFloat(element[0].p1) + parseFloat(element[0].p2) + parseFloat(element[1].p1) + parseFloat(element[1].p2)
            let prom = result / 4
            aux = aux + prom
          }
          let num = (aux / array.length).toFixed(2);
          let result = ''
            if (num <= 10 && num >= 9) {
                result = 'A'
            } else if (num <= 8.99 && num >= 7) {
                result = 'B'
            } else if (num <= 6.99 && num >= 4.01) {
                result = 'C'
            } else if (num <= 4 && num >= 1) {
                result = 'D'
            } else {
                result = 'NA'
            }
            return `${result}`;
        }
    },
    mounted() {
        this.initialSetup()
        this.__calcularfechaActual()
    }
}
</script>
  