<template>
    <div>
        <div v-if="ifload">Trabajando...</div>
        <section v-else>
            <section id="box">
                <div v-for="item in info" :key="item.id"
                    style="margin-right: 1rem!important;margin-left: 1rem!important;margin-top: 1.5rem!important;">
                    <div style="padding: 1rem;">
                        <div style="text-align: center!important;">
                            <div
                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                <div style="flex: 0 0 auto;width: 8.333333%;text-align: left!important;">
                                    <img style="width: 90%!important" :src="settings.logo" alt="Logo" />
                                </div>
                                <div style="flex: 0 0 auto; width: 91.666667%;">
                                    <span style="color:#000;font-weight: 600;font-size: 1.25rem;line-height: 1.375;">
                                        {{ settings.unidadeducativa }}
                                    </span><br>
                                    <p
                                        style="margin-top:-1px;text-align: center!important;font-size: .75rem!important;">
                                        Dirección: {{ settings.direccion }} Teléf: {{ settings.telefono }} <br>
                                        {{ settings.ubicacion }}
                                    </p>

                                </div>
                            </div>
                            <div
                                style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                <div
                                    style="padding-left: 15px;font-size: .75rem!important; flex: 0 0 auto; width: 50%;text-align: left!important;">
                                    <span>CURSO : <b>{{
                                            item.curso
                                    }} / {{ item.paralelo }}</b></span> <br>
                                    <span>ESTUDIANTE: <b>{{ item.nombre }}</b></span>
                                </div>
                                <div
                                    style="font-size: .75rem!important; flex: 0 0 auto; width: 15%;text-align: left!important;">
                                    CÓDIGO : 250
                                </div>
                                <div
                                    style="font-size: .75rem!important; flex: 0 0 auto; width: 28%;text-align: right!important;">
                                    <span>PERIODO: <b>{{
                                            item.periodo
                                    }}</b></span><br>
                                    <span>FECHA: {{ fechasActual }}</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div>
                                        <table
                                            style=" border-color: #000;border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                            <thead>
                                                <tr>
                                                    <th
                                                        style="padding: 0px 2px;border-top: 1px solid #000;border-bottom: 0px;border-right: 1px solid #000;">
                                                    </th>
                                                    <th style="padding: 0px 2px;border-top: 1px solid #000;">
                                                    </th>
                                                    <th
                                                        style="padding: 0px 2px;border-top: 1px solid #000;    font-size: .65rem!important;font-weight: 700!important;text-transform: uppercase!important;    text-align: center!important;">
                                                        <span v-if="numQuimestre == 0">PRIMER QUIMESTRE</span>
                                                        <span v-else>SEGUNDO QUIMESTRE</span>
                                                    </th>
                                                    <th style="padding: 0px 2px;border-top: 1px solid #000;">
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style="padding: 1px 3px;border-bottom: 0px;border-right: 1px solid #000;">
                                                    </th>
                                                    <th style="padding: 1px 3px;"></th>
                                                    <th
                                                        style="padding: 1px 3px; font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        Evaluaciones formativas 80%
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        SUM 20%
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style="padding: 1px 3px;border-bottom: 0px;border-right: 1px solid #000;font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        ASIGNATURAS
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        PARCIAL 1
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        PARCIAL 2
                                                    </th>
                                                    <th
                                                        style="padding: 1px 3px;font-size: .65rem!important;font-weight: 700!important;  text-align: center!important;">
                                                        RESULTADOS
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th
                                                        style="padding: 2px 3px;border-right: 1px solid #000;border-bottom: 1px solid #000;">
                                                    </th>
                                                    <th
                                                        style="min-width: 125px;border-bottom: 1px solid #000;padding: 2px 3px; font-size: .65rem!important;font-weight: 700!important;    text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">Ins.1</div>
                                                            <div style=" flex: 1 0 0%;">Ins.2</div>
                                                            <div style=" flex: 1 0 0%;">Ins.3</div>
                                                            <div style=" flex: 1 0 0%;">Ins.4</div>
                                                            <div style=" flex: 1 0 0%;">Ins.5</div>
                                                            <div style=" flex: 1 0 0%;">PR</div>
                                                        </div>
                                                    </th>
                                                    <th
                                                        style="min-width: 125px;border-bottom: 1px solid #000;padding: 2px 3px; font-size: .65rem!important;font-weight: 700!important; text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">Ins.1</div>
                                                            <div style=" flex: 1 0 0%;">Ins.2</div>
                                                            <div style=" flex: 1 0 0%;">Ins.3</div>
                                                            <div style=" flex: 1 0 0%;">Ins.4</div>
                                                            <div style=" flex: 1 0 0%;">Ins.5</div>
                                                            <div style=" flex: 1 0 0%;">PR</div>
                                                        </div>
                                                    </th>
                                                    <th
                                                        style="min-width: 125px;border-bottom: 1px solid #000;padding: 2px 3px; font-size: .65rem!important;font-weight: 700!important;text-transform: uppercase!important;    text-align: center!important;">
                                                        <div
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">eq</div>
                                                            <div style=" flex: 1 0 0%;">ex</div>
                                                            <div style=" flex: 1 0 0%;">eq</div>
                                                            <div style=" flex: 1 0 0%;">pr</div>
                                                            <div style=" flex: 1 0 0%;">cu</div>

                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr v-for="ite in item.calificaciones" :key="ite.id">
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;border-right: 1px solid #000;  font-size: .65rem!important;">
                                                        {{ ite.materia }}</td>
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;border-right: 1px solid #000; font-size: .65rem!important;text-align: center!important;">
                                                        <div v-if="parcial"
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">
                                                                <span v-if="(ite.a1 != 'NaN')"> {{
                                                                        ite.a1
                                                                }}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                <span v-if="(ite.a2 != 'NaN')"> {{
                                                                        ite.a2
                                                                }}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                <span v-if="(ite.a3 != 'NaN')"> {{
                                                                        ite.a3
                                                                }}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                <span v-if="(ite.a4 != 'NaN')"> {{
                                                                        ite.a4
                                                                }}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-left: 5px;">
                                                                <span v-if="(ite.a5 != 'NaN')"> {{
                                                                        ite.a5
                                                                }}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;padding-right: 5px;">
                                                                <span
                                                                    v-if="(ite.prom1 != 'NaN') ">
                                                                    <b>{{ ite.prom1 }}</b> </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important;text-align: center!important;">
                                                        <div v-if="parcial2"
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">
                                                                <span v-if="(ite.b1 != 'NaN') "> {{
                                                                        ite.b1
                                                                }}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">
                                                                <span v-if="(ite.b2 != 'NaN') "> {{
                                                                        ite.b2
                                                                }}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">
                                                                <span v-if="(ite.b3 != 'NaN') "> {{
                                                                        ite.b3
                                                                }}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">
                                                                <span v-if="(ite.b4 != 'NaN') "> {{
                                                                        ite.b4
                                                                }}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">
                                                                <span v-if="(ite.b5 != 'NaN') "> {{
                                                                        ite.b5
                                                                }}</span>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">
                                                                <span
                                                                    v-if="(ite.prom2 != 'NaN') && (ite.prom2 != '1.00')">
                                                                    <b>{{ ite.prom2 }}</b> </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td
                                                        style="padding: 2px 3px;border-bottom-width: 0px;text-align: center!important;font-size: .65rem!important;">
                                                        <div v-if="parcial && parcial2"
                                                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                                            <div style=" flex: 1 0 0%;padding-left: 7px;">
                                                                <b>{{ ite.equivalPeriodos }}</b>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">{{ ite.examen }}</div>
                                                            <div style=" flex: 1 0 0%;">
                                                                <b>{{ ite.exam2_20 }}</b>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">
                                                                <b>{{ ite.final }}</b>
                                                            </div>
                                                            <div style=" flex: 1 0 0%;">{{ ite.letras }}</div>

                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .60rem!important;">
                                                        <b>PROMEDIO</b>
                                                    </td>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .65rem!important;text-align: right !important;">
                                                        <span v-if="parcial">
                                                            <b>{{ promdioParcial(item.calificaciones) }}</b> </span>
                                                    </td>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .65rem!important;text-align: right  !important;">
                                                        <span v-if="parcial2">
                                                            <b>{{ promdioParcial2(item.calificaciones) }}</b> </span>
                                                    </td>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .65rem!important;text-align: right  !important;">
                                                        <span></span>
                                                    </td>
                                                </tr>
                                                <tr v-for="ite in item.proyectos" :key="ite.id">
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .60rem!important;">
                                                        {{ ite.materia }}</td>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .65rem!important;">
                                                        <span v-if="parcial">
                                                            {{ ite.p1 }}</span>
                                                    </td>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .65rem!important;">
                                                        <span v-if="parcial2">
                                                            {{ ite.p2 }}</span>
                                                    </td>
                                                    <td
                                                        style="padding: 1px 3px;border-top: 1px solid #000;font-size: .65rem!important;">
                                                        <span v-if="parcial && parcial2"> {{ calcularPryectos(ite.p1,
                                                                ite.p2)
                                                        }}</span>
                                                    </td>
                                                </tr>

                                                <tr v-if="item.comportamiento.length > 0">
                                                    <td
                                                        style="padding: 1px 3px;font-size: .65rem!important;border-top: 1px solid #000;">
                                                        COMPORTAMIENTO </td>
                                                    <td
                                                        style="padding: 1px 3px;font-size: .65rem!important;border-top: 1px solid #000;">
                                                        <span v-if="parcial">{{ item.comportamiento[numQuimestre].p1
                                                        }}</span>
                                                    </td>
                                                    <td
                                                        style="padding: 1px 3px;font-size: .65rem!important;border-top: 1px solid #000;">
                                                        <span v-if="parcial2">{{ item.comportamiento[numQuimestre].p2
                                                        }}</span>
                                                    </td>
                                                    <td
                                                        style="padding: 1px 3px;font-size: .65rem!important;border-top: 1px solid #000;">
                                                        <span v-if="parcial && parcial2">
                                                            {{
                                                                    calcularComportamiento(item.comportamiento[numQuimestre].p1,
                                                                        item.comportamiento[numQuimestre].p2)
                                                            }}
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr v-if="item.dhi.length > 0">
                                                    <td
                                                        style="padding: 1px 3px;font-size: .65rem!important;border-top: 1px solid #000;">
                                                        DESARROLLO HUMANO INTEGRAL </td>
                                                    <td
                                                        style="padding: 1px 3px;font-size: .65rem!important;border-top: 1px solid #000;">
                                                        <span v-if="parcial">{{ item.dhi[numQuimestre].p1
                                                        }}</span>
                                                    </td>
                                                    <td
                                                        style="padding: 1px 3px;font-size: .65rem!important;border-top: 1px solid #000;">
                                                        <span v-if="parcial2">{{ item.dhi[numQuimestre].p2
                                                        }}</span>
                                                    </td>
                                                    <td
                                                        style="padding: 1px 3px;font-size: .65rem!important;border-top: 1px solid #000;">
                                                        <span v-if="parcial && parcial2">
                                                            {{ calcularComportamiento(item.dhi[numQuimestre].p1,
                                                                    item.dhi[numQuimestre].p2)
                                                            }}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table
                                            style=" border-color: #000;border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style="border-bottom-width: 0px;border-right: 1px solid #000;font-size: .50rem!important;">
                                                        <b>Escala de Calificaciones Art. 194, reformado, Decreto
                                                            presidencial No. 366-13 (Art.9)</b>
                                                        <div
                                                            style=" --bs-gutter-x: 1rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                                            <div style="flex: 0 0 auto;width: 33.333333%;">
                                                                DA = Domina Aprend.(10-9) <br>
                                                                NA = No Alcanza(&lt;=4) <br>
                                                                C = Poco Satisfactorio
                                                            </div>
                                                            <div style="flex: 0 0 auto;width: 33.333333%;">
                                                                AA = Alcanza Aprend.(7-8.99) <br>
                                                                A = Muy Satisfactorio <br>
                                                                D = Mejorable
                                                            </div>
                                                            <div style="flex: 0 0 auto;width: 33.333333%;">
                                                                PA = Próximo Alcanzar(4.01-6.99) <br>
                                                                B = Satisfactorio <br>
                                                                E = Insatisfactori
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style="border-bottom-width: 0px;font-size: .55rem!important;">
                                                        <b>Evaluación Comportamiento: Art. 222- R/LOEI para sana
                                                            convivencia social</b>
                                                        <div
                                                            style=" --bs-gutter-x: 1rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);">
                                                            <div style="flex: 0 0 auto;width: 50%;">
                                                                A = Muy Satisfactorio <br>
                                                                B = Satisfactorio <br>
                                                                C = Poco Satisfactorio <br>
                                                                D = Mejorable <br>
                                                                E = Insatisfactorio
                                                            </div>
                                                            <div style="flex: 0 0 auto;width: 50%;">
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

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div
                                style="margin-top: 3rem!important;display: flex!important;justify-content: space-around!important;">
                                <div style="text-align: center!important;">

                                </div>
                                <div style="text-align: center!important;">
                                    <span>
                                        <b>_____________________________</b>
                                    </span> <br>
                                    <p style="font-size: .875rem!important;">

                                        DOCENTE/TUTOR
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="page-break-before:always;"></div>
                </div>
            </section>
        </section>
    </div>
