import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import proxyConfig from './proxies/_config'
import store from './store/index'
import Notifications from 'vue-notification'
import SimpleVueValidation from 'simple-vue-validator';

import VTooltip from 'v-tooltip'
import $ from 'jquery'
import vSelect from "vue-select";
import Vue2Editor from "vue2-editor";

// Usa Bootstrap
import './assets/css/nucleo-icons.css'
import './assets/css/nucleo-svg.css'
import './assets/css/soft-ui-dashboard.min.css?v=1.0.3'

import "vue-select/dist/vue-select.css";



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

Vue.use(Notifications)
Vue.use(VTooltip)
Vue.use(Vue2Editor);

Vue.use({
  install(Vue){
    Object.defineProperty(Vue.prototype, '$proxies',{
      value: proxyConfig
    })
  }
})

Vue.component("v-select", vSelect);


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
                 roles : user.role
            };
            console.log(user)
        }
      }
    })
  }
})

new Vue({
  router,
  store,
  $,
  render: h => h(App)
}).$mount('#app')
