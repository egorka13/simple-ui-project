import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'group' })
export class PanelGroupPipe implements PipeTransform {
    transform(filtered: any, itemGroup: any): any {
        if (itemGroup == null) return true;

        return (function () {
            for (let item of filtered) {
                if (item.group === itemGroup.group) return true;
            }
            return false;
        })();
    }
}
