export default class ServiceLogins {

    
    __navegador() {
        if (navigator.userAgent.search("MSIE") >= 0) {
          return "Edge";
        } else if (navigator.userAgent.search("Chrome") >= 0) {
          return "Chrome";
        }
        //Check if browser is Firefox
        else if (navigator.userAgent.search("Firefox") >= 0) {
          return "Firefox";
        }
        //Check if browser is Safari
        else if (
          navigator.userAgent.search("Safari") >= 0 &&
          navigator.userAgent.search("Chrome") < 0
        ) {
          return "Safari";
        }
        //Check if browser is Opera
        else if (navigator.userAgent.search("Opera") >= 0) {
          return "Opera";
        } else {
          return "None";
        }
      }

      ubicacion() {
        var OSName = "Desconocido";
        if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
        if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
        if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
        if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
        if (navigator.appVersion.indexOf("Android") != -1) OSName = "Android";
        return OSName;
      }
      
      __calcularFecha() {
        let tiempoTranscurrido = Date.now();
        let hoy = new Date(tiempoTranscurrido);
        return hoy.toLocaleString();
      }

}