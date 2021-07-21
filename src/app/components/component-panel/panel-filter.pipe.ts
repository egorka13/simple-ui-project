import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class PanelFilterPipe implements PipeTransform {
    transform(filter: object[], value: string): any {
        if (value == null) return filter;

        return filter.filter(function (component: any) {
            return (
                component.nameComponent
                    .toLowerCase()
                    .replace(/\s/g, '')
                    .indexOf(value.toLowerCase().replace(/\s/g, '')) > -1
            );
        });
    }
}
