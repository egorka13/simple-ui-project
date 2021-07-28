import { Injectable } from '@angular/core';
import { ILibraryInformation } from '../../models/library-getter.model';
import { ButtonComponent } from '../../library/components/button/button.component';
import { CardComponent } from '../../library/components/card/card.component';
import { CheckboxComponent } from '../../library/components/checkbox/checkbox.component';
import { InputComponent } from '../../library/components/input/input.component';
import { InputNumberComponent } from '../../library/components/input-number/input-number.component';
import { RadioComponent } from '../../library/components/radio/radio.component';
import { ResultComponent } from '../../library/components/result/result.component';
import { SliderComponent } from '../../library/components/slider/slider.component';

@Injectable({
    providedIn: 'root',
})
export class LibraryGetterService {

    private libraryInformation:ILibraryInformation = {
        button: {
            component: ButtonComponent,
            title: 'Button component',
            desciption: 'Text',
        },
        card: {
            component: CardComponent,
            title: 'Card component',
            desciption: 'Text',
        },
        checkbox: {
            component: CheckboxComponent,
            title: 'Checkbox component',
            desciption: 'Text',
        },
        input: {
            component: InputComponent,
            title: 'Input component',
            desciption: 'Text',
        },
        inputNumber: {
            component: InputNumberComponent,
            title: 'Input number component',
            desciption: 'Text',
        },
        radio: {
            component: RadioComponent,
            title: 'Radio button component',
            desciption: 'Text',
        },
        result: {
            component: ResultComponent,
            title: 'Result component',
            desciption: 'Text',
        },
        slider: {
            component: SliderComponent,
            title: 'Slider component',
            desciption: 'Text',
        },
    };

    get getLibraryComponentsInfo(): ILibraryInformation {
        return this.libraryInformation;
    }
}
