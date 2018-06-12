import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { RTextbox } from './reporting-textbox.component';

@Component({
    selector: 'r-grid',
    template: `
        <div class="r-grid">
            <dx-data-grid
                id="r-grid"
                draggable="false"
                [allowColumnReordering]="false"
                [allowColumnResizing]="false"
                [cellHintEnabled]="true"
                [columnAutoWidth]="true"
                [dataSource]="gOptions?.data"
                [focusStateEnabled]="true"
                [hoverStateEnabled]="false"
                [showColumnLines]="false"
                [showRowLines]="false"
                [showBorders]="false"
                [rowAlternationEnabled]="false"
                [width]="gridWidth"
                [height]="gridHeight"
                [wordWrapEnabled]="true"
                (onContentReady)="onContentReady($event)">
                    <dxi-column *ngFor="let col of gOptions.columns"
                        [alignment]="col.alignment"
                        [allowEditing]="col.allowEdit"
                        [allowFiltering]="col.allowFilter"
                        [allowFixing]="col.allowFix"
                        [allowGrouping]="col.allowGroup"
                        [allowHeaderFiltering]="col.allowHeaderFilter"
                        [allowHiding]="col.allowHide"
                        [allowReordering]="col.allowReorder"
                        [allowResizing]="col.allowResize"
                        [allowSearch]="col.allowSearch"
                        [allowSorting]="col.allowSort"
                        [caption]="col.caption"
                        [calculateCellValue]="col.calculateCellValue"
                        [calculateDisplayValue]="col.calculateDisplayValue"
                        [dataField]="col.dataField"
                        [dataType]="col.dataType"
                        [fixed]="col.fixed"
                        [format]="col.format"
                        [groupIndex]="col.groupIndex"
                        groupCellTemplate="groupCellTemplate"
                        [width]="col.width"
                        [minWidth]="col.minWidth"
                        [visible]="col.visible">
                        <dxi-column *ngFor="let subCol of col.subColumns"
                            [alignment]="subCol.alignment"
                            [allowFiltering]="subCol.allowFilter"
                            [allowReordering]="subCol.allowReorder"
                            [allowResizing]="subCol.allowResize"
                            [allowSorting]="subCol.allowSort"
                            [caption]="subCol.caption"
                            [calculateCellValue]="subCol.calculateCellValue"
                            [calculateDisplayValue]="subCol.calculateDisplayValue"
                            [dataField]="subCol.dataField"
                            [dataType]="subCol.dataType"
                            [fixed]="subCol.fixed"
                            [format]="subCol.format"
                            [groupIndex]="subCol.groupIndex"
                            groupCellTemplate="groupCellTemplate"
                            [width]="subCol.width"
                            [minWidth]="subCol.minWidth"
                            [visible]="subCol.visible">
                        </dxi-column>
                    </dxi-column>
                    <div *dxTemplate="let data of 'groupCellTemplate' ">
                        <strong>{{data.displayValue}}</strong>
                    </div>
                    <dxo-summary>
                        <dxi-total-item *ngFor="let sum of gOptions.summaries"
                            [column]="sum.column"
                            [customizeText]="sum.customizeText"
                            [displayFormat]="sum.displayFormat"
                            [summaryType]="sum.summaryType">
                        </dxi-total-item>
                        <dxi-group-item *ngFor="let gsum of gOptions.groupSummaries"
                            [alignByColumn]="alignByColumn"
                            [column]="gsum.column"
                            [customizeText]="gsum.customizeText"
                            [displayFormat]="gsum.displayFormat"
                            [summaryType]="gsum.summaryType"
                            [showInGroupFooter]="gsum.showInGroupFooter">
                        </dxi-group-item>
                    </dxo-summary>
                    <dxi-sort-by-group-summary-info summaryItem="Name"></dxi-sort-by-group-summary-info>
                    <dxo-selection mode="none"></dxo-selection>
                    <dxo-load-panel [enabled]="true"></dxo-load-panel>
                    <dxo-scrolling mode="standard" [preloadEnabled]="false"></dxo-scrolling>
                    <dxo-paging [pageSize]="200"></dxo-paging>
                    <dxo-pager [showPageSizeSelector]="true" [showInfo]="true"></dxo-pager>
                    <dxo-grouping [autoExpandAll]="true" [allowCollapsing]="false"></dxo-grouping>
                    <dxo-group-panel [visible]="false"></dxo-group-panel>
            </dx-data-grid>
        </div>
    `,
    styleUrls: ['./reporting-grid.component.scss']
})

