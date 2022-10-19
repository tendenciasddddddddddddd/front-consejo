<template>
  <div>
    <div class="s-container">
      <div class="fieldset_content__0_ovL">
        <span class="s-title fuente">Código de acceso</span>
        <p class="s-text-versel mt-2 fuente">Este el codigo de matricula para este curso, puede actualizar</p>
        <div class="form-group w-50 mt-3">
          <input type="text" class="form-control buscador" v-model="codigo" />
        </div>
      </div>
      <footer class="fieldset_footer__VRdEd">
        <div class="text-end">
          <button v-if="code == codigo" disabled class="btn btn-vercel"
            style="padding-top: 1px !important;">Actualizar</button>
          <template v-else>
            <a v-if="!ifLoad" @click="updateCodeCourse" href="javascript:;" class="btn btn-vercel">Actualizar</a>
          </template>

        </div>
      </footer>
    </div>
    <div class="s-container mt-4" style=" border: 1px solid #e00;">
      <div class="fieldset_content__0_ovL">
        <span class="s-title fuente">Eliminar curso</span>
        <p class="s-text-versel mt-2 fuente"> Elimine de forma permanente este curso de aula virtual y todo su
          contenido de la plataforma, esta acción no es
          reversible, así que continúe con precaución.</p>

      </div>
      <footer class="fieldset_footer__VRdEd">
        <div class="text-end">
          <button @click="__eliminar" class="btn btn-sm btn-danger" >Eliminar </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RemoveCourse',
  props: {
    idCourse: String,
    code: String
  },
  data() {
    return {
      id: this.idCourse,
      codigo: this.code,
      isSelecTask: [],
      model: {
        codigo: ''
      },
      ifLoad: false,
    }
  },
  methods: {
    __eliminar() {
      let message = {
        title: "¿Esta seguro que quiere eliminar?",
        body: " Esta acción no se puede deshacer",
      };
      let options = {
        loader: true,
        okText: "Continuar",
        cancelText: "Cancelar",
        animation: "bounce",
      };
      this.$dialog
        .confirm(message, options)
        .then((dialog) => {
          this.dialogDelete();
          setTimeout(() => {
            dialog.close();
            this.toast("Se elimino un curso de su cuenta");
          }, 1200);
        })
        .catch(function () {
        });
    },
    dialogDelete() {
      this.$proxies._aulaProxi
        .remove(this.id)
        .then(() => {
          this.$router.go(-1)
        })
        .catch((x) => {
          console.log("Error 401", x.response);
        });
    },
    updateCodeCourse() {
      if (this.codigo.length < 5) {
        this.$dialog.alert('El Código requere de almenos 5 caracteres')
      }
      else {
        this.ifLoad = true;
        this.model.codigo = this.codigo;
        this.$proxies._aulaProxi
          .editCode(this.id, this.model)
          .then(() => {
            this.ifLoad = false;
            this.toast('Cambio de código exitoso');
          })
          .catch(() => {
            this.$dialog.alert("El servidor responde con un codigo de estado 413. Su solicitud no fue procesada");
            this.ifLoad = false;
          });
      }

    },
    toast(message) {
      this.$toasted.info(message, {
        duration: 2300,
        position: "top-center",
        icon: "check-circle",
        theme: "toasted-primary",
        action: {
          text: "CERRAR",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
      });
    },
  }
}
</script>
