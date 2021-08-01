import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { ButtonComponent } from './components/button/button.component';
import { RadioComponent } from './components/radio/radio.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ResultComponent } from './components/result/result.component';
import { InputComponent } from './components/input/input.component';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { SliderComponent } from './components/slider/slider.component';
import { CardComponent } from './components/card/card.component';
import { RectangleComponent } from './components/rectangle/rectangle.component';

@NgModule({
    declarations: [
        ButtonComponent,
        RadioComponent,
        CheckboxComponent,
        ResultComponent,
        InputComponent,
        InputNumberComponent,
        SliderComponent,
        CardComponent,
        RectangleComponent,
    ],
    imports: [BrowserModule, FormsModule, CommonModule, HttpClientModule, AngularSvgIconModule.forRoot()],
    exports: [
        ButtonComponent,
        RadioComponent,
        CheckboxComponent,
        ResultComponent,
        InputComponent,
        InputNumberComponent,
        SliderComponent,
        CardComponent,
        RectangleComponent,
    ],
    providers: [],
})
export class LibraryModule {}
