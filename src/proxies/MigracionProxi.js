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

    removeMigraciones(id) {
        return this.axios.delete(this.url + `/migracion/${id}`);
    }

    getAll(page, take) {
        return this.axios.get(this.url + `/migracion?page=${page}&take=${take}`);
    }
    
    async queryMatriculas(querys) {
        return await this.axios.get(this.url + `/migracion/query?querys=${querys}`);
    }

    async getByIdOfCourseAndPeriod(periodoId, courseId) {
        return await this.axios.get(this.url + `/migracion/search?periodoId=${periodoId}&courseId=${courseId}`);
    }

    async getByIdOfPeriodo(periodoId) {
        return await this.axios.get(this.url + `/migracion/clon?periodoId=${periodoId}`);
    }
}