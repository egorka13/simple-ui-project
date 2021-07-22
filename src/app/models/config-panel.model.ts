// type propertyType = 'text' | 'color' | 'checkbox' | 'number' | 'select' | 'group';
type propertyType = 'text' | 'number' | 'select';

export interface ILibComponentConfig {
    suiComponent: string;
    properties: IConfigPanelProperty[];
}

export interface IConfigPanelProperty {
    name: string;
    value: string | number | boolean;
    type?: propertyType;
    min?: number;
    max?: number;
    step?: number;
    options?: string[];
}
