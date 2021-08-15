import { Component } from '@angular/core';
import { suiSliderParams } from '@library-components/slider/slider-params.model';
import { TabsContent } from '@library-components/tabs/tabs.model';

@Component({
    selector: 'sui-library-showcase',
    templateUrl: './library-showcase.component.html',
    styleUrls: ['./library-showcase.component.less'],
})
export class LibraryShowcaseComponent {
    public sliderComponentParams: suiSliderParams[] = [
        {
            showMinimalValue: true,
            showMaximumValue: true,
        },
        {
            setLegend: 'Disabled Version',
        },
    ];

    public tabsContent: TabsContent[] = [
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
            tabTitle: 'Tab-1',
            isDisable: false,
            content: 'Content of tab-3',
        },
    ];
}
