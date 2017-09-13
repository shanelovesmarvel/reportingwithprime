import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent, SelectionEvent } from '@progress/kendo-angular-grid';
import { State, process, filterBy } from '@progress/kendo-data-query';
import { createPortfolio } from './table.component';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { TagInputComponent } from 'ngx-chips';
import { CategoriesService } from './portfolio.service';

@Component({
    selector: 'my-grid',
    template: `
        <div class="row" style="width: 800px; height: 400px;display: inline-flex;">
            <div id="pristineGrid" class="col-xs-12" style="padding: 10px;">
                <tag-input #tagInput
                    [(ngModel)]="selectedItems"
                    [identifyBy]="'reportCode'" 
                    [displayBy]="'reportCode'"
                    [placeholder]="''"
                    [secondaryPlaceholder]="'Add portfolio'"
                    [clearOnBlur]="true"
                    [addOnPaste]="true"
                    [editable]="false"
                    [pasteSplitPattern]="pattern"
                    [hideForm]="false"
                    [blinkIfDupe]="true"
                    [ripple]="false"
                    [dragZone]="'1'"
                    (onAdd)="onAdd($event)"
                    (onBlur)="onBlur($event)"
                    (onKeydown)="onKeyDown($event)"
                    (onPaste)="onPaste($event)"
                    (onTextChange)="onTextChange($event)">
                </tag-input>
                <kendo-grid #grid
                    [data]="pristineItems"
                    [pageSize]="state.take"       
                    [skip]="state.skip"
                    [filter]="state.filter"
                    [filterable]="true"
                    [sortable]="true"
                    [selectable]="true"
                    [scrollable]="'virtual'"
                    [height]="gridHeight"
                    [rowHeight]="rowHeight"
                    (pageChange)="pageChange($event)"
                    (selectionChange)="selectionChange($event)"
                    (dataStateChange)="dataStateChange($event)">

                    <kendo-grid-column field="reportCode" title="Code" width="40%">
                    </kendo-grid-column>
                    <kendo-grid-column field="reportHeading" title="Heading" width="60%">
                    </kendo-grid-column>
                </kendo-grid>
                <span>{{pristineItems.total.toLocaleString()}} items.</span>
                <kendo-grid #grid *ngIf="false"
                    [data]="view | async"
                    [pageSize]="state.take"
                    [skip]="state.skip"
                    [sort]="state.sort"
                    [filter]="state.filter"
                    [filterable]="true"
                    [sortable]="true"
                    [pageable]="true"
                    [selectable]="true"
                    [height]="gridHeight"
                    [rowHeight]="rowHeight"
                    [scrollable]="'virtual'"
                    (pageChange)="pageChange($event)"
                    (dataStateChange)="dataStateChange2($event)">
                        <kendo-grid-column field="CategoryID" width="100"></kendo-grid-column>
                        <kendo-grid-column field="CategoryName" width="200"></kendo-grid-column>
                        <kendo-grid-column field="Description" [sortable]="false">
                        </kendo-grid-column>
                </kendo-grid>
            </div>
        </div>
    `
})

export class PortfolioComponent implements OnInit, AfterViewInit {
    @ViewChild('grid') public grid: GridComponent;
    @ViewChild('tagInput') public tagInput: TagInputComponent;
    pristineItems: GridDataResult = {
        data: [],
        total: 0
    };
    selectedItems: Array<Portfolio> = [];
    filteredItems: Array<Portfolio> = [];
    orginalItems: Array<Portfolio> = [];

    pattern: string = " ";
    isTriggerDataChange: boolean = false;

    state: State = {
        skip: 0,
        take: 10
    };

    pageStart: number = 0;
    pageEnd: number = 10000;
    
    total: number = 0;

    gridHeight: number = 410;
    rowHeight: number = 30;

    items: Array<Portfolio> = [];

    pageable: any = {
        buttonCount: 2,
        info: true,
        pageSizes: false,
        previousNext: true
    };

    public view: Observable<GridDataResult>;

    constructor(private category: CategoriesService) {
    }

    ngOnInit() {
        this.initItems();
        Observable.interval(1000).flatMap(() => {
            return this.getPortfolios();
        }).takeWhile((data: any) =>  {
            return data.total > 0;
        })
        .subscribe((data: any) => {
            this.orginalItems.push(...data.items);
            this.filteredItems.push(...data.items);
            this.loadPristineItems();
        });
    }

