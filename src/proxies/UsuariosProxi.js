export default class UsuariosProxi{
    constructor(axios,url){
    this.axios = axios;
    this.url =url;
    }

    /* getAll(){
        return this.axios.get(this.url+'/users') buscadorusuarioss
    } */
    async getAll(page, take) {
        return await this.axios.get(this.url + `/users?page=${page}&take=${take}`);
    }
    create(params) {
        return this.axios.post(this.url + '/auth/signup', params);
    }

    get(id) {
        return this.axios.get(this.url + `/users/${id}`);
    }
    update(id, params) {
        return this.axios.put(this.url + `/users/${id}`, params);
    }

    remove(id) {
        return this.axios.delete(this.url + `/users/${id}`);
    }

    //-----APARTE SOLO TRAE LISTA DE ROLES--------
    getRoles() {
        return this.axios.get(this.url + '/users/newrol');
    }

    activateUsers(id, state) {
        return this.axios.put(this.url + `/users/activate/${id}?state=${state}`);
    }

   async buscadorUsuario() {
        return await this.axios.get(this.url + '/users/buscadorusuarioss');
    }
    async queryUsuario(querys) {
        return await this.axios.get(this.url + `/users/query?querys=${querys}`);
    }
}