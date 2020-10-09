export type Job = {
  id:string,
  status:'queued',
  dueAt:number,
  saas:string,
  accountId:string,
  boundTo:string
  details: {
    lambdaName:string,
    params:any
  }
}
