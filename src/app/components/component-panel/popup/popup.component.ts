import {
    Component,
    Input,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    AfterViewInit,
} from '@angular/core';
import { LibraryGetterService } from '../../../core/services/library-getter.service';
import { ILibraryInformation, IlibraryCurrentInformation } from '../../../core/services/library-getter.model';

@Component({
    selector: 'sui-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.less'],
})
export class PopupComponent implements OnInit, AfterViewInit {

    @Input()
    bottomFlaf:boolean = false;

    @ViewChild('popupContainer', { read: ViewContainerRef })
    popupContainer: ViewContainerRef;

    @Input()
    component: IlibraryCurrentInformation;

    @Input()
    position: Array<string> = ['0px', '0px'];

    private componentGeneratorTimer: ReturnType<typeof setTimeout>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        public viewContainerRef: ViewContainerRef
    ) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.componentGeneratorTimer = setTimeout(() => {
            this.generateComponent();
        }, 100);
    }

    ngOnDestroy(): void {
        clearTimeout(this.componentGeneratorTimer);
    }

    private generateComponent() {
        if (this.component.component) {
            this.popupContainer.clear();
            const targetComponent = this.componentFactoryResolver.resolveComponentFactory(this.component.component);
            const componentRef = this.popupContainer.createComponent(targetComponent);
        }
    }
}
