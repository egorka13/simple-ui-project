export interface configPanelProperty {
    name: string,
    value?: string | number,
    type?: propertyType,
    min?: number,
    max?: number,
    step?: number,
    options?: string[]
}

// type propertyType = 'text' | 'color' | 'checkbox' | 'number' | 'select' | 'group';
type propertyType = 'text' | 'number' | 'select';

interface componentPrototype {
    [componentName: string]: configPanelProperty[],
}

export const componentModels: componentPrototype = {
    'sui-button': [
        {name: 'type', type: 'select', options: ['default', 'primary', 'dashed', 'text', 'link']},
        {name: 'size', type: 'select', options: ['default', 'small', 'large']},
        {name: 'isGhost', type: 'select', options: ['false', 'true']},
        {name: 'innerText', type: 'text'}
    ],
    'sui-card': [
        {name: 'size', type: 'select', options: ['default', 'small']},
        {name: 'title', type: 'text'},
        {name: 'text', type: 'text'},
        {name: 'contentTempalte', type: 'text'}
    ],
    'sui-checkbox': [
        {name: 'labelText', type: 'text'},
        {name: 'isDisabled', type: 'select', options: ['false', 'true']},
        {name: 'isChecked', type: 'select', options: ['false', 'true']}
    ],
    'sui-input': [
        {name: 'placeholder', type: 'text'},
        {name: 'size', type: 'select', options: ['default', 'small', 'large']}
    ],
    'sui-input-number': [
        {name: 'value', type: 'number'},
        {name: 'min', type: 'number'},
        {name: 'max', type: 'number'},
        {name: 'size', type: 'select', options: ['default', 'small', 'large']}
    ],
    'sui-radio': [
        {name: 'labels', type: 'text'},
        {name: 'type', type: 'select', options: ['defualt', 'button']}
    ],
    'sui-result': [
        {name: 'title', type: 'text'},
        {name: 'subtitle', type: 'text'},
        {name: 'type', type: 'select', options: ['success', 'info', 'warning', '403', '404', '500', 'error']},
        {name: 'hrefGeneral', type: 'text'},
        {name: 'hrefAdditional', type: 'text'}
    ],
    'sui-slider': [
        {name: 'showMarker', type: 'select', options: ['false', 'true']},
        {name: 'wrapperWidth', type: 'text'},
        {name: 'maxValue', type: 'number'},
        {name: 'minValue', type: 'number'},
        {name: 'currentValue', type: 'number'},
        {name: 'step', type: 'number'},
    ]
}

// export const configPanelModel: configPanelProperty[] = [
//     {name: 'size', type: 'group'},
//     {name: 'width', type: 'number', min: 0},
//     {name: 'height', type: 'number', min: 0},

//     {name: 'border', type: 'group'},
//     {name: 'border width', type: 'number', min: 0},
//     {name: 'border style', type: 'select', options: ['solid', 'dashed', 'dotted']},
//     {name: 'border color', type: 'color'},
    
//     {name: 'font', type: 'group'},
//     {name: 'color', type: 'color'},
//     {name: 'font weight', type: 'number', min: 100, max: 900, step: 100},
//     {name: 'font style', type: 'select', options: ['normal', 'italic']},
//     {name: 'font size', type: 'number', min: 0},
//     {name: 'line height', type: 'number'},

//     {name: 'background', type: 'group'},
//     {name: 'color', type: 'color'},
// ]