export function copyOf(value:any):any {
  if (!value) return
  return JSON.parse(JSON.stringify(value))
}