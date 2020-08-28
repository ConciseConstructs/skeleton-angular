import { Component } from '@angular/core';
import { UiFeedback } from 'src/assets/types/UiFeedback.type';
import { SiteService } from 'src/app/services/site/site.service';

@Component({
  selector: 'app-feedback-header',
  templateUrl: './feedback-header.component.html',
  styleUrls: ['./feedback-header.component.scss'],
})
export class FeedbackHeaderComponent {

  public message:string
  public state:string
  public divStyle:any
  private timeout:number
  private heightTransitionInterval:number


  constructor(
    private site:SiteService
  ) {
    this.site.events.onChannelPrimary.subscribe(feedback => this.onFeedback(feedback))
    this.timeout = 3000
    this.heightTransitionInterval = 400
  }












  private onFeedback(feedback:UiFeedback) {
    try { this._onFeedback(feedback) }
    catch (error) {
      this.site.events.onError.next({ signature: '4e4235f9-a849-4680-8d45-d9343a8444a8', details: error })
    }
  }




      private _onFeedback(feedback) {
        this.state = feedback.state
        this.determineComponentHeight()
        this.displayMessageWhenHeightGrows(feedback)
        this.shrinkComponentAfterInterval()
      }




          private determineComponentHeight() {
            if (this.site.renderFor === 'mobile') this.divStyle = this.mobileDivStyle()
            else this.divStyle = this.pcDivStyle()
          }




              private mobileDivStyle() {
                return {
                  height: '56px'
                }
              }




              private pcDivStyle() {
                return {
                  height: '36px'
                }
              }












  private displayMessageWhenHeightGrows(feedback) {
    try { this._displayMessageWhenHeightGrows(feedback) }
    catch (error) {
      this.site.events.onError.next({ signature: '69523a54-c9e4-4025-94bc-509ba48222a5', details: error })
    }
  }




      private _displayMessageWhenHeightGrows(feedback) {
        setTimeout(()=> {
          this.message = feedback.message
        }, this.heightTransitionInterval)
      }












  private shrinkComponentAfterInterval() {
    try { this._shrinkComponentAfterInterval() }
    catch (error) {
      this.site.events.onError.next({ signature: '8c892e6f-17da-4692-ad4d-bdcc26ee9b62', details: error })
    }
  }




      private _shrinkComponentAfterInterval() {
        setTimeout(()=> {
          this.message = null
          this.divStyle.height = '0px'
        }, this.timeout)
      }












  public get headingStyle() {
    try { return this._headingStyle() }
    catch (error) {
      this.site.events.onError.next({ signature: 'b5fd51f1-8837-4cd9-bc54-27aeaa84f65c', details: error })
    }
  }




      private _headingStyle() {
        if (this.site.renderFor === 'mobile') return this.mobileHeadingStyle()
        else return this.pcHeadingStyle()
      }




          private mobileHeadingStyle() {
            return {
              fontSize: '23px',
              paddingTop: '.9rem'
            }
          }




          private pcHeadingStyle() {
            return {
              fontSize: '20px',
              paddingTop: '.5rem'
            }
          }

}
