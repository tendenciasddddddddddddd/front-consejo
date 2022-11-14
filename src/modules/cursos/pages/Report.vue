<template>
    <div>
        <section id="box">
            <section style="margin-right: 1rem!important;margin-left: 1rem!important;margin-top: 1.5rem!important;">
                <div style="padding: 1rem;">
                    <div style="padding-top: 1rem!important;padding-bottom: 1rem!important;">
                        <div
                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                            <div style="flex: 0 0 auto;width: 12%;text-align: left!important;">
                                <img style="width: 100%!important;" src="../../../assets/img/ecuador.jpg" alt="Logo" />
                            </div>
                            <div style="flex: 0 0 auto; width: 76%;text-align: center!important;">
                                <span style="color:#000;font-weight: 600;font-size: 1rem;line-height: 1.375;">
                                    {{ settings.unidadeducativa }}
                                </span><br>
                                <p style="font-size: .75rem!important;">
                                    REPORTE DE NOTAS
                                </p>
                                <span style="font-size: .875rem!important;"><b>Año Lectivo: </b>2021-2022 &nbsp;
                                    {{ data.nivel }} -
                                    {{ data.paralelo }}</span>
                            </div>
                            <div style="flex: 0 0 auto; width: 12%;text-align: right!important;"><img
                                    style="width: 50%!important;margin-right: 1rem!important;" :src="settings.logo"
                                    alt="Logo" /></div>
                        </div>
                        <table
                            style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                            <thead>
                                <tr>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);">
                                    </th>
                                    <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"></th>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                        <b> {{ data.materia }}</b>
                                    </th>
                                    <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"></th>
                                </tr>

                                <tr>
                                    <th
                                        style="padding: 4px 5px;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        <b>LISTADO DE ESTUDIANTES</b>
                                    </th>
                                    <th style="padding: 4px 5px;font-size: .65rem!important;"> <b>PRIMER QUIMESTRE</b>
                                    </th>
                                    <th style="padding: 4px 5px;font-size: .65rem!important;">
                                        <b>SEGUNDO QUIMESTRE</b>
                                    </th>
                                    <th style="padding: 4px 5px;font-size: .65rem!important;">
                                        TOTAL
                                    </th>
                                </tr>
                                <tr>
                                    <th
                                        style="padding: 4px 5px;border-right: 1px solid rgb(223 227 235);border-bottom: 1px solid #e9ecef;">
                                    </th>
                                    <th
                                        style="min-width: 130px;padding: 4px 5px;font-weight: 700!important;font-size: .65rem!important;text-transform: uppercase!important;border-bottom: 1px solid #e9ecef;">
                                        <div
                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                            <div style=" flex: 1 0 0%;">p1</div>
                                            <div style=" flex: 1 0 0%;">p2</div>
                                            <div style=" flex: 1 0 0%;">pro</div>
                                            <div style=" flex: 1 0 0%;">(80%)</div>
                                            <div style=" flex: 1 0 0%;">exa</div>
                                            <div style=" flex: 1 0 0%;">(20%)</div>
                                            <div style=" flex: 1 0 0%;">qui</div>
                                        </div>
                                    </th>
                                    <th
                                        style="min-width: 130px;padding: 4px 5px;font-weight: 700!important;font-size: .65rem!important;text-transform: uppercase!important;border-bottom: 1px solid #e9ecef;">
                                        <div
                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                            <div style=" flex: 1 0 0%;">p1</div>
                                            <div style=" flex: 1 0 0%;">p2</div>
                                            <div style=" flex: 1 0 0%;">pro</div>
                                            <div style=" flex: 1 0 0%;">(80%)</div>
                                            <div style=" flex: 1 0 0%;">exa</div>
                                            <div style=" flex: 1 0 0%;">(20%)</div>
                                            <div style=" flex: 1 0 0%;">qui</div>
                                        </div>
                                    </th>
                                    <th
                                        style="padding: 4px 5px;font-weight: 700!important;font-size: .65rem!important;text-transform: uppercase!important;border-bottom: 1px solid #e9ecef;">
                                        <div
                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                            <div style=" flex: 1 0 0%;">pa</div>
                                            <div style=" flex: 1 0 0%;">eq</div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item) in info.slice(0, 20)" :key="item.id">
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        {{ item.nombres }}</td>
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        <div
                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                            <div style=" flex: 1 0 0%;">{{ item.p1 }}</div>
                                            <div style=" flex: 1 0 0%;">{{ item.p2 }}</div>
                                            <div style=" flex: 1 0 0%;">{{ item.prom1 }}</div>
                                            <div style=" flex: 1 0 0%;">{{ item.prom1_80 }}</div>
                                            <div style=" flex: 1 0 0%;">{{ item.exam1 }}</div>
                                            <div style=" flex: 1 0 0%;">{{ item.exam1_20 }}</div>
                                            <div style=" flex: 1 0 0%;"> <b>{{ item.promedio_final1 }}</b> </div>
                                        </div>
                                    </td>
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        <div
                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                            <div style=" flex: 1 0 0%;">{{ item.p3 }}</div>
                                            <div style=" flex: 1 0 0%;">{{ item.p4 }}</div>
                                            <div style=" flex: 1 0 0%;">{{ item.prom2 }}</div>
                                            <div style=" flex: 1 0 0%;">{{ item.prom2_80 }}</div>
                                            <div style=" flex: 1 0 0%;">{{ item.exam2 }}</div>
                                            <div style=" flex: 1 0 0%;">{{ item.exam2_20 }}</div>
                                            <div style=" flex: 1 0 0%;"> <b>{{ item.promedio_final2 }}</b> </div>
                                        </div>
                                    </td>
                                    <td style="padding: 4px 5px;border-bottom-width: 0px;font-size: .65rem!important;">
                                        <div
                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                            <div style=" flex: 1 0 0%;"> <b>{{ item.promedioAnual }}</b> </div>
                                            <div style=" flex: 1 0 0%;">{{ item.eq }}</div>
                                        </div>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                        <div
                            style="margin-top: 3rem!important;display: flex!important;justify-content: space-around!important;">
                            <div style="text-align: center!important;">
                                <span>
                                    <b>______________________________</b>
                                </span> <br>
                                <p style=" font-size: .875rem!important;">
                                    <b>{{ settings.rector }}</b><br>
                                    RECTOR/A
                                </p>
                            </div>
                            <div style="text-align: center!important;">
                                <span>
                                    <b>_____________________________</b>
                                </span> <br>
                                <p style="font-size: .875rem!important;">
                                    <b>{{ nombre }}</b><br>
                                    DOCENTE/TUTOR
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div v-if="info.length >= 21" style="page-break-before:always;"></div>
            <section v-if="info.length >= 21">
                <div style="margin-right: 1rem!important;margin-left: 1rem!important;margin-top: 2.2rem!important;">
                    <div style="padding-top: 1rem!important;padding-bottom: 1rem!important;">
                        <div style="padding: 1rem;">

                            <table
                                style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                <thead>
                                    <tr>
                                        <th
                                            style="padding: 4px 5px;border-top: 1px solid #d9d9d9;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);">
                                        </th>
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"></th>
                                        <th
                                            style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                            <b> {{ data.materia }}</b>
                                        </th>
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;"></th>
                                    </tr>

                                    <tr>
                                        <th
                                            style="padding: 4px 5px;border-bottom: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                            <b>LISTADO DE ESTUDIANTES</b>
                                        </th>
                                        <th style="padding: 4px 5px;font-size: .65rem!important;"> <b>PRIMER
                                                QUIMESTRE</b> </th>
                                        <th style="padding: 4px 5px;font-size: .65rem!important;">
                                            <b>SEGUNDO QUIMESTRE</b>
                                        </th>
                                        <th style="padding: 4px 5px;font-size: .65rem!important;">
                                            TOTAL
                                        </th>
                                    </tr>
                                    <tr>
                                        <th
                                            style="padding: 4px 5px;border-right: 1px solid rgb(223 227 235);border-bottom: 1px solid #e9ecef;">
                                        </th>
                                        <th
                                            style="min-width: 130px;padding: 4px 5px;font-weight: 700!important;font-size: .65rem!important;text-transform: uppercase!important;border-bottom: 1px solid #e9ecef;">
                                            <div
                                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                                <div style=" flex: 1 0 0%;">p1</div>
                                                <div style=" flex: 1 0 0%;">p2</div>
                                                <div style=" flex: 1 0 0%;">pro</div>
                                                <div style=" flex: 1 0 0%;">(80%)</div>
                                                <div style=" flex: 1 0 0%;">exa</div>
                                                <div style=" flex: 1 0 0%;">(20%)</div>
                                                <div style=" flex: 1 0 0%;">qui</div>
                                            </div>
                                        </th>
                                        <th
                                            style="min-width: 130px;padding: 4px 5px;font-weight: 700!important;font-size: .65rem!important;text-transform: uppercase!important;border-bottom: 1px solid #e9ecef;">
                                            <div
                                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                                <div style=" flex: 1 0 0%;">p1</div>
                                                <div style=" flex: 1 0 0%;">p2</div>
                                                <div style=" flex: 1 0 0%;">pro</div>
                                                <div style=" flex: 1 0 0%;">(80%)</div>
                                                <div style=" flex: 1 0 0%;">exa</div>
                                                <div style=" flex: 1 0 0%;">(20%)</div>
                                                <div style=" flex: 1 0 0%;">qui</div>
                                            </div>
                                        </th>
                                        <th
                                            style="padding: 4px 5px;font-weight: 700!important;font-size: .65rem!important;text-transform: uppercase!important;border-bottom: 1px solid #e9ecef;">
                                            <div
                                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                                <div style=" flex: 1 0 0%;">pa</div>
                                                <div style=" flex: 1 0 0%;">eq</div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item) in info.slice(20, 50)" :key="item.id">
                                        <td
                                            style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                            {{ item.nombres }}</td>
                                        <td
                                            style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                            <div
                                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                                <div style=" flex: 1 0 0%;">{{ item.p1 }}</div>
                                                <div style=" flex: 1 0 0%;">{{ item.p2 }}</div>
                                                <div style=" flex: 1 0 0%;">{{ item.prom1 }}</div>
                                                <div style=" flex: 1 0 0%;">{{ item.prom1_80 }}</div>
                                                <div style=" flex: 1 0 0%;">{{ item.exam1 }}</div>
                                                <div style=" flex: 1 0 0%;">{{ item.exam1_20 }}</div>
                                                <div style=" flex: 1 0 0%;"> <b>{{ item.promedio_final1 }}</b> </div>
                                            </div>
                                        </td>
                                        <td
                                            style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                            <div
                                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                                <div style=" flex: 1 0 0%;">{{ item.p3 }}</div>
                                                <div style=" flex: 1 0 0%;">{{ item.p4 }}</div>
                                                <div style=" flex: 1 0 0%;">{{ item.prom2 }}</div>
                                                <div style=" flex: 1 0 0%;">{{ item.prom2_80 }}</div>
                                                <div style=" flex: 1 0 0%;">{{ item.exam2 }}</div>
                                                <div style=" flex: 1 0 0%;">{{ item.exam2_20 }}</div>
                                                <div style=" flex: 1 0 0%;"> <b>{{ item.promedio_final2 }}</b> </div>
                                            </div>
                                        </td>
                                        <td
                                            style="padding: 4px 5px;border-bottom-width: 0px;font-size: .65rem!important;">
                                            <div
                                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                                <div style=" flex: 1 0 0%;"> <b>{{ item.promedioAnual }}</b> </div>
                                                <div style=" flex: 1 0 0%;">{{ item.eq }}</div>
                                            </div>
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                            <div
                                style="margin-top: 3rem!important;display: flex!important;justify-content: space-around!important;">
                                <div style="text-align: center!important;">
                                    <span>
                                        <b>______________________________</b>
                                    </span> <br>
                                    <p style=" font-size: .875rem!important;">
                                        <b>{{ settings.rector }}</b><br>
                                        RECTOR/A
                                    </p>
                                </div>
                                <div style="text-align: center!important;">
                                    <span>
                                        <b>_____________________________</b>
                                    </span> <br>
                                    <p style="font-size: .875rem!important;">
                                        <b>{{ nombre }}</b><br>
                                        DOCENTE/TUTOR
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </section>
    </div>
