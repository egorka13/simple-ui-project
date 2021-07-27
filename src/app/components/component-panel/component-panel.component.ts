import {
    Component,
    ViewChild,
    ElementRef,
    Input,
    ViewContainerRef,
    ComponentFactoryResolver
} from '@angular/core';
import { IDataComponent } from './panel.model';
import { IGroupItems } from './panel.model';
import { LibraryGetterService } from '../../core/services/library-getter.service';
import { ILibraryInformation, IlibraryCurrentInformation } from '../../core/services/library-getter.model';
import { PopupComponent } from './popup/popup.component';
import { BoardConverseService } from '@services/board-converse.service';

import { InputComponent } from '@library-components/input/input.component';
import { InputNumberComponent } from '@library-components/input-number/input-number.component';
import { CheckboxComponent } from '@library-components/checkbox/checkbox.component';
import { CardComponent } from '@library-components/card/card.component';
import { ButtonComponent } from '@library-components/button/button.component';
import { ResultComponent } from '@library-components/result/result.component';
import { RadioComponent } from '@library-components/radio/radio.component';
import { SliderComponent } from '@library-components/slider/slider.component';

@Component({
    selector: 'sui-component-panel',
    templateUrl: './component-panel.component.html',
    styleUrls: ['./component-panel.component.less'],
})
export class ComponentPanelComponent {
    constructor(
        private libraryGetterService:LibraryGetterService,
        private componentFactoryResolver: ComponentFactoryResolver,
        public viewContainerRef: ViewContainerRef,
        public boardConverseService: BoardConverseService
    ) {}

    @ViewChild('popupContainer', { read: ViewContainerRef })
    popupContainer: ViewContainerRef;

    groupItems: IGroupItems[] = [{ group: 'Base' }, { group: 'Logical' }, { group: 'Multimedia' }];

    // dataComponents: IDataComponent[] = [
    //     { group: 'Multimedia', nameComponent: 'Card', svgUrl: '/assets/icons/panel/card-icon.svg', component: this.libraryGetterService.getLibraryComponentsInfo.card  },
    //     { group: 'Multimedia', nameComponent: 'Result', svgUrl: '/assets/icons/panel/result-icon.svg', component: this.libraryGetterService.getLibraryComponentsInfo.result },
    //     { group: 'Base', nameComponent: 'Button', svgUrl: '/assets/icons/panel/button-icon.svg', component: this.libraryGetterService.getLibraryComponentsInfo.button },
    //     { group: 'Logical', nameComponent: 'Checkbox', svgUrl: '/assets/icons/panel/checkbox-icon.svg', component: this.libraryGetterService.getLibraryComponentsInfo.checkbox },
    //     { group: 'Logical', nameComponent: 'Radio', svgUrl: '/assets/icons/panel/radio-icon.svg', component: this.libraryGetterService.getLibraryComponentsInfo.radio },
    //     { group: 'Logical', nameComponent: 'Slider', svgUrl: '/assets/icons/panel/slider-icon.svg', component: this.libraryGetterService.getLibraryComponentsInfo.slider },
    //     { group: 'Base', nameComponent: 'Input', svgUrl: '/assets/icons/panel/input-icon.svg', component: this.libraryGetterService.getLibraryComponentsInfo.input },
    //     { group: 'Multimedia', nameComponent: 'Result', svgUrl: '/assets/icons/panel/result-icon.svg', component: this.libraryGetterService.getLibraryComponentsInfo.result }
    // ];
    dataComponents: IDataComponent[] = [
        {
            group: 'Multimedia',
            nameComponent: 'Card',
            svgUrl: '/assets/icons/panel/card-icon.svg',
            component: CardComponent,
        },
        {
            group: 'Multimedia',
            nameComponent: 'Result',
            svgUrl: '/assets/icons/panel/result-icon.svg',
            component: ResultComponent,
        },
        {
            group: 'Base',
            nameComponent: 'Button',
            svgUrl: '/assets/icons/panel/button-icon.svg',
            component: ButtonComponent,
        },
        {
            group: 'Logical',
            nameComponent: 'Checkbox',
            svgUrl: '/assets/icons/panel/checkbox-icon.svg',
            component: CheckboxComponent,
        },
        {
            group: 'Logical',
            nameComponent: 'Radio',
            svgUrl: '/assets/icons/panel/radio-icon.svg',
            component: RadioComponent,
        },
        {
            group: 'Logical',
            nameComponent: 'Slider',
            svgUrl: '/assets/icons/panel/slider-icon.svg',
            component: SliderComponent,
        },
        {
            group: 'Base',
            nameComponent: 'Input',
            svgUrl: '/assets/icons/panel/input-icon.svg',
            component: InputComponent,
        },
        {
            group: 'Base',
            nameComponent: 'Input Number',
            svgUrl: '/assets/icons/panel/input-number-icon.svg',
            component: InputNumberComponent,
        },
    ];

    @ViewChild('inputSearch')
    inputSearch: ElementRef;

    @ViewChild('componentItem')
    componentItem: ElementRef;

    @Input()
    value: string;

    public test:string = "1";

    public popupComponent: IlibraryCurrentInformation = this.libraryGetterService.getLibraryComponentsInfo.card;

    public showPopup(item: IlibraryCurrentInformation, event: Event):void{
        this.popupContainer.clear();
        const targetElement:HTMLElement = <HTMLElement>event.currentTarget;
        const targetElementCoords:DOMRect = targetElement.getBoundingClientRect();
        const popupLeft: number = 2 * targetElementCoords.left + targetElementCoords.right;
        let populTop: number = targetElementCoords.y  + targetElementCoords.x
        - targetElementCoords.height ;
        let bootomFlag = false;
        if(document.documentElement.clientHeight - targetElementCoords.top <= 250){
            populTop = targetElementCoords.y - 250 - targetElementCoords.height / 4;
            bootomFlag = true;
        }
        const targetComponent = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
        const componentRef = this.popupContainer.createComponent(targetComponent);
        componentRef.instance.component = item;
        componentRef.instance.position = [`${popupLeft}px`, `${populTop}px`];
        componentRef.instance.bottomFlaf = bootomFlag;
    }

    public _addComponent(component: any): void {
        this.boardConverseService.addLibraryComponent(component, {});
    }
}