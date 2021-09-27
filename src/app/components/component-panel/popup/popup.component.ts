import {
    Component,
    Input,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    AfterViewInit,
    ElementRef,
    OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'sui-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.less'],
})

/**
 * @class The main component class, which is responsible for the dropdown tooltip when hovering over the component in the left pane
 */
export class PopupComponent implements AfterViewInit, OnDestroy {
    /** The field responsible for the class, when added, the fade animation is performed  */
    public isFade$ = new BehaviorSubject<boolean>(false);
    /** The field responsible for the parameter, when the state is set to "false", the component is removed from the DOM tree  */
    public isAlive$ = new BehaviorSubject<boolean>(true);

    /** Container for processing the main logic  (wrapper) */
    @ViewChild('popupContainer', { read: ViewContainerRef })
    popupContainer: ViewContainerRef;

    /** Container for inserting the hovered component  */
    @ViewChild('popupBody')
    popupBody: ElementRef;

    /** A parameter that accepts an instance of the required component as input */
    @Input()
    component: any;

    /** This parameter is required for the correct rendering of the height of the pop-up window.  */
    @Input()
    parentElement: HTMLElement;

    /** Popup input Title  */
    @Input()
    popupTitle: string;

    /** Popup input Description text  */
    @Input()
    popupDescription: string;

    /** The position of the pop-up window to the left relative to the general window and the element hover in the left pane   */
    public popupTopPos: string;
    /** The position of the pop-up window to the top relative to the general window and the element hover in the left pane   */
    public popupLeftPos: string;

    /** This parameter means that the pop-up window needs to be raised relative to the lower border of the screen    */
    public bottomFlag: boolean = false;

    /**
     * @see PopupComponent.isFade$
     * The parameter responsible for the speed of the fade class
     * */
    private fadeTimer: number = 1000;
    /**
     * @see PopupComponent.isAlive$
     * The parameter responsible for the speed of the alive field
     * */
    private popupRemoveTimer: number = this.fadeTimer + 500;

    /**
     * The current field is required to unsubscribe from the debouncing method
     */
    private componentGeneratorTimer: ReturnType<typeof setTimeout>;
    /**
     * The current field is required to unsubscribe from the debouncing method
     */
    private componentHeighGetterTimer: ReturnType<typeof setTimeout>;

    /** Field responsible for assembling all subscriptions */
    private subscriptions: Subscription = new Subscription();

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        public viewContainerRef: ViewContainerRef
    ) {}

    /**
     * @see PopupComponent.bottomFlag
     * The method responsible for changing the position of the pop-up tooltip relative to the bottom of the screen on hover.
     * The position of the window changes if its height falls outside the visible border
     * @param popupRenderedContainer The component to be inserted into the container. Needed for comparison with the height of the visible part of the screen
     */
    private checkPopupTransform(popupRenderedContainer: HTMLElement): void {
        const targetElementCoords: DOMRect = this.parentElement.getBoundingClientRect();
        if (
            document.documentElement.clientHeight - targetElementCoords.top <=
            popupRenderedContainer.clientHeight - 50
        ) {
            this.bottomFlag = true;
        }
    }

    ngAfterViewInit(): void {
        this.componentGeneratorTimer = setTimeout(() => {
            this.generateComponent();
        }, 0);
        this.subscriptions.add(
            this.isFade$.pipe(debounceTime(this.fadeTimer)).subscribe(() => {
                this.isFade$.next(true);
            })
        );

        this.subscriptions.add(
            this.isAlive$.pipe(debounceTime(this.popupRemoveTimer)).subscribe(() => {
                this.isAlive$.next(false);
            })
        );
    }

    public onMouseEnter(): void {
        //Changes the values of the main flags when hovering over the pop-up window
        this.isFade$.next(false);
        this.isAlive$.next(true);
    }

    ngOnDestroy(): void {
        //Cleans up all listeners and subscriptions when the component is destroyed
        clearTimeout(this.componentGeneratorTimer);
        clearTimeout(this.componentHeighGetterTimer);
        this.subscriptions.unsubscribe();
    }

    /**
     * The method positions the popup relative to the hover element in the left pane.
     * At the same time, a record is kept of the content leaving the boundaries of the visible part of the screen.
     * @param popupRenderedContainer The component to be inserted into the container. Needed for comparison with the height of the visible part of the screen
     */
    private generatePopupPosition(popupRenderedContainer: HTMLElement): void {
        const targetElementCoords: DOMRect = this.parentElement.getBoundingClientRect();
        const deltaOffsetHeigh: number = 25;
        this.popupLeftPos = `${2 * targetElementCoords.left + targetElementCoords.right}px`;
        this.checkPopupTransform(popupRenderedContainer);
        if (!this.bottomFlag) {
            this.popupTopPos = `${
                targetElementCoords.y + targetElementCoords.x - targetElementCoords.height - deltaOffsetHeigh
            }px`;
        } else {
            this.popupTopPos = `${targetElementCoords.top - popupRenderedContainer.offsetHeight - deltaOffsetHeigh}px`;
        }
    }

    /**
     * Method for inserting a component into a container
     */
    private generateComponent(): void {
        this.popupContainer.clear();
        const targetComponent = this.componentFactoryResolver.resolveComponentFactory(this.component);
        const popupBody = this.popupBody.nativeElement as HTMLElement;
        this.popupContainer.createComponent(targetComponent);

        this.componentHeighGetterTimer = setTimeout(() => {
            this.generatePopupPosition(popupBody);
        }, 0);
    }
}
