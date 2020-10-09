export class Verify {

  public nestedPropertyChain:string

  public property(nestedPropertyChain?:string):this {
    this.nestedPropertyChain = nestedPropertyChain
    return this
  }

  public existsIn(object):boolean {
    if (!object || !this.nestedPropertyChain) return false
    let properties = this.nestedPropertyChain.split('.')
    properties.shift()
    for (let property of properties) {
      if (!object[property]) return false
      else object = object[property]
    }
    return true
  }

}