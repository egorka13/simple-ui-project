import { Component, Input, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'sui-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.less'],
})
export class ContextMenuComponent {
    @Input()
    xPosition: number;

    @Input()
    yPosition: number;

    public zIndexChange$: Subject<number> = new Subject();

    @HostBinding('style.top')
    top: string = '50%';

    @HostBinding('style.left')
    left: string = '50%';

    public _goUp(): void {
        this.zIndexChange$.next(1);
    }
    public _goDown(): void {
        this.zIndexChange$.next(-1);
    }
}
