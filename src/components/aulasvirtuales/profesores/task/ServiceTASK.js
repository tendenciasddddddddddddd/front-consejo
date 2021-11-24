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
      return  "Queda " + days + " dias, " + hours + " horas, y " + minutes + " minutos";
    }
  }

}
