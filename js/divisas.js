import { consume } from "./lib/consume.js"
import { recibeJson } from "./lib/recibeJson.js"
import { htmlentities } from "./lib/htmlentities.js"

const formulario = document.querySelector("#formulario")
const resultado = document.querySelector("#resultado")

function obtenerNombre(moneda) {
 try {
  return new Intl.DisplayNames(['es'], { type: 'currency' }).of(moneda)
 } catch {
  return moneda
 }
}
function obtenerPais(nombreMoneda) {
 let pais = nombreMoneda

 pais = pais
  .replace(/peso|dólar|euro|yen|libra|franco|real|rupia|won|corona|leva|lira/gi, "")
  .replace(/de|del|la/gi, "")
  .trim()

 return pais || nombreMoneda
}
cargarMonedas()

async function cargarMonedas() {
 const respuesta = await consume(
  recibeJson("php/monedas.php")
 )
 const json = await respuesta.json()
 let render = ""
 for (const m of json) {
  const codigo = htmlentities(m)
  const nombre = htmlentities(obtenerNombre(m))
  render += `
   <option value="${codigo}">
    ${nombre} (${codigo})
   </option>
  `
 }
 formulario.moneda.innerHTML = render
}
formulario.addEventListener("submit", enviar)
async function enviar(e) {
 e.preventDefault()
 const datos = {
  moneda: formulario.moneda.value
 }
 const respuesta = await consume(fetch("php/info_divisa.php", {
  method: "POST",
  headers: {
   "Content-Type": "application/json"
  },
  body: JSON.stringify(datos)
 }))
 const json = await respuesta.json()
 const codigo = htmlentities(json.moneda)
 let nombre = obtenerNombre(json.moneda)
 nombre = htmlentities(nombre)
 const pais = htmlentities(obtenerPais(nombre))
 const descripcion = htmlentities(`Moneda oficial asociada a ${pais}`)

 resultado.innerHTML = `
  <strong>${nombre} (${codigo})</strong><br>
  ${descripcion}
 `
}