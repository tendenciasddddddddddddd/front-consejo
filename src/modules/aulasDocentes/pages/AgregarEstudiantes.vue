<template>
    <Modal @close="close">
        <template v-slot:header>INGRESA TODOS TUS ESTUDIANTES</template>
        <template v-slot:body>
            <p v-if="ifLoad">Cargando</p>
            <v-select v-else class="mt-3" v-model="users" multiple :options="info" label="fullname"
                item-value="fullname">
                <template #option="{ fullname }">
                    <h6 style="margin: 0">{{ fullname }}</h6>
                </template>
                <template #no-options="{}">
                    Lo siento, no hay opciones de coincidencia.
                </template>
            </v-select>

            <div class="text-center mt-4">
                <img width="240" src="../../../assets/img/consolidado.svg" alt="">
            </div>

        </template>
        <template v-slot:acccion>
            <ButtonLoading v-if="ifLoad" />
            <button v-else @click="save" type="submit" class="btn btnNaranja mt-2">
                Guardar cambios
            </button>
        </template>

    </Modal>

</template>
<script lang="js">
import Modal from "../../../shared/Modal.vue";
import ButtonLoading from "../../../shared/ButtonLoading.vue";
export default {
    name: 'Consolidado',
    props: {
        objectUser: Array
    },
    components: {
        Modal, ButtonLoading
    },
    data() {
        return {
            iflista: false,
            ifLoad: false,
            info: {},
            users: [],
            model: {
                _id: this.$route.params.id,
                estudiantes: {
                    usuario: '',
                    name: "",
                    email: "",
                },
            },
        }
    },
    methods: {
        save() {
            const arrays = []
            if (this.users.length > 0) {
                for (let i = 0; i < this.users.length; i++) {
                    const element = this.users[i];
                    const found = this.objectUser.some(item => item.usuario === element._id);
                    if (!found) {
                        arrays.push({ usuario: element._id, name: element.fullname })
                    }
                }
            }
            if (arrays.length == 0) this.close()
            this.$Progress.start();
            this.model.estudiantes = arrays
            this.$proxies._aulaProxi
                .update(this.model._id, this.model)
                .then(() => {
                    this.ifLoad = false;
                    this.close()
                    this.$emit('getData')
                    this.$Progress.finish();
                })
                .catch((err) => {
                    this.close()
                    this.$emit('getData')
                    console.log("Error", err);
                    this.ifLoad = false;
                    this.$Progress.fail();
                });
        },
        close() {
            this.$emit('myEventTask')
        },
        getDatas() {
            this.$Progress.start();
            this.ifLoad = true;
            this.$proxies._matriculaProxi
                .getAllEstudiantes()
                .then((x) => {
                    this.info = x.data;
                    this.ifLoad = false;
                    this.$Progress.finish();
                })
                .catch(() => {
                    this.ifLoad = false;
                    this.$Progress.fail();
                });
        },
    },
    created() {
        this.getDatas()
    },
}
</script>
  