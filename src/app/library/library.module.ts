import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ResultComponent } from './components/sui-result/result.component';

@NgModule({
    declarations: [
        ButtonComponent,
        ResultComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule
    ],
    exports: [
        ButtonComponent,
        ResultComponent,
    ],
    providers: []
})
export class LibraryModule {
}
