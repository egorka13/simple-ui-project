import { IConfigPanelProperty, ILibComponentConfig, IPropertyObjevtValue, valueType } from '@models/config-panel.model';
import { ConfigDataService } from './../../core/services/config-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sui-config-panel',
    templateUrl: './config-panel.component.html',
    styleUrls: ['./config-panel.component.less'],
})

export class ConfigPanelComponent implements OnInit {
    public suiComponentName: string;
    public isDesign: boolean = true;

    public countProperties: number;
    public properties: IConfigPanelProperty = {}; // properties which recieved from service without parsedProperties
    public newProperties: IConfigPanelProperty = {}; // properties which recieved from parsedProperties and divided to separate items
    public parsedProperties: IConfigPanelProperty = {}; // properties with a value in the form of an array and deleted from recieved properties

    constructor(private ConfigDataService: ConfigDataService) { }

    ngOnInit(): void {
        this.ConfigDataService.setConfigData$.subscribe((config: ILibComponentConfig | null) => {
            if (!config) return;

            this.properties = JSON.parse(JSON.stringify(config.properties));
            [this.parsedProperties, this.newProperties] = this.parseProperties(this.properties);
            this.countProperties = Object.keys(this.properties).length;

            this.suiComponentName = config.suiComponent;
        });
    }

    public selectTab(event: Event): void {
        const element: Element = event.target as Element;
        this.isDesign = element.id == 'designSection';
        const parent: Element = element.parentElement as Element;
        [].forEach.call(parent.children, (el: Element) => {
            el.classList.remove('_active');
        });
        element.classList.add('_active');
    }

    public handlePropertyChange(event: Event): void {
        const propertyName: string = (event.target as HTMLTextAreaElement).name; 
        const [parseNameArr, parseName]: [string[], string] = this.parsePropertyName(propertyName);
        if (this.properties[propertyName]) {
            this.properties[propertyName].value = this.convertToInitialType(this.properties[propertyName].value)
            this.sendDataChange(propertyName, this.properties[propertyName]);
        }

        if (this.parsedProperties[parseName]) {
            const propertyOfParseName: IPropertyObjevtValue = this.parsedProperties[parseName];

            let numberOfValue: number = +parseNameArr[parseNameArr.length - 1] - 1;
            if (propertyOfParseName.labels) {
                numberOfValue = propertyOfParseName.labels.indexOf(parseNameArr[parseNameArr.length - 1]);
            }
            (propertyOfParseName.value as string[])[numberOfValue] = this.newProperties[parseName].value.toString();

            this.sendDataChange(parseName, propertyOfParseName);
        }
    }

    private convertToInitialType(value: valueType): valueType {
        if (!isNaN(+value)) {
            return +value;
        }
        switch (value) {
            case 'false':
                return false;
            case 'true':
                return true;
            case 'default':
                return '';
            default:
                return value;
        }
    }

    private sendDataChange(propertyName: string, property: IPropertyObjevtValue): void {
        this.ConfigDataService.saveConfigData({
            [propertyName]: property,
        });
    }

    private parsePropertyName(propertyName: string): [string[], string] {
        const parseNameArr: string[] = propertyName.split(' ');
        const parseName: string = parseNameArr[0];

        return [parseNameArr, parseName];
    }

    private parseProperties(properties: IConfigPanelProperty): [IConfigPanelProperty, IConfigPanelProperty] {
        const parsedProperties: IConfigPanelProperty = {};
        const newProperties: IConfigPanelProperty = {};

        for (const [name, prop] of Object.entries(properties)) {
            if (Array.isArray(prop.value)) {
                for (let i: number = 0; i < prop.value.length; i++) {
                    const newPropName = prop.labels ? [name, prop.labels[i]].join(' ') : [name, i + 1].join(' ');
                    newProperties[newPropName] = {
                        type: Array.isArray(prop.type) ? prop.type[i] : prop.type,
                        value: prop.value[i] ,
                        isDeleted: prop.isDeleted,
                        isEndOfGroup: prop.isDeleted && i == prop.value.length - 1 
                    };
                }

                if (prop.labels) {
                    const labels: string[] = prop.labels.slice();
                    labels.sort();
                    newProperties[[name, labels[labels.length - 1]].join(' ')].isEndOfGroup = true;
                }

                parsedProperties[name] = prop;
                delete properties[name];
            }
        }

        return [parsedProperties, newProperties];
    }

    public deleteProperty(event: Event): void {
        const elem: Element = event.target as Element;

        if (elem.classList.contains('sui-config-panel__property-cross')) {
            const propertyName: string = (event.target as HTMLTextAreaElement).dataset.name as string;
            const [parseNameArr, parseName]: [string[], string] = this.parsePropertyName(propertyName);

            const property: IPropertyObjevtValue = this.parsedProperties[parseName];
            const propertyValue: string[] = property.value as string[];
            const valueLength: number = propertyValue.length;
            const numberOfProperty: number = +parseNameArr[parseNameArr.length - 1];

            let changingName: string = [parseName, numberOfProperty].join(' ');
            for (let i: number = numberOfProperty; i < valueLength; i++) {
                const nextChangingName: string = [parseName, i + 1].join(' ');
                this.newProperties[changingName] = this.newProperties[nextChangingName];
                changingName = nextChangingName;
            }
            delete this.newProperties[changingName];
            propertyValue.splice(numberOfProperty - 1, 1);
            this.newProperties[[parseName, valueLength - 1].join(' ')].isEndOfGroup = true;

            this.sendDataChange(parseName, property);
        }
    }

    public addProperty(event: Event): void {
        const propertyName: string = (event.target as HTMLTextAreaElement).name;
        const [parseNameArr, parseName] = this.parsePropertyName(propertyName);
        const numberOfProperty: number = +parseNameArr[parseNameArr.length - 1];

        this.newProperties[propertyName].isEndOfGroup = false;
        this.newProperties[[parseName, numberOfProperty + 1].join(' ')] = {
            type: 'text',
            value: 'text',
            isDeleted: true,
            isEndOfGroup: true,
        };

        const property: IPropertyObjevtValue = this.parsedProperties[parseName];
        const propertyValue: string[] = property.value as string[];
        propertyValue.push('text');

        this.sendDataChange(parseName, property);
    }

    public formatArraytoString(array: valueType): string {
        if (Array.isArray(array)) {
            return ['[', array.map((str: string) => ["'", str, "'"].join('')).toString(), ']'].join('');
        }
        return 'null';
    }
}
