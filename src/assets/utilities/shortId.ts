import * as shortid from 'shortid'

export function id(length?:number) {
  length = length || 8
  let characterArray = shortid.generate().split('')
  characterArray.forEach((character, index) => {
    while (exclusions().includes(character)) {
      characterArray[index] = character = shortid.generate()[0]
    }
  })
  return characterArray.slice(0, length).join('')
}

function exclusions() {
  return ['-', '_', '$']
}