export interface ILibraryInformation {
    [name: string]: ILibraryCurrentInformation;
}

export interface ILibraryCurrentInformation {
    component: any;
    title: string;
    description: string;
}
