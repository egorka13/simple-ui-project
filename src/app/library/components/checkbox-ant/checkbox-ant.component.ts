import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-checkbox-ant',
    templateUrl: './checkbox-ant.component.html',
    styleUrls: ['./checkbox-ant.component.less'],
})
export class CheckboxAntComponent {
    @Input()
    labelText: string = 'Chechbox-ant';
}
