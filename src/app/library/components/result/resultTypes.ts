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

export const resultTypes: TypeResults = {
    success: 'app/library/assets/icons/result/success.svg',
    info: 'app/library/assets/icons/result/info.svg',
    warning: 'app/library/assets/icons/result/warning.svg',
    403: 'app/library/assets/icons/result/403.svg',
    404: 'app/library/assets/icons/result/404.svg',
    500: 'app/library/assets/icons/result/500.svg',
    error: 'app/library/assets/icons/result/error.svg',
};
