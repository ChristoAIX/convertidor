export function enviaFormRecibeJson(url, formulario, metodoHttp = "POST") {
 return fetch(url, {
  method: metodoHttp,
  headers: { "Accept": "application/json, application/problem+json" },
  body: new FormData(formulario)
 })
}