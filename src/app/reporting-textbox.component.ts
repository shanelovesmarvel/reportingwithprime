import { Component, OnInit, Input, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'r-textbox',
    template: `
    <div [id]="tOptions.id" class="r-textbox" [class.non-removable]="!tOptions?.removable">
        <span class="k-icon k-i-more-vertical r-icon r-meatball_left"></span>
        <span class="k-icon k-i-more-vertical r-icon r-meatball_right"></span>
        <dx-text-box
            draggable="false"
            [focusStateEnabled]="false"
            [ngClass]="tOptions.className"
            [height]="25"
            [width]="260"
            [hoverStateEnabled]="true"
            (click)="onClick($event)"
            [value]="tOptions.value">
        </dx-text-box>
        <span
            id="editTextbox" 
            draggable="false" 
            [ngClass]="tOptions.editClassName"
            class="fa fa-pencil r-icon" 
            title="Edit" 
            (click)="onEdit($event)">
        </span>
        <span
            *ngIf="tOptions?.removable"
            [ngClass]="tOptions.removeClassName" 
            draggable="false" 
            class="fa fa-times r-icon r-remove" 
            title="Remove" 
            (click)="onRemove($event)">
        </span>
    </div>
    `,
    styleUrls: ['./reporting-textbox.component.scss']
})

export class ReportingTextboxComponent implements OnInit {

    @Output() remove: EventEmitter<ITextBox> = new EventEmitter<ITextBox>();
    @Output() edit: EventEmitter<ITextBox> = new EventEmitter<ITextBox>();
    @Output() select: EventEmitter<ITextBox> = new EventEmitter<ITextBox>();

    tOptions: ITextBox = null;
    clicked: boolean = false;

    @Input() set options(optionsValue: ITextBox) {
        if (!optionsValue) {
            return;
        }
        this.tOptions = optionsValue;
    }

    get options(): ITextBox {
        return this.tOptions;
    }

    constructor(
        private eleRef: ElementRef,
        private render2: Renderer2) { }

    onClick(): void {
        if (this.options.level === "top") {
            this.clicked = !this.clicked;
            if (this.clicked) {
                this.render2.setStyle(
                    this.eleRef.nativeElement.querySelector(".dx-texteditor-input"), "border", "2px solid #1E90FF");
                this.options.selected = true;
                this.select.emit(this.options);
            } else {
                this.render2.removeStyle(
                    this.eleRef.nativeElement.querySelector(".dx-texteditor-input"), "border");
                this.options.selected = false;
                this.select.emit(this.options);
            }
            
        }
    }

    onEdit(): void {
        this.edit.emit(this.options);
    }

    onRemove(): void {
        this.remove.emit(this.options);
    }

    ngOnInit() { }
}

@Component({
    selector: 'r-dropdown',
    template: `
    <div class="r-group">
        <label *ngIf="sOptions.caption">{{sOptions.caption}}</label>
        <p-dropdown
            [options]="sOptions.dataSource"
            [dataKey]="sOptions.valueExpr"
            (onChange)="onCurrencyChange($event)"
            [(ngModel)]="selectedItem">
        </p-dropdown>
    </div>
    `,
    styleUrls: ['./reporting-textbox.component.scss']
})

export class ReportingDropdownComponent implements OnInit {

    sOptions: IDropdown = null;

    selectedItem: any;

    formCtrl: FormControl = new FormControl();

    @Input() set options(optionsValue: IDropdown) {
        if (!optionsValue) {
            return;
        }
        this.sOptions = optionsValue;
        if (this.sOptions.form) {
            this.sOptions.form.addControl(optionsValue.name, this.formCtrl);
        }
        this.selectedItem = this.sOptions.value;
        this.formCtrl.setValue(this.sOptions.value);
    }

    get options(): IDropdown {
        return this.sOptions;
    }

    onCurrencyChange(item) {
        if (!item || !item.value) {
            return;
        }
        this.formCtrl.setValue(item.value);
    }

    constructor() { }

    ngOnInit() { }
}

@Component({
    selector: 'r-datepicker',
    template: `
    <div class="r-group">
        <label>{{cOptions.caption}}</label>
        <p-dropdown
            [options]="cOptions.ddOptions.dataSource"
            [dataKey]="cOptions.ddOptions.valueExpr"
            (onChange)="onDateChange($event)"
            [(ngModel)]="selectedItem">
        </p-dropdown>
        <dx-text-box
            mask="00/00/0000"
            [(value)]="selectedDate"
            (onValueChanged)="onValueChanged($event)">
        </dx-text-box>
    </div>
    `,
    styleUrls: ['./reporting-textbox.component.scss']
})

export class ReportingDatepickerComponent implements OnInit {

    cOptions: IDatepicker = null;
    selectedDate: string = null;
    selectedItem: string = "";
    formCtrl: FormControl = new FormControl(this.selectedDate);

    @Input() set options(optionsValue: IDatepicker) {
        if (!optionsValue) {
            return;
        }
        this.cOptions = optionsValue;
        if (this.cOptions.form) {
            this.cOptions.form.addControl(this.cOptions.name, this.formCtrl);
        }
        this.selectedDate = this.cOptions.value;
        this.selectedItem = this.cOptions.ddOptions.value;
        this.formCtrl.setValue(this.cOptions.value);
    }

    get options(): IDatepicker {
        return this.cOptions;
    }

