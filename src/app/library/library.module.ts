import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { InputAntComponent } from './components/input-ant/input-ant.component';

@NgModule({
    declarations: [
        ButtonComponent,
        InputAntComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule
    ],
    exports: [
        ButtonComponent,
        InputAntComponent
    ],
    providers: []
})
export class LibraryModule {
}
