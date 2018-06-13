import { Component, OnInit, Renderer, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, TreeNode, SlideMenu, Menu, OverlayPanel } from 'primeng/primeng';
import { IGridColumn, IGridColumnSummary, IGridOptions } from './reporting-grid.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ITextBox, RTextbox } from './reporting-textbox.component';
import { TextboxEvent } from './reporting-editor.component';
import { IChartSeriesOption } from './reporting-chart.component';
import { DragulaService } from 'ng2-dragula';
import { Observable } from 'rxjs';
import * as JsReport from 'jsreport-browser-client-dist';
import * as html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import {
    parseNumber, appraisalData, assetClass, content1, content2,
    Classifications, DataSourceTypes, ActionModes,
    Classification, DataSourceType, ActionMode, AddTooltips, Titles,
    ChartLibType, ChartType, Caption, ChartTypes,
    Clasifis, COLUMNS, classifications, genericdates, currencies, pricesets,
    TEXTBOX_CLASSNAME, TEXTBOX_EDIT_CLASSNAME,
    widgetConfig
} from './reporting.constants';

@Component({
    selector: 'r-main',
    template: `
    <div class="reporting">
        <div class="r-titlebar">
            <div class="basic-info">
                <r-dropdown [options]="reportOptions" *ngIf="false"></r-dropdown>
                <div>
                    <strong>Evan Case</strong>
                    <label>Portfolio</label>
                </div>
                <div>
                    <strong>09/30/2005 - 12/31/2005</strong>
                    <label>Period</label>
                </div>
            </div>   
            <div class="action-buttons">
                <r-dropdown [options]="portfolioOptions" *ngIf="false"></r-dropdown>
                <r-dropdown [options]="dateOptions" *ngIf="false"></r-dropdown>
                <span id="download" class="fa fa-download r-action" title="Download" (click)="downloadReport()"></span>
                <span id="save" class="fa fa-save r-action" title="Save" (click)="saveReport()"></span>
                <span *ngIf="false" id="full-screen" class="k-icon k-i-full-screen r-action" title="Full Screen" (click)="generateJsReport(1)"></span>
                <span *ngIf="false" id="print" class="k-icon k-i-print r-action" title="Print" (click)="generateJsReport(2)"></span>
                <span *ngIf="false" id="thumbnail" class="k-icon k-i-thumbnails-left r-action" title="Thumbnail" (click)="generateJsReport(3)"></span>
                <span *ngIf="false" id="settings" class="k-icon k-i-gear r-action" (click)="generateJsReport(4)"></span>
            </div>
        </div>
        <div id="r-container" class="r-container">
            <div class="r-thumbnails">
                <p-menu id="gridMenu" #gridMenu [popup]="true" [model]="gridMenuItems">
                </p-menu>
                <i id="template-pie-chart" class="fa fa-pie-chart r-action" aria-hidden="true" title="Add Pie Chart" (click)="addChart('pie')"></i>
                <i id="template-line-chart" class="fa fa-line-chart r-action" aria-hidden="true" title="Add Line Chart" (click)="addChart('line')"></i>
                <i id="template-bar-chart" class="fa fa-bar-chart r-action" aria-hidden="true" title="Add Bar Chart" (click)="addChart('bar')"></i>
                <i id="template-grid" class="fa fa-table r-action" aria-hidden="true" title="Add Grid" (click)="gridMenu.toggle($event)"></i>
                <i id="template-pic" class="fa fa-picture-o r-action" aria-hidden="true" title="Add Picture"></i>
                <i id="template-text" class="fa fa-file-text r-action" aria-hidden="true" title="Add Text"></i>
                <i id="template-eraser" class="fa fa-eraser r-action" aria-hidden="true" title="Clear" (click)="resetTemplate($event)"></i>
                <i id="template-add" class="fa fa-plus r-action r-add" aria-hidden="true" title="Add Template" (click)="addTemplate($event)"></i>
                <p-menu id="templateMenu" #templateMenu [popup]="true" [model]="templates">
                </p-menu>
            </div>
            <div class="r-editors">
                <div class="paper" id="reportPlaceholder">
                    <div id="widgetContainer" [ngWidgetContainer]="widgetContainerOptions" style="padding-bottom: 20px;"> 
                        <div id="widgetContainer2" *ngFor="let widget of options.children; let inn=index;" [(ngWidget)]="widget.config">
                            <div class="widget-toolbar">
                                <i id="template-edit" class="fa fa-pencil r-action" aria-hidden="true" title="Edit" (click)="editWidget(inn)"></i>
                                <i id="template-lock" class="fa fa-lock r-action" aria-hidden="true" title="Lock" (click)="lockWidget(inn)"></i>
                            </div>
                            <r-grid *ngIf="widget.selector === 'r-grid' " [options]="widget.options">
                            </r-grid>
                            <r-chart *ngIf="widget.selector === 'r-chart' " [options]="widget.options">
                            </r-chart>
                        </div>
                </div>
            </div>
            <div class="r-configurations">
                <r-editor [options]="options.editorOptions"
                    (addTextbox)="handleTextboxAdd($event)"
                    (editTextbox)="handleTextboxEdit($event)"
                    (removeTextbox)="handleTextboxRemove($event)">
                </r-editor>
                <p-overlayPanel #overlay
                    [dismissable]="true"
                    [showCloseIcon]="true"
                    (onAfterHide)="onAfterHide($event)">
                    <div class="r-overlay">
                        <div class="r-overlay-titlebar">
                            <span>{{overlayOptions.title}}</span>
                        </div>
                        <div class="r-overlay-content">
                            <p-listbox *ngIf="overlayOptions.secondary.children.length === 0"
                                [options]="overlayOptions.items"
                                [(ngModel)]="selectedListItem"
                                (onChange)="onListChange($event)">
                            </p-listbox>
                            <div class="r-secondary-page" *ngIf="overlayOptions.secondary.children.length">
                                <div class="r-widgets">    
                                    <ng-container *ngFor="let opt of overlayOptions.secondary.children">
                                        <r-datepicker *ngIf="opt.selector === 'r-datepicker'"
                                            [options]="opt.options">
                                        </r-datepicker>
                                        <r-dropdown *ngIf="opt.selector === 'r-dropdown'"
                                            [options]="opt.options">
                                        </r-dropdown>
                                        <r-radiogroup *ngIf="opt.selector === 'r-radiogroup'"
                                            [options]="opt.options">
                                        </r-radiogroup>
                                        <r-textinput *ngIf="opt.selector === 'r-textinput'"
                                            [options]="opt.options">
                                        </r-textinput>
                                    </ng-container>
                                </div>
                                <div class="r-buttons">
                                    <button *ngIf="overlayOptions.secondary.hasBack" type="button" class="btn btn-info r-button r-button-margin" (click)="onBackToList()">Back</button>
                                    <button type="button" class="btn btn-primary r-button" (click)="onSave()">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </p-overlayPanel>
            </div>    
        </div>
    </div>
    `,
    styleUrls: ['./reporting.component.scss']
})

export class ReportingComponent implements OnInit {
    @ViewChild("gridMenu") gridMenu: Menu;
    @ViewChild("templateMenu") templateMenu: Menu;
    @ViewChild("overlay") overlay: OverlayPanel;

    gridMenuItems: any[] = [];
    gridItemCmdCallback: Function = null;
    templates: any[] = [];
    templateItemCmdCallback: Function = null;

    options: any = {
        children: [],
        editorOptions: {
            children: []
        }
    };

    tOptions: any = {
        classic: {
            children: []
        },
        column: {
            children: []
        }
    }

    overlayOptions: any = {
        title: "",
        tempTitle: "",
        column: "",
        classification: "",
        items: [],
        secondary: {
            children: []
        }
    };

    category: any = {
        field: "",
        data: []
    };

    columns: IGridColumn[] = [];
    cachedColumns: IGridColumn[] = [];
    columnItems: IGridColumn[] = [];

    classis: any[] = [];
    overlayPanelItems: any[] = [];

    summaries: IGridColumnSummary[] = [];
    groupItems: string[] = [];
    groupSummaries: IGridColumnSummary[] = [];

    gridData: any[] = [];
    pristineData: any[] = [];

    series: any[] = [];

    dsClassifications: RTextbox[] = [];
    dsColumns: RTextbox[] = [];
    dsCategories: RTextbox[] = [];
    dsSeries: RTextbox[] = [];

    selectedListItem: string;
    formGroup: FormGroup;
    mvDate: string = "12/31/2015";
    mvCurrency: string = "USD";
    order: string = "Ascending";
    mode: string = "";

    widgetContainerOptions: any = {
        resizeable: true,
        margin: 5,
        draggable: true,
        cascade: "left",
        col_width: 2,
        row_height: 2,
        max_cols: 2,
        auto_resize: true
    };

    reportOptions: any = {
        dataSource: [
            {
                value: "portfolioApprasial",
                label: "Portfolio Apprasial"
            },
            {
                value: "portfolioOverview",
                label: "Portfolio Overview"
            },
            {
                value: "performanceOverview",
                label: "Performance Overview"
            }
        ],
        valueExpr: "value",
        caption: "Report Name",
        value: "portfolioApprasial",
        name: "Report Name"
    };

    portfolioOptions: any = {
        dataSource: [
            {
                value: "case",
                label: "Case Evan"
            },
            {
                value: "@master",
                label: "@master"
            },
            {
                value: "13",
                label: "13f"
            }
        ],
        valueExpr: "value",
        caption: "Portfolio",
        value: "case",
        name: "Portfolio",
    };

