import { Directive, Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { AnimationBuilder, AnimationMetadata, animate, style } from '@angular/animations';


@Directive({
  selector: '[fadeInView]'
})
export class FadeInViewDirective {


  constructor(private animationBuilder: AnimationBuilder, private el: ElementRef) { 
    this.animationBuilder
      .build(this.fadeIn())
      .create(this.el.nativeElement)
      .play()
  }




  private fadeIn(): AnimationMetadata[] {
    return [
      style({ opacity: 0 }),
      animate('400ms ease-in', style({ opacity: 1 }))
    ]
  }

}