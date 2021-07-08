import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { RadioComponent } from './components/radio/radio.component';
import { ResultComponent } from './components/sui-result/result.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
    declarations: [
        ButtonComponent,
        RadioComponent
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
        RadioComponent
        ResultComponent,
        InputComponent
    ],
    providers: []
})
export class LibraryModule {}