    dateOptions: any = {
        dataSource: [
            {
                value: "date1",
                label: "12/31/2015 - 12/31/2016"
            },
            {
                value: "date2",
                label: "12/31/2010 - 12/31/2011"
            },
            {
                value: "date3",
                label: "12/31/2008 - 12/31/2009"
            }
        ],
        valueExpr: "value",
        caption: "Date",
        value: "date1",
        name: "Date"
    };


    constructor(
        private render: Renderer,
        private render2: Renderer2,
        private eleRef: ElementRef,
        private dragulaService: DragulaService) { }

    ngOnInit() {
        this.render2.setStyle(
            this.eleRef.nativeElement.querySelector("#r-container"), "height", `${window.innerHeight - 60}px`);

        this.gridItemCmdCallback = this.addGrid.bind(this);
        this.templateItemCmdCallback = this.addTemplateToEditor.bind(this);
        this.gridMenuItems = [
            { label: 'Asset Table1', icon: 'k-icon k-i-table', command: this.gridItemCmdCallback },
            { label: 'Asset Table2', icon: 'k-icon k-i-table-properties', command: this.gridItemCmdCallback },
            { label: 'Asset Table3', icon: 'k-icon k-i-table-cell', command: this.gridItemCmdCallback },
            { label: 'Asset Table4', icon: 'k-icon k-i-table-cell-properties', command: this.gridItemCmdCallback }
        ];

        this.dragulaService.drop.subscribe((value: Array<any>) => {
            if (value[0] === "column") {
                this.resortColumn();
            }
            else if (value[0] === "classification") {
                this.reorderClassification();
            }
        });

        JsReport.serverUrl = 'https://shanelovesmarvel.jsreportonline.net';
        JsReport.headers.Authorization = "d295dXNoYW5taW5nQHNpbmEuY29tOjQwMzEwMzY2M3poYW8=";

        this.parseData();
        this.initGirdColumns();
    }

    downloadReport(): void {
        let doc: any = new jsPDF();
        doc.setFontSize(18);
        doc.text(12, 10, "Portfolio Apprasial");
        let element: any = this.eleRef.nativeElement.querySelector("#widgetContainer");
        html2canvas(element).then((canvas: any) => {
            doc.addImage(canvas.toDataURL("image/jpeg"), "JPEG", 0, 50, doc.internal.pageSize.width, element.offsetHeight / 5);
            doc.save('portfolio-apprasial.pdf');
        });
    }

    saveReport(): void {
        this.formGroup = new FormGroup({});
        this.overlayOptions.title = "Save Template";
        this.overlayOptions.type = "template";
        this.overlayOptions.secondary = {
            hasBack: false,
            children: [
                {
                    selector: "r-textinput",
                    options: {
                        value: "",
                        name: "Template",
                        caption: "Template Name",
                        form: this.formGroup
                    }
                }
            ]
        };
        this.render2.setStyle(this.eleRef.nativeElement.querySelector(".ui-overlaypanel"), "marginTop", "0");
        this.render2.setStyle(this.eleRef.nativeElement.querySelector(".ui-overlaypanel"), "marginLeft", "0");
        this.overlay.toggle(event);
    }

    addTemplate(): void {
        let temps: string[] = localStorage.getItem("templateNames") ? JSON.parse(localStorage.getItem("templateNames")) : [];
        if (temps.length) {
            temps.forEach((name: string) => {
                if (this.templates.findIndex((temp: any) => temp.label === name) === -1) {
                    this.templates.push({
                        label: name,
                        icon: 'fa fa-file',
                        command: this.templateItemCmdCallback
                    });
                }
            });
            this.templateMenu.toggle(event);
        }
    }

    addTemplateToEditor(event: any): void {
        let label: string = event.item.label;
        if (!label) {
            return;
        }
        let temps: any = localStorage.getItem("templates") ? JSON.parse(localStorage.getItem("templates")) : null;

        if (temps) {
            let options: any = temps[label];
            if (options && options.children && options.children.length) {
                this.options.children.push(...options.children);
            }
        }
    }

    resetGridData() {
        this.gridData = [];
        this.columns = [];
        this.columnItems = [];
        this.summaries = [];
        this.groupSummaries = [];
        this.dsClassifications = [];
        this.dsColumns = [];
    }

    resetChartData() {
        this.dsCategories = [];
        this.dsSeries = [];
        this.series = [];
        this.category = {
            field: "",
            data: []
        };
    }

    resetTemplate() {
        this.columns = [];
        this.columnItems = [];
        this.gridData = [];
        this.summaries = [];
        this.groupSummaries = [];
        this.dsClassifications = [];
        this.dsColumns = [];
        this.options.children = [];
        this.options.editorOptions.children = [];
        this.groupItems = [];
    }

    addGrid(event: any): void {
        let label: string = event.item.label;
        if (!label) {
            return;
        }
        this.resetGridData();
        this.initGirdColumns();
        this.initCustomSummaries();
        this.parseGridColumn(label);

        let grid: IGridOptions = {
            columns: [],
            data: [],
            summaries: [],
            groupSummaries: [],
            editorClassifications: [],
            editorColumns: []
        };
        grid.columns.push(...this.columns);
        grid.data.push(...this.gridData);
        grid.summaries.push(...this.summaries);
        grid.groupSummaries.push(...this.groupSummaries);
        grid.editorClassifications.push(...this.dsClassifications);
        grid.editorColumns.push(...this.dsColumns);

        this.options.children.push({
            selector: "r-grid",
            config: {
                col: 1,
                row: 1,
                sizex: 1,
                sizey: 1,
                minWidth: 400,
                minHeight: 300
            },
            options: grid,
            editorOptions: {
                editorClassifications: this.dsClassifications,
                editorColumns: this.dsColumns,
                columns: this.columns,
                data: this.gridData,
                pristineData: appraisalData,
                summaries: this.summaries,
                groupSummaries: this.groupSummaries
            }
        });
    }

    addChart(type: string): void {
        if (!type) {
            return;
        }

        this.resetChartData();
        this.initChartCategory();
        this.initChartSeries(type);

        this.options.children.push({
            selector: "r-chart",
            config: {
                col: 1,
                row: 1,
                sizex: 1,
                sizey: 1,
                minWidth: 400,
                minHeight: 300
            },
            options: {
                dataSource: this.category.data,
                title: "Portfolio Apprasial",
                width: 400,
                height: 300,
                palette: "Soft Blue",
                type: type,
                series: this.series,
                commonSeries: {
                    type: type,
                    argumentField: this.category.field
                },
                tooltip: {
                    enabled: true,
                    format: "currency"
                },
                legend: {
                    horizontalAlignment: "center",
                    verticalAlignment: "bottom"
                },
                editorCategories: this.dsCategories,
                editorSeries: this.dsSeries
            },
            editorOptions: {
                editorCategories: this.dsCategories,
                editorSeries: this.dsSeries,
                series: this.series,
                category: this.category
            }
        });
    }


    editWidget(idex: number): void {
        let widget: any = this.options.children[idex];
        if (!widget || !widget.selector) {
            return;
        }
        this.options.editorOptions.children = [];
        if (widget.selector === "r-grid") {
            this.options.editorOptions.children.push(
                {
                    addTooltip: AddTooltips.Classification,
                    editorType: DataSourceTypes.Classification,
                    dragula: Titles.Classification,
                    hasAdd: true,
                    hasGroup: false,
                    hasSeparator: false,
                    title: Titles.Classification,
                    wdgIndex: idex,
                    children: widget.editorOptions.editorClassifications
                },
                {
                    addTooltip: AddTooltips.Column,
                    editorType: DataSourceTypes.Column,
                    dragula: Titles.Column,
                    hasAdd: true,
                    hasGroup: false,
                    hasSeparator: false,
                    title: Titles.Column,
                    wdgIndex: idex,
                    children: widget.editorOptions.editorColumns
                }
            );
            this.classis = classifications;
        }

        else if (widget.selector === "r-chart") {
            this.options.editorOptions.children.push(
                {
                    dragula: Titles.Category,
                    editorType: DataSourceTypes.Category,
                    hasAdd: false,
                    hasGroup: false,
                    hasSeparator: false,
                    title: Titles.Category,
                    wdgIndex: idex,
                    wdgType: widget.options.type,
                    children: widget.editorOptions.editorCategories
                },
                {
                    addTooltip: AddTooltips.Serie,
                    dragula: Titles.Serie,
                    editorType: DataSourceTypes.Serie,
                    hasAdd: widget.options.type !== ChartTypes.Pie,
                    hasGroup: false,
                    hasSeparator: false,
                    title: Titles.Serie,
                    wdgIndex: idex,
                    wdgType: widget.options.type,
                    children: widget.editorOptions.editorSeries
                }
            );
        }
    }

    lockWidget(idex: number): void {

    }

