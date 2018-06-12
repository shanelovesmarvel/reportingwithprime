import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITextBox } from './reporting-textbox.component';

@Component({
    selector: 'r-editor',
    styleUrls: ['./reporting-editor.component.scss'],
    template: `
    <div class="r-editor">
        <div class="r-datasource" *ngIf="eOptions.children.length">
            <h5>Data Source</h5>
            <div class="r-line"></div>
        </div>
        <ng-container *ngFor="let opt of eOptions.children; let idex = index;">
            <div class="r-section">
                <div class="r-titles">
                    <span id="add" class="k-icon k-i-plus r-add"
                        *ngIf="opt?.hasAdd" 
                        [title]="opt?.addTooltip" 
                        (click)="onTextboxAdd($event, opt, idex)">
                    </span>
                    <strong>{{opt?.title}}</strong>
                    <span id="group" class="fa fa-object-group r-group"
                        *ngIf="opt?.hasGroup" 
                        [title]="opt?.groupTooltip" 
                        (click)="onGroup($event)">
                    </span>
                </div>
                <div class="r-content">
                    <ul class="r-content-widgets" [dragula]="opt?.dragula" [dragulaModel]="opt?.children">
                        <li *ngFor="let wdg of opt.children">
                            <r-textbox  
                                *ngIf="wdg.selector === 'r-textbox' "
                                [id]="wdg.options.id"  
                                [options]="wdg.options"
                                (select)="onTextboxSelect($event, opt, idex)" 
                                (edit)="onTextboxEdit($event, opt, idex)"
                                (remove)="onTextboxRemove($event, opt, idex)">
                            </r-textbox>
                            <ul class="r-content-subwidgets"
                                *ngIf="opt?.hasGroup" 
                                [dragula]="opt?.subdragula" 
                                [dragulaModel]="wdg.children">
                                <li *ngFor="let subwdg of wdg.children">
                                    <r-textbox  
                                        *ngIf="subwdg.selector === 'r-textbox' "
                                        [id]="subwdg.options.id"  
                                        [options]="subwdg.options"
                                        (select)="onTextboxSelect($event)" 
                                        (edit)="onTextboxEdit($event)"
                                        (remove)="onTextboxRemove($event)">
                                    </r-textbox>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="r-line" *ngIf="opt?.hasSeparator"></div>
            </div>
        </ng-container>
    </div> 
    `
})

export class ReportingEditorComponent implements OnInit {
    @Output() addTextbox: EventEmitter<TextboxEvent> = new EventEmitter<TextboxEvent>();
    @Output() editTextbox: EventEmitter<TextboxEvent> = new EventEmitter<TextboxEvent>();
    @Output() removeTextbox: EventEmitter<TextboxEvent> = new EventEmitter<TextboxEvent>();

    eOptions: IEditorOptions = null;

    @Input() set options(optionsValue: IEditorOptions) {
        if (!optionsValue) {
            return;
        }
        this.eOptions = optionsValue;
    }

    get options(): IEditorOptions {
        return this.eOptions;
    }

    constructor() { }

    ngOnInit() { }


    onGroup(event: MouseEvent): void {

    }

    onTextboxAdd(event: MouseEvent, opt: IEditorSectionOption, index: number): void {
        this.addTextbox.emit({
            textbox: null,
            editor: opt,
            index: index
        });
    }

    onTextboxEdit(textbox: ITextBox, opt: IEditorSectionOption, index: number): void {
        this.editTextbox.emit({
            textbox: textbox,
            editor: opt,
            index: index
        });
    }

    onTextboxRemove(textbox: ITextBox, opt: IEditorSectionOption, index: number): void {
        this.removeTextbox.emit({
            textbox: textbox,
            editor: opt,
            index: index
        });
    }

    onTextboxSelect(event: any): void {

    }
}

interface IEditorOptions {
    children?: Array<IEditorSectionOption>;
}

interface IEditorSectionOption {
    addTooltip?: string;
    children?: Array<any>;
    dragula?: string;
    hasAdd?: boolean;
    hasGroup?: boolean;
    hasSeparator?: boolean;
    groupTooltip?: string;
    subdragula?: string;
    title?: string;
    editorType?: string;
    wdgIndex?: number;
    wdgType?: string;
}

export interface TextboxEvent {
    textbox: ITextBox;
    editor: IEditorSectionOption;
    index: number;
}