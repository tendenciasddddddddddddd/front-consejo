<template>
    <section>
        <Modal @close="close">
            <template v-slot:header> Automatización de matrículas</template>
            <template v-slot:body>
                <section v-if="pasos">
                    <span style="font-weight:400;" class="text-sm fuente negros">
                        Seleccionar el periodo <b> Anterior</b>
                    </span>
                    <div class="">
                        <span v-if="ifLoadPeriodo">Cargando..</span>
                        <Dropdown v-model="PeriodoAnterior" :options="arrayDocumentsLevel" />
                    </div><br>
                    <div class="alertdanger ">
                        <p class="parrafo">
                            Todas las matriculas del periodo anterior <b>{{ PeriodoAnterior ? PeriodoAnterior.nombre :
                                    'Sin seleccionar'
                            }}</b>
                            migraran al nuevo periodo vigente
                            <b>{{ arrayDocumentsLevelActual[0] ? arrayDocumentsLevelActual[0].nombre : 'SN' }}</b>
                        </p>
                    </div>
                    <div class="text-center mt-3">
                        <img width="120" src="../../../../assets/img/targeta.webp" alt="">
                    </div>
                </section>
                <section v-else>
                    <div class="alertdanger mb-3">
                        <p class="parrafo">
                            Este módulo permite respaldar las matrículas actuales a otra base de datos y
                            limpiar las matrículas actuales antes de empezar un nuevo periodo académico
                        </p>
                    </div>
                    <div class="text-center">
                        <img width="200" src="../../../../assets/img/clonar.webp" alt="">
                    </div>
                </section>
            </template>
            <template v-slot:acccion>
                <section v-if="pasos">
                    <ButtonLoading v-if="isLoading" />
                    <button @click="getData" v-else :disabled="isDisabled" class="btn btnNaranja mt-2">
                        Procesar matriculas
                    </button>
                </section>
                <section v-else>
                    <ButtonLoading v-if="ifLoad" />
                    <button @click="cloneData" v-else type="submit" class="btn btnNaranja mt-2">
                        Ejecutar proceso
                    </button>
                </section>
            </template>
        </Modal>
    </section>

