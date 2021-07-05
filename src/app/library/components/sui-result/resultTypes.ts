export interface TypeResults {
    [key: string]: string;
    success: string;
    info: string;
    warning: string;
    403: string;
    404: string;
    500: string;
    error: string;
}

//Rename this if you need a different path to the standard library icons
const path: string = 'app/library/assets/icons/result/';

export const resultTypes: TypeResults = {
    success: path + 'success.svg',
    info: path + 'info.svg',
    warning: path + 'warning.svg',
    403: path + '403.svg',
    404: path + '404.svg',
    500: 'app/library/assets/icons/result/500.svg',
    error: path + 'error.svg',
};
