export interface ILibraryInformation{
  [name: string]:IlibraryCurrentInformation
}

export  interface IlibraryCurrentInformation{
    component:any;
    title:string;
    desciption:string;
}