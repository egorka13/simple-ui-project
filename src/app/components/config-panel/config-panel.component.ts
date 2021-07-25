import { ConfigDataService } from './../../core/services/config-data.service';
import { configPanelProperty, propertyObjevtValue, valueType } from './config-panel.model';
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
    public properties: configPanelProperty = {}; // properties which recieved from service without parsedProperties
    public newProperties: configPanelProperty = {}; // properties which recieved from parsedProperties and divided to separate items
    public parsedProperties: configPanelProperty = {}; // properties with a value in the form of an array and deleted from recieved properties

    constructor(private ConfigDataService: ConfigDataService) { }

    ngOnInit() {
        this.ConfigDataService.currentItemConfig.subscribe((config: {suiComponent: string, properties: configPanelProperty}) => {
            this.properties = config.properties;
            [this.parsedProperties, this.newProperties] = this.parseProperties(this.properties);
            this.countProperties = Object.keys(this.properties).length;

            this.suiComponentName = config.suiComponent;
        });
    }

    public selectTab(event: Event): void {
        const element: Element = <Element>event.target;
        this.isDesign = element.id == 'designSection';
        
        const parent: Element = <Element>element.parentElement;
        [].forEach.call(parent.children, (el: Element) => {
            el.classList.remove('_active');
        });
        element.classList.add('_active');
    }

    public handlePropertyChange(event: Event): void {
        const elem: Element = <Element>event.target;

        if (elem.tagName == 'INPUT' || elem.tagName == 'SELECT') {
            let propertyValue: string | number | string[] = (<HTMLTextAreaElement>event.target).value;
            if (propertyValue == 'default') {
                propertyValue = '';
            }

            const propertyName: string = (<HTMLTextAreaElement>event.target).name; 
            const [parseNameArr, parseName]: [string[], string] = this.parsePropertyName(propertyName);
            
            if (this.parsedProperties[parseName]) {
                const propertyOfParseName: propertyObjevtValue = this.parsedProperties[parseName];

                let numberOfValue: number = +parseNameArr[parseNameArr.length - 1] - 1;
                if (propertyOfParseName.labels) {
                    numberOfValue = propertyOfParseName.labels.indexOf((parseNameArr[parseNameArr.length - 1]));
                }
                (propertyOfParseName.value as string[])[numberOfValue] = propertyValue;

                this.sendDataChange(parseName, propertyOfParseName.value);

                return;
            } 

            this.sendDataChange(propertyName, propertyValue);
        }
    }

    private sendDataChange(propertyName: string, propertyValue: valueType): void {
        this.ConfigDataService.sendChangeConfigData({
            [propertyName]: {value: propertyValue}
        });
    }

    private parsePropertyName(propertyName: string): [string[], string] {
        const parseNameArr: string[] = propertyName.split(' ');
        const parseName: string = parseNameArr[0];

        return [parseNameArr, parseName];
    }

    private parseProperties(properties: configPanelProperty): [configPanelProperty, configPanelProperty] {
        const parsedProperties: configPanelProperty = {};
        const newProperties: configPanelProperty = {};

        for (let [name, prop] of Object.entries(properties)) {
            if (Array.isArray(prop.value)) {

                for (let i: number = 0; i < prop.value.length; i++) {
                    let newPropName = prop.labels ? [name, prop.labels[i]].join(' ') : [name, i + 1].join(' ');
                    
                    newProperties[newPropName] =  {
                        type: Array.isArray(prop.type) ? prop.type[i] : prop.type,
                        value: prop.value[i] ,
                        isDeleted: prop.isDeleted,
                        isEndOfGroup: prop.isDeleted && i == prop.value.length - 1 
                    }
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
        const elem: Element = <Element>event.target;

        if (elem.classList.contains('sui-config-panel__property-cross')) {
            const propertyName: string = (<HTMLTextAreaElement>event.target).dataset.name as string;
            const [parseNameArr, parseName]: [string[], string] = this.parsePropertyName(propertyName);

            const propertyValue: string[] = this.parsedProperties[parseName].value as string[];
            const valueLength: number = (propertyValue).length;
            const numberOfProperty: number = +parseNameArr[parseNameArr.length - 1];

            let changingName: string = [parseName, numberOfProperty].join(' ');
            for (let i: number = numberOfProperty; i < valueLength; i++) {
                let nextChangingName: string = [parseName, i + 1].join(' ');
                this.newProperties[changingName] = this.newProperties[nextChangingName];
                changingName = nextChangingName;
            }        
            delete this.newProperties[changingName];
            propertyValue.splice(numberOfProperty - 1, 1);
            this.newProperties[[parseName, valueLength - 1].join(' ')].isEndOfGroup = true;

            this.sendDataChange(parseName, propertyValue);
        }
    }

    public addProperty(event: Event): void {
        const propertyName: string = (<HTMLTextAreaElement>event.target).name;
        const [parseNameArr, parseName] = this.parsePropertyName(propertyName);
        const numberOfProperty: number = +parseNameArr[parseNameArr.length - 1];

        this.newProperties[propertyName].isEndOfGroup = false;
        this.newProperties[[parseName, numberOfProperty + 1].join(' ')] =  {
            type: 'text',
            value: 'text',
            isDeleted: true,
            isEndOfGroup: true,
        };

        const propertyValue: string[] = this.parsedProperties[parseName].value as string[];
        (propertyValue).push('text');

        this.sendDataChange(parseName, propertyValue);
    }

    public formatArraytoString(array: valueType): string {
        if (Array.isArray(array)) {
            return ['[', array.map((str: string) => ["'", str, "'"].join('')).toString(), ']'].join('');
        }
        return 'null';
    }
}
