import { muestraError } from "./muestraError.js"

{
 const originalJson = Response.prototype.json
 Response.prototype.json = function () {
  return originalJson.apply(this, arguments).catch(error => {
   throw new Error(error)
  })
 }
}

window.onerror = function (
 _message,
 _url,
 _line,
 _column,
 errorObject
) {
 muestraError(errorObject)
 return true
}

window.addEventListener("unhandledrejection", event => {
 muestraError(event.reason)
 event.preventDefault()
})