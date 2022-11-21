<template>
    <section>
        <FullModal @close="close">
            <template v-slot:header> Selecciona y recorta una imagen</template>
            <template v-slot:body>
                <div class="alertdanger mt-1">
                    <p class="parrafo">
                        Tu foto de avatar es visible para todos en la plataforma y en
                        cualquier contexto público tales como como el chat.
                    </p>
                </div>
                <div v-if="!isFile" class="fontImg mt-4 text-center p-6">
                    <i style="font-size:66px;" class="fa fa-picture-o" aria-hidden="true"></i>
                    <span style="cursor: pointer;" class="button fuente tamanio links" @click="$refs.file.click()">
                        <input type="file" class="btn btnNaranja" ref="file" @change="uploadImage($event)"
                            accept=".png, .jpg, .jpeg" />
                        <b>Elegir una foto</b>
                    </span>
                </div>
                <div v-else class="mt-3">
                    <span style="cursor: pointer;" class="button fuente tamanio links" @click="$refs.file.click()">
                        <input type="file" class="btn btnNaranja" ref="file" @change="uploadImage($event)"
                            accept="image/*" />
                        <b>Elegir una foto</b>
                    </span>
                    <div class="fondot mt-2">
                        <cropper ref="cropper" class="cropper" :src="image.src"
                            :stencil-component="$options.components. Stencil"></cropper>
                    </div>

                </div>
            </template>
            <template v-slot:footer>
                <ButtonLoading v-if="isImageUploads" />
                <button @click="cropImages()" v-else class="btn btnNaranja mt-2">
                    Guardar
                </button>
            </template>

        </FullModal>
    </section>

</template>
<script >
import FullModal from "../../../shared/FullModal.vue";
import ButtonLoading from "../../../shared/ButtonLoading.vue";
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import * as axios from "axios";
//import Stencil from "../../../shared/Stencil";
const avat = require('../../../assets/img/icons/profile.jpg')
export default {
    name: 'MigracionMatricula',
    components: {
        FullModal, ButtonLoading, Cropper,

    },
    data() {
        return {
            ifLoad: false,
            isLoading: false,
            isFile: false,
            img: avat,
            image: {
                src: avat,
                type: "image/jpg",
            },
            roles: this.$store.state.user.roles,
            user: this.$store.state.user,
            modelFotos :{
          foto:null,
      },
      isImageUploads: false
        }
    },
    created() {

    },
    computed: {

    },
    methods: {
        cropImages() {
            const { canvas } = this.$refs.cropper.getResult();
            if (canvas) {
                this.isImageUploads = true;
                const form = new FormData();
                canvas.toBlob(blob => {
                    form.append('myFile', blob);
                    axios
                        .post("https://wesweb.online/api/upload", form, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .then(x => {
                            this.img1 = x.data;
                            this.uploadFoto(this.img1);

                        }).catch(x => {
                            this.isImageUploads = false;
                            if (x.response.status == 500) {
                                this.toast('Los formatos aceptados son .png .jpg .jpeg')
                            } else {
                                this.toast("Notifique el administrador el error");
                            }
                        })
                }, 'image/jpeg');
            }

        },

        uploadImage(event) {
            const { files } = event.target;
            let format = event.target.files[0];
            if (!window.FileReader) {
                this.$dialog.alert('El navegador no soporta la lectura de archivos');
                return;
            }
            if (!(/\.(jpg|png|jpeg)$/i).test(format.name)) {
                this.$dialog.alert('El archivo a adjuntar no es una imagen con formato PNG o JPG ');
                return;
            }
            if (files && files[0]) {
                // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
                if (this.image.src) {
                    URL.revokeObjectURL(this.image.src);
                }
                // 2. Create the blob link to the file to optimize performance:
                const blob = URL.createObjectURL(files[0]);
                this.isFile = true;
                // 3. Update the image. The type will be derived from the extension and it can lead to an incorrect result:
                this.image = {
                    src: blob,
                    type: files[0].type,
                };
            }
        },
        uploadFoto(img){
      if (this.user.id && img != null) {
        this.modelFotos.foto = img;
        this.$proxies._registroProxi
          .updateDocentes(this.user.id, this.modelFotos) //-----------EDITAR CON AXIOS
          .then(() => {
            this.$store.commit('agregar2',{img})
            this.isImageUploads = false;
            this.close();
            localStorage.setItem('Avatar', JSON.stringify(img));
            this.$emit("changeAvatar", img);
          })
          .catch(() => {
            alert("Error al intentar actualizar la imagen");
            this.isImageUploads = false;
          });
       } 
    },
        close() {
            this.$emit('myEventClosed')
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
    },

}
</script>
  