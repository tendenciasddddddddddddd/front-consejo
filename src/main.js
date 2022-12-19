import Vue from 'vue'
import App from './App.vue'
import router from './router'
import proxyConfig from './proxies/_config'
import store from './store/index'
import SimpleVueValidation from 'simple-vue-validator';
import 'ag-grid-enterprise';

import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'
import vSelect from "vue-select";
import Vue2Editor from "vue2-editor";

import GAuth from 'vue-google-oauth2'

import VuejsDialog from 'vuejs-dialog';

// Usa Bootstrap
import './assets/css/bootstrap.min.css'
import './assets/bootstrap-icons/bootstrap-icons.css'


import "vue-select/dist/vue-select.css";

import toasted from "vue-toasted";

import 'vuejs-dialog/dist/vuejs-dialog.min.css';

import VueProgressBar from 'vue-progressbar'


Vue.config.productionTip = false


Vue.use(SimpleVueValidation, {
  mode: 'manual',
  templates: {
    error: 'Error.',
    required: 'Requerido.',
    float: 'Debe ser un número.',
    integer: 'Debe ser un entero.',
    number: 'Debe ser un número.',
    lessThan: 'Debe ser menor a {0}.',
    lessThanOrEqualTo: 'Debería ser menor o igual a {0}.',
    greaterThan: 'Debe ser mayor a {0}.',
    greaterThanOrEqualTo: 'Debería ser mayor o igual a {0}.',
    between: 'Debe estar entre {0} y {1}.',
    size: 'El tamaño debería ser {0}.',
    length: 'Debe ingresar {0} caracteres.',
    minLength: 'Como mínimo se aceptan {0} caracteres.',
    maxLength: 'Como máximo se aceptan {0} caracteres.',
    lengthBetween: 'La longitud debería estar entre {0} y {1}.',
    in: 'Debe ser {0}.',
    notIn: 'No debería ser {0}.',
    match: 'No se pueden comparar.',
    regex: 'Formato inválido.',
    digit: 'Debe ser un dígito.',
    email: 'Email inválido.',
    url: 'Url inválida.'
  }
});

Vue.use({
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$validator', {
      value: SimpleVueValidation.Validator
    })
  }
});

Vue.directive('tooltip', VTooltip)
Vue.directive('close-popover', VClosePopover)
Vue.component('v-popover', VPopover)
VTooltip.options.autoHide = false

const gauthOption = {
  clientId: '776329604046-ftt9eq502a2soskkg2geecdrnspmenl3.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
  fetch_basic_profile : true,
}
Vue.use(GAuth, gauthOption)

Vue.use(Vue2Editor);

Vue.use({
  install(Vue){
    Object.defineProperty(Vue.prototype, '$proxies',{
      value: proxyConfig
    })
  }
})

Vue.component("v-select", vSelect);

Vue.use(toasted, {
  iconPack: "fontawesome"
});

// Tell Vue to install the plugin.
Vue.use(VuejsDialog);

Vue.use(VueProgressBar, {
  color: 'rgb(8, 8, 8)',
  failedColor: 'red',
  height: '3px'
})


Vue.use({
  install(Vue){
    Object.defineProperty(Vue.prototype, '$user',{
      value: {
        initialize (){
          let token = localStorage.getItem('access_token').split('.');
          let user = JSON.parse(
            decodeURIComponent(
              atob(token[1])
              .split("")
              .map(function(c){
                return(
                  "%" + ("00"+c.charCodeAt(0).toString(16)).slice(-2)
                );
              })
              .join("")
            )
          );
            store.state.user ={
                 id: user.id,
                 roles : user.role,
                 name : user.name,
            };
            //console.log(user)
        }
      }
    })
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
