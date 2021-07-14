export interface configPanelProperty {
    name: string,
    type?: inputType,
    min?: number,
    max?: number,
    step?: number,
    isGroup?: boolean,
    options?: string[]
}

type inputType = 'text' | 'color' | 'checkbox' | 'number';

export const configPanelModel: configPanelProperty[] = [
    {name: 'value', type: 'text'},

    {name: 'size', isGroup: true},
    {name: 'width', type: 'number', min: 0},
    {name: 'height', type: 'number', min: 0},

    {name: 'border', isGroup: true},
    {name: 'border width', type: 'number', min: 0},
    {name: 'border style', options: ['solid', 'dashed', 'dotted']},
    {name: 'border color', type: 'color'},
    
    {name: 'font', isGroup: true},
    {name: 'color', type: 'color'},
    {name: 'font weight', type: 'number', min: 100, max: 900, step: 100},
    {name: 'font style', options: ['normal', 'italic']},
    {name: 'font size', type: 'number', min: 0},
    {name: 'line height', type: 'number'},

    {name: 'background', isGroup: true},
    {name: 'color', type: 'color'},
]