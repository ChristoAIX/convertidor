import { consume } from "./lib/consume.js"
import { enviaFormRecibeJson } from "./lib/enviaFormRecibeJson.js"
import { recibeJson } from "./lib/recibeJson.js"
import { htmlentities } from "./lib/htmlentities.js"

const formulario = document.querySelector("#formulario")
const resultado = document.querySelector("#resultado")
const lista = document.querySelector("#lista")

const origen = document.querySelector("[name=origen]")
const destino = document.querySelector("[name=destino]")

formulario.addEventListener("submit", enviar)

async function enviar(event) {
 event.preventDefault()

 if (isNaN(formulario.cantidad.value) || formulario.cantidad.value <= 0) {
  alert("Ingresa una cantidad válida")
  return
 }

 const respuesta = await consume(
  enviaFormRecibeJson("php/convertir.php", formulario)
 )

 const json = await respuesta.json()
 resultado.textContent = htmlentities(json.resultado)
 cargarHistorial()
}

async function cargarHistorial() {
 const respuesta = await consume(
  recibeJson("php/historial.php")
 )

 const json = await respuesta.json()

 lista.innerHTML = ""

 for (const item of json) {

  const cantidad = htmlentities(item.cantidad)
  const origenMoneda = htmlentities(item.origen)
  const destinoMoneda = htmlentities(item.destino)
  const resultadoConv = htmlentities(item.resultado)
  const id = htmlentities(item.id)

  lista.innerHTML += `
   <li>
    ${cantidad} ${origenMoneda} → ${destinoMoneda} = ${resultadoConv}
    <button data-id="${id}">Eliminar</button>
   </li>
  `
 }
 for (const boton of document.querySelectorAll("button[data-id]")) {
  boton.addEventListener("click", eliminar)
 }
}

async function eliminar(event) {
 const id = htmlentities(event.target.dataset.id)

 const respuesta = await consume(
  recibeJson("php/eliminar.php?id=" + id)
 )

 await respuesta.json()

 cargarHistorial()
}

async function cargarMonedas() {
 const respuesta = await consume(
  recibeJson("php/monedas.php")
 )

 const monedas = await respuesta.json()

 origen.innerHTML = ""
 destino.innerHTML = ""

 for (const moneda of monedas) {

  let nombre = moneda

  try {
   nombre = new Intl.DisplayNames(['es'], { type: 'currency' }).of(moneda)
  } catch {
   nombre = moneda
  }
  const codigo = htmlentities(moneda)
  const nombreSeguro = htmlentities(nombre)

  origen.innerHTML += `
   <option value="${codigo}">
    ${nombreSeguro} (${codigo})
   </option>
  `
  destino.innerHTML += `
   <option value="${codigo}">
    ${nombreSeguro} (${codigo})
   </option>
  `
 }
}

cargarMonedas()
cargarHistorial()