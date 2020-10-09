import { id } from '../utilities/shortId'
import { Verify } from '../utilities/verifyPropertyExistsIn'

const verify = new Verify()

export abstract class GenericModel {

  public id?:string
  public _item?:{ tennantId:string, modelName:string, modelNamePlural:string }|any
  public links:any
  protected hookConstructorPre(params) { }
  protected hookConstructorPost(params) { }
  protected hookPrepareForPersistencePre() { }
  protected hookPrepareForPersistencePost() { }


  constructor(params?) {
    this.hookConstructorPre(params)
    this.createEmptyItem()
    if (params) for (let [ property, value ] of Object.entries(params)) this[property] = value
    if (!this._item.originalLinks) this._item.originalLinks = JSON.parse(JSON.stringify(this.links))
    this.hookConstructorPost(params)
    this.checkRequiredValues()
  }




      protected createEmptyItem() {
        this._item = { }
        this._item.modelName = null
        this._item.modelNamePlural = null
        this.id = id()
        this.links = { }
      }




      protected checkRequiredValues() {
        if (!this._item.modelName) throw new Error('No modelName provided')
        if (!this._item.modelNamePlural) throw new Error('No modelNamePlural provided')
      }












  public prepareForPersistence():any {
    this.hookPrepareForPersistencePre()
    let object = Object.assign({}, this) as any
    object.table = this.table
    this.examineLinksForChanges(object)
    delete object._item
    this.hookPrepareForPersistencePost()
    return object
  }




      private examineLinksForChanges(object) {
        this.findNewLinks(object)
        this.findObsoleteLinks(object)
      }




          private findNewLinks(object) {
            let newLinks = { }
            for (let [ table, ids ] of Object.entries(object.links))
              Object.keys(ids)
                .forEach(id => this.determineIfNewLink({ newLinks: newLinks, table: table, id: id, object: object }))
            if (Object.keys(newLinks).length > 0) object.links._link = newLinks
          }




              private determineIfNewLink(params:{ newLinks:any, table:string, id:string, object:any }) {
                if (!params.object._item.originalLinks[params.table]) this.createNewLink(params)
                else if (params.id in params.object._item.originalLinks[params.table]) return
                else this.createNewLink(params)
              }




                  private createNewLink(params:{ newLinks:any, table:string, id:string, object:any }) {
                    let { newLinks, table, id } = params
                    if (!newLinks[table]) newLinks[table] = { }
                    newLinks[table][id] = null
                  }




          private findObsoleteLinks(object) {
            let oldLinks = { }
            for (let [ table, ids ] of Object.entries(object._item.originalLinks) as any)
              Object.keys(ids)
                .forEach(id => this.determineIfOldLink({ oldLinks: oldLinks, table: table, id: id, object: object }))
            if (Object.keys(oldLinks).length > 0) object.links._unlink = oldLinks
          }




              private determineIfOldLink(params:{ oldLinks:any, table:string, id:string, object:any }) {
                let { oldLinks, table, id, object } = params
                if (id in object.links[table]) { }
                else this.removeOldLink({ oldLinks: oldLinks, table: table, id: id })
              }




                  private removeOldLink(params:{ oldLinks:any, table:string, id:string }) {
                    let { oldLinks, table, id } = params
                    if (!oldLinks[table]) oldLinks[table] = { }
                    oldLinks[table][id] = null
                  }












  public get table():string {
    if (verify.property('this._item.tennantId').existsIn(this)) return `${ this._item.tennantId }.${ this._item.modelNamePlural }`
    else return this._item.modelNamePlural
  }












  public set table(value:string) { }

}