    handleTextboxAdd(textboxEvent: TextboxEvent): void {
        this.overlayPanelItems = [];
        this.mode = ActionModes.Add;

        let { editor, index } = textboxEvent;

        if (editor.editorType === DataSourceTypes.Classification) {
            this.addClassficationItems();
            this.overlayOptions = {
                title: AddTooltips.Classification,
                tempTitle: AddTooltips.Classification,
                items: this.overlayPanelItems,
                type: editor.editorType,
                secondary: {
                    children: []
                },
                wdgType: editor.wdgType,
                wdgIndex: editor.wdgIndex,
                editorIndex: index
            };
        }

        else if (editor.editorType === DataSourceTypes.Column) {
            this.addColumnItems(editor.wdgIndex);
            this.overlayOptions = {
                title: AddTooltips.Column,
                tempTitle: AddTooltips.Column,
                items: this.overlayPanelItems,
                type: editor.editorType,
                secondary: {
                    children: []
                },
                wdgIndex: editor.wdgIndex,
                editorIndex: index
            };
        }

        else if (editor.editorType === DataSourceTypes.Serie) {
            this.addSeriesItems(editor.wdgIndex);
            this.overlayOptions = {
                title: AddTooltips.Serie,
                tempTitle: AddTooltips.Serie,
                items: this.overlayPanelItems,
                type: editor.editorType,
                secondary: {
                    children: []
                },
                wdgType: editor.wdgType,
                wdgIndex: editor.wdgIndex,
                editorIndex: index
            };
        }
        this.render2.setStyle(this.eleRef.nativeElement.querySelector(".ui-overlaypanel"), "marginTop", "-2.2em");
        this.render2.setStyle(this.eleRef.nativeElement.querySelector(".ui-overlaypanel"), "marginLeft", "-21em");
        this.overlay.toggle(event);
    }

    handleTextboxEdit(textboxEvent: TextboxEvent): void {
        this.overlayPanelItems = [];
        this.mode = ActionModes.Edit;

        let { textbox, editor, index } = textboxEvent;

        if (textbox.type === DataSourceTypes.Classification) {
            this.overlayOptions.orginalName = textbox.name;
            this.overlayOptions.wdgType = editor.wdgType,
                this.overlayOptions.wdgIndex = editor.wdgIndex,
                this.overlayOptions.editorIndex = index;
            this.setClassficationDetails(textbox.name);
            this.render2.setStyle(this.eleRef.nativeElement.querySelector(".ui-overlaypanel"), "marginLeft", "-18.2em");
        }
        else if (textbox.type === DataSourceTypes.Column) {
            if (textbox.grouped) {
                this.setGroupDetais(textbox.value, textbox.name);
            } else {
                this.addColumnItems(editor.wdgIndex);
                this.overlayOptions = {
                    title: `Edit ${textbox.name}`,
                    tempTitle: AddTooltips.Column,
                    items: this.overlayPanelItems,
                    orginalName: textbox.name,
                    type: editor.editorType,
                    secondary: {
                        children: []
                    },
                    wdgType: editor.wdgType,
                    wdgIndex: editor.wdgIndex,
                    editorIndex: index
                };
            }
            this.render2.setStyle(this.eleRef.nativeElement.querySelector(".ui-overlaypanel"), "marginLeft", "-18.2em");
        }
        else if (textbox.type === DataSourceTypes.Category) {
            this.addCategoryItems(editor.wdgIndex);
            this.overlayOptions = {
                title: `Edit ${textbox.name}`,
                tempTitle: AddTooltips.Category,
                items: this.overlayPanelItems,
                orginalName: textbox.name,
                type: editor.editorType,
                secondary: {
                    children: []
                },
                wdgType: editor.wdgType,
                wdgIndex: editor.wdgIndex,
                editorIndex: index
            };
            this.render2.setStyle(this.eleRef.nativeElement.querySelector(".ui-overlaypanel"), "marginLeft", "-20em");
        }

        else if (textbox.type === DataSourceTypes.Serie) {
            this.addSeriesItems(editor.wdgIndex);
            this.overlayOptions = {
                title: `Edit ${textbox.name}`,
                tempTitle: AddTooltips.Serie,
                items: this.overlayPanelItems,
                orginalName: textbox.name,
                type: editor.editorType,
                secondary: {
                    children: []
                },
                wdgType: editor.wdgType,
                wdgIndex: editor.wdgIndex,
                editorIndex: index
            };
            if (textbox.removable) {
                this.render2.setStyle(this.eleRef.nativeElement.querySelector(".ui-overlaypanel"), "marginLeft", "-18.2em");
            } else {
                this.render2.setStyle(this.eleRef.nativeElement.querySelector(".ui-overlaypanel"), "marginLeft", "-20em");
            }
        }
        this.render2.setStyle(this.eleRef.nativeElement.querySelector(".ui-overlaypanel"), "marginTop", "-2.2em");
        this.overlay.toggle(event);
    }

    handleTextboxRemove(textboxEvent: TextboxEvent): void {
        this.mode = ActionModes.Remove;

        let { textbox, editor, index } = textboxEvent;

        if (textbox.type === DataSourceTypes.Classification) {
            this.removeClassification(textboxEvent);

            this.options.children[editor.wdgIndex].options.data = this.gridData;
            this.options.children[editor.wdgIndex].options.columns = this.columns;
            this.options.children[editor.wdgIndex].options.summaries = this.summaries;
            this.options.children[editor.wdgIndex].options.groupSummaries = this.groupSummaries;
            this.options.editorOptions.children[index].children = this.dsClassifications;

            this.options.children[editor.wdgIndex].editorOptions.data = this.gridData;
            this.options.children[editor.wdgIndex].editorOptions.columns = this.columns;
            this.options.children[editor.wdgIndex].editorOptions.dsClassifications = this.dsClassifications;
            this.options.children[editor.wdgIndex].editorOptions.summaries = this.summaries;
            this.options.children[editor.wdgIndex].editorOptions.groupSummaries = this.groupSummaries;
        }

        else if (textbox.type === DataSourceTypes.Serie) {
            let currentSeries: any[] = this.options.children[editor.wdgIndex].editorOptions.series.filter((item: any) => item.name !== textbox.name);
            let currentDSSeries: RTextbox[] = this.options.children[editor.wdgIndex].editorOptions.editorSeries.filter((item: any) => item.options.name !== textbox.name);

            this.options.children[editor.wdgIndex].options.series = currentSeries;
            this.options.editorOptions.children[index].children = currentDSSeries;

            this.options.children[editor.wdgIndex].editorOptions.series = currentSeries;
            this.options.children[editor.wdgIndex].editorOptions.editorSeries = currentDSSeries;
        }

        else if (textbox.type === DataSourceTypes.Column) {
            if (textbox.level === "top") {
                let currentColumns: IGridColumn[] = this.options.children[editor.wdgIndex].editorOptions.columns;
                let currentDSColumns: RTextbox[] = this.options.children[editor.wdgIndex].editorOptions.editorColumns;

                currentColumns.forEach((column: IGridColumn) => {
                    if (column.dataField === textbox.name) {
                        column.visible = false;
                    }
                });
                currentDSColumns = currentDSColumns.filter((item: RTextbox) => item.options.name !== textbox.name);

                this.options.children[editor.wdgIndex].options.columns = currentColumns;
                this.options.editorOptions.children[index].children = currentDSColumns;

                this.options.children[editor.wdgIndex].editorOptions.columns = currentColumns;
                this.options.children[editor.wdgIndex].editorOptions.editorColumns = currentDSColumns;

            }
            else if (textbox.level === "sub") {
                let allHide: boolean = false;
                let tempTextbox: any = null;

                this.columns.map((column: IGridColumn) => {
                    if (column.dataField === textbox.parent) {
                        if (column.subColumns.length > 1) {
                            column.subColumns.map((columnx: IGridColumn) => {
                                if (columnx.dataField === textbox.name) {
                                    columnx.visible = false;
                                }
                            });
                            allHide = column.subColumns.every((columny: IGridColumn): boolean => {
                                return columny.visible === false;
                            });
                        }
                    }
                });

                if (allHide) {
                    let groupIndex: number = this.columns.findIndex((col: IGridColumn) => col.dataField === textbox.parent);
                    this.columns.splice(groupIndex, 1);
                }

                this.dsColumns.map((item: any) => {
                    if (item.options.name === textbox.parent) {
                        if (item.options.children.length > 1) {
                            let index: number = item.options.children.findIndex((item: any) => item.options.name === textbox.name);
                            item.options.children.splice(index, 1);
                        } else if (item.options.children.length === 1) {
                            tempTextbox = item.options.children[0];
                        }
                    }
                });

                if (tempTextbox) {
                    let textIndex: number = this.dsColumns.findIndex((item: any) => item.options.name === textbox.parent);
                    this.dsColumns.splice(textIndex, 1);
                }
            }
        }
    }

    addCategoryItems(widgetIndex: number) {
        this.cachedColumns.forEach((column: IGridColumn) => {
            if (column.isCategory) {
                if (column.dataField !== this.options.children[widgetIndex].editorOptions.category.field) {
                    let cl: any = {
                        label: column.dataField,
                        value: column.dataField,
                        id: column.dataField,
                        type: DataSourceTypes.Serie
                    };
                    this.overlayPanelItems.push(cl);
                }
            }
        });
    }

    addColumnItems(widgetIndex: number) {
        this.cachedColumns.forEach((column: IGridColumn) => {
            if (!column.isClassification) {
                let index: number = this.options.children[widgetIndex].editorOptions.editorColumns.findIndex((item: any) => item.options.name === column.dataField);
                if (index === -1 || column.dataField === "Market Value") {
                    let cl: any = {
                        label: column.dataField,
                        value: column.dataField,
                        id: column.dataField,
                        type: DataSourceTypes.Column
                    };
                    this.overlayPanelItems.push(cl);
                }
            }
        });
    }

