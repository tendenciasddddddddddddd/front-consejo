<template>
    <div>
        <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
            :paginate-elements-by-height="1400" :filename="data.nivel+'-'+data.paralelo+'-'+data.materia" :pdf-quality="2"
            :manual-pagination="false" pdf-format="a4" :pdf-margin="10" pdf-orientation="landscape"
            pdf-content-width="1128px" @progress="onProgress($event)" ref="html2Pdf">
            <section slot="pdf-content">
            <section class="p-2">
                <div class="row">
                       <div class="col-lg-11 col-12 mx-auto">
                        <div class="d-flex justify-content-between">
                    <div><img class="mt-2 ms-3 w-50 " src="../../../assets/img/ecuador.png" alt="Logo" /></div>
                    <div class="text-center">
                        <span class="h6 negros">
                            UNIDAD EDUCATIVA DEL MILENIO "ALFONSO HERRERA"
                        </span><br>
                        <p class="text-xs text-center negros">
                            REPORTE DE COMPORTAMIENTO
                        </p>
                        <span class="negros text-xs"><b>Año Lectivo: </b>2021-2022 &nbsp; {{data.nivel}} -
                            {{data.paralelo}}</span> <span class="negros text-xs">{{data.materia}}</span>
                    </div>
                    <div class="text-end"><img class="mt-2 w-25 me-3" src="../../../assets/img/alfonso/alfonso.jpg"
                            alt="Logo" /></div>
                </div>
                <table class="dataTable-table table s-table-flush "
                        style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                        <thead>
                            <tr>
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;border-right: 1px solid rgb(223 227 235);"
                                class="text-uppercase text-start negros text-xxs font-weight-bolder"> Estudiantes
                                </th>
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                 p1</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                 eq</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                 p2</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                 eq</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: rgb(234 235 239);" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                 qui1</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: rgb(234 235 239);" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                 eq</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                 p1</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                 eq</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                 p2</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                 eq</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: rgb(234 235 239);" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    qui2</th>
                                 <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: rgb(234 235 239);" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    eq</th>
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: #dbdde4;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                    pf</th>
                                <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: #dbdde4;" class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                   eq</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in info" :key="item.id">
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 text-start ms-3 text-xs negros fuente">{{item.nombres}}</td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xs negros fuente">
                                    {{item.p1}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xs negros fuente">
                                    {{item.eq1}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xs negros fuente">
                                    {{item.p2}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xs negros fuente">
                                    {{item.eq2}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: rgb(234 235 239);"
                                    class="mb-0 ms-3 text-center text-xs negros fuente font-weight-bolder">
                                    {{item.prom1}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: rgb(234 235 239);"
                                    class="mb-0 ms-3 text-center text-xs negros fuente font-weight-bolder">
                                    {{item.prom1_eq}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xs negros fuente">
                                    {{item.p3}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xs negros fuente">
                                    {{item.eq3}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xs negros fuente">
                                    {{item.p4}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                    class="mb-0 ms-3 text-center text-xs negros fuente">
                                    {{item.eq4}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: rgb(234 235 239);"
                                    class="mb-0 ms-3 text-center text-xs negros fuente font-weight-bolder">
                                    {{item.prom2}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: rgb(234 235 239);"
                                    class="mb-0 ms-3 text-center text-xs negros fuente font-weight-bolder">
                                    {{item.prom2_eq}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: #dbdde4;"
                                    class="mb-0 ms-3 text-center text-xs negros fuente font-weight-bolder">
                                    {{item.total}}
                                </td>
                                <td style="padding: 4px 5px;border-bottom-width: 0px;background: #dbdde4;"
                                    class="mb-0 ms-3 text-center text-xs negros fuente font-weight-bolder">
                                    {{item.total_eq}}
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
        </section>
        </vue-html2pdf>
    </div>
</template>
<script>

import VueHtml2pdf from "vue-html2pdf";
export default {
    name: 'AddNota',
    components: { VueHtml2pdf},
    props: {
        rowData: Array
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
            this.data = JSON.parse(localStorage.getItem("myCourse"));
            if (this.rowData.length > 0) {
                for (let i = 0; i < this.rowData.length; i++) {
                    const element = this.rowData[i];
                    let p1 = element.p1;
                    let eq1 = this.equality(p1);
                    let p2 = element.p2;
                    let eq2 = this.equality(p2);
                    let prom1 = ((parseFloat(p1) + parseFloat(p2)) / 2).toFixed(2);
                    let prom1_eq = this.equality(prom1);
                    let p3 = element.p3;
                    let eq3 = this.equality(p3);
                    let p4 = element.p4;
                    let eq4 = this.equality(p4);
                    let prom2 = ((parseFloat(p3) + parseFloat(p4)) / 2).toFixed(2);
                    let prom2_eq = this.equality(prom2);
                    let total = ((parseFloat(prom1) + parseFloat(prom2)) / 2).toFixed(2);
                    let total_eq = this.equality(total);
                    this.info.push({
                        nombres: element.nombres,
                        p1: p1,
                        eq1: eq1,
                        p2: p2,
                        eq2: eq2,
                        prom1: prom1,
                        prom1_eq : prom1_eq,
                        p3: p3,
                        eq3: eq3,
                        p4: p4,
                        eq4: eq4,
                        prom2: prom2,
                        prom2_eq : prom2_eq,
                        total: total,
                        total_eq : total_eq,
                    })
                }
            }
        },
        equality(res) {
            let num = parseFloat(res)
            var result = ''
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
        setTimeout(() => this.generatePDF(), 1000);
    },

}
</script>
