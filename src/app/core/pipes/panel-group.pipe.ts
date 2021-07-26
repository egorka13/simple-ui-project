import { Pipe, PipeTransform } from '@angular/core';
import { IGroupItems } from '@components/component-panel/panel.model';

@Pipe({ name: 'group' })
export class PanelGroupPipe implements PipeTransform {
    transform(filtered: any, itemGroup: IGroupItems): boolean {
        if (itemGroup == null) return true;

        return (function () {
            for (let item of filtered) {
                if (item.group === itemGroup.group) return true;
            }
            return false;
        })();
    }
}
