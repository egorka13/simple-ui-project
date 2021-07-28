import { Component, ViewChild, Input, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { IDataComponent, IGroupItems } from '@models/component-panel.model';
import { IlibraryCurrentInformation } from '@models/library-getter.model';
import { LibraryGetterService } from '@services/library-getter.service';
import { BoardConverseService } from '@services/board-converse.service';
import { PopupComponent } from './popup/popup.component';

@Component({
    selector: 'sui-component-panel',
    templateUrl: './component-panel.component.html',
    styleUrls: ['./component-panel.component.less'],
})
export class ComponentPanelComponent {
    constructor(
        private libraryGetterService: LibraryGetterService,
        private componentFactoryResolver: ComponentFactoryResolver,
        public viewContainerRef: ViewContainerRef,
        public boardConverseService: BoardConverseService
    ) {}

    @ViewChild('popupContainer', { read: ViewContainerRef })
    popupContainer: ViewContainerRef;

    @Input()
    value: string;

    groupItems: IGroupItems[] = [{ group: 'Base' }, { group: 'Logical' }, { group: 'Multimedia' }];

    dataComponents: IDataComponent[] = [
        {
            group: 'Multimedia',
            nameComponent: 'Card',
            svgUrl: '/assets/icons/panel/card-icon.svg',
            component: this.libraryGetterService.getLibraryComponentsInfo.card,
        },
        {
            group: 'Multimedia',
            nameComponent: 'Result',
            svgUrl: '/assets/icons/panel/result-icon.svg',
            component: this.libraryGetterService.getLibraryComponentsInfo.result,
        },
        {
            group: 'Base',
            nameComponent: 'Button',
            svgUrl: '/assets/icons/panel/button-icon.svg',
            component: this.libraryGetterService.getLibraryComponentsInfo.button,
        },
        {
            group: 'Logical',
            nameComponent: 'Checkbox',
            svgUrl: '/assets/icons/panel/checkbox-icon.svg',
            component: this.libraryGetterService.getLibraryComponentsInfo.checkbox,
        },
        {
            group: 'Logical',
            nameComponent: 'Radio',
            svgUrl: '/assets/icons/panel/radio-icon.svg',
            component: this.libraryGetterService.getLibraryComponentsInfo.radio,
        },
        {
            group: 'Logical',
            nameComponent: 'Slider',
            svgUrl: '/assets/icons/panel/slider-icon.svg',
            component: this.libraryGetterService.getLibraryComponentsInfo.slider,
        },
        {
            group: 'Base',
            nameComponent: 'Input',
            svgUrl: '/assets/icons/panel/input-icon.svg',
            component: this.libraryGetterService.getLibraryComponentsInfo.input,
        },
        {
            group: 'Base',
            nameComponent: 'Input Number',
            svgUrl: '/assets/icons/panel/input-number-icon.svg',
            component: this.libraryGetterService.getLibraryComponentsInfo.inputNumber,
        },
    ];

    public showPopup(item: IlibraryCurrentInformation, event: Event): void {
        this.popupContainer.clear();
        const targetElement: HTMLElement = <HTMLElement>event.currentTarget;
        const targetElementCoords: DOMRect = targetElement.getBoundingClientRect();
        const popupLeft: number = 2 * targetElementCoords.left + targetElementCoords.right;
        let populTop: number = targetElementCoords.y + targetElementCoords.x - targetElementCoords.height;
        let bootomFlag = false;
        if (document.documentElement.clientHeight - targetElementCoords.top <= 250) {
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
        this.boardConverseService.addLibraryComponent(component.component, {});
    }
}
