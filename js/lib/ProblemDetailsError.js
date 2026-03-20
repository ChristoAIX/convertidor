export class ProblemDetailsError extends Error {
 constructor(problemDetails) {
  super(
   typeof problemDetails["detail"] === "string"
    ? problemDetails["detail"]
    : typeof problemDetails["title"] === "string"
    ? problemDetails["title"]
    : "Error"
  )
  this.problemDetails = problemDetails
 }
}