    addClassficationItems() {
        this.classis.forEach((cl: any) => {
            cl.type = DataSourceTypes.Classification;
            cl.value = cl.label;
            this.overlayPanelItems.push(cl);
        });
    }

    addSeriesItems(widgetIndex: number) {
        this.cachedColumns.forEach((column: IGridColumn) => {
            if (!column.isCategory) {
                let index: number = this.options.children[widgetIndex].editorOptions.series.findIndex((item: IChartSeriesOption) => item.name === column.dataField);
                if (index === -1) {
                    let cl: any = {
                        label: column.dataField,
                        value: column.dataField,
                        id: column.dataField,
                        type: DataSourceTypes.Serie
                    };
                    this.overlayPanelItems.push(cl);
                }
            }
        });
    }

    initChartCategory() {
        this.category.field = Classifications.AssetClass;
        this.category.data = this.onFetchData(Classifications.AssetClass);
        this.dsCategories.push({
            selector: "r-textbox",
            options: {
                name: this.category.field,
                value: this.category.field,
                id: this.category.field,
                type: DataSourceTypes.Category,
                className: "tb",
                editClassName: "tb-edit",
                level: "top",
                removable: false
            }
        });
    }

    initChartSeries(type: string) {
        if (type === ChartTypes.Pie) {
            this.series.push({
                valueField: "Market Value",
                name: "Market Value",
                type: type,
                argumentField: "Asset Class"
            });

            this.dsSeries.push({
                selector: "r-textbox",
                options: {
                    name: "Market Value",
                    value: "Market Value",
                    id: "Market Value",
                    type: DataSourceTypes.Serie,
                    className: "tb",
                    editClassName: "tb-edit",
                    level: "top",
                    removable: false
                }
            });

        }
        else {
            this.cachedColumns.forEach((column: IGridColumn) => {
                if (column.visible && !column.isClassification) {
                    this.series.push({
                        valueField: column.dataField,
                        name: column.dataField,
                        type: type,
                        argumentField: "Asset Class"
                    });

                    this.dsSeries.push({
                        selector: "r-textbox",
                        options: {
                            name: column.dataField,
                            value: column.dataField,
                            id: column.name,
                            type: DataSourceTypes.Serie,
                            className: "tb",
                            editClassName: "tb-edit",
                            level: "top",
                            removable: true
                        }
                    });
                }
            });
        }
    }

    initNumberColumn(column: IGridColumn, key: string) {
        column.dataType = "number";
        column.format = parseNumber;

        let columnSummary: IGridColumnSummary = {};
        columnSummary.column = key;
        columnSummary.summaryType = "sum";
        columnSummary.alignByColumn = true;
        columnSummary.customizeText = customizeSummaryResult;
        this.summaries.push(columnSummary);

        let groupSummary: IGridColumnSummary = {};
        groupSummary.column = key;
        groupSummary.summaryType = "sum";
        groupSummary.customizeText = customizeSummaryResult;
        groupSummary.alignByColumn = true;
        groupSummary.showInGroupFooter = true;
        this.groupSummaries.push(groupSummary);
    }

    initGirdColumns() {
        let appraisal: any = appraisalData[2];
        Object.keys(appraisal).forEach((key: string) => {
            let column: IGridColumn = {};
            column.dataField = key;
            column.caption = key;
            if (typeof appraisal[key] === "number") {
                this.initNumberColumn(column, key);
            } else if (typeof appraisal[key] === "string") {
                column.dataType = "string";
            }
            if (key === "Quantity" || key === "Unit Cost" || key === "Price") {
                column.visible = false;
            } else {
                column.visible = true;
            }

            if (key === Classifications.AssetClass || key === Classifications.SecurityType || key === Classifications.Security) {
                column.allowShowInMenu = false;
                column.isClassification = true;
                column.isCategory = true;
            } else {
                column.allowShowInMenu = true;
                column.isClassification = false;
                column.isCategory = false;
            }
            column.allowSort = false;
            this.columns.push(column);
        });

        if (this.cachedColumns.length === 0) {
            this.cachedColumns.push(...this.columns);
        }
    }

    initCustomSummaries(): void {
        let summary: IGridColumnSummary = {};
        summary.customizeText = customizeSummaryText;
        summary.column = Classifications.AssetClass;
        this.summaries.push(summary);

        let groupSummary: IGridColumnSummary = {};
        groupSummary.customizeText = customizeGroupText;
        groupSummary.column = Classifications.AssetClass;
        groupSummary.showInGroupFooter = true;
        this.groupSummaries.push(groupSummary);
    }

    setSeriesDetails(serieName: string) {
        this.overlayOptions.type = DataSourceTypes.Serie;

        let currentSeries: IChartSeriesOption[] = this.options.children[this.overlayOptions.wdgIndex].editorOptions.series;
        let currentDSSeries: RTextbox[] = this.options.children[this.overlayOptions.wdgIndex].editorOptions.editorSeries;

        //When current mode is add, push new item directly.
        if (this.mode === ActionModes.Add) {
            currentSeries.push({
                valueField: serieName,
                name: serieName,
                type: this.overlayOptions.wdgType,
                argumentField: "Asset Class"
            });

            currentDSSeries.push({
                selector: "r-textbox",
                options: {
                    name: serieName,
                    value: serieName,
                    id: serieName,
                    type: DataSourceTypes.Serie,
                    className: "tb",
                    editClassName: "tb-edit",
                    level: "top",
                    removable: true
                }
            });
        }

        //When current mode is edit, replace item with new value.
        else if (this.mode === ActionModes.Edit) {
            currentSeries.forEach((item: IChartSeriesOption) => {
                if (item.name === this.overlayOptions.orginalName) {
                    item.valueField = serieName;
                    item.name = serieName;
                }
            });

            currentDSSeries.forEach((item: RTextbox) => {
                if (item.options.name === this.overlayOptions.orginalName) {
                    item.options.name = serieName;
                    item.options.value = serieName;
                    item.options.id = serieName;
                }
            });
        }

        this.options.children[this.overlayOptions.wdgIndex].options.series = currentSeries;
        this.options.editorOptions.children[this.overlayOptions.editorIndex].children = currentDSSeries;

        this.options.children[this.overlayOptions.wdgIndex].editorOptions.series = currentSeries;
        this.options.children[this.overlayOptions.wdgIndex].editorOptions.editorSeries = currentDSSeries;

        this.overlay.hide();
    }

    setCategoryDetails(categoryName: string): void {

        let currentCategory: any = {
            field: categoryName,
            data: this.onFetchData(categoryName)
        };

        this.options.children[this.overlayOptions.wdgIndex].options.commonSeries.argumentField = currentCategory.field;
        this.options.children[this.overlayOptions.wdgIndex].options.dataSource = currentCategory.data;

        let currentSeries: IChartSeriesOption[] = this.options.children[this.overlayOptions.wdgIndex].editorOptions.series;
        currentSeries.forEach((item: IChartSeriesOption) => {
            item.argumentField = categoryName;
        });

        let currentDSCategories: RTextbox[] = this.options.children[this.overlayOptions.wdgIndex].editorOptions.editorCategories;
        currentDSCategories.forEach((item: RTextbox) => {
            item.options.name = categoryName;
            item.options.value = categoryName;
            item.options.id = categoryName;
        });

        this.options.children[this.overlayOptions.wdgIndex].editorOptions.category = currentCategory;
        this.options.children[this.overlayOptions.wdgIndex].editorOptions.editorCategories = currentDSCategories;
        this.options.children[this.overlayOptions.wdgIndex].editorOptions.series = currentSeries;

        this.overlay.hide();
    }

    setColumnDetails(columnName: string): void {
        this.overlayOptions.type = DataSourceTypes.Column;
        this.overlayOptions.tempTitle = "Select Column";
        this.overlayOptions.column = columnName;
        if (columnName.includes("Market Value")) {
            this.formGroup = new FormGroup({});
            this.overlayOptions.title = `Edit ${columnName}`;
            this.overlayOptions.secondary = {
                hasBack: true,
                children: [
                    {
                        selector: "r-datepicker",
                        options: {
                            value: this.mvDate,
                            name: "AsDate",
                            caption: "As Of Date",
                            ddOptions: {
                                dataSource: genericdates,
                                displayExpr: "label",
                                valueExpr: "value",
                                value: "09/06/2017"
                            },
                            form: this.formGroup
                        }
                    },
                    {
                        selector: "r-dropdown",
                        options: {
                            dataSource: currencies,
                            valueExpr: "value",
                            value: this.mvCurrency,
                            caption: "Currency",
                            name: "Currency",
                            form: this.formGroup
                        }
                    }
                ]
            }
        }
        else {
            let currentColumns: IGridColumn[] = this.options.children[this.overlayOptions.wdgIndex].editorOptions.columns;
            let currentDSColumns: RTextbox[] = this.options.children[this.overlayOptions.wdgIndex].editorOptions.editorColumns;

            if (this.mode === ActionModes.Add) {
                currentColumns.forEach((column: IGridColumn) => {
                    if (column.dataField === columnName) {
                        column.visible = true;
                    }
                });
                currentDSColumns.push({
                    selector: "r-textbox",
                    options: {
                        name: columnName,
                        value: columnName,
                        id: columnName,
                        type: DataSourceTypes.Column,
                        className: TEXTBOX_CLASSNAME,
                        editClassName: TEXTBOX_EDIT_CLASSNAME,
                        level: "top",
                        removable: true
                    }
                });
            }
            else if (this.mode === ActionModes.Edit) {
                currentColumns.forEach((column: IGridColumn) => {
                    if (column.dataField === columnName) {
                        column.visible = true;
                    }
                    if (column.dataField === this.overlayOptions.orginalName) {
                        column.visible = false;
                    }
                });
                currentDSColumns.forEach((item: RTextbox) => {
                    if (item.options.name === this.overlayOptions.orginalName) {
                        item.options.name = columnName;
                        item.options.value = columnName;
                        item.options.id = columnName;
                    }
                });
            }

            this.options.children[this.overlayOptions.wdgIndex].options.columns = currentColumns;
            this.options.editorOptions.children[this.overlayOptions.editorIndex].children = currentDSColumns;

            this.options.children[this.overlayOptions.wdgIndex].editorOptions.columns = currentColumns;
            this.options.children[this.overlayOptions.wdgIndex].editorOptions.editorColumns = currentDSColumns;

            this.overlay.hide();
        }
    }

