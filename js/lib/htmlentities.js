export function htmlentities(texto) {
 return String(texto).replace(/[<>"']/g, c => {
  switch (c) {
   case "<": return "&lt;"
   case ">": return "&gt;"
   case '"': return "&quot;"
   case "'": return "&#039;"
   default: return c
  }
 })
}