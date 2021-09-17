<template>
<div class="columns">
  <div class="column is-one-fifth is-2">
      <div class="dropbox" :style="[nombreimagen ? {'background': 'url('+nombreimagen+')'} : {'background': 'url(https://firebasestorage.googleapis.com/v0/b/back-ends.appspot.com/o/perfiles%2Fprofile.jpg?alt=media&token=bf6ad3bb-84a5-442a-8ac0-4a906e3ec1bd)'}]">
      
        <label
          >
          <input
            type="file"
            id="file"
            class="input-file"
            ref="file"
            @change="previewImage" accept="image/*" >   
          
        </label>
       
      </div>
     
  </div>
</div>

</template>

<script>
import {StorageRef} from '../boot/firebase'
import * as axios from "axios";
export default {
  data() {
    return {
      file: "",
      uploads: "100x100.png",
      isUploading: null,
      nombreimagen:null,
      imageData: null,
      uploadValue:0,
      img1: null
    };
  },

  methods: {
    
    onChangeFileUpload() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("file", this.file);
      console.log(this.file.name)
      axios
        .post("http://localhost:25051/api/photos/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(x => {
         this.nombreimagen = x.data;
          console.log(this.nombreimagen);
        }).catch(x => {
            console.log("erro", x)
        })
    },
    previewImage(event) {
      this.uploadValue=0;
     this.img1=null;
     this.imageData = event.target.files[0];
     this.onUpload()
},
    onUpload(){
        this.imageData = event.target.files[0];
        const storageRef=StorageRef.ref(`${this.imageData.name}`).put(this.imageData);
             storageRef.on(`state_changed`,snapshot=>{
             this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
               }, error=>{console.log(error.message)},
                ()=>{this.uploadValue=100;
                     storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                    this.img1 =url;
                 console.log(this.img1)
        });
      }      
    );
    },
  },
};
</script>

<style lang="scss">
.dropbox {
  align-items: center;
    background-size: cover;
    background-position: center;
    border: 1px dashed rgb(51, 51, 51);
    outline-offset: -10px;
    padding: 10px 10px;
    cursor: pointer;
    display: inline-flex;
    height: 14rem;
    justify-content: center;
    position: relative;
    width: 14rem;
}

.input-file {
    opacity: 0;
    width: 15rem;
    size: 20px;
    margin-left: -50%;
    margin-top: -50%;
    height: 15rem;
    position: absolute;
    cursor: pointer;
}

.dropbox:hover {
  background: rgb(104, 97, 97); /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>