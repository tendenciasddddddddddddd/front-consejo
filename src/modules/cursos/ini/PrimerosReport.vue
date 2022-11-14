<template>
    <div>
        <section id="box">
            <section style="margin-right: 1rem!important;margin-left: 1rem!important;margin-top: 1.5rem!important;">
                    <div style="padding: 1rem;">
                        <div v-for="rows in rowData" :key="rows.id" style="padding-top: 1rem!important;padding-bottom: 1rem!important;">
                            <div style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                <div style="flex: 0 0 auto;width: 12%;text-align: left!important;">
                                    <img width="150" style="width: 100%!important;" src="../../../assets/img/ecuador.jpg" alt="Logo" />
                                </div>
                                <div style="flex: 0 0 auto; width: 76%;text-align: center!important;">
                                    <span style="color:#000;font-weight: 600;font-size: 1rem;line-height: 1.375;">
                                        {{ settings.unidadeducativa }}
                                    </span><br>
                                    <p style="font-size: .75rem!important;">
                                        INFORME DE CALIFICACIONES QUIMESTRALES
                                    </p>
                                </div>
                                <div style="flex: 0 0 auto; width: 12%;text-align: right!important;">
                                    <img style="width: 50%!important;margin-right: 1rem!important;" :src="settings.logo" alt="Logo" />
                                </div>
                            </div>
                            <div style=" --bs-gutter-x: 1.5rem; --bs-gutter-y: 0; display: flex;flex-wrap: wrap;margin-top: calc(var(--bs-gutter-y) * -1);margin-right: calc(var(--bs-gutter-x) * -.5);margin-left: calc(var(--bs-gutter-x) * -.5);">
                                        <div style="padding-left: 15px;font-size: .75rem!important; flex: 0 0 auto; width: 50%;text-align: left!important;">
                                             <span>CURSO : <b>{{sett[0].nivel  }} / {{ sett[0].paralelo }}</b></span> <br>
                                            <span>ESTUDIANTE: <b>{{ rows.nombre }}</b></span>
                                        </div>
                                        <div  style="font-size: .75rem!important; flex: 0 0 auto; width: 45%;text-align: right!important;">
                                            <span>PERIODO: <b>{{
                                        rows.periodo
                                        }}</b></span><br>
                                           
                                        </div>
                                    </div>
                            <table style=" border-color: #000;border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                <thead>
                                    <tr>
                                        <th style="padding: 4px 5px;border-top: 1px solid #000;border-right: 1px solid #000;font-size: .65rem!important;">
                                            N°
                                        </th>
                                        <th style="padding: 4px 5px;border-top: 1px solid #000;font-size: .65rem!important;">
                                            DESTREZAS </th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #000;font-size: .65rem!important;">
                                            1° QUIM </th>
                                        <th style="padding: 4px 5px;border-top: 1px solid #000;background: #dbdde4;font-size: .65rem!important;">
                                            2° QUIM</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item) in rows.datas.slice(0, 30)" :key="item.id">
                                        <td style="border-top: 1px solid #000;padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important;">{{ item.id }}</td>
                                        <td style="border-top: 1px solid #000;padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important;">
                                            {{ item.des }}
                                        </td>
                                        <td style="border-top: 1px solid #000;padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important;">
                                            {{ item.qui1 }}
                                        </td>
                                        <td style="border-top: 1px solid #000;padding: 4px 5px;border-bottom-width: 0px;background: #dbdde4;font-size: .65rem!important;">
                                            {{ item.qui2 }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div  style="page-break-before:always;"></div>
                            <div style="margin-top: 2rem!important;">.</div>
                            <table style="margin-top: 2rem!important; border-color: #000;border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                <thead>
                                    <tr>
                                        <th style="padding: 4px 5px;border-top: 1px solid #000;border-right: 1px solid #000;font-size: .65rem!important;">
                                            N°
                                        </th>
                                        <th style="padding: 4px 5px;border-top: 1px solid #000;font-size: .65rem!important;">
                                            DESTREZAS </th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #000;font-size: .65rem!important;">
                                            1° QUIM </th>
                                        <th style="padding: 4px 5px;border-top: 1px solid #000;background: #dbdde4;font-size: .65rem!important;">
                                            2° QUIM</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item) in rows.datas.slice(30, 60)" :key="item.id">
                                        <td style="border-top: 1px solid #000;padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important;">{{ item.id }}</td>
                                        <td style="border-top: 1px solid #000;padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important;">
                                            {{ item.des }}
                                        </td>
                                        <td style="border-top: 1px solid #000;padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important;">
                                            {{ item.qui1 }} 
                                        </td>
                                        <td style="border-top: 1px solid #000;padding: 4px 5px;border-bottom-width: 0px;background: #dbdde4;font-size: .65rem!important;">
                                            {{ item.qui2 }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div  style="page-break-before:always;"></div>
                            <div style="margin-top: 2rem!important;">.</div>
                            <table style="margin-top: 2rem!important; border-color: #000;border-style: solid;border-width: 0px 1px 1px;max-width: 100%; width: 100%; border-spacing: 0; border-collapse: separate;">
                                <thead>
                                    <tr>
                                        <th style="padding: 4px 5px;border-top: 1px solid #000;border-right: 1px solid #000;font-size: .65rem!important;">
                                            N°
                                        </th>
                                        <th style="padding: 4px 5px;border-top: 1px solid #000;font-size: .65rem!important;">
                                            DESTREZAS </th>
                                       
                                        <th style="padding: 4px 5px;border-top: 1px solid #000;font-size: .65rem!important;">
                                            1° QUIM </th>
                                        <th style="padding: 4px 5px;border-top: 1px solid #000;background: #dbdde4;font-size: .65rem!important;">
                                            2° QUIM</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item) in rows.datas.slice(60, 80)" :key="item.id">
                                        <td style="border-top: 1px solid #000;padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important;">{{ item.id }}</td>
                                        <td style="border-top: 1px solid #000;padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important;">
                                            {{ item.des }}
                                        </td>
                                        <td style="border-top: 1px solid #000;padding: 4px 5px;border-bottom-width: 0px;border-right: 1px solid #000;font-size: .65rem!important;">
                                            {{ item.qui1 }} 
                                        </td>
                                        <td style="border-top: 1px solid #000;padding: 4px 5px;border-bottom-width: 0px;background: #dbdde4;font-size: .65rem!important;">
                                            {{ item.qui2 }}
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
                                    <b>{{ sett[0].nombredoc }}</b><br>
                                    DOCENTE/TUTOR
                                </p>
                            </div>
                        </div>
                        <div  style="page-break-before:always;"></div>
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
        rowData: Array,
        sett : Array
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
            w.document.write('<style type="text/css" media="print"> @media print{@page { margin-top: 0;margin-bottom: 0;}body  { padding-top: 6px; padding-bottom: 6px ;}} </style>');
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
                    
                    setTimeout(() => this.printDownload(), 2000);
                }).catch(() => {
                    console.log("Error")
                    this.statusbar = 100;
                });
        },
    },
    mounted() {
        this.inforUsers()
        this.initialSetup();
    },

}
</script>
