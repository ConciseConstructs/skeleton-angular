import { Injectable } from '@angular/core'

  export interface Layer {
    name:string
    display:boolean
    style:any
  }


@Injectable({
  providedIn: 'root'
})
export class LayersService {

  public 'layer-background':Layer
  public 'layer-main':Layer
  public 'layer-overlay':Layer
  public 'layer-primary-channel':Layer


  constructor() {
      this.makeBackgroundLayer()
      this.makeMainLayer()
      this.makeSecondaryChannelLayer()
      this.makePrimaryChannelLayer()
      this.makeOverlayLayer()
    }












    private makeBackgroundLayer() {
      this['layer-background'] = {
        name: 'background',
        display: true,
        style: { 'z-index':  4000, }
      }
    }












    private makeMainLayer() {
      this[`layer-main`] = {
        name: 'main',
        display: true,
        style: { 'z-index':  5000 }
      }
    }












    private makeSecondaryChannelLayer() {
      this[`layer-secondary-channel`] = {
        name: 'secondary-channel',
        display: true,
        style: { 'z-index':  6000,
          position: 'absolute',
          bottom: '45px',
          right: '0px',
          marginRight: '1rem',
          width: '250px',
          display: 'flex',
          flexDirection: 'column-reverse',
        }
      }
    }












    private makePrimaryChannelLayer() {
      this[`layer-primary-channel`] = {
        name: 'primary-channel',
        display: true,
        style: { 'z-index':  7000,
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '0px'
        }
      }
    }












    private makeOverlayLayer() {
      this[`layer-overlay`] = {
        name: 'overlay',
        display: false,
        style: { 'z-index':  8000,
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: '100%',
          height: '100%'
        }
      }
    }

}
