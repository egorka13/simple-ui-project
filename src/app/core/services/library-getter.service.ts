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
import { SwitchComponent } from '@library-components/switch/switch.component';
import { LinkComponent } from '@library-components/link/link.component';
import { RectangleComponent } from '@library-components/rectangle/rectangle.component';
import { AlertComponent } from '@library-components/alert/alert.component';

@Injectable({
    providedIn: 'root',
})
/**
 * @class - Service used to register components in the left panel and display them in a pop-up container
 */
export class LibraryGetterService {
    /**
     * Available categories for components. To register a new category, you need to add it to this array, and also duplicate it in the model file
     * @see ILibraryInformation
     */
    private deferTypes: Array<string> = ['Base', 'Logical', 'Multimedia'];

    /**
     * List with registered components
     * @param key Unique naming of the component to avoid duplication
     * @param group Component category
     * @param nameComponent Component identify
     * @param svgUrl Path for left panel's icon
     * @param component Component instance (import new component and register in this list)
     * @param title Component's popup title name
     * @param description Component's popup display descriptions
     */
    private libraryInformation: ILibraryInformation = {
        suiButton: {
            group: 'Base',
            nameComponent: 'Button',
            svgUrl: './assets/icons/panel/button-icon.svg',
            component: ButtonComponent,
            title: 'Button component',
            description: 'Use this to trigger an operation.',
        },
        suiCard: {
            group: 'Multimedia',
            nameComponent: 'Card',
            svgUrl: './assets/icons/panel/card-icon.svg',
            component: CardComponent,
            title: 'Card component',
            description:
                'A card can be used to display content related to a single subject. The content can consist of multiple elements of varying types and sizes.',
        },
        suiCheckbox: {
            group: 'Logical',
            nameComponent: 'Checkbox',
            svgUrl: './assets/icons/panel/checkbox-icon.svg',
            component: CheckboxComponent,
            title: 'Checkbox component',
            description: 'Used for selecting multiple values from several options.',
        },
        suiInput: {
            group: 'Base',
            nameComponent: 'Input',
            svgUrl: './assets/icons/panel/input-icon.svg',
            component: InputComponent,
            title: 'Input component',
            description:
                'A basic widget for getting the user input is a text field. Keyboard and mouse can be used for providing or changing data.',
        },
        suiInputNumber: {
            group: 'Logical',
            nameComponent: 'InputNumber',
            svgUrl: './assets/icons/panel/input-number-icon.svg',
            component: InputNumberComponent,
            title: 'Input number component',
            description: 'Enter a number within certain range with the mouse or keyboard.',
        },
        suiRadio: {
            group: 'Logical',
            nameComponent: 'Radio',
            svgUrl: './assets/icons/panel/radio-icon.svg',
            component: RadioComponent,
            title: 'Radio button component',
            description: 'Used to select a single state from multiple options.',
        },
        suiResult: {
            group: 'Multimedia',
            nameComponent: 'Result',
            svgUrl: './assets/icons/panel/result-icon.svg',
            component: ResultComponent,
            title: 'Result component',
            description:
                'Use when important operations need to inform the user to process the results and the feedback is more complicated.',
        },
        suiSlider: {
            group: 'Logical',
            nameComponent: 'Slider',
            svgUrl: './assets/icons/panel/slider-icon.svg',
            component: SliderComponent,
            title: 'Slider component',
            description: 'A Slider component for displaying current value and intervals in range.',
        },
        suiSwitch: {
            group: 'Logical',
            nameComponent: 'Switch',
            svgUrl: './assets/icons/panel/sui-switch.svg',
            component: SwitchComponent,
            title: 'Switch component',
            description: 'Switching Selector.',
        },
        suiLink: {
            group: 'Base',
            nameComponent: 'Link',
            svgUrl: './assets/icons/panel/link-icon.svg',
            component: LinkComponent,
            title: 'Link component',
            description: 'A link component.',
        },
        suiAlert: {
            group: 'Multimedia',
            nameComponent: 'Alert',
            svgUrl: './assets/icons/panel/alert-icon.svg',
            component: AlertComponent,
            title: 'Alert component',
            description: 'Use when you need to show alert messages to users.',
        },
        suiRectangle: {
            group: 'Base',
            nameComponent: 'Rectangle',
            svgUrl: './assets/icons/panel/rectangle-icon.svg',
            title: 'Rectangle component',
            component: RectangleComponent,
            description: 'A Rectangle component, can be used for background, header or footer.',
        },
    };

    /**
     * @get Component's list getter
     * @return Component's list
     */
    get getLibraryComponentsInfo(): ILibraryInformation {
        return this.libraryInformation;
    }

    /**
     * @get Component categories list getter
     * @return List of component categories
     */
    get getLibraryDeferTypes(): Array<string> {
        return this.deferTypes;
    }
}
