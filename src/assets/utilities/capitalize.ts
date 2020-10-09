export function capitalize(word:string) {
  if (!word) return
  if (word.constructor != String) throw new Error('function capitalize must be passed a type String to process.')
  let leadingCharacter = word[0]
  let remaining = word.slice(1)
  return `${ leadingCharacter.toUpperCase() }${ remaining }`
}