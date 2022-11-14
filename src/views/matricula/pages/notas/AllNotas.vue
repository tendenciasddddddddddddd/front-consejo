<template>
    <Modal @close="close">
        <template v-slot:header>Registro de notas</template>
        <template v-slot:body>
            <Spinner v-if="isDocente"></Spinner>
            <div v-else>
                <span class="negros text-sm gordo">Docente</span>
                <Dropdown v-model="docente" :options="listDocentes" /><br>
                <span class="negros text-sm gordo">Curso</span>
                <Spinner v-if="isData"></Spinner>
                <Dropdown v-else v-model="curso" :options="listniveles" />
            </div>
        </template>

    </Modal>
</template>
  
<script>
import Spinner from "../../../../shared/Spinner.vue";
import Modal from "../../../../shared/Modal"
import Dropdown from "../../../../shared/Dropdown.vue";
export default {
    name: 'Report',
    components: {
        Spinner, Modal, Dropdown,
    },
    data() {
        return {
            listniveles: [],
            infoMat: {},
            curso: "",
            isDocente: false,
            listDocentes: [],
            docente: '',
            isData: false,
            nombreDocente: ''
        }
    },
    watch: {
        curso: function (value) {
            this.isSelecMatricula = [];
            this.__cambios(value);
        },
        docente: function (value) {
            this.listniveles = []
            this.isSelecMatricula = [];
            this.__cambiosDistributivo(value);
        }
    },

    methods: {
        __listdocentes: function () {
            this.listDocentes = []
            this.isDocente = true;
            this.$proxies._registroProxi
                .getListDocentes()
                .then((x) => {
                    const result = x.data;
                    for (let i = 0; i < result.length; i++) {
                        this.listDocentes.push({ _id: result[i]._id, nombre: result[i].fullname })
                    }
                    this.isDocente = false;
                })
                .catch((err) => {
                    console.log("Error", err);
                    this.isDocente = false;
                });
        },
        __cambios(res) {
            if (res != null) {
                var myCourse = {
                    paralelo: res.paralelo,
                    nombre: res.nombre,
                    materia: res.materia,
                    area: res.area,
                    idDistributivo: res.idDistributivo,
                    planificacion: res.planificacion,
                    nivel: res.nivel,
                    nombredoc: res.nombredoc,
                    num: res.num
                };
                let id = res._id;
                localStorage.removeItem("myCourse");
                if (!localStorage.getItem("myCourse")) {
                    localStorage.setItem("myCourse", JSON.stringify(myCourse));
                    if (res.num == 1 || res.num == 2 || res.num == 3) {
                        this.$router.push({ path: `/iniciales/${id}` });
                    } else {
                        this.$router.push({ path: `/menuCurso/${id}` });
                    }
                }
            }

        },
        __cambiosDistributivo(data) {
            if (data != null) {
                this.isData = true;
                this.$Progress.start();
                if (data._id) {
                    this.$proxies._gestionProxi
                        .updateInfoDocentes(data._id)
                        .then((x) => {
                            let result = x.data;
                            this.nombreDocente = data.nombre
                            this.getData(result);
                            this.isData = false;
                            this.$Progress.finish();
                        })
                        .catch((err) => {
                            console.log("Error", err);
                            this.isData = false;
                            this.$Progress.fail();
                        });
                }
            }
        },
        getData(result) {
            this.listniveles = []
            if (result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    let id = result[i].fnivel._id;
                    const element = result[i].fnivel;
                    const element2 = result[i].fmateria;
                    const paralelo = result[i].paralelo;
                    const idDistributivo = result[i]._id;
                    this.listniveles.push({
                        _id: id,
                        paralelo: paralelo,
                        nombre: element.nombre + ' (' + paralelo + ') ' + element2.nombre,
                        materia: element2.nombre,
                        area: element2.area,
                        idDistributivo: idDistributivo,
                        planificacion: result[i].planificacion,
                        nivel: element.nombre,
                        num: element.num,
                        nombredoc: this.nombreDocente
                    })
                }
            }
        },
        close() {
            this.$emit('myEventClosedModalMigracion2');
        },
    },
    created() {
        this.__listdocentes();
    },
};
</script>
  
    
  