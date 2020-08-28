export interface ISendRequest {
  toAddresses:string[]
  from:string
  subject:string
  body:string
  bodyTextVersion?:string
  bccAddresses?: string[]
  ccAddresses?: string[]
  replyToAddresses?: string[]
}