import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ResultComponent } from './components/sui-result/result.component';
import { InputComponent } from './components/input/input.component';
import { InputNumberComponent } from './components/input-number/input-number.component';

@NgModule({
    declarations: [
        ButtonComponent,
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
        ResultComponent,
        InputComponent,
        InputNumberComponent
    ],
    providers: []
})
export class LibraryModule {}
