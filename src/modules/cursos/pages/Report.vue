<template>
    <div>
        <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
            :paginate-elements-by-height="1400" :filename="data.nivel+'-'+data.paralelo+'-'+data.materia"
            :pdf-quality="1.5" :manual-pagination="true" pdf-format="a4" :pdf-margin="0" pdf-orientation="landscape"
            pdf-content-width="1128px" @progress="onProgress($event)" ref="html2Pdf">
            <section slot="pdf-content">
                <section class="mt-sm-4 mx-md-3 ">
                    <div class="card-header">
                       <div class="py-3 px-3">
                        <div class="d-flex justify-content-between">
                        <div><img class="mt-2 ms-3 w-50 " src="../../../assets/img/ecuador.png" alt="Logo" /></div>
                        <div class="text-center">
                            <span class="h6 negros">
                                UNIDAD EDUCATIVA "CARLOS ROMO DAVILA"
                            </span><br>
                            <p class="text-xs text-center negros">
                                REPORTE DE NOTAS
                            </p>
                            <span class="negros text-sm"><b>Año Lectivo: </b>2021-2022 &nbsp; {{data.nivel}} -
                                {{data.paralelo}}</span>
                        </div>
                        <div class="text-end"><img class="mt-2 w-25 me-3" src="../../../assets/img/cuba/logo.webp"
                                alt="Logo" /></div>
                    </div>
                    <table class="dataTable-table table s-table-flush "
                        style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                        <thead>
                            <tr>
                                <th
                                    style="padding: 4px 5px;border-top: 1px solid #d9d9d9;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);">
                                </th>
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"></th>
                                <th class="text-uppercase text-start negros text-xxs font-weight-bolder"
                                    style="padding: 4px 5px;border-top: 1px solid #d9d9d9;">
                                    {{data.materia}}
                                </th>
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"></th>
                            </tr>

                            <tr>
                                <th style="padding: 4px 5px;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    LISTADO DE ESTUDIANTES
                                </th>
                                <th class="text-uppercase text-center negros text-xxs font-weight-bolder"
                                    style="padding: 4px 5px;">PRIMER QUIMESTRE</th>
                                <th style="padding: 4px 5px;"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    SEGUNDO QUIMESTRE
                                </th>
                                <th style="padding: 4px 5px;"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    TOTAL
                                </th>
                            </tr>
                            <tr>
                                <th style="padding: 4px 5px;border-right: 1px solid rgb(223 227 235);"></th>
                                <th style="padding: 4px 5px;"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    <div class="row">
                                        <div class="col">p1</div>
                                        <div class="col">p2</div>
                                        <div class="col">pro</div>
                                        <div class="col">pro(80%)</div>
                                        <div class="col">exa</div>
                                        <div class="col">exa(20%)</div>
                                        <div class="col">qui</div>
                                    </div>
                                </th>
                                <th style="padding: 4px 5px;"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    <div class="row">
                                        <div class="col">p1</div>
                                        <div class="col">p2</div>
                                        <div class="col">pro</div>
                                        <div class="col">pro(80%)</div>
                                        <div class="col">exa</div>
                                        <div class="col">exa(20%)</div>
                                        <div class="col">qui</div>
                                    </div>
                                </th>
                                <th style="padding: 4px 5px;"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    <div class="row">
                                        <div class="col">pa</div>
                                        <div class="col">eq</div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item) in info.slice(0,15)" :key="item.id">
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 text-start ms-3 text-xxs negros fuente">{{item.nombres}}</td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-start text-xxs negros fuente">
                                    <div class="row negros">
                                        <div class="col">{{item.p1}}</div>
                                        <div class="col">{{item.p2}}</div>
                                        <div class="col">{{item.prom1}}</div>
                                        <div class="col">{{item.prom1_80}}</div>
                                        <div class="col">{{item.exam1}}</div>
                                        <div class="col">{{item.exam1_20}}</div>
                                        <div class="col font-weight-bolder">{{item.promedio_final1}}</div>
                                    </div>
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-start text-xxs negros fuente">
                                    <div class="row negros">
                                        <div class="col">{{item.p3}}</div>
                                        <div class="col">{{item.p4}}</div>
                                        <div class="col">{{item.prom2}}</div>
                                        <div class="col">{{item.prom2_80}}</div>
                                        <div class="col">{{item.exam2}}</div>
                                        <div class="col">{{item.exam2_20}}</div>
                                        <div class="col font-weight-bolder">{{item.promedio_final2}}</div>
                                    </div>
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;"
                                    class="mb-0 ms-3 text-start text-xxs negros fuente">
                                    <div class="row negros">
                                        <div class="col font-weight-bolder">{{item.promedioAnual}}</div>
                                        <div class="col">{{item.eq}}</div>
                                    </div>
                                </td>
                                
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-around mt-6">
                        <div class="text-center">
                            <span class="h6 pb-0">
                                <b>__________________________________</b>
                            </span> <br>
                            <span class="negros text-sm"><b>RECTOR/A</b></span>
                        </div>
                        <div>
                            <div class="text-center">
                                <span class="h6 pb-0">
                                    <b>__________________________________</b>
                                </span> <br>
                                <span class="negros text-sm"><b>DOCENTE TUTOR</b></span>
                            </div>
                        </div>
                    </div>
                       </div>
                    </div>
                </section>
                <div v-if="info.length >= 16" style="page-break-before:always;"></div>
                <section v-if="info.length >= 16">
                    <div class="mt-sm-4 mx-md-3">
                        <div class="py-3 px-3">
                            <div class="card-header ">
                        <div class="d-flex justify-content-between">
                        <div><img class="mt-2 ms-3 w-50 " src="../../../assets/img/ecuador.png" alt="Logo" /></div>
                        <div class="text-center">
                            <span class="h6 negros">
                                UNIDAD EDUCATIVA "CARLOS ROMO DAVILA"
                            </span><br>
                            <p class="text-xs text-center negros">
                                REPORTE DE NOTAS
                            </p>
                            <span class="negros text-sm"><b>Año Lectivo: </b>2021-2022 &nbsp; {{data.nivel}} -
                                {{data.paralelo}}</span>
                        </div>
                        <div class="text-end"><img class="mt-2 w-25 me-3" src="../../../assets/img/cuba/logo.webp"
                                alt="Logo" /></div>
                    </div>
                    <table class="dataTable-table table s-table-flush "
                        style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                        <thead>
                            <tr>
                                <th
                                    style="padding: 4px 5px;border-top: 1px solid #d9d9d9;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);">
                                </th>
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"></th>
                                <th class="text-uppercase text-start negros text-xxs font-weight-bolder"
                                    style="padding: 4px 5px;border-top: 1px solid #d9d9d9;">
                                    {{data.materia}}
                                </th>
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"></th>
                            </tr>

                            <tr>
                                <th style="padding: 4px 5px;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    LISTADO DE ESTUDIANTES
                                </th>
                                <th class="text-uppercase text-center negros text-xxs font-weight-bolder"
                                    style="padding: 4px 5px;">PRIMER QUIMESTRE</th>
                                <th style="padding: 4px 5px;"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    SEGUNDO QUIMESTRE
                                </th>
                                <th style="padding: 4px 5px;"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    TOTAL
                                </th>
                            </tr>
                            <tr>
                                <th style="padding: 4px 5px;border-right: 1px solid rgb(223 227 235);"></th>
                                <th style="padding: 4px 5px;"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    <div class="row">
                                        <div class="col">p1</div>
                                        <div class="col">p2</div>
                                        <div class="col">pro</div>
                                        <div class="col">pro(80%)</div>
                                        <div class="col">exa</div>
                                        <div class="col">exa(20%)</div>
                                        <div class="col">qui</div>
                                    </div>
                                </th>
                                <th style="padding: 4px 5px;"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    <div class="row">
                                        <div class="col">p1</div>
                                        <div class="col">p2</div>
                                        <div class="col">pro</div>
                                        <div class="col">pro(80%)</div>
                                        <div class="col">exa</div>
                                        <div class="col">exa(20%)</div>
                                        <div class="col">qui</div>
                                    </div>
                                </th>
                                <th style="padding: 4px 5px;"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    <div class="row">
                                        <div class="col">pa</div>
                                        <div class="col">eq</div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item) in info.slice(15,30)" :key="item.id">
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 text-start ms-3 text-xxs negros fuente">{{item.nombres}}</td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-start text-xxs negros fuente">
                                    <div class="row negros">
                                        <div class="col">{{item.p1}}</div>
                                        <div class="col">{{item.p2}}</div>
                                        <div class="col">{{item.prom1}}</div>
                                        <div class="col">{{item.prom1_80}}</div>
                                        <div class="col">{{item.exam1}}</div>
                                        <div class="col">{{item.exam1_20}}</div>
                                        <div class="col font-weight-bolder">{{item.promedio_final1}}</div>
                                    </div>
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-start text-xxs negros fuente">
                                    <div class="row negros">
                                        <div class="col">{{item.p3}}</div>
                                        <div class="col">{{item.p4}}</div>
                                        <div class="col">{{item.prom2}}</div>
                                        <div class="col">{{item.prom2_80}}</div>
                                        <div class="col">{{item.exam2}}</div>
                                        <div class="col">{{item.exam2_20}}</div>
                                        <div class="col font-weight-bolder">{{item.promedio_final2}}</div>
                                    </div>
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;"
                                    class="mb-0 ms-3 text-start text-xxs negros fuente">
                                    <div class="row negros">
                                        <div class="col font-weight-bolder">{{item.promedioAnual}}</div>
                                        <div class="col">{{item.eq}}</div>
                                    </div>
                                </td>
                                
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-around mt-6">
                        <div class="text-center">
                            <span class="h6 pb-0">
                                <b>__________________________________</b>
                            </span> <br>
                            <span class="negros text-sm"><b>RECTOR/A</b></span>
                        </div>
                        <div>
                            <div class="text-center">
                                <span class="h6 pb-0">
                                    <b>__________________________________</b>
                                </span> <br>
                                <span class="negros text-sm"><b>DOCENTE TUTOR</b></span>
                            </div>
                        </div>
                    </div>
                       </div>
                        </div>
                       
                    </div>
                </section>
                <div v-if="info.length >= 31" style="page-break-before:always;"></div>
                <section v-if="info.length >= 31">
                    <div class="mt-sm-4 mx-md-3">
                        <div class="py-3 px-3">
                            <div class="card-header ">
                        <div class="d-flex justify-content-between">
                        <div><img class="mt-2 ms-3 w-50 " src="../../../assets/img/ecuador.png" alt="Logo" /></div>
                        <div class="text-center">
                            <span class="h6 negros">
                                UNIDAD EDUCATIVA "CARLOS ROMO DAVILA"
                            </span><br>
                            <p class="text-xs text-center negros">
                                REPORTE DE NOTAS
                            </p>
                            <span class="negros text-sm"><b>Año Lectivo: </b>2021-2022 &nbsp; {{data.nivel}} -
                                {{data.paralelo}}</span>
                        </div>
                        <div class="text-end"><img class="mt-2 w-25 me-3" src="../../../assets/img/cuba/logo.webp"
                                alt="Logo" /></div>
                    </div>
                    <table class="dataTable-table table s-table-flush "
                        style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                        <thead>
                            <tr>
                                <th
                                    style="padding: 4px 5px;border-top: 1px solid #d9d9d9;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);">
                                </th>
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"></th>
                                <th class="text-uppercase text-start negros text-xxs font-weight-bolder"
                                    style="padding: 4px 5px;border-top: 1px solid #d9d9d9;">
                                    {{data.materia}}
                                </th>
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"></th>
                            </tr>

                            <tr>
                                <th style="padding: 4px 5px;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    LISTADO DE ESTUDIANTES
                                </th>
                                <th class="text-uppercase text-center negros text-xxs font-weight-bolder"
                                    style="padding: 4px 5px;">PRIMER QUIMESTRE</th>
                                <th style="padding: 4px 5px;"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    SEGUNDO QUIMESTRE
                                </th>
                                <th style="padding: 4px 5px;"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    TOTAL
                                </th>
                            </tr>
                            <tr>
                                <th style="padding: 4px 5px;border-right: 1px solid rgb(223 227 235);"></th>
                                <th style="padding: 4px 5px;"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    <div class="row">
                                        <div class="col">p1</div>
                                        <div class="col">p2</div>
                                        <div class="col">pro</div>
                                        <div class="col">pro(80%)</div>
                                        <div class="col">exa</div>
                                        <div class="col">exa(20%)</div>
                                        <div class="col">qui</div>
                                    </div>
                                </th>
                                <th style="padding: 4px 5px;"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    <div class="row">
                                        <div class="col">p1</div>
                                        <div class="col">p2</div>
                                        <div class="col">pro</div>
                                        <div class="col">pro(80%)</div>
                                        <div class="col">exa</div>
                                        <div class="col">exa(20%)</div>
                                        <div class="col">qui</div>
                                    </div>
                                </th>
                                <th style="padding: 4px 5px;"
                                    class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    <div class="row">
                                        <div class="col">pa</div>
                                        <div class="col">eq</div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item) in info.slice(30,45)" :key="item.id">
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 text-start ms-3 text-xxs negros fuente">{{item.nombres}}</td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-start text-xxs negros fuente">
                                    <div class="row negros">
                                        <div class="col">{{item.p1}}</div>
                                        <div class="col">{{item.p2}}</div>
                                        <div class="col">{{item.prom1}}</div>
                                        <div class="col">{{item.prom1_80}}</div>
                                        <div class="col">{{item.exam1}}</div>
                                        <div class="col">{{item.exam1_20}}</div>
                                        <div class="col font-weight-bolder">{{item.promedio_final1}}</div>
                                    </div>
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-start text-xxs negros fuente">
                                    <div class="row negros">
                                        <div class="col">{{item.p3}}</div>
                                        <div class="col">{{item.p4}}</div>
                                        <div class="col">{{item.prom2}}</div>
                                        <div class="col">{{item.prom2_80}}</div>
                                        <div class="col">{{item.exam2}}</div>
                                        <div class="col">{{item.exam2_20}}</div>
                                        <div class="col font-weight-bolder">{{item.promedio_final2}}</div>
                                    </div>
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;"
                                    class="mb-0 ms-3 text-start text-xxs negros fuente">
                                    <div class="row negros">
                                        <div class="col font-weight-bolder">{{item.promedioAnual}}</div>
                                        <div class="col">{{item.eq}}</div>
                                    </div>
                                </td>
                                
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-around mt-6">
                        <div class="text-center">
                            <span class="h6 pb-0">
                                <b>__________________________________</b>
                            </span> <br>
                            <span class="negros text-sm"><b>RECTOR/A</b></span>
                        </div>
                        <div>
                            <div class="text-center">
                                <span class="h6 pb-0">
                                    <b>__________________________________</b>
                                </span> <br>
                                <span class="negros text-sm"><b>DOCENTE TUTOR</b></span>
                            </div>
                        </div>
                    </div>
                       </div>
                        </div>
                       
                    </div>
                </section>
            </section>
        </vue-html2pdf>
    </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
