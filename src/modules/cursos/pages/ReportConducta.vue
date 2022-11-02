<template>
    <div>
        <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="true"
            :paginate-elements-by-height="1400" :filename="data.nivel + '-' + data.paralelo + '-' + data.materia"
            :pdf-quality="1.5" :manual-pagination="false" pdf-format="a4" :pdf-margin="10" pdf-orientation="landscape"
            pdf-content-width="1128px" @progress="onProgress($event)" ref="html2Pdf">
            <section slot="pdf-content">
                <section class="mt-sm-4 mx-md-3">
                    <div class="card-header">
                        <div class="py-3 px-3">
                            <div class="d-flex justify-content-between">
                                <div><img width="150" class="mt-2 ms-3  " src="../../../assets/img/ecuador.jpg" alt="Logo" />
                                </div>
                                <div class="text-center">
                                    <span class="h6 negros">
                                        {{ settings.unidadeducativa }}
                                    </span><br>
                                    <p class="text-xs text-center negros">
                                        REPORTE DE COMPORTAMIENTO
                                    </p>
                                    <span class="negros text-xs"><b>Año Lectivo: </b>2021-2022 &nbsp; {{ data.nivel }} -
                                        {{ data.paralelo }}</span> <span class="negros text-xs">{{ data.materia }}</span>
                                </div>
                                <div class="text-end"><img class="mt-2 w-35 me-3" :src="settings.logo" alt="Logo" />
                                </div>
                            </div>
                            <table class="dataTable-table table s-table-flush "
                                style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                                <thead>
                                    <tr>
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;border-right: 1px solid rgb(223 227 235);"
                                            class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                            Estudiantes
                                        </th>
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Parcial 1</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Parcial 2</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: rgb(234 235 239);"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Quimestre 1</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Parcial 1</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Parcial 2</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: rgb(234 235 239);"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Quimestre 2</th>
                                        
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: #dbdde4;"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Promedio Final</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in info.slice(0, 15)" :key="item.id">
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                            class="mb-0 text-start ms-3 text-xs negros fuente">{{ item.nombres }}</td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                            class="mb-0 ms-3 text-center text-xs negros fuente">
                                            {{ item.p1 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                            class="mb-0 ms-3 text-center text-xs negros fuente">
                                            {{ item.p2 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: rgb(234 235 239);"
                                            class="mb-0 ms-3 text-center text-xs negros fuente font-weight-bolder">
                                            {{ item.prom1 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                            class="mb-0 ms-3 text-center text-xs negros fuente">
                                            {{ item.p3 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                            class="mb-0 ms-3 text-center text-xs negros fuente">
                                            {{ item.p4 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: rgb(234 235 239);"
                                            class="mb-0 ms-3 text-center text-xs negros fuente font-weight-bolder">
                                            {{ item.prom2 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: #dbdde4;"
                                            class="mb-0 ms-3 text-center text-xs negros fuente font-weight-bolder">
                                            {{ item.total }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="d-flex justify-content-around mt-6">
                                <div class="text-center">
                                    <span class="h6 pb-0">
                                        <b>__________________________________</b>
                                    </span> <br>
                                    <p class="negros text-sm">
                                        <b>{{ settings.rector }}</b> <br>
                                        RECTOR/A
                                    </p>
                                </div>
                                <div>
                                    <div class="text-center">
                                        <span class="h6 pb-0">
                                            <b>__________________________________</b>
                                        </span> <br>
                                        <p class="negros text-sm">
                                            <b>{{ nombre }}</b> <br>
                                            DOCENTE
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <div v-if="info.length >= 16" style="page-break-before:always;"></div>
                <section v-if="info.length >= 16" class="mt-sm-4 mx-md-3">
                    <div class="mt-sm-4 mx-md-3">
                        <div class="py-3 px-3">
                            <div class="card-header">
                                <div class="d-flex justify-content-between">
                                    <div><img width="150" class="mt-2 ms-3  " src="../../../assets/img/ecuador.jpg" alt="Logo" />
                                </div>
                                    <div class="text-center">
                                        <span class="h6 negros">
                                            {{ settings.unidadeducativa }}
                                        </span><br>
                                        <p class="text-xs text-center negros">
                                            REPORTE DE COMPORTAMIENTO
                                        </p>
                                        <span class="negros text-xs"><b>Año Lectivo: </b>2021-2022 &nbsp; {{ data.nivel }}
                                            -
                                            {{ data.paralelo }}</span> <span
                                            class="negros text-xs">{{ data.materia }}</span>
                                    </div>
                                    <div class="text-end"><img class="mt-2 w-35 me-3" :src="settings.logo" alt="Logo" />
                                    </div>
                                </div>
                                <table class="dataTable-table table s-table-flush "
                                    style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                                    <thead>
                                        <tr>
                                            <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;border-right: 1px solid rgb(223 227 235);"
                                            class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                            Estudiantes
                                        </th>
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Parcial 1</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Parcial 2</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: rgb(234 235 239);"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Quimestre 1</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Parcial 1</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Parcial 2</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: rgb(234 235 239);"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Quimestre 2</th>
                                        
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: #dbdde4;"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Promedio Final</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in info.slice(15, 30)" :key="item.id">
                                            <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                                class="mb-0 text-start ms-3 text-xs negros fuente">{{ item.nombres }}</td>
                                            <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                                class="mb-0 ms-3 text-center text-xs negros fuente">
                                                {{ item.p1 }}
                                            </td>
                                            <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                                class="mb-0 ms-3 text-center text-xs negros fuente">
                                                {{ item.p2 }}
                                            </td>
                                            <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: rgb(234 235 239);"
                                                class="mb-0 ms-3 text-center text-xs negros fuente font-weight-bolder">
                                                {{ item.prom1 }}
                                            </td>
                                            <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                                class="mb-0 ms-3 text-center text-xs negros fuente">
                                                {{ item.p3 }}
                                            </td>
                                            <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                                class="mb-0 ms-3 text-center text-xs negros fuente">
                                                {{ item.p4 }}
                                            </td>
                                            <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: rgb(234 235 239);"
                                                class="mb-0 ms-3 text-center text-xs negros fuente font-weight-bolder">
                                                {{ item.prom2 }}
                                            </td>
                                            <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: #dbdde4;"
                                                class="mb-0 ms-3 text-center text-xs negros fuente font-weight-bolder">
                                                {{ item.total }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="d-flex justify-content-around mt-6">
                                    <div class="text-center">
                                        <span class="h6 pb-0">
                                            <b>__________________________________</b>
                                        </span> <br>
                                        <p class="negros text-sm">
                                            <b>{{ settings.rector }}</b> <br>
                                            RECTOR/A
                                        </p>
                                    </div>
                                    <div>
                                        <div class="text-center">
                                            <span class="h6 pb-0">
                                                <b>__________________________________</b>
                                            </span> <br>
                                            <p class="negros text-sm">
                                                <b>{{ nombre }}</b> <br>
                                                DOCENTE
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </section>
                <div v-if="info.length >= 31" style="page-break-before:always;"></div>
                <section v-if="info.length >= 31" class="mt-sm-4 mx-md-3">
                    <div class="mt-sm-4 mx-md-3">
                        <div class="py-3 px-3">
                            <div class="card-header">
                                <div class="d-flex justify-content-between">
                                    <div><img width="150" class="mt-2 ms-3  " src="../../../assets/img/ecuador.jpg" alt="Logo" />
                                </div>
                                    <div class="text-center">
                                        <span class="h6 negros">
                                            {{ settings.unidadeducativa }}
                                        </span><br>
                                        <p class="text-xs text-center negros">
                                            REPORTE DE COMPORTAMIENTO
                                        </p>
                                        <span class="negros text-xs"><b>Año Lectivo: </b>2021-2022 &nbsp; {{ data.nivel }}
                                            -
                                            {{ data.paralelo }}</span> <span
                                            class="negros text-xs">{{ data.materia }}</span>
                                    </div>
                                    <div class="text-end"><img class="mt-2 w-35 me-3" :src="settings.logo" alt="Logo" />
                                    </div>
                                </div>
                                <table class="dataTable-table table s-table-flush "
                                    style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;">
                                    <thead>
                                        <tr>
                                            <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;border-right: 1px solid rgb(223 227 235);"
                                            class="text-uppercase text-start negros text-xxs font-weight-bolder">
                                            Estudiantes
                                        </th>
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Parcial 1</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Parcial 2</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: rgb(234 235 239);"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Quimestre 1</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Parcial 1</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Parcial 2</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: rgb(234 235 239);"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Quimestre 2</th>
                                        
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: #dbdde4;"
                                            class="text-uppercase text-center negros text-xxs font-weight-bolder">
                                            Promedio Final</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in info.slice(30, 45)" :key="item.id">
                                            <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                                class="mb-0 text-start ms-3 text-xs negros fuente">{{ item.nombres }}</td>
                                            <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                                class="mb-0 ms-3 text-center text-xs negros fuente">
                                                {{ item.p1 }}
                                            </td>
                                            <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                                class="mb-0 ms-3 text-center text-xs negros fuente">
                                                {{ item.p2 }}
                                            </td>
                                            <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: rgb(234 235 239);"
                                                class="mb-0 ms-3 text-center text-xs negros fuente font-weight-bolder">
                                                {{ item.prom1 }}
                                            </td>
                                            <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                                class="mb-0 ms-3 text-center text-xs negros fuente">
                                                {{ item.p3 }}
                                            </td>
                                            <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);"
                                                class="mb-0 ms-3 text-center text-xs negros fuente">
                                                {{ item.p4 }}
                                            </td>
                                            <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: rgb(234 235 239);"
                                                class="mb-0 ms-3 text-center text-xs negros fuente font-weight-bolder">
                                                {{ item.prom2 }}
                                            </td>
                                            <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: #dbdde4;"
                                                class="mb-0 ms-3 text-center text-xs negros fuente font-weight-bolder">
                                                {{ item.total }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="d-flex justify-content-around mt-6">
                                    <div class="text-center">
                                        <span class="h6 pb-0">
                                            <b>__________________________________</b>
                                        </span> <br>
                                        <p class="negros text-sm">
                                            <b>{{ settings.rector }}</b> <br>
                                            RECTOR/A
                                        </p>
                                    </div>
                                    <div>
                                        <div class="text-center">
                                            <span class="h6 pb-0">
                                                <b>__________________________________</b>
                                            </span> <br>
                                            <p class="negros text-sm">
                                                <b>{{ nombre }}</b> <br>
                                                DOCENTE
                                            </p>
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
        rowData: Array
    },
    data() {
        return {
            isprint: false,
            statusbar: "",
            data: '',
            info: [],
            settings: {},
            nombre: ''
        }
    },
    watch: {
        statusbar: function (value) {
            this.$emit("changeStatus", value);
        }
    },
    methods: {
        inforUsers() {
            const info = JSON.parse(localStorage.getItem('Xf'));
            if (info) this.nombre = info.nombre;
        },
        initiaSetap() {
            this.data = JSON.parse(localStorage.getItem("myCourse"));
            if (this.rowData.length > 0) {
                for (let i = 0; i < this.rowData.length; i++) {
                    const element = this.rowData[i];
                    let p1 = element.p1;
                    let p2 = element.p2;
                    let prom1 = this.calcularLetra(p1, p2);
                    let p3 = element.p3;
                    let p4 = element.p4;
                    let prom2 = this.calcularLetra(p3, p4);
                    let total = this.calcularLetra(prom1, prom2);
                    this.info.push({
                        nombres: element.nombres,
                        p1: p1,
                        p2: p2,
                        prom1: prom1,
                        p3: p3,
                        p4: p4,
                        prom2: prom2,
                        total: total,
                    })
                }
            }
        },
        calcularLetra(p1, p2) {
            let aux = 0;
            let aux2 = 0;
            switch (p1) {
                case "A": aux = 5;
                    break;
                case "B": aux = 4;
                    break;
                case "C": aux = 3;
                    break;
                case "D": aux = 2;
                    break;
                case "E": aux = 1;
                    break;
                default:
                    break;
            }
            switch (p2) {
                case "A": aux2 = 5;
                    break;
                case "B": aux2 = 4;
                    break;
                case "C": aux2 = 3;
                    break;
                case "D": aux2 = 2;
                    break;
                case "E": aux2 = 1;
                    break;
                default:
                    break;
            }
            var result = parseInt((aux + aux2) / 2)
            var letra = 'E'
            switch (result) {
                case 5: letra = 'A';
                    break;
                case 4: letra = 'B';
                    break;
                case 3: letra = 'C';
                    break;
                case 2: letra = 'D';
                    break;
                case 1: letra = 'E';
                    break;
                default:
                    break;
            }
            return `${letra}`;
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
        initialSetup() {
            this.$proxies._settingProxi.getConfigure()
                .then((x) => {
                    const { rector, logo, unidadeducativa } = x.data[0];
                    this.settings = {
                        rector: rector,
                        unidadeducativa: unidadeducativa,
                        logo: logo
                    }
                    setTimeout(() => this.generatePDF(), 2000);
                }).catch(() => {
                    console.log("Error")
                });
        },
    },
    mounted() {
        this.initiaSetap()
        this.inforUsers()
        this.initialSetup();
    },

}
</script>