</template>
  
<script>
export default {
    props: {
        rowData: Array,
        nextCourse: String,
        numQuimestre: Number,
        settings: Object,
        parcial: Boolean,
        parcial2: Boolean
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
            total: 0,
            aux: 0
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
                let w = window.open('', '_blank', 'height=600,width=950,top=150,left= 400');
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
                this.statusbar = 500;
            }
        },
        onProgress(event) {
            this.statusbar = event;
        },
        initialSetup() {
            let array = this.rowData;
            this.ifload = true;
            this.$proxies._matriculaProxi
                .getMatriculaReporte(array)
                .then((x) => {
                    const result = x.data;
                    this.ifload = false;
                    this.FormData(result)
                    this.ifload = false;
                    setTimeout(() => this.printDownload(), 1500);
                })
                .catch((x) => {
                    console.log("Error", x);
                    this.ifload = false;
                });
        },
        ifDecimal(num) {
            if (num != '') {
                var partes = num.toString().split('.'); 
                var re = /^-?[0-9]+$/;
                if (re.test(num)) {
                    return num + ".00";
                } else if (partes[1].length ==1) {
                    return num + "0";
                } else {
                    return num
                }
            } else {
                return '';
            }

        },
        FormData(array) {
            try {
                let result = []
                if (array.length > 0) {
                    for (let i = 0; i < array.length; i++) {
                        const element = array[i];
                        let curso = element.fknivel ? element.fknivel.nombre : 'Undefined';
                        let paralelo = element.curso;
                        let nombre = element.nombre;
                        let periodo = element.academico ? element.academico.nombre : 'Undefined';
                        let calificacionesArray = element.calificaciones;
                        let calificaciones = []
                        let dhi = []
                        let comportamiento = []
                        let proyectos = []
                        for (let j = 0; j < calificacionesArray.length; j++) {
                            this.aux = this.aux + 1
                            const res = calificacionesArray[j];
                            let materia = res.materia;
                            if (res.dhi.length > 0) dhi = res.dhi;
                            if (res.comportamiento.length > 0) comportamiento = res.comportamiento;
                            if (res.proyectos.length > 0) {
                                proyectos.push({
                                    materia: materia,
                                    p1: res.proyectos[this.numQuimestre].p1,
                                    p2: res.proyectos[this.numQuimestre].p2,
                                })
                            }
                            if (res.notas.length > 0) {
                                let a1 = this.ifDecimal(res.notas[this.numQuimestre].a1);
                                let a2 = this.ifDecimal(res.notas[this.numQuimestre].a2);
                                let a3 = this.ifDecimal(res.notas[this.numQuimestre].a3);
                                let a4 = this.ifDecimal(res.notas[this.numQuimestre].a4);
                                let a5 = this.ifDecimal(res.notas[this.numQuimestre].a5);
                                let prom1 = this.promedioP1(res.notas[this.numQuimestre])
                                let prom1_80 = ((prom1 * 8) / 10).toFixed(2);
                                // SEGUNDO PARCIAL 
                                let b1 = this.ifDecimal(res.notas[this.numQuimestre].b1);
                                let b2 = this.ifDecimal(res.notas[this.numQuimestre].b2);
                                let b3 = this.ifDecimal(res.notas[this.numQuimestre].b3);
                                let b4 = this.ifDecimal(res.notas[this.numQuimestre].b4);
                                let b5 = this.ifDecimal(res.notas[this.numQuimestre].b5);
                                let prom2 = this.promedioP2(res.notas[this.numQuimestre])
                                let prom2_80 = ((prom2 * 8) / 10).toFixed(2);
                                let equivalPeriodos = ((parseFloat(prom1_80) + parseFloat(prom2_80)) / 2).toFixed(2);
                                let examen = res.notas[this.numQuimestre].examen;
                                let exam2_20 = ((parseFloat(examen) * 2) / 10).toFixed(2);
                                let final = (parseFloat(equivalPeriodos) + parseFloat(exam2_20)).toFixed(2);
                                let letras = this.totalesLetras(final)
                                calificaciones.push({
                                    materia: materia,
                                    a1: a1,
                                    a2: a2,
                                    a3: a3,
                                    a4: a4,
                                    a5: a5,
                                    prom1: prom1,
                                    prom1_80: prom1_80,
                                    b1: b1,
                                    b2: b2,
                                    b3: b3,
                                    b4: b4,
                                    b5: b5,
                                    prom2: prom2,
                                    prom2_80: prom2_80,
                                    equivalPeriodos: equivalPeriodos,
                                    examen: examen,
                                    exam2_20: exam2_20,
                                    final: final,
                                    letras: letras,
                                })
                            }
                        }
                        result.push({
                            curso: curso,
                            paralelo: paralelo,
                            nombre: nombre,
                            periodo: periodo,
                            calificaciones: calificaciones,
                            dhi: dhi,
                            comportamiento: comportamiento,
                            proyectos: proyectos,
                        })
                    }
                    this.info = result;
                    this.ifload = false;
                }
            } catch (error) {
                console.log("Error", error);
                this.ifload = false;
            }
        },
        promdioParcial(array) {
            let sum = 0
            let result = 0
            let cont = 0;
            if (array.length > 0) {
                for (let i = 0; i < array.length; i++) {
                    const element = array[i].prom1;
                    const num = parseFloat(element);
                    if (num <= 10 && num >= 1) {
                        sum = sum + num
                        cont += 1
                    }
                }
                let pro = (sum / cont);
                 result = trunc(pro,2)
            }
             return this.ifDecimal(result)
            //return result
        },
        promdioParcial2(array) {
            let sum = 0
            let result = 0
            let cont = 0;
            if (array.length > 0) {
                for (let i = 0; i < array.length; i++) {
                    const element = array[i].prom2;
                    const num = parseFloat(element);
                    if (num <= 10 && num >= 1) {
                        sum = sum + num
                        cont += 1
                    }
                }
                let pro = (sum / cont);
                 result = trunc(pro,2)
            }
            return result
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
            prom = (suma / aux).toFixed(2)
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
        __calcularfechaActual() {
            const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            const dateObj = new Date();
            const month = monthNames[dateObj.getMonth()];
            const day = String(dateObj.getDate()).padStart(2, '0');
            const year = dateObj.getFullYear();
            const output = month + '\n' + day + ',' + year;
            this.fechasActual = output;
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
        calcularComportamiento(aa1, bb2) {
            let aux = 0;
            let aux2 = 0;
            var letra = 'NO'
            let p1 = aa1
            let p2 = bb2
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
            switch (result) {
                case 5: letra = 'A Muy Satisfactorio';
                    break;
                case 4: letra = 'B Satisfactorio';
                    break;
                case 3: letra = 'C Poco Satisfactorio';
                    break;
                case 2: letra = 'D Mejorable o Falla';
                    break;
                case 1: letra = 'E Insatisfactorio';
                    break;
                default:
                    break;
            }

            return letra;
        },
        calcularPryectos(p11, p22) {
            let aux = 0;
            let aux2 = 0;
            var letra = 'NO'
            let p1 = p11
            let p2 = p22
            switch (p1) {
                case "EX": aux = 5;
                    break;
                case "MB": aux = 4;
                    break;
                case "B": aux = 3;
                    break;
                case "R": aux = 2;
                    break;
                default:
                    break;
            }
            switch (p2) {
                case "EX": aux2 = 5;
                    break;
                case "MB": aux2 = 4;
                    break;
                case "B": aux2 = 3;
                    break;
                case "R": aux2 = 2;
                    break;
                default:
                    break;
            }

            var result = parseInt((aux + aux2) / 2)
            switch (result) {
                case 5: letra = 'EX Excelente';
                    break;
                case 4: letra = 'MB Muy Buena';
                    break;
                case 3: letra = 'B Buena';
                    break;
                case 2: letra = 'R Regular';
                    break;
                default:
                    break;
            }

            return letra;
        },
    },
    mounted() {
        this.initialSetup()
        this.__calcularfechaActual()
    }
}
function trunc (x, posiciones = 0) {
  var s = x.toString()
  var decimalLength = s.indexOf('.') + 1
  var numStr = s.substr(0, decimalLength + posiciones)
  return Number(numStr)
}
</script>
  