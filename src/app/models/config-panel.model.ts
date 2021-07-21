// type propertyType = 'text' | 'color' | 'checkbox' | 'number' | 'select' | 'group';
type propertyType = 'text' | 'number' | 'select';

export interface ILibComponentConfig {
    suiComponent: string;
    properties: IConfigPanelProperty[];
}

export interface IConfigPanelProperty {
    name: string;
    value: string | number;
    type?: propertyType;
    min?: number;
    max?: number;
    step?: number;
    options?: string[];
}
