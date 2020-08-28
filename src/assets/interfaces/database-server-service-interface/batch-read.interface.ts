export interface IBatchReadRequest {
  saasName:string
  accountId:string
  records:{ tableName:string, id:string }[]
}