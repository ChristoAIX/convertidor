import { consume } from "./lib/consume.js"
import { enviaFormRecibeJson } from "./lib/enviaFormRecibeJson.js"
import { recibeJson } from "./lib/recibeJson.js"
import { htmlentities } from "./lib/htmlentities.js"

const formulario = document.querySelector("#formulario")
const resultado = document.querySelector("#resultado")
const selectMoneda = document.querySelector("[name=moneda]")

formulario.addEventListener("submit", enviar)

async function enviar(e) {
 e.preventDefault()

 if (!selectMoneda.value) {
  alert("Selecciona una moneda")
  return
 }

 const respuesta = await consume(
  enviaFormRecibeJson("php/info_divisa.php", formulario)
 )

 const json = await respuesta.json()

 const codigo = htmlentities(json.moneda)

 let nombre
 try {
  nombre = new Intl.DisplayNames(['es'], { type: 'currency' }).of(json.moneda)
 } catch {
  nombre = json.moneda
 }

 nombre = htmlentities(nombre)

 const pais = htmlentities(
  nombre
   .replace(/peso|dólar|euro|yen|libra|franco|real|rupia|won|corona|leva|lira/gi, "")
   .replace(/de|del|la/gi, "")
   .trim()
 )

 resultado.innerHTML = `
  <strong>${nombre} (${codigo})</strong><br>
  Moneda oficial asociada a ${pais}
 `
}

async function cargarMonedas() {
 const respuesta = await consume(
  recibeJson("php/monedas.php")
 )

 const monedas = await respuesta.json()

 selectMoneda.innerHTML = ""

 for (const moneda of monedas) {

  let nombre = moneda

  try {
   nombre = new Intl.DisplayNames(['es'], { type: 'currency' }).of(moneda)
  } catch {}

  const codigo = htmlentities(moneda)
  const nombreSeguro = htmlentities(nombre)

  selectMoneda.innerHTML += `
   <option value="${codigo}">
    ${nombreSeguro} (${codigo})
   </option>
  `
 }
}

cargarMonedas()