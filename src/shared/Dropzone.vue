<template>
    <div>
        <vue-dropzone class="mt-1"
            style="height:180px;background-color: rgb(245, 248, 250);border: 1px dashed rgb(81, 111, 144);border-radius: 4px;color: rgb(124, 152, 182);"
            ref="dropzone" @vdropzone-success="afterComplete" id="drop1" :options="dropOptions">
        </vue-dropzone>
        <a v-if="link!==''" @click="removeAllFiles" class="fuente tamanio" href="javascript:;"><i
                class="far fa-trash-alt me-2 iconos"></i>
            <b class=" me-2 links">Eliminar documento</b>
        </a>
        <div v-if="ifLoad" class="loadingg">
            <div class="inn ">
                <img src="../assets/img/icons/astronaut2.svg" style="height:100px;" alt="avatar image"
                    class="refresh-start" />
            </div>
        </div>
    </div>

</template>

<script>
import { StorageRef } from "../boot/firebase";
import vueDropzone from "vue2-dropzone";
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
let image = require("../assets/img/usados/all.svg");
export default {
    props: {},
    components: { vueDropzone },
    data() {
        return {
            dropOptions: {
                url: "https://httpbin.org/post",
                dictDefaultMessage: `
        <img alt='Image placeholder' style='padding-top:-12px;' height='130px;' class='mx-4 mt-n6' src='${image}'>
        <p class='text-sm fuente links'><i class='fa fa-cloud-upload mr-2'></i>&nbsp;&nbsp;Seleccionar un archivo </p>
        `,
                maxFilesize: 1,
                maxFiles: 1,
                thumbnailHeight: 140,
            },
            ifLoad: false,
            link: ''
        }
    },
    methods: {
        afterComplete(upload) {
            this.ifLoad = true;
            var date = new Date();
            let result = date.toISOString();
            const storageRef = StorageRef.ref(`arctask/${result}`).put(
                upload
            );
            storageRef.on(
                `state_changed`,
                (snapshot) => {
                    this.uploadValue =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    this.ifLoad = false;
                    alert('no se puede subir este archivo revise el internet')
                    console.log(error.message);
                },
                () => {
                    this.uploadValue = 100;
                    storageRef.snapshot.ref.getDownloadURL().then((url) => {
                        this.link = url;
                        this.submitArchive(this.link);
                        this.ifLoad = false;
                    });
                }
            );
        },
        removeAllFiles() {
            this.$refs.dropzone.removeAllFiles();
            this.link = ''
        },
        submitArchive(url) {
            this.$emit('uploadArchive', url)
        }
    },
}
</script>
<style>
@keyframes rotate {
    from {
        transform: rotate(0deg)
    }

    to {
        transform: rotate(360deg)
    }
}

.refresh-start {
    animation-name: rotate;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-play-state: running;
}

@keyframes moveleft {
    0% {
        transform: translate(100px, 0)
    }

    100% {
        transform: translate(0, 0)
    }
}

.movimiento {
    animation-name: moveleft;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    animation-duration: 3s
}
</style>
