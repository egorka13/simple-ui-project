import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './card/card.component';

@NgModule({
    declarations: [ButtonComponent, CardComponent],
    imports: [BrowserModule, FormsModule, CommonModule],
    exports: [ButtonComponent, CardComponent],
    providers: [],
})
export class LibraryModule {}
