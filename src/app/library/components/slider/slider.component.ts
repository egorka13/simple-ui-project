import { Component, ElementRef, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { suiSliderParams } from "./slider-params.model";

@Component({
  selector: 'sui-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {

  public showMarker:boolean = true;

  @Input()
  disabled?:boolean = false;

  @Input()
  customparams?:suiSliderParams;

  @Input()
  wrapperWidth?:string = "500px";

  @Input()
  maxValue?: number = 100;

  @Input()
  minValue?: number = 0;

  @Input()
  currentValue?:number = 0;

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

  public onChange():void{
    this.sliderValue.emit(this.currentValue);
  }

  public onMouseDown():void{
    this.showMarker = false;
  }

  public onMouseUp():void{
    this.showMarker = true;
  }

  public onMouseOver():void{
    this.showMarker = false;
  }

  public onMouseOut():void{
    this.showMarker = true;
  }

  constructor() { }

  ngOnInit(): void {
    this.checkValidParams();
  }

  public getCurrentMarkerOffset():string{
    let deltaX: number = 15;
    if(((this.currentValue !== undefined && this.maxValue !== undefined && this.minValue !== undefined))){
      let progressPersent:number = ((Math.abs(this.minValue - this.currentValue) * 100) / (this.maxValue - this.minValue));
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

  public getCurrentProgressWidth():String{
    if((this.minValue !== undefined) && (this.maxValue !== undefined) && (this.currentValue !== undefined)){
      return `${((Math.abs(this.minValue - this.currentValue)) *
        Number(this.wrapperWidth?.substring(0, this.wrapperWidth.length - 2))) /
        (this.maxValue - this.minValue)}px`;
    }
    return "0px";
  }

  public checkValidParams():void{
    if((this.minValue !== undefined) && (this.maxValue !== undefined) && (this.currentValue !== undefined)){
      if(this.minValue > this.maxValue){
        this.minValue = 0;
        this.maxValue = 100;
        throw new Error("SUI-ERROR: Minimal value cannot be greater then maximum!");
      }
      if(((this.currentValue > this.maxValue) || (this.minValue > this.currentValue))) {
        this.currentValue = this.minValue;
        throw new Error("SUI-ERROR: Current value cannot be greater then maximum and less then minimum!");
      }
    }
  }

  public setCustomColorProperty(type:string, value?:string):Object{
    if(value !== undefined){
      return {
        [type]:value
      };
    }
    return {};

  }

  countDigits(number:number):number {
    return String(number).length;
  }

  setSliderParams():Object{
    if(this.customparams?.setSliderColor !== undefined){
      return {
        width: this.getCurrentProgressWidth(),
        background: this.customparams?.setSliderColor
      }
    }
    return {
      width: this.getCurrentProgressWidth()
    }
  }
}
