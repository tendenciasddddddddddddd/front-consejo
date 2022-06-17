
const image5 = require("../../../assets/img/teams/5.jpg")
const image6 = require("../../../assets/img/teams/6.jpg")
const image4 = require("../../../assets/img/teams/4.svg")
const image7 = require("../../../assets/img/teams/7.jpg")
const image8 = require("../../../assets/img/teams/8.jpg")
const image9 = require("../../../assets/img/teams/9.jpg")
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
    arrays_of_avatar(){
        var arrays = [image4,image5,image6,image7,image8,image9,image4,image5,image6,image7,image8,image9,image4];
        return arrays;
    }
    

}