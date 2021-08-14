import {
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    Renderer2,
    AfterViewInit,
    ElementRef,
} from '@angular/core';

@Component({
    selector: 'sui-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.less'],
})
export class TabsComponent implements OnInit, AfterViewInit {
    public delimiterXpos: string = '0px';
    public targetElementWidth: string = '0px';
    public delimiterContainerWidth: string = '500px';
    private different: number = 20;

    @ViewChild('btnContainer')
    btnContainerRef: ElementRef;

    @ViewChild('tabsContent', { read: ViewContainerRef })
    contentContainer: ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        public viewContainerRef: ViewContainerRef,
        private renderer: Renderer2
    ) {}

    public onClickItem(event: Event): void {
        const targetElement: HTMLElement = event.target as HTMLElement;
        if (targetElement.parentElement) {
            const diff: number = targetElement.offsetLeft - targetElement.parentElement.offsetLeft;
            const elementNumber: number = Number(targetElement.classList[1].slice(-1));
            if (elementNumber > 1) {
                this.delimiterXpos = `${diff}px`;
                this.targetElementWidth = `${targetElement.clientWidth}px`;
            } else {
                this.targetElementWidth = `${targetElement.clientWidth - this.different}px`;
                this.delimiterXpos = '0px';
            }
        }
    }

    ngAfterViewInit(): void {
        this.contentContainer.clear();
        const btnContainer: HTMLElement = this.btnContainerRef.nativeElement as HTMLElement;
        setTimeout(() => {
            this.delimiterContainerWidth = `${btnContainer.scrollWidth}px`;
        }, 0);
    }

    ngOnInit(): void {}
}
