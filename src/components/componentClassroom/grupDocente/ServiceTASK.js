export default class ServiciosTask {
  calcular_fecha_limite(event) {
    if (event != null) {
      var today = new Date(event);
      let horaA = new Date();
      let diferenciaHoras = today - horaA;
      let days = Math.floor(diferenciaHoras / (24 * 60 * 60 * 1000));
      let daysms = diferenciaHoras % (24 * 60 * 60 * 1000);
      let hours = Math.floor(daysms / (60 * 60 * 1000));
      let hoursms = diferenciaHoras % (60 * 60 * 1000);
      let minutes = Math.floor(hoursms / (60 * 1000));
      //let minutesms=diferenciaHoras % (60*1000);
      //let sec = Math.floor((minutesms)/(1000));
      return "Queda " + days + " dias, " + hours + " horas, y " + minutes + " minutos";
    }
  }
  calcular_fecha_local() {
    const dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth()+1;
    month = ('0' + month).slice(-2);
    // To make sure the month always has 2-character-formate. For example, 1 => 01, 2 => 02
    let date = dateObj.getDate();
    date = ('0' + date).slice(-2);
    // To make sure the date always has 2-character-formate
    let hour = dateObj.getHours();
    hour = ('0' + hour).slice(-2);
    // To make sure the hour always has 2-character-formate
    let minute = dateObj.getMinutes();
    minute = ('0' + minute).slice(-2);
    // To make sure the minute always has 2-character-formate
    let second = dateObj.getSeconds();
    second = ('0' + second).slice(-2);
    // To make sure the second always has 2-character-formate
    const time = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
    return time
  }
  fechasLimite(event){
    if(event!=null){
     var today = new Date(event);
     let horaA = new Date();
     let diferenciaHoras = today - horaA;
     let days = Math.floor(diferenciaHoras / (24*60*60*1000));
     let daysms=diferenciaHoras % (24*60*60*1000);
     let hours = Math.floor((daysms)/(60*60*1000));
     let hoursms=diferenciaHoras % (60*60*1000);
     let minutes = Math.floor((hoursms)/(60*1000));
     let minutesms=diferenciaHoras % (60*1000);
     let sec = Math.floor((minutesms)/(1000));
     return 'Dias '+ days+" - Horas "+hours+" - Minutos "+minutes+" - Segundos "+sec;
    } 
 }
 resolveDate(dates){
  const dateObj = new Date(dates);
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth()+1;
    month = ('0' + month).slice(-2);
    // To make sure the month always has 2-character-formate. For example, 1 => 01, 2 => 02
    let date = dateObj.getDate();
    date = ('0' + date).slice(-2);
    // To make sure the date always has 2-character-formate
    let hour = dateObj.getHours();
    hour = ('0' + hour).slice(-2);
    // To make sure the hour always has 2-character-formate
    let minute = dateObj.getMinutes();
    minute = ('0' + minute).slice(-2);
    // To make sure the minute always has 2-character-formate
    let second = dateObj.getSeconds();
    second = ('0' + second).slice(-2);
    // To make sure the second always has 2-character-formate
    const time = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
    return time
}
}