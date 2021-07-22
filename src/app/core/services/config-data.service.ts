import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ILibComponentConfig, IConfigPanelProperty } from '@models/config-panel.model';

@Injectable({
    providedIn: 'root',
})
export class ConfigDataService {
    public setConfigData$ = new Subject<ILibComponentConfig | null>();

    public saveConfigData$ = new Subject<IConfigPanelProperty[]>();

    public setConfigData(configData: ILibComponentConfig | null): void {
        this.setConfigData$.next(configData);

        console.log('Received:', configData); // TODO: delete this. Just for showcase.

        this.foo();
    }

    public saveConfigData(properties: IConfigPanelProperty[]): void {
        this.saveConfigData$.next(properties);
    }

    // Delete this function. Need only for testing.
    private foo(): void {
        this.saveConfigData([
            {
                name: 'placeholder',
                type: 'text',
                value: 'qqqq2222',
            },
            {
                name: 'size',
                type: 'select',
                options: ['default', 'small', 'large'],
                value: 'default',
            },
        ]);
    }
}
