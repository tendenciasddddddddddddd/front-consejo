<template>
    <div>
        <div v-if="ifload">Trabajando...</div>
        <section v-else>
            <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
                :paginate-elements-by-height="1400" :filename="'libretas'" :pdf-quality="2" :manual-pagination="false"
                pdf-format="a4" :pdf-margin="10" pdf-orientation="landscape" pdf-content-width="1128px"
                @progress="onProgress($event)" ref="html2Pdf">
                <section slot="pdf-content">
                    <div v-for="item in info" :key="item.id">
                        <div class="row">
                            <div class="col-lg-11 col-12 mx-auto">
                                <div class="p-2 text-center " style="background: white;">
                                    <div class="row justify-content-between">
                                        <div class="col-md-1 text-start">
                                            <img class=" w-100 " src="../../../../assets/img/alfonso/alfonso.jpg"
                                                alt="Logo" />
                                        </div>
                                        <div class="col-md-11">
                                            <span class="h6 negros">
                                                UNIDAD EDUCATIVA DEL MILENIO "ALFONSO HERRERA"
                                            </span><br>
                                            <p class="text-xs text-center negros">
                                                Dirección: Panamericana y Avenida Espejo Teléf: 063731060  <br>
                                                El Ángel - Carchi - Ecuador
                                            </p>

                                        </div>
                                    </div>
                                    <div class="row ">
                                        <div class="col-lg-6 text-xs negros text-start"> <span>CURSO : <b>{{
                                        item.fknivel.nombre }} {{ item.curso }}</b></span> <br>
                                            <span>ESTUDIANTE: <b>{{ item.nombre }}</b></span>
                                        </div>
                                        <div class="col-lg-2 text-xs negros text-start"> CÓDIGO : 250
                                        </div>
                                        <div class="col-lg-4 text-xs negros text-end"><span>PERIODO: <b>{{
                                        item.academico.nombre
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
                                                            <th
                                                                style="padding: 1px 3px;border-top: 1px solid #d9d9d9;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);">
                                                            </th>
                                                            <th style="padding: 1px 3px;border-top: 1px solid #d9d9d9;">
                                                            </th>
                                                            <th class="text-uppercase text-center negros text-xxs font-weight-bolder"
                                                                style="padding: 1px 3px;border-top: 1px solid #d9d9d9;">
                                                                <span v-if="numQuimestre==0">PRIMER QUIMESTRE</span>
                                                                <span v-else>SEGUNDO QUIMESTRE</span>
                                                            </th>
                                                            <th style="padding: 1px 3px;border-top: 1px solid #d9d9d9;">
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                style="padding: 1px 3px;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);">
                                                            </th>
                                                            <th style="padding: 1px 3px;"></th>
                                                            <th style="padding: 1px 3px;"
                                                                class=" text-center negros text-xxs font-weight-bolder">
                                                                Evaluaciones formativas 80%
                                                            </th>
                                                            <th style="padding: 1px 3px;"
                                                                class=" text-center negros text-xxs font-weight-bolder">
                                                                SUM 20%
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th style="padding: 1px 3px;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);"
                                                                class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                                ASIGNATURAS
                                                            </th>
                                                            <th style="padding: 1px 3px;"
                                                                class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                                PARCIAL 1
                                                            </th>
                                                            <th style="padding: 1px 3px;"
                                                                class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                                PARCIAL 2
                                                            </th>
                                                            <th style="padding: 1px 3px;"
                                                                class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                                                RESULTADOS
                                                            </th>
                                                        </tr>
                                                        <tr>
                                                            <th
                                                                style="padding: 1px 3px;border-right: 1px solid rgb(223 227 235);">
                                                            </th>
                                                            <th style="padding: 1px 3px;"
                                                                class="text-uppercase text-center negros text-xxs font-weight-bolder">
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
                                                            <th style="padding: 1px 3px;"
                                                                class="text-uppercase text-center negros text-xxs font-weight-bolder">
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
                                                            <th style="padding: 1px 3px;"
                                                                class="text-uppercase text-center negros text-xxs font-weight-bolder">
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
                                                            <td style="padding: 1px 3px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                                                class="mb-0 text-start ms-3 text-xxs negros fuente">
                                                                {{ite.materia}}</td>
                                                            <td style="padding: 1px 3px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                                                class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                                <div class="row negros" v-if="parcial">
                                                                    <div class="col">{{ite.notas[numQuimestre].a1}}
                                                                    </div>
                                                                    <div class="col">{{ite.notas[numQuimestre].a2}}
                                                                    </div>
                                                                    <div class="col">{{ite.notas[numQuimestre].a3}}
                                                                    </div>
                                                                    <div class="col">{{ite.notas[numQuimestre].a4}}
                                                                    </div>
                                                                    <div class="col">{{ite.notas[numQuimestre].a5}}
                                                                    </div>
                                                                    <div class="col">
                                                                        {{prom1=calcularPromedio(ite.notas[numQuimestre].a1,ite.notas[numQuimestre].a2,ite.notas[numQuimestre].a3,ite.notas[numQuimestre].a4,ite.notas[numQuimestre].a5)}}
                                                                    </div>
                                                                    <div class="col font-weight-bolder">
                                                                        {{equi1=calcularEquivalente(ite.notas[numQuimestre].a1,ite.notas[numQuimestre].a2,ite.notas[numQuimestre].a3,ite.notas[numQuimestre].a4,ite.notas[numQuimestre].a5)}}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td style="padding: 1px 3px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                                                class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                                <div class="row negros" v-if="parcial2">
                                                                    <div class="col">{{ite.notas[numQuimestre].b1}}
                                                                    </div>
                                                                    <div class="col">{{ite.notas[numQuimestre].b2}}
                                                                    </div>
                                                                    <div class="col">{{ite.notas[numQuimestre].b3}}
                                                                    </div>
                                                                    <div class="col">{{ite.notas[numQuimestre].b4}}
                                                                    </div>
                                                                    <div class="col">{{ite.notas[numQuimestre].b5}}
                                                                    </div>
                                                                    <div class="col">
                                                                        {{prom2=calcularPromedio(ite.notas[numQuimestre].b1,ite.notas[numQuimestre].b2,ite.notas[numQuimestre].b3,ite.notas[numQuimestre].b4,ite.notas[numQuimestre].b5)}}
                                                                    </div>
                                                                    <div class="col font-weight-bolder">
                                                                        {{equi2=calcularEquivalente(ite.notas[numQuimestre].b1,ite.notas[numQuimestre].b2,ite.notas[numQuimestre].b3,ite.notas[numQuimestre].b4,ite.notas[numQuimestre].b5)}}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td style="padding: 1px 3px;border-bottom-width: 0px;"
                                                                class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                                <div class="row negros" v-if="parcial && parcial2">
                                                                    <div class="col font-weight-bolder">
                                                                        {{equi80=calcularPromedio80(equi1, equi2)}}
                                                                    </div>
                                                                    <div class="col">{{ite.notas[numQuimestre].examen}}</div>
                                                                    <div class="col font-weight-bolder">
                                                                        {{equi20=calcularEquivalenteExamen(ite.notas[numQuimestre].examen)}}
                                                                    </div>
                                                                    <div class="col font-weight-bolder">
                                                                        {{total=calcularPromedioTotal(equi80,equi20 )}}
                                                                    </div>
                                                                    <div class="col">{{totalesLetras(total)}}</div>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding: 1px 3px;border-top: 1px solid rgb(223 227 235);"
                                                                class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                                PROYECTOS ESCOLARES</td>
                                                            <td style="padding: 1px 3px;border-top: 1px solid rgb(223 227 235);"
                                                                class="mb-0 ms-3 text-start text-xxs negros "><span v-if="parcial">EX</span></td>
                                                            <td style="padding: 1px 3px;border-top: 1px solid rgb(223 227 235);"
                                                                class="mb-0 ms-3 text-start text-xxs negros" ><span v-if="parcial2">EX</span> </td>
                                                            <td style="padding: 1px 3px;border-top: 1px solid rgb(223 227 235);"
                                                                class="mb-0 ms-3 text-start text-xxs negros fuente" >
                                                                <span v-if="parcial && parcial2">EX</span>
                                                            </td>
                                                        </tr>
                                                        <tr >
                                                            <td style="padding: 1px 3px;"
                                                                class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                                COMPORTAMIENTO </td>
                                                            <td style="padding: 1px 3px;"
                                                                class="mb-0 ms-3 text-start text-xxs negros fuente"> <span v-if="parcial">A</span> </td>
                                                            <td style="padding: 1px 3px;" 
                                                                class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                                <span v-if="parcial2">A</span>
                                                            </td>
                                                            <td style="padding: 1px 3px;" 
                                                                class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                                <span v-if="parcial && parcial2">AA</span>
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
                                                                <b>Informe de Aprendizaje: Art. 209 numeral 1, 2
                                                                    R/LOEI</b>
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
                                                                <b>Escala de Calificaciones Art. 194, reformado, Decreto
                                                                    presidencial No. 366-13 (Art.9)</b>
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
                                                            <td style="border-bottom-width: 0px;"
                                                                class="mb-0 ms-3 text-start text-xxs negros fuente">
                                                                <b>Evaluación Comportamiento: Art. 222- R/LOEI para sana
                                                                    convivencia social</b>
                                                                <div class="row">
                                                                    <div style="width: 160px;" class="col-sm-6">
                                                                        A = Muy Satisfactorio <br>
                                                                        B = Satisfactorio <br>
                                                                        C = Poco Satisfactorio <br>
                                                                        D = Mejorable <br>
                                                                        E = Insatisfactorio
                                                                    </div>
                                                                    <div class="col-sm-6">
                                                                        Lidera el cumplimiento compromisos establecidos
                                                                        <br>
                                                                        Cumple con los compromisos establecidos <br>
                                                                        Falla ocasionalmente compromisos establecidos
                                                                        <br>
                                                                        Falla reiteradamente los compromisos
                                                                        establecidos <br>
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
                                    </div><br>
                                </div>
                            </div>
                        </div>
                        <div style="page-break-before:always;"></div>
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
        parcial :   Boolean,
        parcial2    : Boolean
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
            equi1: 0,
            equi2: 0,
            equi80: 0,
            equi20: 0,
            total: 0
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
        calcularPromedio: function (a, b, c, d, e) {
            let a1 = parseFloat(a),
                a2 = parseFloat(b),
                a3 = parseFloat(c),
                a4 = parseFloat(d),
                a5 = parseFloat(e);
            let suma = 0;
            let aux = 0;
            if (a1 != "" && a2 != "" && a3 != "" && a4 != "" && a5 != "") {
                suma = a1 + a2 + a3 + a4 + a5;
                aux = 5;
            }
            if (a1 != "" && a2 != "" && a3 != "" && a4 != "" && isNaN(a5)) {
                suma = a1 + a2 + a3 + a4;
                aux = 4;
            }
            if (a1 != "" && a2 != "" && a3 != "" && isNaN(a4) && isNaN(a5)) {
                suma = a1 + a2 + a3;
                aux = 3;
            }
            if (a1 != "" && a2 != "" && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
                suma = a1 + a2;
                aux = 2;
            }
            if (a1 != "" && isNaN(a2) && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
                suma = a1;
                aux = 1;
            }
            let promedio001 = (suma / aux).toFixed(2);

            return promedio001;
        },
        calcularEquivalente: function (a, b, c, d, e) {
            let a1 = parseFloat(a),
                a2 = parseFloat(b),
                a3 = parseFloat(c),
                a4 = parseFloat(d),
                a5 = parseFloat(e);
            let suma = 0;
            let aux = 0;
            if (a1 != "" && a2 != "" && a3 != "" && a4 != "" && a5 != "") {
                suma = a1 + a2 + a3 + a4 + a5;
                aux = 5;
            }
            if (a1 != "" && a2 != "" && a3 != "" && a4 != "" && isNaN(a5)) {
                suma = a1 + a2 + a3 + a4;
                aux = 4;
            }
            if (a1 != "" && a2 != "" && a3 != "" && isNaN(a4) && isNaN(a5)) {
                suma = a1 + a2 + a3;
                aux = 3;
            }
            if (a1 != "" && a2 != "" && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
                suma = a1 + a2;
                aux = 2;
            }
            if (a1 != "" && isNaN(a2) && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
                suma = a1;
                aux = 1;
            }
            let promedio001 = (suma / aux).toFixed(2);
            let eq = (promedio001 * 8) / 10;
            return eq.toFixed(2);
        },
        calcularPromedio80: function (a, b,) {


            let suma = parseFloat(a) + parseFloat(b)
            let prom = suma / 2;
            return prom.toFixed(2);
        },
        calcularPromedioTotal: function (a, b,) {
            let suma = parseFloat(a) + parseFloat(b)
            return suma.toFixed(2);
        },
        calcularEquivalenteExamen: function (a) {
            let examen = parseFloat(a);
            let eq = (examen * 2) / 10;
            return eq.toFixed(2);
        },
        totalesLetras(total) {
            let num = parseFloat(total);
            let result = ''
            if (num <= 10 && num >= 9) {
                result = 'DA'
            } else if (num <= 8.99 && num >= 7) {
                result = 'AA'
            } else if (num <= 6.99 && num >= 4.01) {
                result = 'PA'
            } else if (num <= 4 && num >= 1) {
                result = 'NA'
            } else {
                result = 'NA'
            }
            return result;
        },
        Comportamiento(total){
            let num = parseFloat(total);
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
                result = 'E'
            }
            return result;
        }
    },
    mounted() {
        this.initialSetup()
        this.__calcularfechaActual()
    }
}
</script>
  