import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ResultComponent } from './components/result/result.component';
import { SliderComponent } from './components/slider/slider.component';

@NgModule({
    declarations: [
        ButtonComponent,
        ResultComponent,
        SliderComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule
    ],
    exports: [
        ButtonComponent,
        ResultComponent,
        SliderComponent
    ],
    providers: []
})
export class LibraryModule {
}