    setClassficationDetails(classificationName: string): void {
        this.overlayOptions.type = DataSourceTypes.Classification;
        this.overlayOptions.tempTitle = "Select Classfication";
        this.overlayOptions.classification = classificationName;
        this.formGroup = new FormGroup({});
        this.overlayOptions.title = `Edit ${classificationName}`;
        this.overlayOptions.secondary = {
            hasBack: true,
            children: [
                {
                    selector: "r-radiogroup",
                    options: {
                        value: this.order,
                        name: "Order",
                        caption: "Order",
                        dataSource: ["Ascending", "Dscending"],
                        form: this.formGroup
                    }
                }
            ]
        }
    }

    onListChange(obj) {
        if (!obj || !obj.value) {
            return;
        }
        if (this.overlayOptions.type === DataSourceTypes.Classification) {
            this.setClassficationDetails(obj.value);
        }
        else if (this.overlayOptions.type === DataSourceTypes.Column) {
            this.setColumnDetails(obj.value);
        }
        else if (this.overlayOptions.type === DataSourceTypes.Serie) {
            this.setSeriesDetails(obj.value);
        }
        else if (this.overlayOptions.type === DataSourceTypes.Category) {
            this.setCategoryDetails(obj.value);
        }
    }

    resortColumn() {
        let orders: Array<any> = this.tOptions.column.children.map((item: any) => {
            return item.options.name;
        });
        this.columns.sort((a: IGridColumn, b: IGridColumn): number => {
            return orders.indexOf(a.dataField) - orders.indexOf(b.dataField);
        });
        this.options.children[0].options.columns = this.columns;
    }

    onAfterHide() {
        this.overlayOptions = {
            title: "",
            tempTitle: "",
            type: "",
            column: "",
            classification: "",
            items: [],
            secondary: {
                children: []
            }
        };
        this.selectedListItem = null;
    }

    onBackToList() {
        if (this.overlayOptions.items.length === 0) {
            if (this.overlayOptions.type === DataSourceTypes.Classification) {
                this.addClassficationItems();
            }
            else if (this.overlayOptions.type === DataSourceTypes.Column) {
                this.addColumnItems(this.overlayOptions.wdgIndex);
            }
            this.overlayOptions.items = this.overlayPanelItems;
        }
        this.overlayOptions.title = this.overlayOptions.tempTitle;
        this.overlayOptions.secondary.children = [];
        this.overlayOptions.column = "";
        this.overlayOptions.classification = "";
        this.selectedListItem = null;
    }

    onFetchData(type: string): Array<any> {
        if (type === Classifications.AssetClass) {
            return appraisalData.filter((item: any) => item[Classifications.SecurityType] === "" && item[Classifications.Security] === "");
        } else if (type === Classifications.SecurityType) {
            return appraisalData.filter((item: any) => item[Classifications.SecurityType] !== "" && item[Classifications.Security] === "");
        } else if (type === Classifications.Security) {
            return appraisalData.filter((item: any) => item[Classifications.Security] !== "");
        }
        return [];
    }

    onSave() {
        if (this.overlayOptions.type === DataSourceTypes.Classification) {
            let { Order } = this.formGroup.getRawValue();
            this.order = Order;
            this.addClassification(this.overlayOptions.classification, this.mode, Order, false);

            this.options.children[this.overlayOptions.wdgIndex].options.data = this.gridData;
            this.options.children[this.overlayOptions.wdgIndex].options.columns = this.columns;
            this.options.children[this.overlayOptions.wdgIndex].options.summaries = this.summaries;
            this.options.children[this.overlayOptions.wdgIndex].options.groupSummaries = this.groupSummaries;
            this.options.editorOptions.children[this.overlayOptions.editorIndex].children = this.dsClassifications;

            this.options.children[this.overlayOptions.wdgIndex].editorOptions.data = this.gridData;
            this.options.children[this.overlayOptions.wdgIndex].editorOptions.columns = this.columns;
            this.options.children[this.overlayOptions.wdgIndex].editorOptions.dsClassifications = this.dsClassifications;
            this.options.children[this.overlayOptions.wdgIndex].editorOptions.summaries = this.summaries;
            this.options.children[this.overlayOptions.wdgIndex].editorOptions.groupSummaries = this.groupSummaries;
            this.options.children[this.overlayOptions.wdgIndex].editorOptions.pristineData = this.pristineData;
        }
        else if (this.overlayOptions.type === DataSourceTypes.Column) {
            let currentColumns: IGridColumn[] = this.options.children[this.overlayOptions.wdgIndex].editorOptions.columns;
            let currentDSColumns: RTextbox[] = this.options.children[this.overlayOptions.wdgIndex].editorOptions.editorColumns;
            let data: any[] = this.options.children[this.overlayOptions.wdgIndex].editorOptions.data;
            let pristineData: any[] = this.options.children[this.overlayOptions.wdgIndex].editorOptions.pristineData;
            let currentSummaries: any[] = this.options.children[this.overlayOptions.wdgIndex].editorOptions.summaries;
            let currentGroupSummaries: any[] = this.options.children[this.overlayOptions.wdgIndex].editorOptions.groupSummaries;

            if (this.mode === ActionModes.Add) {
                let { AsDate, Currency } = this.formGroup.getRawValue();
                let newValue: string = `Market Value(${AsDate})`;

                let columnx: IGridColumn = currentColumns.find((column: IGridColumn) => column.dataField === newValue);
                if (columnx) {
                    currentColumns.forEach((column: IGridColumn) => {
                        if (column.dataField === newValue) {
                            column.visible = true;
                        }
                    });

                } else {
                    let column: IGridColumn = {};
                    column.dataField = newValue;
                    column.caption = newValue;
                    column.visible = true;
                    column.allowShowInMenu = false;
                    this.initNumberColumn(column, newValue);
                    currentColumns.push(column);

                    data.forEach((item: any) => {
                        item[newValue] = item[this.overlayOptions.column] * 0.8;
                    });

                    pristineData.forEach((item: any) => {
                        item[newValue] = item[this.overlayOptions.column] * 0.8;
                    });
                }
                currentDSColumns.push({
                    selector: "r-textbox",
                    options: {
                        name: newValue,
                        value: newValue,
                        id: newValue,
                        type: "column",
                        className: "tb",
                        editClassName: "tb-edit",
                        level: "top",
                        removable: true
                    }
                });
                this.mvDate = AsDate;
                this.mvCurrency = Currency;
            }

            else if (this.mode === ActionModes.Edit) {
                if (this.overlayOptions.grouped) {
                    let GroupName = this.formGroup.getRawValue()[this.overlayOptions.column];
                    this.columns.map((column: IGridColumn) => {
                        if (column.dataField === this.overlayOptions.column) {
                            column.visible = true;
                            column.caption = GroupName;
                        }
                    });

                    this.dsColumns.forEach((item: any) => {
                        if (item.options.name === this.overlayOptions.column) {
                            item.options.value = GroupName;
                        }
                    });

                } else {
                    let { AsDate, Currency } = this.formGroup.getRawValue();
                    let newValue: string = `Market Value(${AsDate})`;
                    let newCaption: string = newValue;
                    currentColumns.forEach((column: IGridColumn) => {
                        if (column.dataField === this.overlayOptions.column) {
                            column.visible = true;
                            column.caption = newCaption;
                        }
                    });

                    currentDSColumns.forEach((item: any) => {
                        if (item.options.name === this.overlayOptions.column) {
                            item.options.name = newValue;
                            item.options.value = newValue;
                            item.options.id = newValue;
                        }
                    });
                }
            }

            else if (this.mode === ActionModes.Group) {
                let { GroupName } = this.formGroup.getRawValue();
                let subColumns: IGridColumn[] = [];
                let subTextboxes: any[] = [];
                let indexes: number[] = [];
                let hasGroup: string = "";

                for (let i: number = 0; i < this.groupItems.length; i++) {
                    let columnName: string = this.groupItems[i];
                    let textbox: any = this.dsColumns.find((textbox: any) => textbox.options.name === columnName);
                    if (hasGroup === "" && textbox.options.children && textbox.options.children.length) {
                        hasGroup = columnName;
                        continue;
                    }
                    let column: IGridColumn = this.columns.find((col: IGridColumn) => col.dataField === columnName);
                    if (column) {
                        if (column.subColumns && column.subColumns.length) {
                            subColumns.push(...column.subColumns);
                        } else {
                            subColumns.push(column);
                        }
                        let index: number = this.columns.indexOf(column);
                        this.columns.splice(index, 1);
                    }

                    if (textbox) {
                        if (textbox.options.children && textbox.options.children.length) {
                            subTextboxes.push(...textbox.options.children);
                        } else {
                            subTextboxes.push(textbox);
                        }
                        let index: number = this.dsColumns.indexOf(textbox);
                        indexes.push(index);
                        this.dsColumns.splice(index, 1);
                    }
                }

                subTextboxes.forEach((item: any) => {
                    item.options.className = "sub_tb";
                    item.options.editClassName = "sub_tb-edit";
                    item.options.level = "sub";
                    item.options.parent = `g${GroupName}`;
                });


                if (hasGroup !== "") {
                    this.columns.map((column: IGridColumn) => {
                        if (column.dataField === hasGroup) {
                            column.subColumns.push(...subColumns);
                            column.caption = GroupName;
                            column.dataField = `g${GroupName}`;
                        }
                    });
                    this.dsColumns.map((item: any) => {
                        if (item.options.name === hasGroup) {
                            item.options.children.push(...subTextboxes);
                            item.options.value = GroupName;
                            item.options.name = `g${GroupName}`;
                            item.options.grouped = true;
                        }
                    });

                } else {
                    let column: IGridColumn = {
                        caption: GroupName,
                        dataField: `g${GroupName}`,
                        allowShowInMenu: false,
                        visible: true,
                        alignment: "center",
                        subColumns
                    };
                    this.columns.push(column);

                    let textbox: any = {
                        selector: "r-textbox",
                        options: {
                            name: `g${GroupName}`,
                            value: GroupName,
                            id: GroupName,
                            type: "column",
                            className: "tb",
                            editClassName: "tb-edit",
                            children: subTextboxes,
                            level: "top",
                            grouped: true,
                            removable: true
                        }
                    };
                    this.dsColumns.splice(Math.min(...indexes), 0, textbox);
                }

                this.options.children[0].options.summaries = this.summaries;
                this.options.children[0].options.groupSummaries = this.groupSummaries;
            }

            this.options.children[this.overlayOptions.wdgIndex].options.data = data;
            this.options.children[this.overlayOptions.wdgIndex].options.pristineData = pristineData;
            this.options.children[this.overlayOptions.wdgIndex].options.summaries = currentSummaries;
            this.options.children[this.overlayOptions.wdgIndex].options.groupSummaries = currentGroupSummaries;
            this.options.children[this.overlayOptions.wdgIndex].options.columns = currentColumns;
            this.options.children[this.overlayOptions.wdgIndex].options.dsColumns = currentDSColumns;

            this.options.children[this.overlayOptions.wdgIndex].editorOptions.data = data;
            this.options.children[this.overlayOptions.wdgIndex].editorOptions.columns = currentColumns;
            this.options.children[this.overlayOptions.wdgIndex].editorOptions.dsColumns = currentDSColumns;
            this.options.children[this.overlayOptions.wdgIndex].editorOptions.summaries = currentSummaries;
            this.options.children[this.overlayOptions.wdgIndex].editorOptions.groupSummaries = currentGroupSummaries;
            this.options.children[this.overlayOptions.wdgIndex].editorOptions.pristineData = pristineData;

            this.groupItems = [];

        }
        else if (this.overlayOptions.type === "template") {
            let { Template } = this.formGroup.getRawValue();

            let templates: any = localStorage.getItem("templates") ? JSON.parse(localStorage.getItem("templates")) : null;
            if (!templates) {
                templates = {};
                templates[Template] = this.options;
            } else {
                templates[Template] = this.options;
            }
            localStorage.setItem("templates", JSON.stringify(templates));

            let templateNames: any = localStorage.getItem("templateNames") ? JSON.parse(localStorage.getItem("templateNames")) : null;
            if (!templateNames) {
                templateNames = [];
                templateNames.push(Template);
            } else if (templateNames.indexOf(Template) === -1) {
                templateNames.push(Template);
            }
            localStorage.setItem("templateNames", JSON.stringify(templateNames));
        }

        this.overlay.hide();
        this.onAfterHide();
    }


