export class HttpOptions {

  public headers:any
  public params:any
  public body:any


  constructor() {
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

}