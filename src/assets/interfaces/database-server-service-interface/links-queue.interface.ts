export interface ILinksQueueRequest {
  queue: {
    silo:string
    table:string
    id:string
    foreignTable:string
    foreignId:string
    accountId:string
    link:boolean
  }[]
}