//Rename this if you need a different path to the standard library icons
const path: string = 'app/library/assets/icons/switch/';

export interface TypeSwitch {
    [key: string]: string;
}

export const resultTypes: TypeSwitch = {
    on: path + 'on.svg',
    off: path + 'off.svg',
};