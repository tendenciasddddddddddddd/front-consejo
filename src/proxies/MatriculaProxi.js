export default class MatriculaProxi {
    constructor(axios, url) {
        this.axios = axios;
        this.url = url;
    }

    /* getAll(){
        return this.axios.get(this.url+'/users') allPeriodos
    } */
    getAll(page, take) {
        return this.axios.get(this.url + `/periodos?page=${page}&take=${take}`);
    }
    getFull() {
        return this.axios.get(this.url + '/periodos/allPeriodos');
    }

    create(params) {
        return this.axios.post(this.url + '/periodos', params);
    }

    get(id) {
        return this.axios.get(this.url + `/periodos/${id}`);
    }

    update(id, params) {
        return this.axios.put(this.url + `/periodos/${id}`, params);
    }

    remove(id) {
        return this.axios.delete(this.url + `/periodos/${id}`);
    }

    //----------------------------------GLOBAL SET MATRICULA ESTUDIANTE ------------------

    getAllEstudiantes(mod) {
        return this.axios.get(this.url + `/estudiantes/newstud?mod=${mod}`);
    }

  
  
    //------------------------------------------------------DOCENTES--------------------------------------
    

    createMatricula(params, modalidad) {
        return this.axios.post(this.url + `/matriculas?modalidad=${modalidad}`, params);
    }

    getMatricula(id) {
        return this.axios.get(this.url + `/matriculas/${id}`);
    }

    updateMatricula(id, params) {
        return this.axios.put(this.url + `/matriculas/${id}`, params);
    }

    removeMatricula(id) {
        return this.axios.delete(this.url + `/matriculas/${id}`);
    }

    getMatriculaFolio(modalidad) {
        return this.axios.get(this.url + `/matriculas/consult?v=${modalidad}`);//
    }

    getFullMatricula(curso) {
        return this.axios.get(this.url + `/matriculas/fullmatricula?curso=${curso}`);
    }

    getInfoListReport(m, c) {
        return this.axios.get(this.url + `/matriculas/report?m=${m}&c=${c}`);
    }

    getMatriculas() {
        return this.axios.get(this.url + '/matriculas/');  //RUTA PARA [REPORTES,]
    }


    //------------------------------------------------------GESTION DE Parroquia--------------------------------------

    getReporteEstud(id) {
        return this.axios.get(this.url + `/matriculas/datas/${id}`);  //RUTA PARA [REPORTES,]
    }

    //------------------------------------------------------GESTION DE Parroquia--------------------------------------




}