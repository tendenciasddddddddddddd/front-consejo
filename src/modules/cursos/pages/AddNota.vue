<template>
    <FullModal @close="close">
        <template v-slot:header> Notas </template>
        <template v-slot:body>
            <div class="multisteps-form__progress">
                <button :class="{
                    'js-active ':
                        isVisible === 'pane1' ||
                        isVisible === 'pane2' ||
                        isVisible === 'pane3' ||
                        isVisible === 'pane4',
                }" class="multisteps-form__progress-btn " type="button" title="User Info">
                    <a class="parrafo text-dark">Parcial 1</a>
                </button>
                <button :class="{
                    'js-active ':
                        isVisible === 'pane2' ||
                        isVisible === 'pane3' ||
                        isVisible === 'pane4',
                }" class="multisteps-form__progress-btn " type="button" title="Address">
                    <a class="parrafo text-dark">Parcial 2</a>
                </button>
                <button :class="{
                    'js-active': isVisible === 'pane3' || isVisible === 'pane4',
                }" class="multisteps-form__progress-btn " type="button" title="Address">
                    <a class="parrafo text-dark">Parcial 3</a>
                </button>
                <button :class="{ 'js-active': isVisible === 'pane4' }" class="multisteps-form__progress-btn "
                    type="button" title="Address">
                    <a class="parrafo text-dark">Examen</a>
                </button>
            </div>
            <form @submit.prevent="save" id="notas">
                <div class="mt-3" v-if="isVisible === 'pane1'">
                    <span class="parrafo ">Primer aporte</span>
                    <CustomInput v-model="notasx.ap11" />
                    <p class="mb-2 text-xs text-danger">
                        {{ validation.firstError("notasx.ap11") }}
                    </p>
                    <span class="parrafo ">Segundo aporte</span>
                    <CustomInput v-model="notasx.ap12" />
                    <p class="mb-2 text-xs text-danger">
                        {{ validation.firstError("notasx.ap12") }}
                    </p>
                    <span class="parrafo ">Tercer aporte</span>
                    <CustomInput v-model="notasx.ap13" />
                    <p class="mb-2 text-xs text-danger">
                        {{ validation.firstError("notasx.ap13") }}
                    </p>
                    <span class="parrafo ">Cuarto aporte</span>
                    <CustomInput v-model="notasx.ap14" />
                    <p class="mb-2 text-xs text-danger">
                        {{ validation.firstError("notasx.ap14") }}
                    </p>
                    <span class="parrafo ">Quinto aporte</span>
                    <CustomInput v-model="notasx.ap15" />
                    <p class="mb-0 text-xs text-danger">
                        {{ validation.firstError("notasx.ap15") }}
                    </p>
                </div>
                <div class="mt-3 " v-if="isVisible === 'pane2'">
                    <span class="parrafo ">Primer aporte</span>
                    <CustomInput v-model="notasx.ap21" />
                    <p class="mb-2 text-xs text-danger">
                        {{ validation.firstError("notasx.ap21") }}
                    </p>
                    <span class="parrafo">Segundo aporte</span>
                    <CustomInput v-model="notasx.ap22" />
                    <p class="mb-2 text-xs text-danger">
                        {{ validation.firstError("notasx.ap22") }}
                    </p>
                    <span class="parrafo">Tercer aporte</span>
                    <CustomInput v-model="notasx.ap23" />
                    <p class="mb-2 text-xs text-danger">
                        {{ validation.firstError("notasx.ap23") }}
                    </p>
                    <span class="parrafo mt-3">Cuarto aporte</span>
                    <CustomInput v-model="notasx.ap24" />
                    <p class="mb-0 text-xs text-danger">
                        {{ validation.firstError("notasx.ap24") }}
                    </p>
                    <span class="parrafo mt-3">Quinto aporte</span>
                    <CustomInput v-model="notasx.ap25" />
                    <p class="mb-0 text-xs text-danger">
                        {{ validation.firstError("notasx.ap25") }}
                    </p>
                </div>
                <div class="mt-3" v-if="isVisible === 'pane3'">
                    <span class="parrafo ">Primer aporte</span>
                    <CustomInput v-model="notasx.ap31" />
                    <p class="mb-2 text-xs text-danger">
                        {{ validation.firstError("notasx.ap31") }}
                    </p>
                    <span class="parrafo">Segundo aporte</span>
                    <CustomInput v-model="notasx.ap32" />
                    <p class="mb-2 text-xs text-danger">
                        {{ validation.firstError("notasx.ap32") }}
                    </p>
                    <span class="parrafo ">Tercer aporte</span>
                    <CustomInput v-model="notasx.ap33" />
                    <p class="mb-2 text-xs text-danger">
                        {{ validation.firstError("notasx.ap33") }}
                    </p>
                    <span class="parrafo">Cuarto aporte</span>
                    <CustomInput v-model="notasx.ap34" />
                    <p class="mb-2 text-xs text-danger">
                        {{ validation.firstError("notasx.ap34") }}
                    </p>
                    <span class="parrafo ">Quinto aporte</span>
                    <CustomInput v-model="notasx.ap35" />
                    <p class="mb-0 text-xs text-danger">
                        {{ validation.firstError("notasx.ap35") }}
                    </p>
                </div>
                <div class="mt-3 " v-if="isVisible === 'pane4'">
                <h5>{{isAlumno}}</h5>
                    <span class="parrafo mt-2">Nota examen</span>
                    <CustomInput v-model="model.calificaciones.notas.examen" />
                    <p class="mb-2 text-xs text-danger">{{
                            validation.firstError(
                                "model.calificaciones.notas.examen"
                            )
                    }}
                    </p>
                    <span class="parrafo ">A que Quimestre Pertenece?</span>
                    <select :class="{
                        error: validation.hasError(
                            'model.notas.calificaciones.quimestre'
                        ),
                    }" v-model="model.calificaciones.notas.quimestre" class="form-control buscador" required>
                        <option value="p1">Primer Quimestre</option>
                        <option value="p2">Segundo Quimestre</option>
                    </select>
                    <p class="mb-0 text-sm text-danger">
                        {{
                                validation.firstError(
                                    "model.calificaciones.notas.quimestre"
                                )
                        }}
                    </p>

                    <div v-if="isDoble" class="mt-4">
                        <div class="freemeeting-tip">
                            <p class="text-sm text-dark fuente">
                                Creo que perdiste el rumbo, revisa nuevamente las notas
                                ya que dichas notas no las puedo procesar tal vez te
                                falto un campo o ingresaste mal una nota con decimal.
                                😉😉
                            </p>
                        </div>
                    </div>
                    <div v-if="isDuplicado" class="mt-4">
                        <div class="freemeeting-tip">
                            <p class="text-sm text-dark fuente">
                                Tal parece que este estudiante ya tiene registrado una
                                nota en este quimestre, intenta con otro. 😉😉
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </template>
        <template v-slot:footer>
            <div v-if="isVisible === 'pane1'">
                <a class="btn btnNaranja " @click="isVisible = 'pane2'">
                    Siguiente &nbsp; <i class="ni ni-bold-right"></i>
                </a>
            </div>
            <div v-if="isVisible === 'pane2'">
                <a class="btn btnNaranjaClaro" @click="isVisible = 'pane1'">
                    <i class="ni ni-bold-left"></i> &nbsp; Vulver
                </a>
                &nbsp; &nbsp;
                <a class="btn btnNaranja " @click="isVisible = 'pane3'">
                    Siguiente &nbsp; <i class="ni ni-bold-right"></i>
                </a>
            </div>
            <div v-if="isVisible === 'pane3'">
                <a class="btn btnNaranjaClaro" @click="isVisible = 'pane2'">
                    <i class="ni ni-bold-left"></i> &nbsp; Vulver
                </a>
                &nbsp; &nbsp;
                <a class="btn btnNaranja " @click="isVisible = 'pane4'">
                    Siguiente &nbsp; <i class="ni ni-bold-right"></i>
                </a>
            </div>
            <div v-if="isVisible === 'pane4'">
                <a class="btn btnNaranjaClaro" @click="isVisible = 'pane3'">
                    <i class="ni ni-bold-left"></i> &nbsp; Vulver
                </a>
                &nbsp; &nbsp;
                <button v-if="ifLoad" class="btn btn-sm btnNaranja" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Trabajando...
                </button>

                <button v-else type="submit" class="btn btnNaranja" form="notas">
                    Guardar
                </button>
            </div>
            <div v-if="isVisible === 'pane5'">
                <a class="btn btnNaranja " @click="close()">
                    Salir de Aqui &nbsp; <i class="ni ni-bold-right"></i>
                </a>
            </div>
        </template>
    </FullModal>