    onTextboxGroup(event) {
        if (this.groupItems.length < 2) {
            return;
        }
        this.overlayPanelItems = [];
        this.mode = ActionModes.Group;
        this.setGroupDetais();
        this.render2.setStyle(this.eleRef.nativeElement.querySelector(".ui-overlaypanel"), "marginLeft", "-18.2em");
        this.overlay.toggle(event);
    }


    onTextboxSelect(options: ITextBox, level?: string) {
        if (options.selected) {
            this.groupItems.push(options.name);
        } else {
            let index: number = this.groupItems.findIndex((item: string) => item === options.name);
            this.groupItems.splice(index, 1);
        }
    }


    setGroupDetais(value: string = "Group", name: string = "GroupName"): void {
        this.overlayOptions.type = "column";
        this.overlayOptions.column = name;
        this.overlayOptions.grouped = true;
        this.formGroup = new FormGroup({});
        this.overlayOptions.title = "Edit Column Group";
        this.overlayOptions.secondary = {
            hasBack: false,
            children: [
                {
                    selector: "r-textinput",
                    options: {
                        value,
                        name,
                        caption: "Column Group Name",
                        form: this.formGroup
                    }
                }
            ]
        };
    }


    parseGridColumn(type?: string): void {
        // Group by AssetClass, then by SecurityType
        if (type.includes("Table1")) {
            this.addClassification(Classifications.AssetClass);
            this.addClassification(Classifications.SecurityType);
            this.addClassification(Classifications.Security);
        }

        // Group by Asset Class
        else if (type.includes("Table2")) {
            this.addClassification(Classifications.AssetClass);
        }

        // Group by Security Type
        else if (type.includes("Table3")) {
            this.addClassification(Classifications.SecurityType);
        }

        // Group by Security
        else if (type.includes("Table4")) {
            this.addClassification(Classifications.Security);
        }

        this.columns.map((item: IGridColumn) => {
            if (item.visible && !item.isClassification) {
                this.dsColumns.push({
                    selector: "r-textbox",
                    options: {
                        name: item.dataField,
                        value: item.dataField,
                        id: item.dataField,
                        type: "column",
                        className: "tb",
                        editClassName: "tb-edit",
                        level: "top",
                        removable: true
                    }
                });
            }
        });
    }

    parseData(): void {
        this.pristineData.push(...appraisalData);
        for (let i: number = 0; i < appraisalData.length; i++) {
            Object.keys(appraisalData[i]).forEach((key: string) => {
                if (appraisalData[i][key] === "NULL") {
                    appraisalData[i][key] = "";
                }
                else if (!isNaN(appraisalData[i][key])) {
                    appraisalData[i][key] = +appraisalData[i][key];
                }
            })
        }
    }

    onDragEnd(event: any): void {
        let label: string = event.target.innerText;
        if (!label) {
            return;
        }
        this.initGirdColumns();
        this.parseGridColumn(label);
        this.options.children.push({
            selector: "r-grid",
            config: {
                col: 1,
                row: 1,
                sizex: 1,
                sizey: 1,
                minWidth: 400,
                minHeight: 300
            },
            options: {
                columns: this.columns,
                data: this.gridData,
                summaries: this.summaries,
                groupSummaries: this.groupSummaries
            }
        });
        this.classis = classifications;
        this.columnItems.push(...this.columns);

        this.gridMenu.hide();
    }