export default {
    name: 'AddNota',
    components: { VueHtml2pdf },
    props: {
        rowData: Array //v-if="info.length >= 16"
    },
    data() {
        return {
            isprint: false,
            statusbar: "",
            data: '',
            info: [],
        }
    },
    watch: {
        statusbar: function (value) {
            this.$emit("changeStatus", value);
        }
    },
    methods: {
        initiaSetap() {
            try {
                this.data = JSON.parse(localStorage.getItem("myCourse"));
                if (this.rowData.length > 0) {
                    for (let i = 0; i < this.rowData.length; i++) {
                        const element = this.rowData[i];
                        let p1 = this.promedioP1(element);
                        let p2 = this.promedioP2(element);
                        let prom1 = ((parseFloat(p1) + parseFloat(p2)) / 2).toFixed(2);
                        let prom1_80 = ((prom1 * 8) / 10).toFixed(2);
                        let exam1 = element.examenfinal;
                        let exam1_20 = ((parseFloat(exam1) * 2) / 10).toFixed(2);
                        let promedio_final1 = (parseFloat(prom1_80) + parseFloat(exam1_20)).toFixed(2);
                        let p3 = this.promedioP3(element);
                        let p4 = this.promedioP4(element);
                        let prom2 = ((parseFloat(p3) + parseFloat(p4)) / 2).toFixed(2);
                        let prom2_80 = ((prom2 * 8) / 10).toFixed(2);
                        let exam2 = element.examenfinal2;
                        let exam2_20 = ((parseFloat(exam2) * 2) / 10).toFixed(2);
                        let promedio_final2 = (parseFloat(prom2_80) + parseFloat(exam2_20)).toFixed(2);
                        let promedioAnual = ((parseFloat(promedio_final1) + parseFloat(promedio_final2)) / 2).toFixed(2);
                        let eq = this.parcilaValue1(promedioAnual)
                        this.info.push({
                            nombres: element.nombres,
                            p1: p1,
                            p2: p2,
                            prom1: prom1,
                            prom1_80: prom1_80,
                            exam1: exam1,
                            exam1_20: exam1_20,
                            promedio_final1: promedio_final1,
                            p3: p3,
                            p4: p4,
                            prom2: prom2,
                            prom2_80: prom2_80,
                            exam2: exam2,
                            exam2_20: exam2_20,
                            promedio_final2: promedio_final2,
                            promedioAnual: promedioAnual,
                            eq: eq,
                        })
                    }
                }
            } catch (error) {
                console.log(error);
            }

        },
        promedioP1(array) {
            let a1 = parseFloat(array.a1), a2 = parseFloat(array.a2), a3 = parseFloat(array.a3), a4 = parseFloat(array.a4), a5 = parseFloat(array.a5)
            let suma = 0;
              let prom = 0;
              let aux = 0;
              if(a1!=''&&a2!=''&&a3!=''&&a4!=''&&a5!=''){
                suma = a1 + a2 + a3 + a4 + a5; aux =5
              } if (a1!=''&&a2!=''&&a3!=''&&a4!=''&&isNaN(a5)){
                suma = a1 + a2 + a3 + a4; aux =4
              } if (a1!=''&&a2!=''&&a3!=''&&isNaN(a4)&&isNaN(a5)){
                suma = a1 + a2 + a3 ; aux =3
              } if (a1!=''&&a2!=''&&isNaN(a3)&&isNaN(a4)&&isNaN(a5)){
                suma = a1 + a2  ; aux =2
              } if (a1!=''&&isNaN(a2)&&isNaN(a3)&&isNaN(a4)&&isNaN(a5)){
                suma = a1; aux =1
              } 
              prom = (suma / aux).toFixed(2);
            return prom;
        },
        promedioP2(array) {
            let a1 = parseFloat(array.b1), a2 = parseFloat(array.b2), a3 = parseFloat(array.b3), a4 = parseFloat(array.b4), a5 = parseFloat(array.b5)
            let suma = 0;
              let prom = 0;
              let aux = 0;
              if(a1!=''&&a2!=''&&a3!=''&&a4!=''&&a5!=''){
                suma = a1 + a2 + a3 + a4 + a5; aux =5
              } if (a1!=''&&a2!=''&&a3!=''&&a4!=''&&isNaN(a5)){
                suma = a1 + a2 + a3 + a4; aux =4
              } if (a1!=''&&a2!=''&&a3!=''&&isNaN(a4)&&isNaN(a5)){
                suma = a1 + a2 + a3 ; aux =3
              } if (a1!=''&&a2!=''&&isNaN(a3)&&isNaN(a4)&&isNaN(a5)){
                suma = a1 + a2  ; aux =2
              } if (a1!=''&&isNaN(a2)&&isNaN(a3)&&isNaN(a4)&&isNaN(a5)){
                suma = a1; aux =1
              } 
              prom = (suma / aux).toFixed(2);
            return prom;
        },
        promedioP3(array) {
            let a1 = parseFloat(array.x1), a2 = parseFloat(array.x2), a3 = parseFloat(array.x3), a4 = parseFloat(array.x4), a5 = parseFloat(array.x5)
            let suma = 0;
              let prom = 0;
              let aux = 0;
              if(a1!=''&&a2!=''&&a3!=''&&a4!=''&&a5!=''){
                suma = a1 + a2 + a3 + a4 + a5; aux =5
              } if (a1!=''&&a2!=''&&a3!=''&&a4!=''&&isNaN(a5)){
                suma = a1 + a2 + a3 + a4; aux =4
              } if (a1!=''&&a2!=''&&a3!=''&&isNaN(a4)&&isNaN(a5)){
                suma = a1 + a2 + a3 ; aux =3
              } if (a1!=''&&a2!=''&&isNaN(a3)&&isNaN(a4)&&isNaN(a5)){
                suma = a1 + a2  ; aux =2
              } if (a1!=''&&isNaN(a2)&&isNaN(a3)&&isNaN(a4)&&isNaN(a5)){
                suma = a1; aux =1
              } 
              prom = (suma / aux).toFixed(2);
            return prom;
        },
        promedioP4(array) {
            let a1 = parseFloat(array.y1), a2 = parseFloat(array.y2), a3 = parseFloat(array.y3), a4 = parseFloat(array.y4), a5 = parseFloat(array.y5)
            let suma = 0;
              let prom = 0;
              let aux = 0;
              if(a1!=''&&a2!=''&&a3!=''&&a4!=''&&a5!=''){
                suma = a1 + a2 + a3 + a4 + a5; aux =5
              } if (a1!=''&&a2!=''&&a3!=''&&a4!=''&&isNaN(a5)){
                suma = a1 + a2 + a3 + a4; aux =4
              } if (a1!=''&&a2!=''&&a3!=''&&isNaN(a4)&&isNaN(a5)){
                suma = a1 + a2 + a3 ; aux =3
              } if (a1!=''&&a2!=''&&isNaN(a3)&&isNaN(a4)&&isNaN(a5)){
                suma = a1 + a2  ; aux =2
              } if (a1!=''&&isNaN(a2)&&isNaN(a3)&&isNaN(a4)&&isNaN(a5)){
                suma = a1; aux =1
              } 
              prom = (suma / aux).toFixed(2);
            return prom;
        },
        parcilaValue1(params) {
            let num = parseFloat(params)
            var result = ''
            if (num <= 10 && num >= 9) {
                result = 'DA'
            } else if (num <= 8.99 && num >= 7) {
                result = 'AA'
            } else if (num <= 6.99 && num >= 4.01) {
                result = 'PA'
            } else if (num <= 4 && num >= 1) {
                result = 'NA'
            } else {
                result = 'NN'
            }
            return result;
        },
        close() {
            this.$emit('EventClosed')
        },
        getData() {
            this.$emit('getData');
        },
        onProgress(event) {
            this.statusbar = event;
        },
        hasGenerated() {
            alert("PDF generated successfully!");
        },
        generatePDF() {
            this.$refs.html2Pdf.generatePdf();
        },
    },
    mounted() {
        this.rowSelection = 'multiple';
        this.initiaSetap()
        setTimeout(() => this.generatePDF(), 2000);
    },
}
</script>
