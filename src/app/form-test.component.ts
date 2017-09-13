import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'my-form',
    template: `
        <div class="container-fluid">
            <textarea-expanded  *ngIf="false" [formControl]="formCtrl"></textarea-expanded>
            <textarea-expanded  *ngIf="false" [formControl]="formCtrl2"></textarea-expanded>
            <textarea-expanded  *ngIf="false" [formControl]="formCtrl3"></textarea-expanded>
            <textarea-expanded  *ngIf="false" [formControl]="formCtrl4"></textarea-expanded>
            <textarea-expanded  *ngIf="false" [formControl]="formCtrl5"></textarea-expanded>
            <textarea-expanded  *ngIf="false" [formControl]="formCtrl6"></textarea-expanded>
            <button *ngIf="false" (click)="showValues($event)">Show Value</button>
            <button *ngIf="false" (click)="formCtrl.disable()">Disable</button>
            <button *ngIf="false" (click)="formCtrl.enable()">Enable</button>
        </div>
    `
})

export class FormTestComponent implements OnInit {
    formCtrl: FormControl = new FormControl('');
    formCtrl2: FormControl = new FormControl('');
    formCtrl3: FormControl = new FormControl('');
    formCtrl4: FormControl = new FormControl('');
    formCtrl5: FormControl = new FormControl('');
    formCtrl6: FormControl = new FormControl('');
    formGroup: FormGroup;
    constructor() { }

    ngOnInit() {
        this.formGroup = new FormGroup({});
        this.formGroup.addControl("t1", this.formCtrl);
        this.formGroup.addControl("para", new FormGroup({
            "t2": this.formCtrl2,
            "t3": this.formCtrl3
        }));
        this.formGroup.addControl("setting", new FormGroup({
            "t4": this.formCtrl4,
            "t5": this.formCtrl5,
            "t6": this.formCtrl6
        }));
    }

    showValues($event) {
        let formValue: any = {};
        this.flattenObject(this.formGroup.getRawValue(), formValue);
        console.info(formValue);
    }

    flattenObject(original: any, target: any): void {
        Object.keys(original).forEach((key: string) => {
            if (Object.prototype.toString.call(original[key]) === "[object Object]") {
                this.flattenObject(original[key], target);
            } else {
                target[key] = original[key];
            }
        });
    }
}