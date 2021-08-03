import { Component, ViewChild, ElementRef, Input, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { IDataComponent } from '@models/panel.model';
import { IGroupItems } from '@models/panel.model';
import { LibraryGetterService } from '@services/library-getter.service';
import { IlibraryCurrentInformation } from '@models/library-getter.model';
import { PopupComponent } from './popup/popup.component';
import { BoardConverseService } from '@services/board-converse.service';

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

    //Main popup container for inserting the content of hover components
    @ViewChild('popupContainer', { read: ViewContainerRef })
    popupContainer: ViewContainerRef;

    public groupItems: IGroupItems[] = [
        ...this.libraryGetterService.getLibraryDeferTypes.map(value => {
            return { group: value };
        }),
    ];

    public dataComponents: IDataComponent[] = Object.values(this.libraryGetterService.getLibraryComponentsInfo).map(
        (element: IlibraryCurrentInformation) => {
            return this.filterLibraryObject(element, [
                'group',
                'nameComponent',
                'svgUrl',
                'component',
                'title',
                'description',
            ]);
        }
    );

    @ViewChild('inputSearch')
    inputSearch: ElementRef;

    @ViewChild('componentItem')
    componentItem: ElementRef;

    @Input()
    value: string;

    /**
     * @see LibraryGetterService
     * @see ILibraryInformation
     * A method that transforms data from a library service for subsequent processing of components in the left pane
     * @param targetObject - the original object retrieved from the service component
     * @param keys An array of keys to sort by
     * @returns Returns a new array sorted by fields
     */
    private filterLibraryObject(targetObject: any, keys: Array<string>): IDataComponent {
        return keys.reduce((element: any, key: string) => ((element[key] = targetObject[key]), element), {});
    }

    /**
     * @see PopupComponent
     * Method responsible for displaying the popup container
     * @param item - An object with the necessary information about the component, which must be passed into the popup container for further display
     * @param event - Event to display popup
     */
    public showPopup(item: IDataComponent, event: Event): void {
        this.popupContainer.clear();
        const targetElement: HTMLElement = event.currentTarget as HTMLElement;
        const targetComponent = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
        const componentRef = this.popupContainer.createComponent(targetComponent);
        componentRef.instance.component = item.component;
        componentRef.instance.popupTitle = item.title;
        componentRef.instance.popupDescription = item.description;
        componentRef.instance.parentElement = targetElement;
    }

    public _addComponent(component: any): void {
        this.boardConverseService.addLibraryComponent(component);
    }
}
