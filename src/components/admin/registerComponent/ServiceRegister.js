export default class ServiceRegiste {

    verificarCedula(cedula){
        if (cedula.length == 10) {
            var digito_region = cedula.substring(0, 2);
            if (digito_region >= 1 && digito_region <= 24) {
              var ultimo_digito = cedula.substring(9, 10);
              var pares =
                parseInt(cedula.substring(1, 2)) +
                parseInt(cedula.substring(3, 4)) +
                parseInt(cedula.substring(5, 6)) +
                parseInt(cedula.substring(7, 8));
              var numero1 = cedula.substring(0, 1);
              numero1 = numero1 * 2;
              if (numero1 > 9) {
                numero1 = numero1 - 9;
              }
    
              var numero3 = cedula.substring(2, 3);
              numero3 = numero3 * 2;
              if (numero3 > 9) {
                numero3 = numero3 - 9;
              }
    
              var numero5 = cedula.substring(4, 5);
              numero5 = numero5 * 2;
              if (numero5 > 9) {
                numero5 = numero5 - 9;
              }
    
              var numero7 = cedula.substring(6, 7);
              numero7 = numero7 * 2;
              if (numero7 > 9) {
                numero7 = numero7 - 9;
              }
    
              var numero9 = cedula.substring(8, 9);
              numero9 = numero9 * 2;
              if (numero9 > 9) {
                numero9 = numero9 - 9;
              }
    
              var impares = numero1 + numero3 + numero5 + numero7 + numero9;
    
              var suma_total = pares + impares;
    
              var primer_digito_suma = String(suma_total).substring(0, 1);
    
              var decena = (parseInt(primer_digito_suma) + 1) * 10;
    
              digito_validador = decena - suma_total;
    
              if (digito_validador == 10) var digito_validador = 0;
              if (digito_validador == ultimo_digito) {
                return  "la cedula:" + cedula + " es correcta";
              } else {
                return "la cedula:" + cedula + " es incorrecta";
              }
            } else {
              return "Esta cedula no pertenece a ninguna region";
            }
          } else {
            return  "Esta cedula tiene menos de 10 Digitos";
          }
    }
    
    validarEmail(email){
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (emailRegex.test(email)) {
          return true;
        } else {
          return  false;
        }
    }
}