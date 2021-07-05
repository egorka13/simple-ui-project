import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { InputNumberComponent } from './input-number/input-number.component';

@NgModule({
    declarations: [ButtonComponent, InputNumberComponent],
    imports: [BrowserModule, FormsModule, CommonModule],
    exports: [ButtonComponent, InputNumberComponent],
    providers: [],
})
export class LibraryModule {}
