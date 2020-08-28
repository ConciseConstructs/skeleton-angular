import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { StandardReturn } from 'src/assets/types/StandardReturn.type';
import * as dropin from 'braintree-web-drop-in'

@Component({
  selector: 'app-form-braintree-payment',
  templateUrl: './form-braintree-payment.component.html',
  styleUrls: ['./form-braintree-payment.component.scss'],
})
export class FormBraintreePaymentComponent implements OnInit {

  public transactionTypes:any[]
  public amount:number
  public hasGateway:boolean
  public isSaving: boolean
  private isErroring: boolean
  private transaction: any


  constructor(
    public site:SiteService
  ) { }












  ngOnInit() {
    this.transactionTypes = [
      { label: 'Invoice payment', value: 'invoice' },
      { label: 'Monthly hosting fee', value: 'hosting' },
      { label: 'Domain name purchase', value: 'domain' },
      { label: 'Deposit for future services', value: 'deposit' },
    ]
    this.amount = 5.00
    // if (this.site.storage.braintreeId) this.createNonceToken()
    // else this.createPayerProfile()
  }












  private createNonceToken() {
    // this.site.api.braintree.braintreeNonceGET(this.site.storage.braintreeId)
    //   .then(result => this.onClientTokenSuccess(result))
    //   .catch(error => this.onClientTokenFailure(error))
  }

      private onClientTokenFailure(error) {  console.log('error-f844ae20-89af-4b4f-97a2-04b0b362dcac', error)
        this.site.ui.userFeedbackChannelSecondary({ message: 'Unable to connect to payment gateway, please try reloading', state: 'error' })
      }




      private onClientTokenSuccess(result:StandardReturn) {
        // if (result.success) this.createPaymentGatewayUI(result.thirdParty.braintree.clientToken.clientToken)
      }




          private createPaymentGatewayUI(token) {
            this.hasGateway = true
            let params = { authorization: token, container: '#dropin-container' }
            dropin.create(params, (error, instance) => {
              if (error) this.onDropInCreateFailure(error)
              else this.onDropInCreateSuccess(instance)
            })
          }




              private onDropInCreateFailure(error) {
                this.site.events.onError.next({ signature: 'error-bd4071a8-6d78-400a-9e8f-b3c6acc16db8', details: error })
                if (error.message === "options.selector or options.container must reference an empty DOM node.") return
                this.site.ui.userFeedbackChannelSecondary({ message: 'An error occurred connecting to payment processor, please reload the page.', state: 'error'})
                this.isErroring = true
              }




              private onDropInCreateSuccess(instance) {
                this.transaction = instance
              }












  private createPayerProfile() {
    let payerProfile = this.makePayerProfile()
    // this.site.api.braintree.braintreeCustomerCREATE(payerProfile)
  }




      private makePayerProfile() {
        // return {
        //   firstName: `${ this.site.storage.acctId } via ${ this.site.storage.userId }`,
        //   lastName: "",
        //   email: this.site.storage.email
        // } as IBraintreeCustomerCreateRequest
        
      }











      
  public onDepositBtnClick() {
    this.isSaving = true
    if (this.transaction) this.transaction.requestPaymentMethod((error, payload)=> {
      if (error) this.onPaymentMethodFailure(error)
      else this.onPaymentMethodSuccess(payload.nonce)
    })
  }




      private onPaymentMethodFailure(error) {  console.error('error-d0e1d8b0-e0a2-4f99-8fe4-a4d1f5e17627', error)
        this.site.ui.userFeedbackChannelSecondary({ message: error.message, state: 'error'})
        this.isSaving = false
      }




      private onPaymentMethodSuccess(token) {
        // this.site.api.braintree.deposit(this.site.storage.acctId), token, this.amount)
        //   .then(result => this.onDepositSuccess(result))
        //   .catch(error => this.onDepositFailure(error))
      }




          private onDepositFailure(error) {  console.log('error-dda3fe5c-358d-4d02-b02c-3055017d05e2', error)
            this.site.ui.userFeedbackChannelPrimary({ message: 'Unable to Deposit Funds', state: 'error' })
            this.isSaving = false
          }




          private onDepositSuccess(result) {
            if (!result.success) this.onDepositFailure(result)
            else {
              this.site.ui.userFeedbackChannelPrimary({ message: 'Deposit Successful', state: 'success' })
              this.isSaving = false
            }
          }
}
