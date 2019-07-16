import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private eleRef: ElementRef) {  }

  @HostListener('mouseover') onMouseOver() {
    this.changeBackgroundColor('Gainsboro');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.changeBackgroundColor('whitesmoke');
  }
  private changeBackgroundColor(color: string) {
    this.eleRef.nativeElement.style.backgroundColor = color;
  }

}
