import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
    declarations: [ButtonComponent, InputComponent],
    imports: [BrowserModule, FormsModule, CommonModule],
    exports: [ButtonComponent, InputComponent],
    providers: [],
})
export class LibraryModule {}
