import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { InputNumberComponent } from './components/sui-input-number/input-number.component';

@NgModule({
    declarations: [ButtonComponent, InputComponent, InputNumberComponent],
    imports: [BrowserModule, FormsModule, CommonModule],
    exports: [ButtonComponent, InputComponent, InputNumberComponent],
    providers: [],
})
export class LibraryModule {}