    addClassification(type: string, mode: string = ActionModes.Add, order: string = "Ascending", isInitial: boolean = true) {
        if (!isInitial) {
            this.dsClassifications = this.options.editorOptions.children[this.overlayOptions.editorIndex].children;
            this.pristineData = this.options.children[this.overlayOptions.wdgIndex].editorOptions.pristineData;
            this.gridData = this.options.children[this.overlayOptions.wdgIndex].editorOptions.data;
            this.columns = this.options.children[this.overlayOptions.wdgIndex].editorOptions.columns;
            this.summaries = this.options.children[this.overlayOptions.wdgIndex].editorOptions.summaries;
            this.groupSummaries = this.options.children[this.overlayOptions.wdgIndex].editorOptions.groupSummaries;
        } else {
            this.pristineData = appraisalData;
        }

        let isExisted: RTextbox = this.dsClassifications.find((tx: RTextbox) => type === tx.options.name);
        if (isExisted && mode === ActionModes.Add) {
            return;
        }
        if (isExisted && mode === ActionModes.Edit) {
            this.pristineData.sort((a: any, b: any): number => {
                return order === "Ascending" ? (a[type] < b[type] ? -1 : 1) : (a[type] < b[type] ? 1 : -1);
            });
            if (this.dsClassifications.length === 1) {
                this.gridData = this.onFetchData(type);
            } else {
                this.gridData = this.onFetchData(Classifications.Security);
            }
            return;
        }

        let orginalIndex: number = 1;

        if (mode === ActionModes.Add) {
            this.columns.map((col: IGridColumn) => {
                if (col.dataField === type) {
                    col.visible = true;
                    col.groupIndex = -1;
                    col.caption = Caption;
                }
                if (col.isClassification && col.dataField !== type) {
                    col.visible = false;
                    col.groupIndex = this.dsClassifications.findIndex((tx: RTextbox) => col.dataField === tx.options.name);
                }
            });
        }

        else if (mode === ActionModes.Edit) {
            this.columns.map((col: IGridColumn) => {
                if (col.dataField === this.overlayOptions.orginalName) {
                    col.visible = false;
                    col.groupIndex = -1;
                }
                if (col.dataField === type) {
                    col.visible = true;
                    orginalIndex = this.dsClassifications.findIndex((tx: RTextbox) => this.overlayOptions.orginalName === tx.options.name);
                    col.groupIndex = (orginalIndex || this.dsClassifications.length === 1) ? -1 : 0;
                    col.caption = (orginalIndex || this.dsClassifications.length === 1) ? Caption : col.caption;
                }
            });
        }

        this.summaries.map((sum: IGridColumnSummary) => {
            if (sum.customizeText === customizeSummaryText && (orginalIndex || this.dsClassifications.length === 1)) {
                sum.column = type;
            }
        });

        this.groupSummaries.map((sum: IGridColumnSummary) => {
            if (sum.customizeText === customizeGroupText && (orginalIndex || this.dsClassifications.length === 1)) {
                sum.column = type;
            }
        });

        this.pristineData.sort((a: any, b: any): number => {
            return order === "Ascending" ? (a[type] < b[type] ? -1 : 1) : (a[type] < b[type] ? 1 : -1);
        });

        if (mode === ActionModes.Add) {
            if (this.dsClassifications.length === 0) {
                this.gridData = this.onFetchData(type);
            } else {
                this.gridData = this.onFetchData(Classifications.Security);
            }

            this.dsClassifications.push({
                selector: "r-textbox",
                options: {
                    name: type,
                    value: type,
                    type: DataSourceTypes.Classification,
                    className: TEXTBOX_CLASSNAME,
                    editClassName: TEXTBOX_EDIT_CLASSNAME,
                    removable: true
                }
            });
        }
        else if (mode === ActionModes.Edit) {
            if (this.dsClassifications.length === 1) {
                this.gridData = this.onFetchData(type);
            } else {
                this.gridData = this.onFetchData(Classifications.Security);
            }

            this.dsClassifications.map((item: RTextbox) => {
                if (item.options.name === this.overlayOptions.orginalName) {
                    item.options.name = this.overlayOptions.classification;
                    item.options.value = this.overlayOptions.classification;
                }
            });
        }
    }

    removeClassification(textboxEvent: TextboxEvent) {
        let removedTextboxName: string = textboxEvent.textbox.name;
        let wdgIndex: number = textboxEvent.editor.wdgIndex;
        let editorIndex: number = textboxEvent.index;
        let remainType: string = "";

        this.dsClassifications = this.options.editorOptions.children[editorIndex].children;
        this.gridData = this.options.children[wdgIndex].editorOptions.data;
        this.columns = this.options.children[wdgIndex].editorOptions.columns;
        this.summaries = this.options.children[wdgIndex].editorOptions.summaries;
        this.groupSummaries = this.options.children[wdgIndex].editorOptions.groupSummaries;

        this.columns.map((col: IGridColumn) => {
            if (col.isClassification) {
                if (this.dsClassifications.length === 1) {
                    col.groupIndex = -1;
                    col.caption = col.dataField;
                    col.visible = true;
                    remainType = Classifications.AssetClass;
                }
                else {
                    if (col.dataField === removedTextboxName) {
                        col.groupIndex = -1;
                        col.caption = removedTextboxName;
                        col.visible = false;
                    }
                    else {
                        let removedIndex: number = this.dsClassifications.findIndex((tx: RTextbox) => tx.options.name === removedTextboxName);
                        let index: number = this.dsClassifications.findIndex((tx: RTextbox) => tx.options.name === col.dataField);
                        if (this.dsClassifications.length === 2) {
                            col.groupIndex = -1;
                            col.caption = index > -1 ? Caption : col.dataField;
                            col.visible = index > -1;
                            if (index > -1) {
                                remainType = col.dataField;
                            }
                        }
                        if (this.dsClassifications.length === 3) {
                            if (removedIndex === 0) {
                                if (index === 1) {
                                    col.groupIndex = 0;
                                    col.caption = col.dataField;
                                    col.visible = false;
                                }
                                if (index === 2) {
                                    col.groupIndex = -1;
                                    col.caption = Caption;
                                    col.visible = true;
                                    remainType = col.dataField;
                                }
                            }

                            if (removedIndex === 1) {
                                if (index === 2) {
                                    col.groupIndex = -1;
                                    col.caption = Caption;
                                    col.visible = true;
                                    remainType = col.dataField;
                                }
                            }

                            if (removedIndex === 2) {
                                if (index === 1) {
                                    col.groupIndex = -1;
                                    col.caption = Caption;
                                    col.visible = true;
                                    remainType = col.dataField;
                                }
                            }
                        }
                    }
                }
            }
        });

        this.summaries.map((sum: IGridColumnSummary) => {
            if (sum.customizeText === customizeSummaryText) {
                sum.column = remainType;
            }
        });

        this.groupSummaries.map((sum: IGridColumnSummary) => {
            if (sum.customizeText === customizeGroupText) {
                sum.column = remainType;
            }
        })

        this.dsClassifications = this.dsClassifications.filter((tx: RTextbox) => tx.options.name !== removedTextboxName);
        if (this.dsClassifications.length === 1) {
            this.gridData = this.onFetchData(remainType);
        } else {
            this.gridData = this.onFetchData(Classifications.Security);
        }
    }

    reorderClassification() {
        let orders: Array<string> = this.tOptions.classic.children.map((tx: RTextbox) => {
            return tx.options.name;
        });
        let currentType: string = Classifications.AssetClass;
        this.columns.map((col: IGridColumn) => {
            if (col.isClassification) {
                if (orders.length === 2) {
                    if (col.dataField === orders[0]) {
                        col.groupIndex = 0;
                        col.caption = col.dataField;
                        col.visible = false;
                    }
                    else if (col.dataField === orders[1]) {
                        col.groupIndex = -1;
                        col.caption = Caption;
                        col.visible = true;
                        currentType = col.dataField;
                    }
                }
                if (orders.length === 3) {
                    if (col.dataField === orders[0]) {
                        col.groupIndex = 0;
                        col.caption = col.dataField;
                        col.visible = false;
                    }
                    else if (col.dataField === orders[1]) {
                        col.groupIndex = 1;
                        col.caption = col.dataField;
                        col.visible = false;
                    }
                    else if (col.dataField === orders[2]) {
                        col.groupIndex = -1;
                        col.caption = Caption;
                        col.visible = true;
                        currentType = col.dataField;
                    }
                }
            }

        });
        this.summaries.map((sum: IGridColumnSummary) => {
            if (sum.customizeText === customizeSummaryText) {
                sum.column = currentType;
            }
        });

        this.groupSummaries.map((sum: IGridColumnSummary) => {
            if (sum.customizeText === customizeGroupText) {
                sum.column = currentType;
            }
        });
        this.options.children[0].options.columns = this.columns;
        this.options.children[0].options.summaries = this.summaries;
        this.options.children[0].options.groupSummaries = this.groupSummaries;
    }

    downloadJsReport(type: number = 1, animation: boolean = false): void {
        let request = {
            template: {
                content: `${content1}${this.getChartString(type, animation)}${content2}`,
                //engine: 'none', recipe: 'html-with-browser-client'
                engine: 'none', recipe: 'phantom-pdf'
            }
        };
        JsReport.download("perfomance.pdf", request);
    }

    generateJsReport(type: number = 1, animation: boolean = true): void {
        document.getElementById("reportPlaceholder").innerHTML = "";
        let request = {
            template: {
                content: `${content1}${this.getChartString(type, animation)}${content2}`,
                engine: 'none', recipe: 'html-with-browser-client'
                //engine: 'none', recipe: 'phantom-pdf'
            }
        };

        //display report in the new tab
        //JsReport.render('_self', request);

        //display report in placeholder with id reportPlaceholder
        //JsReport.render('reportPlaceholder', request);

        //display report in placeholder element
        JsReport.render(document.getElementById('reportPlaceholder'), request);

        //open download dialog for report
        //JsReport.download('myReport.pdf', request);
    }

