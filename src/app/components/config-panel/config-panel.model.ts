export interface configPanelProperty {
    [name: string]: propertyObjevtValue
}

export interface propertyObjevtValue {
    value: valueType,
    type?: propertyType | propertyType[],
    options?: string[],
    isDeleted?: boolean,
    isEndOfGroup?: boolean,
    labels?: string[],
}

type propertyType = 'text' | 'number' | 'select' | 'color';
export type valueType = string | string[] | number | boolean;

export interface componentPrototype {
    [componentName: string]: configPanelProperty,
}

export const componentModels: componentPrototype = {
    'sui-button': {
        type: {type: 'select', options: ['default', 'primary', 'dashed', 'text', 'link'], value: ''},
        size: {type: 'select', options: ['default', 'small', 'large'], value: ''},
        isGhost: {type: 'select', options: ['false', 'true'], value: ''},
        innerText: {type: 'text', value: ''}
    },
    'sui-card': {
        size: {type: 'select', options: ['default', 'small'], value: ''},
        title: {type: 'text', value: ''},
        text: {type: 'text', value: ''},
        contentTempalte: {type: 'text', value: ''}
    },
    'sui-checkbox': {
        labelText: {type: 'text', value: ''},
        isDisabled: {type: 'select', options: ['false', 'true'], value: ''},
        isChecked: {type: 'select', options: ['false', 'true'], value: ''}
    },
    'sui-input': {
        placeholder: {type: 'text', value: ''},
        size: {type: 'select', options: ['default', 'small', 'large'], value: ''}
    },
    'sui-input-number': {
        value: {type: 'number', value: ''},
        min: {type: 'number', value: ''},
        max: {type: 'number', value: ''},
        size: {type: 'select', options: ['default', 'small', 'large'], value: ''}
    },
    'sui-radio': {
        label: {type: 'text', isDeleted: true, value: ''},
        type: {type: 'select', options: ['defualt', 'button'], value: ''}
    },
    'sui-result': {
        title: {type: 'text', labels: ['text', 'fontFamily', 'fontColor', 'fontSize'], value: ''},
        subtitle: {type: 'text', labels: ['text', 'fontFamily', 'fontColor', 'fontSize'], value: ''},
        type: {type: 'select', options: ['success', 'info', 'warning', '403', '404', '500', 'error'], value: ''},
        hrefGeneral: {type: ['text', 'text', 'color', 'color', 'color'],
            labels: ['link', 'text', 'backgroundColor', 'borderColor', 'textColor'], value: ''},
        hrefAdditional: {type: ['text', 'text', 'color', 'color', 'color'],
            labels: ['link', 'text', 'backgroundColor', 'borderColor', 'textColor'], value: ''},
    },
    'sui-slider': {
        disabled: {type: 'select', options: ['false', 'true'], value: ''},
        showMinimumValue: {type: 'select', options: ['false', 'true'], value: ''},
        showMaximumValue: {type: 'select', options: ['false', 'true'], value: ''},
        legend: {type: 'text', value: ''},
        legendColor: {type: 'color', value: ''},
        sliderColor: {type: 'color', value: ''},
        valuesColor: {type: 'color', value: ''},
        wrapperWidth: {type: 'text', value: ''},
        maxValue: {type: 'number', value: ''},
        minValue: {type: 'number', value: ''},
        currentValue: {type: 'number', value: ''},
        step: {type: 'number', value: ''},
    }
}