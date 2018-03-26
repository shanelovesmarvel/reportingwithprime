import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'r-fieldset',
    template: `
       <fieldset [style.width]="fieldsetWidth" [style.padding]="fieldsetPadding" [style.border]="fieldsetBorder">
            <legend>{{fieldsetName}}</legend>
            <h3>sdsadasdasdsadasdsa</h3>
            <h4>fsdfsdfsdfsdfsdfsdf</h4>
       </fieldset>
    `,
    styleUrls: ['./reporting-fieldset.component.scss']
})

export class ReportingFieldsetComponent implements OnInit {

    fieldsetName: string = "My fieldset";
    fieldsetWidth: string = "400px";
    fieldsetPadding: string = "20px 0 0 20px"
    fieldsetBorder: string = "1px solid blue";

    constructor() { }

    ngOnInit() {
        
    }
}