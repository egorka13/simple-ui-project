import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './components/button/button.component';
<<<<<<< HEAD
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ResultComponent } from './components/result/result.component';
import { InputComponent } from './components/input/input.component';
import { InputNumberComponent } from './components/input-number/input-number.component';
=======
import { ResultComponent } from './components/result/result.component';
>>>>>>> 8f556b20185df94e2b7297809288bde22e911345
import { SliderComponent } from './components/slider/slider.component';

@NgModule({
    declarations: [
        ButtonComponent,
        CheckboxComponent,
        ResultComponent,
<<<<<<< HEAD
        InputComponent,
        InputNumberComponent,
        SliderComponent
=======
        SliderComponent,
>>>>>>> 8f556b20185df94e2b7297809288bde22e911345
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule
    ],
    exports: [
        ButtonComponent,
        CheckboxComponent,
        ResultComponent,
<<<<<<< HEAD
        InputComponent,
        InputNumberComponent,
=======
>>>>>>> 8f556b20185df94e2b7297809288bde22e911345
        SliderComponent
    ],
    providers: []
})
export class LibraryModule {}