    getPortfolios(): Observable<any> {  
        return Observable.of(this.items.slice(this.pageStart, this.pageEnd)).map((data: Array<Portfolio>) => {
            this.pageStart += 10000;
            this.pageEnd += 10000;
            return {
                items: data,
                total: data.length
            };
        });
    }

    ngAfterViewInit(): void {
        this.grid.pageChange
            .debounceTime(500)
            .subscribe((e) => this.pageChange(e));
    }


    dataStateChange(state: DataStateChangeEvent | null): void {
        if (state) {
            this.state = state;
        }
        this.loadPristineItems();
        this.filteredItems = filterBy(this.items, this.state.filter);
    }

    dataStateChange2(state: DataStateChangeEvent | null): void {
        this.state = state;
        this.category.query(state);
    }

    selectionChange({ index, selected }: SelectionEvent): void {
        const iindex: number = this.selectedItems.findIndex((item: Portfolio) => item.reportCode.toLowerCase() === this.filteredItems[index].reportCode.toLowerCase());
        if (selected) {        
            if (iindex === -1) {
                this.selectedItems.push(this.filteredItems[index]);
                this.isTriggerDataChange = true;
                this.tagInput.setInputValue('');
            }
        } else {
            if (iindex !== -1) {
                this.selectedItems.splice(iindex, 1);
            }
        }
    }

    onAdd(tag: any): void {
        if (!tag || !tag.reportCode) {
            return;
        }
        const reportCode = tag.reportCode;
        const hasIndex: number =  this.filteredItems.findIndex((item: Portfolio) => item.reportCode.toLowerCase() === reportCode.toLowerCase());
        if (hasIndex === -1) {
            const iindex: number = this.selectedItems.findIndex((item: Portfolio) => item.reportCode.toLowerCase() === reportCode.toLowerCase());
            this.selectedItems.splice(iindex, 1);
        }
    }

    onBlur(text: string): void {
        if (text === undefined || text === "") {
            return;
        }
        const iindex: number =  this.filteredItems.findIndex((item: Portfolio) => item.reportCode.toLowerCase() === text.toLowerCase());
        if (iindex !== -1) {
            this.selectedItems.push(this.filteredItems[iindex]);
        }
    }

    onPaste(text: string): void {
        console.info(text);
    }

    onTextChange(text: string): void {
        if (text === undefined || text === null || this.isTriggerDataChange) {
            this.isTriggerDataChange = false;
            return;
        }
        let field: string = "";
        let operator: string = "";
        let value: string = "";
        if (text.startsWith("\"")) {
            if (text.endsWith("\"")) {
                const slice: string = text.slice(1, -1);
                operator = slice === "" ? "contains" : "startswith";
                value = slice;
            } else {
                value = text.substring(1);
                operator = "startswith";
            }
            field = "reportHeading";
        } else {
            value = text;
            field = "reportCode";
            operator = value === "" ? "contains" : "startswith";
        }
        if (this.state.filter === undefined) {
            this.state.filter = {
                logic: "and",
                filters: []
            };
            this.state.filter.filters.push({
                field: field,
                operator: operator,
                value: value
            });
        } else {
            let index: number = this.state.filter.filters.findIndex((filter: any) => filter.field === field);
            if (index !== -1) {
                (this.state.filter.filters[index] as any).operator = operator;
                (this.state.filter.filters[index] as any).value = value;
            } else {
                this.state.filter.filters.push({
                    field: field,
                    operator: operator,
                    value: value
                });
            }
        }
        this.state.skip = 0;
        this.dataStateChange(null);
    }

    pageChange({ skip, take }: PageChangeEvent): void {
        this.state.skip = skip;
        this.state.take = take;
        this.loadPristineItems();
    }

    loadPristineItems(): void {
        this.pristineItems = process(this.orginalItems, this.state);
    }

    initItems(): void {
        for (let i = 0; i < 100000; i++) {
            this.items.push(createPortfolio());
        }
    }   
}

export type TagModel = string | {[key: string]: any};

export interface Portfolio {
    reportCode: string;
    reportHeading: string;
}