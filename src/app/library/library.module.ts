import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { CheckboxAntComponent } from './components/checkbox-ant/checkbox-ant.component';

@NgModule({
    declarations: [ButtonComponent, CheckboxAntComponent, InputComponent],
    imports: [BrowserModule, FormsModule, CommonModule],
    exports: [ButtonComponent, CheckboxAntComponent, InputComponent],
    providers: [],
})
export class LibraryModule {}
