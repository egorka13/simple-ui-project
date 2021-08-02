import { Subscription } from 'rxjs';
import { IConfigPanelProperty, ILibComponentConfig, IPropertyObjevtValue, valueType } from '@models/config-panel.model';
import { ConfigDataService } from '@services/config-data.service';
import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
    selector: 'sui-config-panel',
    templateUrl: './config-panel.component.html',
    styleUrls: ['./config-panel.component.less'],
})
export class ConfigPanelComponent implements OnInit, OnDestroy {
    @Output() isHidden = new EventEmitter<boolean>();

    public suiComponentName: string;
    public isDesign: boolean = true;

    public countProperties: number;
    public properties: IConfigPanelProperty = {}; // properties which received from service without parsedProperties
    public newProperties: IConfigPanelProperty = {}; // properties which received from parsedProperties and divided to separate items
    public parsedProperties: IConfigPanelProperty = {}; // properties with a value in the form of an array and deleted from received properties

    private configDataSubscription: Subscription;

    constructor(private configDataService: ConfigDataService) {}

    ngOnInit(): void {
        this.configDataSubscription = this.configDataService.setConfigData$.subscribe(
            (config: ILibComponentConfig | null) => {
                if (!config) {
                    this.isHidden.emit(true);
                    return;
                }

                this.isHidden.emit(false);
                this.properties = Object.assign({}, config.properties);
                [this.parsedProperties, this.newProperties] = this.parseProperties(this.properties);
                this.countProperties = Object.keys(this.properties).length;

                this.suiComponentName = config.suiComponent;
            }
        );
    }

    ngOnDestroy(): void {
        this.configDataSubscription.unsubscribe();
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
        const parseName: string = this.parsePropertyName(propertyName);
        if (this.properties[propertyName]) {
            this.properties[propertyName].value = this.convertToInitialType(this.properties[propertyName].value);
            this.sendDataChange(propertyName, this.properties[propertyName]);
            return;
        }

        if (this.parsedProperties[parseName]) {
            const propertyOfParseName: IPropertyObjevtValue = this.parsedProperties[parseName];
            const numberOfValue: number = (this.newProperties[propertyName].numberOfProperty as number) - 1;
            (propertyOfParseName.value as string[])[numberOfValue] = this.newProperties[propertyName].value.toString();

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
            default:
                return value;
        }
    }

    private sendDataChange(propertyName: string, property: IPropertyObjevtValue): void {
        this.configDataService.saveConfigData({
            [propertyName]: property,
        });
    }

    private parsePropertyName(propertyName: string): string {
        return propertyName.split(' ')[0];
    }

    private parseProperties(properties: IConfigPanelProperty): [IConfigPanelProperty, IConfigPanelProperty] {
        const parsedProperties: IConfigPanelProperty = {};
        const newProperties: IConfigPanelProperty = {};

        for (const [name, prop] of Object.entries(properties)) {
            if (Array.isArray(prop.value)) {
                for (let i: number = 0; i < prop.value.length; i++) {
                    const newPropName = prop.labels ? `${name} ${prop.labels[i]}` : `${name} ${i + 1}`;
                    newProperties[newPropName] = {
                        type: Array.isArray(prop.type) ? prop.type[i] : prop.type,
                        value: prop.value[i],
                        isDeleted: prop.isDeleted,
                        isEndOfGroup: i == prop.value.length - 1,
                        numberOfProperty: i + 1,
                    };
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
            const parseName: string = this.parsePropertyName(propertyName);

            const property: IPropertyObjevtValue = this.parsedProperties[parseName];
            const propertyValue: string[] = property.value as string[];
            const valueLength: number = propertyValue.length;
            const numberOfProperty: number = this.newProperties[propertyName].numberOfProperty as number;

            let changingName: string = `${parseName} ${numberOfProperty}`;
            for (let i: number = numberOfProperty; i < valueLength; i++) {
                const nextChangingName: string = `${parseName} ${i + 1}`;
                this.newProperties[changingName] = this.newProperties[nextChangingName];
                this.newProperties[changingName].numberOfProperty = i;
                changingName = nextChangingName;
            }
            delete this.newProperties[changingName];
            propertyValue.splice(numberOfProperty - 1, 1);
            this.newProperties[`${parseName} ${valueLength - 1}`].isEndOfGroup = true;

            this.sendDataChange(parseName, property);
        }
    }

    public addProperty(event: Event): void {
        const propertyName: string = (event.target as HTMLTextAreaElement).name;
        const parseName: string = this.parsePropertyName(propertyName);
        const numberOfProperty: number = this.newProperties[propertyName].numberOfProperty as number;

        this.newProperties[propertyName].isEndOfGroup = false;
        this.newProperties[`${parseName} ${numberOfProperty + 1}`] = {
            type: 'text',
            value: 'text',
            isDeleted: true,
            isEndOfGroup: true,
            numberOfProperty: numberOfProperty + 1,
        };

        const property: IPropertyObjevtValue = this.parsedProperties[parseName];
        const propertyValue: string[] = property.value as string[];
        propertyValue.push('text');

        this.sendDataChange(parseName, property);
    }

    public formatArraytoString(array: valueType): string {
        if (Array.isArray(array)) {
            return ['[', array.map((str: string) => `'${str}'`).toString(), ']'].join('');
        }
        return 'null';
    }

    public compareEntries(
        a: KeyValue<string, IPropertyObjevtValue>,
        b: KeyValue<string, IPropertyObjevtValue>
    ): number {
        if (a.value.numberOfProperty && b.value.numberOfProperty) {
            return a.value.numberOfProperty > b.value.numberOfProperty
                ? 1
                : a.value.numberOfProperty > b.value.numberOfProperty
                ? -1
                : 0;
        }

        return 0;
    }
}
