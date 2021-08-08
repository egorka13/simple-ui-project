import { Injectable } from '@angular/core';
import { ILibraryInformation } from '@models/library-getter.model';
import { ButtonComponent } from '@library-components/button/button.component';
import { CardComponent } from '@library-components/card/card.component';
import { CheckboxComponent } from '@library-components/checkbox/checkbox.component';
import { InputComponent } from '@library-components/input/input.component';
import { InputNumberComponent } from '@library-components/input-number/input-number.component';
import { RadioComponent } from '@library-components/radio/radio.component';
import { ResultComponent } from '@library-components/result/result.component';
import { SliderComponent } from '@library-components/slider/slider.component';
import { LinkComponent } from '@library-components/link/link.component';

@Injectable({
    providedIn: 'root',
})
export class LibraryGetterService {
    private libraryInformation: ILibraryInformation = {
        button: {
            component: ButtonComponent,
            title: 'Button component',
            description: 'Text',
        },
        card: {
            component: CardComponent,
            title: 'Card component',
            description: 'Text',
        },
        checkbox: {
            component: CheckboxComponent,
            title: 'Checkbox component',
            description: 'Text',
        },
        input: {
            component: InputComponent,
            title: 'Input component',
            description: 'Text',
        },
        inputNumber: {
            component: InputNumberComponent,
            title: 'Input number component',
            description: 'Text',
        },
        radio: {
            component: RadioComponent,
            title: 'Radio button component',
            description: 'Text',
        },
        result: {
            component: ResultComponent,
            title: 'Result component',
            description: 'Text',
        },
        slider: {
            component: SliderComponent,
            title: 'Slider component',
            description: 'Text',
        },
        link: {
            component: LinkComponent,
            title: 'Link component',
            description: 'Text',
        },
    };

    get getLibraryComponentsInfo(): ILibraryInformation {
        return this.libraryInformation;
    }
}
