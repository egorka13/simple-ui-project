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

@Component({
    selector: 'sui-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.less'],
})
export class TabsComponent implements AfterViewInit {
    public delimiterXpos: string = '0px';
    public targetElementWidth: string = '0px';
    public delimiterContainerWidth: string = '500px';
    private different: number = 20;
    public templateContent: string = '';

    @Input()
    innerContent: Array<TabsContent> = [];

    @ViewChild('btnContainer')
    btnContainerRef: ElementRef;

    @ViewChild('tabsContent', { read: ViewContainerRef })
    contentContainer: ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        public viewContainerRef: ViewContainerRef
    ) {}

    public onClickItem(event: Event): void {
        const targetElement: HTMLElement = event.target as HTMLElement;
        const elementNumber: number = Number(targetElement.classList[0].slice(-1));
        const contentType: string = this.getType(this.innerContent[elementNumber - 1].content);
        this.renderContent(contentType, elementNumber);
        if (targetElement.parentElement) {
            const diff: number = targetElement.offsetLeft - targetElement.parentElement.offsetLeft;
            if (elementNumber > 1) {
                this.delimiterXpos = `${diff}px`;
                this.targetElementWidth = `${targetElement.clientWidth}px`;
            } else {
                this.targetElementWidth = `${targetElement.clientWidth - this.different}px`;
                this.delimiterXpos = '0px';
            }
        }
    }

    private renderContent(type: string, elementNumber: number): void {
        switch (type) {
            case 'String':
                this.clearContent();
                this.templateContent = this.innerContent[elementNumber - 1].content;
                break;
            case 'Function':
                this.clearContent();
                const targetComponent = this.componentFactoryResolver.resolveComponentFactory(
                    this.innerContent[elementNumber - 1].content
                );
                this.viewContainerRef.createComponent(targetComponent);
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
        const btnContainer: HTMLElement = this.btnContainerRef.nativeElement as HTMLElement;
        setTimeout(() => {
            this.delimiterContainerWidth = `${btnContainer.scrollWidth}px`;
        }, 0);
    }

    private getType(value: any): string {
        return Object.prototype.toString.call(value).slice(8, -1);
    }

    private clearContent(): void {
        this.templateContent = '';
        this.viewContainerRef.clear();
    }
}
