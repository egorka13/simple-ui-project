import { Component } from '@angular/core';
import { suiSliderParams } from '@library-components/slider/slider-params.model';

@Component({
    selector: 'sui-library-showcase',
    templateUrl: './library-showcase.component.html',
    styleUrls: ['./library-showcase.component.less'],
})
export class LibraryShowcaseComponent {
    sliderComponentParams: suiSliderParams[] = [
        {
            showMinimalValue: true,
            showMaximumValue: true,
        },
        {
            setLegend: 'Disabled Version',
        },
    ];
}