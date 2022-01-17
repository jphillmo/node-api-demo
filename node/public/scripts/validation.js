
// Got this function from following URL: https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
export const isNumeric = (str) => {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}