let globalOperacion = "";
let campoActivo = 1;
let campo1 = document.querySelector("#vnum1");
let campo2 = document.querySelector("#vnum2");
let campo_op = document.querySelector("#operador");
let res_inner = document.querySelector("#res_inner td");

let teclas_num = document.querySelectorAll(".tecla.num");
teclas_num.forEach((tecla_num) => {
  tecla_num.addEventListener("click", () => {
    if (
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseFloat(tecla_num.innerHTML))
    ) {
      insertar_digito(parseFloat(tecla_num.innerHTML));
    } else if (".".includes(tecla_num.innerHTML)) {
      insertar_digito(tecla_num.innerHTML);
    }
  });
});

let teclas_op = document.querySelectorAll(".tecla.op");
teclas_op.forEach((tecla_op) => {
  tecla_op.addEventListener("click", () => {
    seleccionar_operacion(tecla_op.innerHTML);
  });
});

let tecla_resolver = document.querySelector(".tecla.res");
tecla_resolver.addEventListener("click", () => {
  resolver();
});

let tecla_reiniciar = document.querySelector(".tecla.reiniciar");
tecla_reiniciar.addEventListener("click", () => {
  reiniciar();
});

let tecla_limpiar = document.querySelector(".tecla.limpiar");
tecla_limpiar.addEventListener("click", () => {
  limpiarCaracter();
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function insertar_digito(digito) {
  var campo = document.querySelector("#vnum" + campoActivo);
  
  var valorActual = campo.value;
  if (valorActual.includes(".")) {
  } else {
    if (valorActual.length == 0 && digito == ".") {
      campo.value = "0.";
    }
    else if (valorActual.length > 0 && digito == ".") {
      campo.value = campo.value + digito;
    }
  }
  if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(digito)) {
    campo.value = campo.value + digito;
  }
  if (campo2.value != '' && campo_op.innerHTML == '') {
    alert('¡Error!, antes de ingresar el campo 2, es obligatorio ingresar el operador');
    limpiarCaracter();
  }
}

function seleccionar_operacion(operacion) {

  var num1 = campo1.value;
  var num2 = campo2.value;
  if (isNumeric(num1) && isNumeric(num2)) {
    resolver();
  }

  if (campo1.value == "") {
    reiniciar();
  } else {
    campo_op.innerHTML = operacion;
    globalOperacion = operacion;
    campoActivo = 2;
  }
}

function limpiarCaracter() {
  var campo = document.querySelector("#vnum" + campoActivo);

  if (campo.value.length == 0) {
    alert('¡Error!, no hay nada que limpiar en el campo: '+campoActivo);
  } else {
    campo.value = campo.value.substring(0, campo.value.length - 1);
  }
}

function reiniciar() {

  globalOperacion = "";
  campoActivo = 1;
  campo1.value = "";
  campo2.value = "";
  campo_op.innerHTML = "";
  res_inner.innerHTML = "";
}

function resolver(recursivo = false) {
  var num1 = campo1.value;
  var num2 = campo2.value;

  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  resultado = 0;
  switch (globalOperacion) {
    case "+":
      resultado = num1 + num2;
      break;
    case "X":
      resultado = num1 * num2;
      break;
    case "/":
      resultado = num1 / num2;
      break;
    case "^":
      resultado = Math.pow(num1, num2);
      break;
    case "MOD":
      resultado = num1 % num2;
      break;
    case "-":
      resultado = num1 - num2;
      break;
    default:
      break;
  }

  if (campo1.value == 0 && campo2.value == 0 && globalOperacion == "/") {
    alert("¡Error!, no puedes dividir 0 / 0");
    reiniciar();
  } else if (
    (campo1.value == 0 && globalOperacion == "/") ||
    (campo2.value == 0 && globalOperacion == "/")
  ) {
    alert("¡Error!, no puedes dividir entre 0");
    reiniciar();
  } else {
    if (campo1.value != "" && campo2.value == "") {
      resultado = campo1.value;
    } 
    else if (campo1.value == '') {
      alert('¡Error!, no hay nada para resolver');
      resultado = '';
    }

    res_inner.innerHTML = resultado;
    campo1.value = resultado;
    campo2.value = "";

    if (recursivo) {
    } else {
      seleccionar_operacion("");
    }
  }
}
