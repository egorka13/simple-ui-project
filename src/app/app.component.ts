import { Component } from '@angular/core';

@Component({
    selector: 'sui-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent {
    hrefGeneral: string[] = ['Angular', 'angular'];
    hrefAdditional: string[] = ['', 'additional'];
    type:string = "warning";
    subtitle:string = "here's subtitle";
    title:string = "here's title";
}
