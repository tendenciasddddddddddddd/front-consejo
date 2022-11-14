<template>
    <div>
        <div class="text-end">
            <a @click="removeAllFiles" class=" tamanio" href="javascript:;" >
               
                <svg class="me-2" data-testid="geist-icon" fill="none" height="18" shape-rendering="geometricPrecision"
                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    viewBox="0 0 24 24" width="18" style="color: #000;margin-top: -3px;">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                    <path d="M10 11v6"></path>
                    <path d="M14 11v6"></path>
                </svg>
                <b class=" me-2 links2 gordo">Quitar este archivo</b>
            </a>
        </div>
        <vue-dropzone class="mt-1"
            style="height:280px;background-color: rgb(245, 248, 250);border: 1px dashed rgb(81, 111, 144);border-radius: 4px;color: rgb(124, 152, 182);"
            ref="dropzone" @vdropzone-success="afterComplete" @vdropzone-upload-progress="dropzoneUploadProgress" id="drop1" :options="dropOptions">
        </vue-dropzone>
        <astronauta2 v-if="ifLoad"/>
    </div>

</template>

<script>
import { StorageRef } from "../boot/firebase";
import Astronauta2 from "./Astronauta2.vue";
import vueDropzone from "vue2-dropzone";
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
let image = require("../assets/img/submit.svg");
export default {
    props: {},
    components: { vueDropzone, Astronauta2 },
    data() {
        return {
            dropOptions: {
                url: "https://httpbin.org/post",
                dictDefaultMessage: `
        <img alt='Image placeholder' style='height:130px;margin-top: 1px !important;' class='mx-4 mt-n6' src='${image}'>
        <p class='text-sm gordo mt-2 links2'><i class='fa fa-cloud-upload mr-2'></i>&nbsp;&nbsp;Seleccionar un archivo </p>
        `,
                maxFilesize: 5,
                maxFiles: 1,
                thumbnailHeight: 140,
            },
            ifLoad: false,
            link: '',
            datt: ''
        }
    },
    methods: {
        dropzoneUploadProgress(file, progress){
            if (progress   <=100) {
                this.ifLoad = true;
            }
            this.datt = file;
        },
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