</template>

<script>
import FullModal from "../../../shared/FullModal.vue";
import CustomInput from "../../../shared/CustomInput.vue";
import quialifyservice from "./services";
const ResultServiceNota = new quialifyservice();
export default {
    name: 'AddNota',
    components: { FullModal, CustomInput },
    props: {
        collects: Object
    },
    data() {
        return {
            notasx: {
                ap11: "",
                ap12: "",
                ap13: "",
                ap14: "",
                ap15: "",
                ap21: "",
                ap22: "",
                ap23: "",
                ap24: "",
                ap25: "",
                ap31: "",
                ap32: "",
                ap33: "",
                ap34: "",
                ap35: "",
            },
            model: {
                _id: null,
                calificaciones: {
                    _id: null,
                    notas: {
                        quimestre: "",
                        promedio: "",
                        examen: "",
                        arraysNote: "",
                    },
                },
            },
            idTasks: '',
            ifLoad: false,
            ifLoad2: false,
            img1: '',
            isVisible: "pane1",
            isDuplicado: false,
            isDoble: false,
            id :"",
            isAlumno: ''
        }
    },
    methods: {
        close() {
            this.$emit('EventClose');
        },
        initial() {
            if (this.collects.id != undefined) {
                this.id = this.collects.id;
                this.model.calificaciones._id = this.collects.fora;
                this.isAlumno = this.collects.name;
            }
        },
        save() {
            this.$validate().then((success) => {
                if (!success) {
                    this.isDoble = true;
                    return;
                }
                    this.algoritmoNotas();
                    this.ArraysStringNotas();
                    this.ifLoad = true;
                    this.$proxies._notasProxi
                        .updateReforma2(this.id, this.model) //-----------EDITAR CON AXIOS
                        .then(() => {
                            this.ifLoad = false;
                            this.close();
                            this.getData();
                           this.toast('Tarea creada exitosamente!!');
                        })
                        .catch((err) => {
                            console.log("Error", err);
                            this.ifLoad = false;
                        });
            });
        },
        algoritmoNotas() {
            this.model.calificaciones.notas.promedio = ResultServiceNota.calcular_promedio(
                this.notasx.ap11,
                this.notasx.ap12,
                this.notasx.ap13,
                this.notasx.ap14,
                this.notasx.ap15,
                this.notasx.ap21,
                this.notasx.ap22,
                this.notasx.ap23,
                this.notasx.ap24,
                this.notasx.ap25,
                this.notasx.ap31,
                this.notasx.ap32,
                this.notasx.ap33,
                this.notasx.ap34,
                this.notasx.ap35,
                this.model.calificaciones.notas.examen
            );
        },
        
    ArraysStringNotas() {
      this.model.calificaciones.notas.arraysNote =
        this.notasx.ap11 +
        "," +
        this.notasx.ap12 +
        "," +
        this.notasx.ap13 +
        "," +
        this.notasx.ap14 +
        "," +
        this.notasx.ap15 +
        "," +
        this.notasx.ap21 +
        "," +
        this.notasx.ap22 +
        "," +
        this.notasx.ap23 +
        "," +
        this.notasx.ap24 +
        "," +
        this.notasx.ap25 +
        "," +
        this.notasx.ap31 +
        "," +
        this.notasx.ap32 +
        "," +
        this.notasx.ap33 +
        "," +
        this.notasx.ap34 +
        "," +
        this.notasx.ap35;
    },
        getData() {
            this.$emit('getData');
        },
        toast(message) {
            this.$toasted.info(message, {
                duration: 2100,
                position: 'top-center',
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
    },
    mounted() {
        this.initial()
    },
    validators: {
        "model.calificaciones.notas.quimestre"(value) {
            return this.$validator.value(value).required();
        },

        "notasx.ap11": function (value) {
            return this.$validator
                .value(value)
                .required()
                .between(1, 10)
                .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
        },
        "notasx.ap12"(value) {
            return this.$validator
                .value(value)
                .required()
                .between(1, 10)
                .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
        },
        "notasx.ap13"(value) {
            return this.$validator
                .value(value)
                .required()
                .between(1, 10)
                .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
        },
        "notasx.ap14"(value) {
            return this.$validator
                .value(value)
                .required()
                .between(1, 10)
                .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
        },
        "notasx.ap15"(value) {
            return this.$validator
                .value(value)
                .required()
                .between(1, 10)
                .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
        },
        "notasx.ap21"(value) {
            return this.$validator
                .value(value)
                .required()
                .between(1, 10)
                .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
        },
        "notasx.ap22"(value) {
            return this.$validator
                .value(value)
                .required()
                .between(1, 10)
                .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
        },
        "notasx.ap23"(value) {
            return this.$validator
                .value(value)
                .required()
                .between(1, 10)
                .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
        },
        "notasx.ap24"(value) {
            return this.$validator
                .value(value)
                .required()
                .between(1, 10)
                .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
        },
        "notasx.ap25"(value) {
            return this.$validator
                .value(value)
                .required()
                .between(1, 10)
                .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
        },
        "notasx.ap31"(value) {
            return this.$validator
                .value(value)
                .required()
                .between(1, 10)
                .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
        },
        "notasx.ap32"(value) {
            return this.$validator
                .value(value)
                .required()
                .between(1, 10)
                .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
        },
        "notasx.ap33"(value) {
            return this.$validator
                .value(value)
                .required()
                .between(1, 10)
                .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
        },
        "notasx.ap34"(value) {
            return this.$validator
                .value(value)
                .required()
                .between(1, 10)
                .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
        },
        "notasx.ap35"(value) {
            return this.$validator
                .value(value)
                .required()
                .between(1, 10)
                .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
        },
        "model.calificaciones.notas.examen"(value) {
            return this.$validator
                .value(value)
                .required()
                .between(1, 10)
                .regex("^[0-9.]*$", "Para decimales es con punto 7.5");
        },
    },
}
</script>