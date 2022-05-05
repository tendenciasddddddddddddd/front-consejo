export default class MigracionProxi {
    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

    create(mod) {
        return this.axios.post(this.url + `/migracion/matricula?modalidad=${mod}`);
    }

    remove(mod) {
        return this.axios.delete(this.url + `/migracion/matricula?modalidad=${mod}`);
    }

    getAll(page, take) {
        return this.axios.get(this.url + `/migracion?page=${page}&take=${take}`);
    }

}