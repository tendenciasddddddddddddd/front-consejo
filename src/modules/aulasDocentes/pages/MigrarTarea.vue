<template>
    <Modal @close="close">
        <template v-slot:header>MIGRAR TAREA A OTROS CURSOS</template>
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
                Migrar tarea
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
        detalleTask: Object
    },
    components: {
        Modal, ButtonLoading
    },
    data() {
        return {
            user: this.$store.state.user,
            roles: this.$store.state.user.roles,
            iflista: false,
            ifLoad: false,
            info: [],
            users: [],
            model: {
                _id: null,
                task: {
                    nombre: null,
                    descripcion: null,
                    archivo: null,
                    finicio: null,
                    estado: 0,
                    fechad: ''
                },
            },
        }
    },
    methods: {
        save() {
            if (this.users.length > 0) {
                this.model.task.nombre = this.detalleTask.nombre
                this.model.task.descripcion = this.detalleTask.descripcion
                this.model.task.archivo = this.detalleTask.archivo
                this.model.task.finicio = this.detalleTask.finicio
                this.model.task.fechad = this.detalleTask.fechad
                //this.model.task.entrega = []
                for (let i = 0; i < this.users.length; i++) {
                    const element = this.users[i];
                    this.$proxies._aulaProxi
                        .createTask(element.id, this.model) 
                        .then(() => {
                            this.ifLoad = false;
                            this.close();
                            this.$emit('getData')
                            this.toast('La tarea se migro exitosamente!!');
                        })
                        .catch(() => {
                            this.$dialog.alert("El servidor responde bad req.");
                            this.$emit('getData')
                            this.ifLoad = false;
                        });
                }
            } else {
                this.$dialog.alert("select un curso");
                this.close() 
            }
           
        },
        close() {
            this.$emit('myEventTask')
        },
        getDatas() {
            this.isData = true;
            this.$Progress.start();
            if (this.user.id) {
                this.$proxies._aulaProxi
                    .updateAulaDocentes(this.user.id)
                    .then((x) => {
                        const result = x.data;
                        for (let i = 0; i < result.length; i++) {
                            const element = result[i];
                            this.info.push({ id: element._id, fullname: element.nombre + ' '+ element.materia })
                        }
                        this.$Progress.finish();
                    })
                    .catch((err) => {
                        console.log("Error", err);
                        this.$Progress.fail();
                    });
            }
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
    created() {
        this.getDatas()
    },
}
</script>
  