</template>
<script >
import Modal from "../../../../shared/Modal.vue";
import ButtonLoading from "../../../../shared/ButtonLoading.vue";
import Dropdown from "../../../../shared/Dropdown.vue";
import ServiceMatricula from '../../../../service/funcions';
const ResultServiceMatricula = new ServiceMatricula();
export default {
    name: 'MigracionMatricula',
    components: {
        Modal, ButtonLoading, Dropdown
    },
    data() {
        return {
            modals: true,
            ifLoad: false,
            arrayDocumentsLevel: [],
            arrayDocumentsCourse: [],
            arrayDocumentsLevelActual: [],
            ifLoadPeriodo: false,
            ifLoadCourse: false,
            PeriodoAnterior: null,
            PeriodoActual: '',
            isLoading: false,
            model: {
                nmatricula: '',
                folio: '',
                fknivel: '',
                academico: '',
            },
            fecha: '',
            objetosRechasados: [],
            pasos: false,

        }
    },
    created() {
        this.__getPeriodo();
        this.__listNivele();
        this.fechaActual();
    },
    computed: {
        isDisabled() {
            return this.PeriodoAnterior == '' && this.PeriodoActual == ''
        },
    },
    methods: {
        getData: function () {
            if (this.PeriodoAnterior != null) {
                this.isLoading = true;
                this.$proxies._migracionProxi
                    .getByIdOfPeriodo(this.PeriodoAnterior._id)
                    .then((x) => {
                        this.isLoading = false;
                        this.sendArraysMatricula(x.data)
                       
                    })
                    .catch((err) => {
                        alert('NO SE PUEDE COMPLETAR EL PROCESO')
                        console.log("Error", err);
                        this.isLoading = false;
                    });
            }
        },
        sendArraysMatricula(array) {
            try {
                if (array.length > 0) {
                    this.isLoading = true;
                    const arraysMatricula = [];
                    let fkestudiante, nombre, academico, fknivel, curso;
                    for (let i = 0; i < array.length; i++) {
                        fkestudiante = array[i].fkestudiante;
                        nombre = array[i].nombre;
                        curso = array[i].curso;
                        academico = this.arrayDocumentsLevelActual[0]._id;
                        fknivel = this.nextCourse(array[i].fknivel.num);
                        if (fknivel == '') {
                            continue;
                        }
                        arraysMatricula.push({
                            fkestudiante: fkestudiante, nombre: nombre, estado: 1, fecha: this.fecha,
                            academico: academico, fknivel: fknivel, curso: curso, nmatricula: '1', folio: '1'
                        })
                    }
                    this.$proxies._matriculaProxi
                        .createMatricula(arraysMatricula)
                        .then((res) => {
                            this.isLoading = false;
                            this.toast('Se matriculo correctamente a ' + arraysMatricula.length + ' estudiantes')
                            this.objetosRechasados = res.data.duplicados;
                            if (this.objetosRechasados.length != 0) this.isDuplicado = true;
                            this.close()
                        })
                        .catch((error) => {
                            console.log("Error", error);
                            this.isLoading = false;
                            this.close()
                        });

                }
            } catch (error) {
                console.log("Error", error);
                this.isLoading = false;
            }

        },
        nextCourse(num) {
            let aux = 1 + parseInt(num)
            const res = this.arrayDocumentsCourse.filter((x) => x.num == aux);
            if (res.length > 0) {
                return res[0]._id;
            } else {
                return '';
            }
        },
        close() {
            this.$emit('myEventClosedModalclon')
        },
        __getPeriodo() {
            this.ifLoadPeriodo = true;
            this.$proxies._matriculaProxi
                .getFull()
                .then((x) => {
                    let filtro = x.data.niveles;
                    this.arrayDocumentsLevel = filtro.filter((x) => x.estado != "1");
                    this.arrayDocumentsLevelActual = filtro.filter((x) => x.estado == "1");
                    this.ifLoadPeriodo = false;
                })
                .catch((err) => {
                    console.log("Error", err);
                    this.ifLoadPeriodo = false;
                });
        },
        __listNivele() {
            this.ifLoadCourse = true;
            this.$proxies._gestionProxi
                .getNiveles()
                .then((x) => {
                    this.arrayDocumentsCourse = x.data;
                    this.ifLoadCourse = false;
                })
                .catch((err) => {
                    console.log("Error", err);
                    this.ifLoadCourse = false;
                });
        },
        cloneData() {
            this.ifLoad = true;
            this.$proxies._migracionProxi
                .create()
                .then(() => {
                    this.ifLoad = false;
                    this.toast('La base de datos fue migrada')
                    this.removeData();
                })
                .catch((err) => {
                    console.log("Error", err);
                    this.ifLoad = false;
                    this.$emit('myEventClosedModalMigracion1');
                });
        },
        removeData() {
            this.ifLoad = true;
            this.$proxies._migracionProxi
                .remove()
                .then(() => {
                    this.ifLoad = false;
                    this.toast('Las matriculas de este periodo fueron eliminadas')
                    this.pasos = true;
                })
                .catch((err) => {
                    console.log("Error", err);
                    this.ifLoad = false;
                    this.close()
                });
        },
        toast(message) {
            this.$toasted.info(message, {
                duration: 3000,
                position: 'bottom-center',
                icon: "check-circle",
                theme: "toasted-primary",
                action: {
                    text: 'CERRAR',
                    onClick: (e, toastObject) => {
                        toastObject.goAway(0);
                    }
                }
            });
        },
        fechaActual() {
            this.fecha = ResultServiceMatricula.calcular_fecha();
        },
    },

}
</script>
  