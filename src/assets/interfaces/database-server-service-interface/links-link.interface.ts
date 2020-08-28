export interface ILinkRequest {
  silo:string
  table:string
  id:string
  foreignTable:string
  foreignId:string
  accountId:string
  link:boolean
}