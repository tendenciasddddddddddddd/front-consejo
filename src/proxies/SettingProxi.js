export default class SettingProxi{
    constructor(axios,url){
    this.axios = axios;
    this.url =url;
    }

    getAll(page, take) {
        return this.axios.get(this.url + `/galeria?page=${page}&take=${take}`);
    }

    create(params) {
        return this.axios.post(this.url + '/galeria', params);
    }

    remove(id) {
        return this.axios.delete(this.url + `/galeria/${id}`);
    }

    getConfigure() {
        return this.axios.get(this.url + `/configure`);
    }

    editConfigure(id,params) {
        return this.axios.put(this.url + `/configure/${id}`, params);
    }
    getApertura() {
        return this.axios.get(this.url + `/configure/apertura/`);
    }

    editApertura(id,params) {
        return this.axios.put(this.url + `/configure/apertura/${id}`, params);
    }

//------------------------------------------------------GESTION DE CANTONES--------------------------------------

    
}