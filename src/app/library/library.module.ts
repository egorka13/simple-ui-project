import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ResultComponent } from './components/result/result.component';
import { InputComponent } from './components/input/input.component';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { SliderComponent } from './components/slider/slider.component';

@NgModule({
    declarations: [
        ButtonComponent,
        CheckboxComponent,
        ResultComponent,
        InputComponent,
        InputNumberComponent,
        SliderComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule
    ],
    exports: [
        ButtonComponent,
        CheckboxComponent,
        ResultComponent,
        InputComponent,
        InputNumberComponent,
        SliderComponent
    ],
    providers: []
})
export class LibraryModule {}
