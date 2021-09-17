import Axios from 'axios'
import IdentityProxy from './IdentityProxy.js'
import UsuariosProxi from './UsuariosProxi'
import ZonasProxi from './ZonasProxi'
import RegistrosProxi from './RegistrosProxi'
import GestionProxi from './GestionProxi'
import MatriculaProxi from './MatriculaProxi'
import NotasProxi from './NotasProxi'
import AulasProxi from './AulasProxi'

//axios
Axios.defaults.headers.common.Accept='application/json'
//Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('access_token');

        if(token){
            config.headers= {
                'x-access-token': `${token}`
            }
        }
        return config;
    },
    error => Promise.reject(error)
);
Axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status===403||error.response.status===401) {//||error.response.status===401
        localStorage.removeItem('access_token');
        window.location.reload(true);
      }
      if (!error.response) {
        console.log("Please check your internet connection.");
      }
      return Promise.reject(error);
    }
  );
let url=null

if(localStorage.getItem("config")!==null){
    let config = JSON.parse(localStorage.getItem("config"))
    url = config
}

console.log(url)
export default{
    identityProxy: new IdentityProxy(Axios, url),
    _usuarioProxi: new UsuariosProxi(Axios, url),
    _zonasProxi: new ZonasProxi(Axios, url),
    _registroProxi : new RegistrosProxi(Axios, url),
    _gestionProxi : new GestionProxi(Axios, url),
    _matriculaProxi : new MatriculaProxi(Axios, url), 
    _notasProxi : new NotasProxi(Axios, url),
    _aulaProxi : new AulasProxi(Axios, url)
}