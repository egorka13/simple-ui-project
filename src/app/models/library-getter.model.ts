export interface ILibraryInformation{
    button: IlibraryCurrentInformation,
    card: IlibraryCurrentInformation,
    checkbox: IlibraryCurrentInformation,
    input: IlibraryCurrentInformation,
    inputNumber: IlibraryCurrentInformation,
    radio: IlibraryCurrentInformation,
    result: IlibraryCurrentInformation,
    slider: IlibraryCurrentInformation,
  }
  
export  interface IlibraryCurrentInformation{
    component:any;
    title:string;
    desciption:string;
}