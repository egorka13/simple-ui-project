import {
    Component,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    AfterViewInit,
    ElementRef,
    Input,
} from '@angular/core';

import { TabsContent } from './tabs.model';
import { LibraryGetterService } from '@services/library-getter.service';

@Component({
    selector: 'sui-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.less'],
})
export class TabsComponent implements AfterViewInit {
    public _delimiterXpos: string = '0px';
    public _targetElementWidth: string = '0px';
    public _templateContent: string = '';
    public _delimiterContainerWidth: string = '500px';
    public _maxNavigationContainerWidth: string = '800px';

    private _different: number = 20;

    public isFullSizeMode: boolean = false;

    @Input()
    innerContent: Array<TabsContent> = [
        {
            tabTitle: 'Tab-1',
            isDisable: false,
            content: 'Content of tab-1',
        },
        {
            tabTitle: 'Tab-2',
            isDisable: false,
            content: 'Content of tab-2',
        },
        {
            tabTitle: 'Tab-3',
            isDisable: false,
            content: this.libraryGetterService.getLibraryComponentsInfo.suiSwitch.component,
        },
    ];

    @Input()
    set setFullSizeMode(value: boolean) {
        this.isFullSizeMode = value;
        if (!value) {
            this._delimiterContainerWidth = '500px';
        }
        this.fullMode();
    }

    @ViewChild('btnContainer')
    btnContainerRef: ElementRef;

    @ViewChild('tabsContent', { read: ViewContainerRef })
    contentContainer: ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private libraryGetterService: LibraryGetterService
    ) {}

    public onClickItem(event: Event): void {
        const targetElement: HTMLElement = event.target as HTMLElement;
        const elementNumber: number = parseInt(targetElement.classList[0].replace(/[^\d]/g, ''));
        const contentType: string = this.getType(this.innerContent[elementNumber - 1].content);
        this.renderContent(contentType, elementNumber);
        if (targetElement.parentElement) {
            const diff: number = targetElement.offsetLeft - targetElement.parentElement.offsetLeft;
            if (elementNumber > 1) {
                this._delimiterXpos = `${diff}px`;
                this._targetElementWidth = `${targetElement.clientWidth}px`;
            } else {
                this._targetElementWidth = `${targetElement.clientWidth - this._different}px`;
                this._delimiterXpos = '0px';
            }
        }
    }

    private renderContent(type: string, elementNumber: number): void {
        switch (type) {
            case 'String':
                this.clearContent();
                this._templateContent = this.innerContent[elementNumber - 1].content;
                break;
            case 'Function':
                this.clearContent();
                const targetComponent = this.componentFactoryResolver.resolveComponentFactory(
                    this.innerContent[elementNumber - 1].content
                );
                this.contentContainer.createComponent(targetComponent);
                break;
            default:
                console.log(
                    '%cError, Invalid type. Use string or class component in tabs content!',
                    'color:red;font-weight:bold;'
                );
                break;
        }
    }

    ngAfterViewInit(): void {
        this.fullMode();
    }

    private getType(value: any): string {
        return Object.prototype.toString.call(value).slice(8, -1);
    }

    private clearContent(): void {
        this._templateContent = '';
        this.contentContainer.clear();
    }

    private fullMode(): void {
        setTimeout(() => {
            const btnContainer: HTMLElement = this.btnContainerRef.nativeElement as HTMLElement;
            console.log(btnContainer.scrollWidth);
            if (!this.isFullSizeMode) {
                this._maxNavigationContainerWidth = '800px';
                this._delimiterContainerWidth = `${btnContainer.scrollWidth}px`;
            } else {
                this._delimiterContainerWidth = '100vw';
                this._maxNavigationContainerWidth = 'none';
            }
        }, 100);
    }
}
