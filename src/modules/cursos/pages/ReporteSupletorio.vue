<template>
    <div>
        <section id="box">
            <section style="margin-right: 1rem!important;margin-left: 1rem!important;margin-top: 1.5rem!important;">
                <div style="padding: 1rem;">
                    <div style="padding-top: 1rem!important;padding-bottom: 1rem!important;">
                        <div
                            style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                            <div style="flex: 0 0 auto;width: 12%;text-align: left!important;">
                                <img width="150" style="width: 100%!important;" src="../../../assets/img/ecuador.jpg"
                                    alt="Logo" />
                            </div>
                            <div style="flex: 0 0 auto; width: 76%;text-align: center!important;">
                                <span style="color:#000;font-weight: 600;font-size: 1rem;line-height: 1.375;">
                                    {{ settings.unidadeducativa }}
                                </span><br>
                                <p style="font-size: .75rem!important;">
                                    REPORTE DE SUPLETORIOS </p>
                                <span style="font-size: .875rem!important;"><b>Año Lectivo: </b>2021-2022 &nbsp; {{
                                        data.nivel
                                }} -
                                    {{ data.paralelo }}</span> <span style="font-size: .65rem!important;">{{
                                            data.materia
                                    }}</span>
                            </div>
                            <div style="flex: 0 0 auto; width: 12%;text-align: right!important;">
                                <img style="width: 50%!important;margin-right: 1rem!important;" :src="settings.logo"
                                    alt="Logo" />
                            </div>
                        </div>
                        <table
                            style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                            <thead>
                                <tr>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        Estudiantes
                                    </th>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                        QUIM 1</th>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                        QUIM 2</th>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                        P ANUAL</th>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                        SUPLETORIO</th>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                        REMEDIAL</th>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                        GRACIA</th>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                        P FINAL</th>

                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                        ESTADO</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in rowData.slice(0, 25)" :key="item.id">
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        {{ item.nombres }}</td>
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        {{ item.quim1 }}
                                    </td>
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        {{ item.quim2 }}
                                    </td>
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        {{ item.promed }}
                                    </td>
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        {{ item.suple }}
                                    </td>
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        {{ item.reme }}
                                    </td>
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        {{ item.gracia }}
                                    </td>
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        {{ item.pfinal }}
                                    </td>
                                    <td style="padding: 4px 5px;border-bottom-width: 0px;font-size: .65rem!important;"
                                        class="mb-0 ms-3 text-center text-xxs negros fuente">
                                      <b>{{ getEstado(item.pfinal) }}</b>
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
            <div v-if="rowData.length >= 26" style="page-break-before:always;"></div>
            <section v-if="rowData.length >= 26">
                <div style="margin-right: 1rem!important;margin-left: 1rem!important;margin-top: 2.2rem!important;">
                    <div style="padding-top: 1rem!important;padding-bottom: 1rem!important;">
                        <div style="padding: 1rem;">
                            <table
                            style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                            <thead>
                                <tr>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        Estudiantes
                                    </th>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                        QUIM 1</th>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                        QUIM 2</th>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                        P ANUAL</th>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                        SUPLETORIO</th>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                        REMEDIAL</th>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                        GRACIA</th>
                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                        P FINAL</th>

                                    <th
                                        style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                        ESTADO</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in rowData.slice(25, 50)" :key="item.id">
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        {{ item.nombres }}</td>
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        {{ item.quim1 }}
                                    </td>
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        {{ item.quim2 }}
                                    </td>
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        {{ item.promed }}
                                    </td>
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        {{ item.suple }}
                                    </td>
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        {{ item.reme }}
                                    </td>
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        {{ item.gracia }}
                                    </td>
                                    <td
                                        style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                        {{ item.pfinal }}
                                    </td>
                                    <td style="padding: 4px 5px;border-bottom-width: 0px;font-size: .65rem!important;"
                                        class="mb-0 ms-3 text-center text-xxs negros fuente">
                                      <b>{{ getEstado(item.pfinal) }}</b>
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
        rowData: Array
    },
    data() {
        return {
            isprint: false,
            statusbar: "",
            data: '',
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
            this.data = JSON.parse(localStorage.getItem("myCourse"));
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
        getEstado(num) {
            let suple = parseFloat(num)
            if (suple >= 0 && suple < 7) {
                return 'Reprobado';
            } else if (suple >= 7 && suple <= 10) {
                return 'Aprobado';
            } else {
                return 'Error';
            }
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
                    setTimeout(() => this.printDownload(), 1000);
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
