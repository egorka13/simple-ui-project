import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './components/button/button.component';
import { RadioComponent } from './components/radio/radio.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ResultComponent } from './components/sui-result/result.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
    declarations: [
        ButtonComponent,
        RadioComponent,
        CheckboxComponent,
        ResultComponent,
        InputComponent
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
        InputComponent
    ],
    providers: []
})
export class LibraryModule {}
