import { Injectable } from '@angular/core';
import { Router, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd, RoutesRecognized, GuardsCheckStart, ChildActivationStart, ActivationStart, GuardsCheckEnd, ResolveStart, ResolveEnd, ChildActivationEnd, ActivationEnd, NavigationEnd, NavigationCancel, NavigationError, Scroll } from '@angular/router'
import { Subject } from 'rxjs'
import { LayersService } from '../layers/layers.service'
import { environment as saas } from '../../../../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public currentSection:string
  public currentStep:string
  public eventNewLocation:Subject<undefined>


  constructor(
    private router:Router,
    private layers:LayersService
  ) {
    this.router.events.subscribe(event => this.onRouterEvent(event))
    this.eventNewLocation = new Subject()
  }





      private setLocation(url:string) {
        let segments = url.split('/')
        this.currentSection = segments[1]
        if (segments[2]) this.currentStep = segments[2]
        else this.currentStep = null
        this.eventNewLocation.next()
      }




      private onRouterEvent(event) {
        let functionName = `on${ event.constructor.name }`
        if (this[functionName]) this[functionName](event)
      }







//https://angular.io/guide/router#router-events

private onNavigationStart	(event:NavigationStart) {
  if (saas.downForMaintenance && event.url !== '/downForMaintenance') this.router.navigate(['downForMaintenance'])
}  // An event triggered when navigation starts.


// private onRouteConfigLoadStart(event:RouteConfigLoadStart) { }
  // An event triggered before the Router lazy loads a route configuration.


// private onRouteConfigLoadEnd(event:RouteConfigLoadEnd) { }
  // An event triggered after a route has been lazy loaded.


private onRoutesRecognized(event:RoutesRecognized) {
  this.setLocation(event.urlAfterRedirects)
  // this.layers["layer-mobileActions"].display = false
  // this.layers["layer-overlay"].display = false
}  // An event triggered when the Router parses the URL and the routes are recognized.


// private onGuardsCheckStart(event:GuardsCheckStart) { }
  // An event triggered when the Router begins the Guards phase of routing.


// private onChildActivationStart(event:ChildActivationStart) { }
  // An event triggered when the Router begins activating a route's children.


// private onActivationStart(event:ActivationStart) { }
  // An event triggered when the Router begins activating a route.


// private onGuardsCheckEnd(event:GuardsCheckEnd) { }
  // An event triggered when the Router finishes the Guards phase of routing successfully.


// private onResolveStart(event:ResolveStart) { }
  // An event triggered when the Router begins the Resolve phase of routing.


// private onResolveEnd(event:ResolveEnd) { }
  // An event triggered when the Router finishes the Resolve phase of routing successfuly.


// private onChildActivationEnd(event:ChildActivationEnd) { }
  // An event triggered when the Router finishes activating a route's children.


// private onActivationEnd(event:ActivationEnd) { }
  // An event triggered when the Router finishes activating a route.


// private onNavigationEnd(event:NavigationEnd) { }
  // An event triggered when navigation ends successfully.


// private onNavigationCancel(event:NavigationCancel) { }
  // An event triggered when navigation is canceled. This is due to a Route Guard returning false during navigation.


// private onNavigationError(event:NavigationError) { }
  // An event triggered when navigation fails due to an unexpected error.


// private onScroll(event:Scroll) { }
  // An event that represents a scrolling event.


}