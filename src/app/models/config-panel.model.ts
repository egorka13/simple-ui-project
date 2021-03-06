type propertyType = 'text' | 'number' | 'select' | 'color';
export type valueType = string | string[] | number | boolean;

export interface ILibComponentConfig {
    suiComponent: string;
    properties: IConfigPanelProperty;
}

export interface IPropertyObjevtValue {
    value: valueType;
    type?: propertyType | propertyType[];
    options?: string[];
    isDeleted?: boolean;
    isEndOfGroup?: boolean;
    labels?: string[];
    numberOfProperty?: number;
}

export interface IConfigPanelProperty {
    [name: string]: IPropertyObjevtValue;
}

export interface IComponentPrototype {
    [componentName: string]: IConfigPanelProperty;
}

export const componentModels: IComponentPrototype = {
    'sui-button': {
        type: { type: 'select', options: ['default', 'primary', 'dashed', 'text', 'link'], value: 'default' },
        size: { type: 'select', options: ['default', 'small', 'large'], value: 'default' },
        isGhost: { type: 'select', options: ['false', 'true'], value: false },
        innerText: { type: 'text', value: 'Button' },
    },
    'sui-card': {
        size: { type: 'select', options: ['default', 'small'], value: 'default' },
        title: { type: 'text', value: 'Card' },
        text: { type: 'text', value: 'Card content' },
        contentTempalte: { type: 'text', value: '' },
    },
    'sui-checkbox': {
        labelText: { type: 'text', value: 'Checkbox' },
        isDisabled: { type: 'select', options: ['false', 'true'], value: false },
        isChecked: { type: 'select', options: ['false', 'true'], value: false },
    },
    'sui-input': {
        placeholder: { type: 'text', value: 'input text' },
        size: { type: 'select', options: ['default', 'small', 'large'], value: 'default' },
    },
    'sui-input-number': {
        value: { type: 'number', value: '' },
        min: { type: 'number', value: '' },
        max: { type: 'number', value: '' },
        size: { type: 'select', options: ['default', 'small', 'large'], value: 'default' },
    },
    'sui-radio': {
        label: { type: 'text', isDeleted: true, value: ['radio'] },
        type: { type: 'select', options: ['default', 'button'], value: 'default' },
        view: { type: 'select', options: ['row', 'column'], value: 'row' },
        size: { type: 'select', options: ['default', 'small', 'large'], value: 'default' },
    },
    'sui-result': {
        title: {
            type: ['text', 'text', 'color', 'text'],
            labels: ['text', 'fontFamily', 'fontColor', 'fontSize'],
            value: ['Successfully Purchased Cloud Server ECS!', '', '', ''],
        },
        subtitle: {
            type: ['text', 'text', 'color', 'text'],
            labels: ['text', 'fontFamily', 'fontColor', 'fontSize'],
            value: [
                'Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.',
                '',
                '',
                '',
            ],
        },
        type: {
            type: 'select',
            options: ['success', 'info', 'warning', '403', '404', '500', 'error'],
            value: 'success',
        },
        hrefGeneral: {
            type: ['text', 'text', 'color', 'color', 'color'],
            labels: ['link', 'text', 'backgroundColor', 'borderColor', 'textColor'],
            value: ['', 'Go back', '', '', ''],
        },
        hrefAdditional: {
            type: ['text', 'text', 'color', 'color', 'color'],
            labels: ['link', 'text', 'backgroundColor', 'borderColor', 'textColor'],
            value: ['', 'Buy Again', '', '', ''],
        },
    },
    'sui-slider': {
        disabled: { type: 'select', options: ['false', 'true'], value: false },
        showMinimumValue: { type: 'select', options: ['false', 'true'], value: false },
        showMaximumValue: { type: 'select', options: ['false', 'true'], value: false },
        legend: { type: 'text', value: '' },
        legendColor: { type: 'color', value: '' },
        sliderColor: { type: 'color', value: '' },
        valuesColor: { type: 'color', value: '' },
        wrapperWidth: { type: 'text', value: '500px' },
        maxValue: { type: 'number', value: 100 },
        minValue: { type: 'number', value: 0 },
        currentValue: { type: 'number', value: 0 },
        step: { type: 'number', value: 1 },
    },
    'sui-switch': {
        setCheckedText: { type: 'text', value: '' },
        setUnCheckedText: { type: 'text', value: '' },
        isLoading: { type: 'select', options: ['false', 'true'], value: false },
        useMarkers: { type: 'select', options: ['false', 'true'], value: false },
        setChecked: { type: 'select', options: ['false', 'true'], value: false },
        isDisabled: { type: 'select', options: ['false', 'true'], value: false },
    },
    'sui-link': {
        text: { type: 'text', value: 'Link' },
        color: { type: 'color', value: 'hsl(0, 0%, 0%)' },
        colorHover: { type: 'color', value: 'hsl(0, 0%, 50%)' },
        fontSize: { type: 'number', value: 14 },
        href: { type: 'text', value: '' },
    },
    'sui-alert': {
        type: { type: 'select', options: ['success', 'info', 'warning', 'error'], value: 'success' },
        message: { type: 'text', value: 'Success text' },
        description: { type: 'text', value: '' },
        hasIcon: { type: 'select', options: ['false', 'true'], value: false },
    },
    'sui-rectangle': {
        backgroundColor: { type: 'color', value: '#007bff' },
        width: { type: 'number', value: '300' },
        height: { type: 'number', value: '50' },
        fullWidth: { type: 'select', options: ['false', 'true'], value: false },
        fullHeight: { type: 'select', options: ['false', 'true'], value: false },
    },
};