export class ReportingGridComponent implements OnInit {

    gOptions: IGridOptions = null;
    title: string;
    data: any[] = [];
    gridWidth: string =  "450px";
    gridHeight: string = "300px";

    @Input() set options(optionsValue: IGridOptions) {
        if (!optionsValue) {
            return;
        }
        this.gOptions = optionsValue;
        this.data = optionsValue.data;
    }

    get options(): IGridOptions {
        return this.gOptions;
    }

    constructor() { }

    ngOnInit() {

    }

    onContentReady(e) {
        e.component.option("loadPanel.enabled", false);
    }
}

export interface IGridOptions {
    type?: number;
    columns?: IGridColumn[];
    data?: any[];
    summaries?: IGridColumnSummary[];
    groupSummaries?: IGridColumnSummary[];
    editorClassifications?: RTextbox[];
    editorColumns?: RTextbox[];
}

export interface IGridColumn {
    alignment?: string; // undefined, left, right, center
    allowEdit?: boolean;
    allowExport?: boolean
    allowFilter?: boolean;
    allowFix?: boolean;
    allowGroup?: boolean;
    allowHeaderFilter?: boolean;
    allowHide?:boolean;
    allowReorder?: boolean;
    allowResize?: boolean;
    allowSearch?: boolean;
    allowSort?: boolean;
    allowShowInMenu?: boolean;
    autoExpandGroup?: boolean;   
    calculateCellValue?: Function;
    calculateDisplayValue?: string | Function;
    calculateFilterExpression?: Function;
    calculateGroupValue?: string | Function;
    calculateSortValue?: string | Function;
    caption?: string;
    cellTemplate?: any;
    columns?: any[];
    cssClass?: string;
    customizeText?: Function;
    dataField?: string;
    dataType?: string;
    editCellTemplate?: any;
    editorOptions?: any;
    encodeHtml?: boolean;
    falseText?: string;
    filterOptions?: any[];
    filterType?: string;  // include, exclude
    filterValue?: any;
    filterValues?: any[];
    fixed?: boolean;
    fixedPosition?: string;  // left, right
    format?: any;
    groupCellTemplate?: any;
    groupIndex?: number; 
    headerCellTemplate?: any;
    headerFilter?: any;
    hidingPriority?: number;
    isBand?: boolean;
    isCategory?: boolean;
    isClassification?: boolean;
    lookup?: any;
    minWidth?: number;
    name?: string;  //specify the idenifier of the column.
    ownerBand?: number;
    selectedFilterOperation?: string;  // 'startswith', 'contains'.....
    setCellValue?: Function;
    showInColumnChooser?: boolean;
    showWhenGrouped?: boolean;
    sortIndex?: number;
    sortOrder?: string;  // undefined, asc, desc
    trueText?: string;
    visible?: boolean;
    visibleIndex?: number;
    width?: number | string;
    subColumns?: IGridColumn[];
}

export interface IGridColumnSummary {
    alignByColumn?: boolean;
    column?: string;
    customizeText?: Function;
    displayFormat?: string;
    name?: string;
    showInColumn?: string;
    showInGroupFooter?: boolean;
    skipEmptyValues?: boolean;
    summaryType?: string;  // sum min max avg count custom
    valueFormat?: any;
}

enum GridType {
    Asset = 1, Pivot, Transaction, Advanced
}

