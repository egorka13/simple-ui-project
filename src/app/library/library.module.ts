import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './components/button/button.component';
import { RadioComponent } from './components/radio/radio.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ResultComponent } from './components/result/result.component';
import { InputComponent } from './components/input/input.component';
import { InputNumberComponent } from './components/input-number/input-number.component';

@NgModule({
    declarations: [
        ButtonComponent,
        RadioComponent,
        CheckboxComponent,
        ResultComponent,
        InputComponent,
        InputNumberComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule
    ],
    exports: [
        ButtonComponent,
        RadioComponent,
        CheckboxComponent,
        ResultComponent,
        InputComponent,
        InputNumberComponent
    ],
    providers: []
})
export class LibraryModule {}
