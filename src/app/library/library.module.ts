import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { RadioComponent } from './components/radio/radio.component';

@NgModule({
    declarations: [
        ButtonComponent,
        RadioComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule
    ],
    exports: [
        ButtonComponent,
        RadioComponent
    ],
    providers: []
})
export class LibraryModule {
}
