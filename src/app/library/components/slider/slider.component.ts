import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sui-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit, AfterViewInit {

  showMarker:boolean = true;

  @Input()
  wrapperWidth?:string = "500px";

  @Input()
  maxValue?: number = 800;

  @Input()
  minValue?: number = 0;

  @Input()
  currentValue?:number = 50;

  @Input()
  step?:number = 1;

  @ViewChild("suiSlider")
  suiSlider: ElementRef;

  @ViewChild("suiProgressBar")
  suiProgressBar: ElementRef;

  @ViewChild("marker")
  marker: ElementRef;

  @Output()
  sliderValue: EventEmitter<number> = new EventEmitter<number>();

  onChange():void{
    this.sliderValue.emit(this.currentValue);
  }

  onMouseDown():void{
    this.showMarker = false;
  }

  onMouseUp():void{
    this.showMarker = true;
  }

  onMouseOver():void{
    this.showMarker = false;
  }

  onMouseOut():void{
    this.showMarker = true;
  }

  constructor() { }

  ngOnInit(): void {
    this.checkValidParams();
  }

  ngAfterViewInit():void{

  }

  getCurrentMarkerOffset():string{
    let deltaX: number = 15;
    if(((this.currentValue !== undefined && this.maxValue !== undefined))){
      console.log(Number(this.getCurrentProgressWidth()
      .substring(0, this.getCurrentProgressWidth().length - 2)));
      let progressPersent:number = ((this.currentValue * 100) / this.maxValue);
      console.log(progressPersent);
      if(progressPersent >= 85){
        deltaX = 25;
      }
      if(progressPersent > 20 && progressPersent <= 40){
        deltaX = 16;
      }
      if(progressPersent > 5 && progressPersent <= 20){
        deltaX = 13;
      }

      if(progressPersent <= 5){
        deltaX = 8;
      }

      if(progressPersent <= 2){
        deltaX = 2;
      }
      return `${Number(this.getCurrentProgressWidth()
        .substring(0, this.getCurrentProgressWidth().length - 2)) - (deltaX)}px`;
    }
    return "0px"
  }

  getCurrentProgressWidth():String{
    if((this.minValue !== undefined) && (this.maxValue !== undefined) && (this.currentValue !== undefined)){
      return `${this.currentValue * Number(this.wrapperWidth?.substring(0, this.wrapperWidth.length - 2)) / this.maxValue}px`;
    }
    return "0px";
  }

  checkValidParams():void{
    if((this.minValue !== undefined) && (this.maxValue !== undefined) && (this.currentValue !== undefined)){
      if(this.minValue > this.maxValue){
        this.minValue = 0;
        this.maxValue = 100;
        throw new Error("SUI-ERROR: Minimal value cannot be greater then maximum!");
      }
      if((this.currentValue > this.maxValue)) {
        this.currentValue = this.minValue;
        throw new Error("SUI-ERROR: Current value cannot be greater then maximum and less then minimum!");
      }
    }
  }

  countDigits(number:number):number {
    return String(number).length;
 }
}
