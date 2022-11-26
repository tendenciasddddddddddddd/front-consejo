<template>
    <div>
            <section id="box">
                <section style="margin-right: 1rem!important;margin-left: 1rem!important;margin-top: 1.5rem!important;">
                    <div style="padding: 1rem;">
                        <div style="padding-top: 1rem!important;padding-bottom: 1rem!important;">
                            <div style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                <div style="flex: 0 0 auto;width: 12%;text-align: left!important;">
                                    <img width="150" style="width: 100%!important;" src="../../../assets/img/ecuador.jpg" alt="Logo" />
                                </div>
                                <div style="flex: 0 0 auto; width: 76%;text-align: center!important;">
                                    <span style="color:#000;font-weight: 600;font-size: 1rem;line-height: 1.375;">
                                        {{ settings.unidadeducativa }}
                                    </span><br>
                                    <p style="font-size: .75rem!important;">
                                        REPORTE DE ACTIVIDADES COMPLEMENTARIAS
                                    </p>
                                    <span style="font-size: .875rem!important;"><b>Año Lectivo: </b>2021-2022 &nbsp; {{ data.nivel }} -
                                        {{ data.paralelo }}</span> <span style="font-size: .65rem!important;">{{ data.materia }}</span>
                                </div>
                                <div style="flex: 0 0 auto; width: 12%;text-align: right!important;">
                                    <img style="width: 50%!important;margin-right: 1rem!important;" :src="settings.logo" alt="Logo" />
                                </div>
                            </div>
                            <table style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                <thead>
                                    <tr>
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                            Estudiantes
                                        </th>
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                            Parcial 1</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                            Parcial 2</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: rgb(234 235 239);font-size: .65rem!important;">
                                            Quimestre 1</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                            Parcial 1</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                            Parcial 2</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: rgb(234 235 239);font-size: .65rem!important;">
                                            Quimestre 2</th>
                                        
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: #dbdde4;font-size: .65rem!important;">
                                            Promedio Final</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in info.slice(0, 25)" :key="item.id">
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">{{ item.nombres }}</td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                            {{ item.p1 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                            {{ item.p2 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: rgb(234 235 239);font-size: .65rem!important;">
                                            {{ item.prom1 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                            {{ item.p3 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                            {{ item.p4 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: rgb(234 235 239);font-size: .65rem!important;">
                                            {{ item.prom2 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: #dbdde4;font-size: .65rem!important;">
                                            {{ item.total }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style="margin-top: 3rem!important;display: flex!important;justify-content: space-around!important;">
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
                <div v-if="info.length >= 26" style="page-break-before:always;"></div>
                <section v-if="info.length >= 26">
                    <div style="margin-right: 1rem!important;margin-left: 1rem!important;margin-top: 2.2rem!important;">
                        <div style="padding-top: 1rem!important;padding-bottom: 1rem!important;">
                            <div style="padding: 1rem;">
                                <div style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                <div style="flex: 0 0 auto;width: 12%;text-align: left!important;">
                                    <img width="150" style="width: 100%!important;" src="../../../assets/img/ecuador.jpg" alt="Logo" />
                                </div>
                                <div style="flex: 0 0 auto; width: 76%;text-align: center!important;">
                                    <span style="color:#000;font-weight: 600;font-size: 1rem;line-height: 1.375;">
                                        {{ settings.unidadeducativa }}
                                    </span><br>
                                    <p style="font-size: .75rem!important;">
                                        REPORTE DE PROYECTOS
                                    </p>
                                    <span style="font-size: .875rem!important;"><b>Año Lectivo: </b>2021-2022 &nbsp; {{ data.nivel }} -
                                        {{ data.paralelo }}</span> <span style="font-size: .65rem!important;">{{ data.materia }}</span>
                                </div>
                                <div style="flex: 0 0 auto; width: 12%;text-align: right!important;">
                                    <img style="width: 50%!important;margin-right: 1rem!important;" :src="settings.logo" alt="Logo" />
                                </div>
                            </div>
                            <table style=" border-color: rgb(223, 227, 235);border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                <thead>
                                    <tr>
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                            Estudiantes
                                        </th>
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                            Parcial 1</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                            Parcial 2</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: rgb(234 235 239);font-size: .65rem!important;">
                                            Quimestre 1</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                            Parcial 1</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;font-size: .65rem!important;">
                                            Parcial 2</th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: rgb(234 235 239);font-size: .65rem!important;">
                                            Quimestre 2</th>
                                        
                                        <th style="padding: 4px 5px;border-top: 1px solid #d9d9d9;background: #dbdde4;font-size: .65rem!important;">
                                            Promedio Final</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in info.slice(25, 50)" :key="item.id">
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">{{ item.nombres }}</td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                            {{ item.p1 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                            {{ item.p2 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: rgb(234 235 239);font-size: .65rem!important;">
                                            {{ item.prom1 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                            {{ item.p3 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);font-size: .65rem!important;">
                                            {{ item.p4 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: rgb(234 235 239);font-size: .65rem!important;">
                                            {{ item.prom2 }}
                                        </td>
                                        <td style="padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid rgb(223 227 235);background: #dbdde4;font-size: .65rem!important;">
                                            {{ item.total }}
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
            this.data = JSON.parse(localStorage.getItem("myCourse"));
            if (this.rowData.length > 0) {
                for (let i = 0; i < this.rowData.length; i++) {
                    const element = this.rowData[i];
                    let p1 = element.p1;
                    let p2 = element.p2;
                    let prom1 =this.calcularLetra(p1, p2);
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
            var letra = 'E'
            switch (result) {
                case 5: letra = 'EX';
                    break;
                case 4: letra = 'MB';
                    break;
                case 3: letra = 'B';
                    break;
                case 2: letra = 'R';
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
