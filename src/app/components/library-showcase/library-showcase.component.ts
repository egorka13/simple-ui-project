import { Component } from '@angular/core';
import { TabsContent } from '@library-components/tabs/tabs.model';
import { LibraryGetterService } from '@services/library-getter.service';

@Component({
    selector: 'sui-library-showcase',
    templateUrl: './library-showcase.component.html',
    styleUrls: ['./library-showcase.component.less'],
})
export class LibraryShowcaseComponent {
    constructor(private libraryGetterService: LibraryGetterService) {}

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
            tabTitle: 'Tab-3',
            isDisable: false,
            content: this.libraryGetterService.getLibraryComponentsInfo.suiSwitch.component,
        },
    ];
}
