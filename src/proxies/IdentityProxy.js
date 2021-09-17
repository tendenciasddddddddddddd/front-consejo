export default class IdentityProxy{

    constructor(axios,url){
    this.axios = axios;
    this.url =url;
    }

    register(params){
        return this.axios.post(this.url+'/identity/register',params)
    }

    login(params){
        
        return this.axios.post(this.url+'/auth/signin',params)
    }

    cuenta(params){
        
        return this.axios.post(this.url+'/auth/cuenta',params)
    }
    updateCuenta(id, params) {
        return this.axios.put(this.url + `/auth/cuenta/${id}`, params);
    }
}