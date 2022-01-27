export default class ServiceMatricula {

    calcular_fecha(){
        var date = new Date();
        const months = ["ENERO", "FEBRERO", "MARZO","ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
 
       const formatDate = (date)=>{
       let formatted_date = date.getDate() + " " + months[date.getMonth()] + " DEL " + date.getFullYear()
       return formatted_date;
       }
       let fecha = formatDate(date)
       return fecha;
    }

    

}