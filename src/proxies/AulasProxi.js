export default class AulasProxi {
    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

    create(params) {
        return this.axios.post(this.url + '/aulas', params);
    }

    updateAulaDocentes(id) {
        return this.axios.get(this.url + `/aulas/newlist?id=${id}`);
    }
   
    remove(id) {
        return this.axios.delete(this.url + `/aulas/${id}`);
    }

    get(id) {
        return this.axios.get(this.url + `/aulas/${id}`); //studen
    }

    async  updateAulaEstudantes(id) {
        return await this.axios.get(this.url + `/aulas/studen?id=${id}`);
    }

    update(id, params) {
        return this.axios.put(this.url + `/aulas/${id}`, params);
    }
   
}