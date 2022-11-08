let abc = "";
for (let i = 97; i <= 122; i++) {
  let letra = String.fromCharCode(i);
  abc += `<button class="tecla">${letra}</button>`;
}
document.querySelector("#alfabeto").innerHTML = abc;

const dep_1 = ["f", "u", "t", "b", "o", "l"];
const dep_2 = ["g", "o", "l", "f"];
const dep_3 = ["c", "i", "c", "l", "i", "s", "m", "o"];
const dep_4 = ["t", "e", "n", "i", "s"];
const dep_5 = ["v", "o", "l", "e", "y"];
const deportes = [dep_1, dep_2, dep_3, dep_4, dep_5];

const fruta_1 = ["b", "a", "n", "a", "n", "o"];
const fruta_2 = ["u", "v", "a"];
const fruta_3 = ["n", "a", "r", "a", "n", "j", "a"];
const fruta_4 = ["m", "a", "n", "z", "a", "n", "a"];
const fruta_5 = ["f", "r", "e", "s", "a"];
const frutas = [fruta_1, fruta_2, fruta_3, fruta_4, fruta_5];

const tec_1 = ["c", "o", "m", "p", "u", "t", "a", "d", "o", "r"];
const tec_2 = ["c", "e", "l", "u", "l", "a", "r"];
const tec_3 = ["t", "e", "l", "e", "f", "o", "n", "o"];
const tec_4 = ["p", "a", "n", "t", "a", "l", "l", "a"];
const tec_5 = ["a", "u", "d", "i", "f", "o", "n", "o", "s"];
const tecnologia = [tec_1, tec_2, tec_3, tec_4, tec_5];

const anim_1 = ["l", "e", "o", "n"];
const anim_2 = ["z", "e", "b", "r", "a"];
const anim_3 = ["p", "e", "r", "r", "o"];
const anim_4 = ["g", "a", "t", "o"];
const anim_5 = ["e", "l", "e", "f", "a", "n", "t", "e"];
const animales = [anim_1, anim_2, anim_3, anim_4, anim_5];

const col_1 = ["a", "z", "u", "l"];
const col_2 = ["r", "o", "j", "o"];
const col_3 = ["v", "e", "r", "d", "e"];
const col_4 = ["a", "m", "a", "r", "i", "l", "l", "o"];
const col_5 = ["c", "i", "a", "n"];

const colores = [col_1, col_2, col_3, col_4, col_5];
const categorias = [deportes, frutas, tecnologia, animales, colores];

palabraAleatoria();

function palabraAleatoria(){
  let aleatorio = Math.floor(Math.random() * categorias.length);
  let cat_aleatorio = categorias[aleatorio];
  let num_pal_aleatorio = Math.floor(Math.random() * cat_aleatorio.length);
  let palabra_aleatoria = cat_aleatorio[num_pal_aleatorio];
  
  JuegoAhorcado(palabra_aleatoria);
  MostrarCamposPalabra(palabra_aleatoria);
  MostrarCategoria(aleatorio);
}

function MostrarCamposPalabra(palabra) {
  let num_campos = "";
  for (let i = 0; i < palabra.length; i++) {
    num_campos += `<span class="letra" id="campo-${i}">_</span>`;
  }
  document.querySelector("#palabra").innerHTML = num_campos;
}

function MostrarCategoria(aleatorio) {
  let titulo_cat = document.querySelector("#categoria");

  let categoria = {
    0: "Deporte",
    1: "Fruta",
    2: "Tecnología",
    3: "Animal",
    4: "Color"
  }

  const mostrarCat = categoria[aleatorio];
  titulo_cat.innerHTML += mostrarCat;

}

function JuegoAhorcado(palabra_aleatoria) {

  let teclas = document.querySelectorAll(".tecla");
  let vidas = 8;

  teclas.forEach((tecla) => {

    tecla.addEventListener("click", () => {

      if (palabra_aleatoria.includes(tecla.innerHTML)) {
        for (let i = 0; i < palabra_aleatoria.length; i++) {

          if (tecla.innerHTML == palabra_aleatoria[i]) {

            document.querySelector("#campo-" + i).innerHTML = tecla.innerHTML;
            tecla.classList.add("acierto");
            palabra_aleatoria.splice(i, 1, "");
            contador_ganar = palabra_aleatoria.length;

            palabra_aleatoria.forEach((letra) => {

              if (letra == "") {
                --contador_ganar;

                if (contador_ganar == 0) {

                  setTimeout(function () {
                    alert("Ganaste!, el juego se reiniciará...");
                    location.reload();
                  }, 300);
                }
              }
            });

          }
        }
      } else {
        MostrarVidas(--vidas);
        tecla.classList.add("error");
        if (vidas == 1) {
          setTimeout(function () {
            alert("Pediste!, el juego se reiniciará...");
            location.reload();
          }, 300);
        }
      }
    });
  });
}




function MostrarVidas(vidas) {
  switch (vidas) {
    case 1:
      document.querySelector("#pie-der").style.display = "block";
    case 2:
      document.querySelector("#pie-izq").style.display = "block";
    case 3:
      document.querySelector("#mano-der").style.display = "block";
    case 4:
      document.querySelector("#mano-izq").style.display = "block";
    case 5:
      document.querySelector("#cuerpo").style.display = "block";
    case 6:
      document.querySelector("#cabeza").style.display = "block";
    case 7:
      document.querySelector("#cuerda").style.display = "block";
    default:
      break;
  }
}
