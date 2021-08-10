import { Component, Input } from '@angular/core';

@Component({
    selector: 'sui-rectangle',
    templateUrl: './rectangle.component.html',
    styleUrls: ['./rectangle.component.less'],
})
export class RectangleComponent {
    widthValue: string = '300px';
    heightValue: string = '50px';

    @Input()
    backgroundColor: string = '#007bff';

    @Input()
    set width(value: number) {
        this.widthValue = `${value}px`;
    }

    @Input()
    set height(value: number) {
        this.heightValue = `${value}px`;
    }

    @Input()
    fullWidth: boolean = false;

    @Input()
    fullHeight: boolean = false;

    onFullWidth(value: boolean): string {
        if (value) {
            return '100vw';
        }
        return this.widthValue;
    }
    onFullHeight(value: boolean): string {
        if (value) {
            return '100vh';
        }
        return this.heightValue;
    }
}