    onDateChange(item) {
        if (!item || !item.value) {
            return;
        }
        this.selectedDate = item.value;
        this.formCtrl.setValue(item.value);
    }

    onValueChanged(event): void {
        this.formCtrl.setValue(event && event.value);
    }

    constructor() { }

    ngOnInit() { }
}

@Component({
    selector: 'r-textinput',
    template: `
    <div class="r-group">
        <label>{{cOptions.caption}}</label>
        <dx-text-box
            [(ngModel)]="text"
            (onValueChanged)="onValueChanged($event)">
        </dx-text-box>
    </div>
    `,
    styleUrls: ['./reporting-textbox.component.scss']
})

export class ReportingTextinputComponent implements OnInit {

    cOptions: ITextBox = null;
    text: string = null;
    formCtrl: FormControl = new FormControl(this.text);

    @Input() set options(optionsValue: ITextBox) {
        if (!optionsValue) {
            return;
        }
        this.cOptions = optionsValue;
        if (this.cOptions.form) {
            this.cOptions.form.addControl(this.cOptions.name, this.formCtrl);
        }
        this.text = this.cOptions.value;
        this.formCtrl.setValue(this.cOptions.value);
    }

    get options(): ITextBox {
        return this.cOptions;
    }

    onValueChanged(event): void {
        this.formCtrl.setValue(event && event.value);
    }

    constructor() { }

    ngOnInit() { }
}

@Component({
    selector: 'r-radiogroup',
    template: `
    <div class="r-group">
        <label>{{cOptions.caption}}</label>
        <dx-radio-group
            [items]="cOptions.dataSource"
            [value]="cOptions.value"
            layout="horizontal"
            (onValueChanged)="onValueChanged($event)">
        </dx-radio-group>
    </div>
    `,
    styleUrls: ['./reporting-textbox.component.scss']
})

export class ReportingRadioGroupComponent implements OnInit {

    cOptions: IDatepicker = null;
    formCtrl: FormControl = new FormControl();

    @Input() set options(optionsValue: IDatepicker) {
        if (!optionsValue) {
            return;
        }
        this.cOptions = optionsValue;
        if (this.cOptions.form) {
            this.cOptions.form.addControl(this.cOptions.name, this.formCtrl);
        }
        this.formCtrl.setValue(this.cOptions.value);
    }

    get options(): IDatepicker {
        return this.cOptions;
    }

    onValueChanged(event) {
        this.formCtrl.setValue(event.value);
    }

    constructor() { }

    ngOnInit() { }
}

export interface IDatepicker {
    cellTemplate?: any;
    dateFormat?: string;  // yyyy-MM-dd, yyyy-MM-ddTHH:mm:ss
    disabled?: boolean;
    firstDayofWeek?: number;  // 0, 1, 2, 3, 4, 5, 6
    focusStateEnabled?: boolean;
    height?: number | string | Function;
    hint?: string;
    hoverStateEnabled?: boolean;
    max?: Date | number | string;
    maxZoomLevel?: string;  // month, year, decade, century
    min?: Date | number | string;
    minZoomLevel?: string;  // month, year, decade, century
    name?: string;
    readOnly?: boolean;
    showTodayButton?: boolean;
    tabIndex?: number;
    value?: any;
    visible?: boolean;
    width?: number | string | Function;
    zoomLevel?: string; // month, year, decade, century
    form?: FormGroup;
    ddOptions?: IDropdown;
}

export interface IDropdown {
    dataSource?: string | Array<any>;
    deferRendering?: boolean;
    disabled?: boolean;
    displayExpr?: string | Function;
    displayValue?: string;
    dropDownButtonTemplate?: any;
    fieldTemplate?: any;
    focusStateEnabled?: boolean;
    grouped?: boolean;
    groupTemplate?: any;
    height?: number | string | Function;
    hint?: string;
    hoverStateEnabled?: boolean;
    items?: Array<any>;
    itemTemplate?: any;
    maxLength?: string | number;
    minSearchLength?: number;
    name?: string;
    noDataText?: string;
    open?: boolean;
    placeholder?: string;
    readOnly?: boolean;
    searchEnabled?: boolean;
    searchExpr?: Array<any>;
    searchMode?: string;  // contains, startswith
    searchTimeout?: number;
    showClearButton?: boolean;
    showDataBeforeSearch?: boolean;
    showSelectionControls?: boolean;
    spellCheck?: boolean;
    tabIndex?: number;
    text?: string;
    value?: any;
    valueExpr?: string | Function;
    visible?: boolean;
    width?: number | string | Function;
    form?: FormGroup;
}

export interface ITextBox {
    className?: string;
    editClassName?: string;
    focusStateEnabled?: boolean;
    height?: number | string | Function;
    hint?: string;
    hoverStateEnabled?: boolean;
    id?: string;
    inputArr?: string;
    maxLength?: string | number;
    mode?: string;  // text, email, search, tel, url, password
    name?: string;
    placeholder?: string;
    readOnly?: boolean;
    removable?: boolean;
    showClearButton?: boolean;
    spellCheck?: boolean;
    tabIndex?: number;
    text?: string;
    value?: string;
    visible?: boolean;
    width?: number | string | Function;
    type?: string;
    form?: FormGroup;
    caption?: string;
    level?: string;
    selected?: boolean;
    parent?: string;
    grouped?: boolean;
}

export interface RTextbox {
    selector: string;
    options: ITextBox;
}