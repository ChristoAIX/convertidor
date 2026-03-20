export async function recibeJson(url, metodoHttp = "GET") {
 return fetch(url, {
  method: metodoHttp,
  headers: { "Accept": "application/json, application/problem+json" }
 })
}