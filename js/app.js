import { consume } from "./lib/consume.js"
import { enviaFormRecibeJson } from "./lib/enviaFormRecibeJson.js"
import { recibeJson } from "./lib/recibeJson.js"

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

 resultado.textContent = json.resultado

 cargarHistorial()
}

async function cargarHistorial() {
 const respuesta = await consume(
  recibeJson("php/historial.php")
 )

 const json = await respuesta.json()

 lista.innerHTML = ""

 for (const item of json) {
  lista.innerHTML += `
   <li>
    ${item.cantidad} ${item.origen} → ${item.destino} = ${item.resultado}
    <button data-id="${item.id}">Eliminar</button>
   </li>
  `
 }

 for (const boton of document.querySelectorAll("button[data-id]")) {
  boton.addEventListener("click", eliminar)
 }
}

async function eliminar(event) {
 const id = event.target.dataset.id

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

  origen.innerHTML += `
   <option value="${moneda}">
    ${nombre} (${moneda})
   </option>
  `

  destino.innerHTML += `
   <option value="${moneda}">
    ${nombre} (${moneda})
   </option>
  `
 }
}

cargarMonedas()
cargarHistorial()