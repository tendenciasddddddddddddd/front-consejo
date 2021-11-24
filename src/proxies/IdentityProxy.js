export default class IdentityProxy{

    constructor(axios,url){
    this.axios = axios;
    this.url =url;
    }

    register(params){
        return this.axios.post(this.url+'/identity/register',params)
    }
    //GoogleAuthApis

    resetPasswords(params){
        return this.axios.post(this.url+'/auth/resetPassword',params) //SEND EMAIL WITH CODE
    }

    forgotPassword(params){
        return this.axios.post(this.url+'/auth/forgotPassword',params) //UPDTAE PASS
    }

    login(params){ 
        return this.axios.post(this.url+'/auth/signin',params)
    }

    GoogleAuthApi(params){ 
        return this.axios.post(this.url+'/auth/GoogleAuthApis',params)
    }

    cuenta(params){
        
        return this.axios.post(this.url+'/auth/cuenta',params)
    }
    updateCuenta(id, params) {
        return this.axios.put(this.url + `/auth/cuenta/${id}`, params);
    }
}