</template>

<script>
export default {
    name: 'AddNota',
    props: {
        rowData: Array //v-if="info.length >= 16"
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
        printDownload() {
            try {
                const box = document.getElementById('box').innerHTML;
            let w = window.open('', '_blank', 'height=600,width=900,top=150,left= 400');
            w.document.write('<html><head><title></title>');
            w.document.write('<style type="text/css" media="print"> @media print{@page { margin-top: 0;margin-bottom: 0;size:landscape;}body  { padding-top: 6px; padding-bottom: 6px ;}} </style>');
            w.document.write('</head><body >');
            w.document.write(box);
            w.document.write('</body></html>');
            w.document.close()
            w.setTimeout(function () {
                w.print()
            }, 1000)
            this.statusbar = 100;
            } catch (error) {
                this.statusbar = 100; 
                this.$dialog.alert('Por favor permitir siempre ventanas emergentes y redirecciones')
            }
        },
        inforUsers() {
            const info = JSON.parse(localStorage.getItem('Xf'));
            if (info) this.nombre = info.nombre;
        },
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
                this.statusbar = 100;
            }

        },
        promedioP1(array) {
            let a1 = parseFloat(array.a1), a2 = parseFloat(array.a2), a3 = parseFloat(array.a3), a4 = parseFloat(array.a4), a5 = parseFloat(array.a5)
            let suma = 0;
            let prom = 0;
            let aux = 0;
            if (a1 != '' && a2 != '' && a3 != '' && a4 != '' && a5 != '') {
                suma = a1 + a2 + a3 + a4 + a5; aux = 5
            } if (a1 != '' && a2 != '' && a3 != '' && a4 != '' && isNaN(a5)) {
                suma = a1 + a2 + a3 + a4; aux = 4
            } if (a1 != '' && a2 != '' && a3 != '' && isNaN(a4) && isNaN(a5)) {
                suma = a1 + a2 + a3; aux = 3
            } if (a1 != '' && a2 != '' && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
                suma = a1 + a2; aux = 2
            } if (a1 != '' && isNaN(a2) && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
                suma = a1; aux = 1
            }
            prom = (suma / aux).toFixed(2);
            return prom;
        },
        promedioP2(array) {
            let a1 = parseFloat(array.b1), a2 = parseFloat(array.b2), a3 = parseFloat(array.b3), a4 = parseFloat(array.b4), a5 = parseFloat(array.b5)
            let suma = 0;
            let prom = 0;
            let aux = 0;
            if (a1 != '' && a2 != '' && a3 != '' && a4 != '' && a5 != '') {
                suma = a1 + a2 + a3 + a4 + a5; aux = 5
            } if (a1 != '' && a2 != '' && a3 != '' && a4 != '' && isNaN(a5)) {
                suma = a1 + a2 + a3 + a4; aux = 4
            } if (a1 != '' && a2 != '' && a3 != '' && isNaN(a4) && isNaN(a5)) {
                suma = a1 + a2 + a3; aux = 3
            } if (a1 != '' && a2 != '' && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
                suma = a1 + a2; aux = 2
            } if (a1 != '' && isNaN(a2) && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
                suma = a1; aux = 1
            }
            prom = (suma / aux).toFixed(2);
            return prom;
        },
        promedioP3(array) {
            let a1 = parseFloat(array.x1), a2 = parseFloat(array.x2), a3 = parseFloat(array.x3), a4 = parseFloat(array.x4), a5 = parseFloat(array.x5)
            let suma = 0;
            let prom = 0;
            let aux = 0;
            if (a1 != '' && a2 != '' && a3 != '' && a4 != '' && a5 != '') {
                suma = a1 + a2 + a3 + a4 + a5; aux = 5
            } if (a1 != '' && a2 != '' && a3 != '' && a4 != '' && isNaN(a5)) {
                suma = a1 + a2 + a3 + a4; aux = 4
            } if (a1 != '' && a2 != '' && a3 != '' && isNaN(a4) && isNaN(a5)) {
                suma = a1 + a2 + a3; aux = 3
            } if (a1 != '' && a2 != '' && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
                suma = a1 + a2; aux = 2
            } if (a1 != '' && isNaN(a2) && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
                suma = a1; aux = 1
            }
            prom = (suma / aux).toFixed(2);
            return prom;
        },
        promedioP4(array) {
            let a1 = parseFloat(array.y1), a2 = parseFloat(array.y2), a3 = parseFloat(array.y3), a4 = parseFloat(array.y4), a5 = parseFloat(array.y5)
            let suma = 0;
            let prom = 0;
            let aux = 0;
            if (a1 != '' && a2 != '' && a3 != '' && a4 != '' && a5 != '') {
                suma = a1 + a2 + a3 + a4 + a5; aux = 5
            } if (a1 != '' && a2 != '' && a3 != '' && a4 != '' && isNaN(a5)) {
                suma = a1 + a2 + a3 + a4; aux = 4
            } if (a1 != '' && a2 != '' && a3 != '' && isNaN(a4) && isNaN(a5)) {
                suma = a1 + a2 + a3; aux = 3
            } if (a1 != '' && a2 != '' && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
                suma = a1 + a2; aux = 2
            } if (a1 != '' && isNaN(a2) && isNaN(a3) && isNaN(a4) && isNaN(a5)) {
                suma = a1; aux = 1
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
        initialSetup() {
            this.$proxies._settingProxi.getConfigure()
                .then((x) => {
                    const { rector, logo, unidadeducativa } = x.data[0];
                    this.settings = {
                        rector: rector,
                        unidadeducativa: unidadeducativa,
                        logo: logo
                    }
                    setTimeout(() => this.printDownload(), 1200);
                }).catch(() => {
                    console.log("Error")
                    this.statusbar = 100;
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
