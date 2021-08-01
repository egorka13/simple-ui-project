export interface ILibraryInformation {
    [name: string]: IlibraryCurrentInformation;
}

//Register new category here
export interface IlibraryCurrentInformation {
    group: 'Base' | 'Logical' | 'Multimedia';
    nameComponent: string;
    svgUrl: string;
    component: any;
    title: string;
    description: string;
}