    getChartString(chartType: ChartLibType = ChartLibType.HighCharts, animation: boolean): string {
        let baseScript: string = `
            <script src="https://code.highcharts.com/highcharts.src.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
            <script src="https://cdn.bootcss.com/echarts/3.8.5/echarts.min.js"></script>
            <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.18/c3.min.js"></script>
            </head>
            <body>
        `;
        let chartString: string = "";
        if (chartType === ChartLibType.HighCharts) {
            chartString = `
            <div>
                <div id="chart.0" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.1" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.2" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.3" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <img src="http://img3.iqilu.com/data/attachment/forum/201403/20/063249zta7zntigk7itk2t.jpg" style="margin: 0 auto;">
            </div>
            <script>
                Highcharts.chart('chart.0', {
                    title: {
                        text: "HighCharts - Pie"
                    },
                    chart: {
                        type: 'pie'
                    },
                    series: [
                        {
                            animation: ${animation},
                            data: [
                                {
                                    name: 'Equity',
                                    color: 'blue',
                                    y: 9911045
                                },
                                {
                                    name: 'Fixed Income',
                                    color: 'yellow',
                                    y: 6447356
                                },
                                {
                                    name: 'Cash',
                                    color: 'red',
                                    y: 1586467
                                }
                            ]
                        }
                    ]
                });

                Highcharts.chart('chart.1', {
                    title: {
                        text: "HighCharts - HorizontalBar"
                    },
                    chart: {
                        type: 'bar',
                    },
                    series: [
                        {
                            animation: ${animation},
                            data: [
                                {
                                    name: 'Equity',
                                    color: 'blue',
                                    y: 9911045
                                }, 
                                {
                                    name: 'Fixed Income',
                                    color: 'yellow',
                                    y: 6447356
                                }, 
                                {
                                    name: 'Cash',
                                    color: 'red',
                                    y: 1586467
                                }
                            ]
                        }
                    ]
                });

                Highcharts.chart('chart.2', {
                    title: {
                        text: "HighCharts - Bar"
                    },
                    chart: {
                        type: 'column',
                    },
                    series: [
                        {
                            animation: ${animation},
                            data: [
                                {
                                    name: 'Equity',
                                    color: 'blue',
                                    y: 9911045
                                }, 
                                {
                                    name: 'Fixed Income',
                                    color: 'yellow',
                                    y: 6447356
                                }, 
                                {
                                    name: 'Cash',
                                    color: 'red',
                                    y: 1586467
                                }
                            ]
                        }
                    ]
                });

                Highcharts.chart('chart.3', {
                    title: {
                        text: "HighCharts - Line"
                    },
                    chart: {
                        type: 'line',
                    },
                    series: [
                        {
                            animation: ${animation},
                            data: [
                                {
                                    name: 'Equity',
                                    color: 'blue',
                                    y: 9911045
                                }, 
                                {
                                    name: 'Fixed Income',
                                    color: 'yellow',
                                    y: 6447356
                                }, 
                                {
                                    name: 'Cash',
                                    color: 'red',
                                    y: 1586467
                                }
                            ]
                        }
                    ]
                });

                // var imgs = document.getElementsByTagName("img");
                // console.info(imgs[0]);
                // var canvas = document.createElement("canvas");
                // canvas.width = imgs[0].width;
                // canvas.height = imgs[0].height;
                // var ctx = canvas.getContext("2d");
                // ctx.drawImage(imgs[0], 0, 0);
                // var dataURL = canvas.toDataURL("assets/timg.jpg");
                // console.warn(dataURL);
            </script>
            `;
        }
        else if (chartType === ChartLibType.ChartJS) {
            chartString = `
                <canvas id="chart.4" style="height: 400px; max-width: 800px; margin: 10px auto" width="600" height="400"></canvas>
                <canvas id="chart.5" style="height: 400px; max-width: 800px; margin: 10px auto" width="600" height="400"></canvas>
                <canvas id="chart.6" style="height: 400px; max-width: 800px; margin: 10px auto" width="600" height="400"></canvas>
                <canvas id="chart.7" style="height: 400px; max-width: 800px; margin: 10px auto" width="600" height="400"></canvas>
                <script>
                    var ctx1 = document.getElementById("chart.4").getContext('2d');
                    var barChart = new Chart(ctx1, {
                        type: 'bar',
                        data: {
                            labels: ["Fixed Income", "Equity", "Cash"],
                            datasets: [{
                                label: '#ChartJS - Bar',
                                data: [12, 19, 3],
                                backgroundColor: ['yellow', 'blue', 'red'],
                                borderColor: ['yellow', 'blue', 'red'],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero:true
                                    }
                                }]
                            },
                            animation: {
                                duration: ${animation ? 1000 : 0}
                            }
                        }
                    });
            
                    var ctx2 = document.getElementById("chart.5").getContext('2d');
                    var pieChart = new Chart(ctx2, {
                        type: 'pie',
                        data: {
                            labels: ["Fixed Income", "Equity", "Cash"],
                            datasets: [{
                                label: '#ChartJS - Pie',
                                data: [12, 19, 3],
                                backgroundColor: ['yellow', 'blue', 'red'],
                                borderColor: ['yellow', 'blue', 'red'],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            animation: {
                                duration: ${animation ? 1000 : 0}
                            }
                        }
                    });
            
                    var ctx3 = document.getElementById("chart.6").getContext('2d');
                    var lineChart = new Chart(ctx3, {
                        type: 'line',
                        data: {
                            labels: ["Fixed Income", "Equity", "Cash"],
                            datasets: [{
                                label: '#ChartJS - Line',
                                data: [12, 19, 3]
                            }]
                        },
                        options: {
                            animation: {
                                duration: ${animation ? 1000 : 0}
                            }
                        }
                    });
            
                    var ctx4 = document.getElementById("chart.7").getContext('2d');
                    var hBarChart = new Chart(ctx4, {
                        type: 'horizontalBar',
                        data: {
                            labels: ["Fixed Income", "Equity", "Cash"],
                            datasets: [{
                                label: 'ChartJS - Horizontal Bar',
                                data: [12, 19, 3],
                                backgroundColor: ['yellow', 'blue', 'red'],
                                borderColor: ['yellow', 'blue', 'red'],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero:true
                                    }
                                }]
                            },
                            animation: {
                                duration: ${animation ? 1000 : 0}
                            }
                        }
                    });
                </script>
            `;
        }
        else if (chartType === ChartLibType.ECharts) {
            chartString = `
                <div id="chart.8" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.9" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.10" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.11" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <script>
                    var ctx5 = echarts.init(document.getElementById('chart.8'));
                    ctx5.setOption({
                        title: {
                            text: 'ECharts - Bar'
                        },
                        animation: ${animation},
                        tooltip: {},
                        legend: {
                            data:['2015', '2016', '2017']
                        },
                        xAxis: {
                            data: ['Fixed Income', 'Equity', 'Cash']
                        },
                        yAxis: {},
                        series: [
                            {
                                name: "2015",
                                type: 'bar',
                                data: [12, 19, 3]
                            },
                            {
                                name: "2016",
                                type: 'bar',
                                data: [18, 12, 20]
                            },
                            {
                                name: "2017",
                                type: 'bar',
                                data: [6, 23, 16]
                            }
                        ]
                    });
            
                    var ctx6 = echarts.init(document.getElementById('chart.9'));
                    ctx6.setOption({
                        title: {
                            text: 'ECharts - HorizontalBar'
                        },
                        animation: ${animation},
                        colors: ['yellow', 'blue', 'red'],
                        tooltip: {},
                        legend: {
                            data:['2015', '2016', '2017']
                        },
                        xAxis: {
                            
                        },
                        yAxis: {
                            data: ['Fixed Income', 'Equity', 'Cash']
                        },
                        series: [
                            {
                                name: "2015",
                                type: 'bar',
                                data: [12, 19, 3]
                            },
                            {
                                name: "2016",
                                type: 'bar',
                                data: [18, 12, 20]
                            },
                            {
                                name: "2017",
                                type: 'bar',
                                data: [6, 23, 16]
                            }
                        ]
                    });
            
                    var ctx7 = echarts.init(document.getElementById('chart.10'));
                    ctx7.setOption({
                        title: {
                            text: 'ECharts - Pie'
                        },
                        animation: ${animation},
                        tooltip: {},
                        legend: {
                            data:['Fixed Income', 'Equity', 'Cash']
                        },
                        series: [{
                            type: 'pie',
                            radius : '65%',
                            center: ['50%', '50%'],
                            data: [
                                {
                                    name: "Fixed Income",
                                    value: 12
                                },
                                {
                                    name: "Equity",
                                    value: 19
                                },
                                {
                                    name: "Cash",
                                    value: 3
                                }
                            ]
                        }]
                    });
            
                    var ctx8 = echarts.init(document.getElementById('chart.11'));
                    ctx8.setOption({
                        title: {
                            text: 'ECharts - Line'
                        },
                        animation: ${animation},
                        tooltip: {},
                        legend: {
                            data:['Fixed Income', 'Equity', 'Cash']
                        },
                        xAxis: {
                            data: ['Fixed Income', 'Equity', 'Cash']
                        },
                        yAxis: {
                            
                        },
                        series: [
                            {
                                type: 'line',
                                data: [12, 19, 3]
                            }
                        ]
                    });
                </script>
            `;
        }
        else if (chartType === ChartLibType.PlotyJS) {
            chartString = `
                <div id="chart.12" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.13" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.14" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <div id="chart.15" style="height: 400px; max-width: 800px; margin: 0 auto"></div>
                <script>
                    Plotly.plot("chart.12", [
                        {
                            x: ['Fixed Income', 'Equity', 'Cash'],
                            y: [12, 19, 3],
                            type: "bar"
                        }
                    ]);
                
                    Plotly.plot("chart.13", [
                        {
                            y: ['Fixed Income', 'Equity', 'Cash'],
                            x: [12, 19, 3],
                            type: "bar",
                            orientation: 'h'
                        }
                    ]);
                
                    Plotly.plot("chart.14",  [
                        {
                            labels: ['Fixed Income', 'Equity', 'Cash'],
                            values: [12, 19, 3],
                            type: "pie"
                        }
                    ]);
                
                    Plotly.plot("chart.15",  [
                        {
                            x: ['Fixed Income', 'Equity', 'Cash'],
                            y: [12, 19, 3],
                            type: "scatter"
                        },
                        {
                            x: ['Fixed Income', 'Equity', 'Cash'],
                            y: [20, 7, 17],
                            type: "scatter"
                        }
                    ]);
                </script>
            `;
        }
        return `${baseScript}${chartString}`;
    }

}

function customizeGroupText(item) {
    return "Total Group";
}

function customizeSummaryText() {
    return "Total Portfolio";
}

function customizeSummaryResult(item) {
    return parseNumber(item && item.value);
}




