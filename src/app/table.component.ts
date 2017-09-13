import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { MdPaginator, MdSort } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'my-table',
    template: `
    <div class="mytable mat-elevation-z8">
        <div class="myheader">
            <md-input-container floatPlaceholder="never">
                <input mdInput #filter placeholder="Filter portfolios">
            </md-input-container>
        </div>
        <md-table #table [dataSource]="dataSource">
            <ng-container cdkColumnDef="reportCode">
                <md-header-cell *cdkHeaderCellDef> Report Code </md-header-cell>
                <md-cell *cdkCellDef="let row"> {{row.reportCode}} </md-cell>
            </ng-container>
            <ng-container cdkColumnDef="reportHeading">
                <md-header-cell *cdkHeaderCellDef> Report Heading </md-header-cell>
                <md-cell *cdkCellDef="let row"> {{row.reportHeading}} </md-cell>
            </ng-container>
            <md-header-row *cdkHeaderRowDef="displayedColumns"></md-header-row>
            <md-row *cdkRowDef="let row; columns: displayedColumns;"></md-row>
        </md-table>
        <md-paginator #paginator
                [length]="shaneDatabase.data.length"
                [pageIndex]="0"
                [pageSize]="25"
                [pageSizeOptions]="[5, 10, 25, 100]">
        </md-paginator>
    </div>
    `,
    styles: [
        `
        .mytable {
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            height: 600px;
            max-width: 800px;
            min-width: 300px;
        }

        .myheader {
            min-height: 64px;
            display: flex;
            align-items: center;
            padding-left: 24px;
            font-size: 20px;
        }

        .mat-table {
            overflow: auto;
        }

        .mat-header-cell .mat-sort-header-sorted {
            color: black;
        }

        `
    ]
})

export class TableComponent implements OnInit {
    @ViewChild("filter") filter: ElementRef;
    @ViewChild(MdPaginator) paginator: MdPaginator;
    @ViewChild(MdSort) sort: MdSort;

    displayedColumns = ['reportCode', 'reportHeading'];
    shaneDatabase = new ShaneDatabase();
    dataSource: ShaneDataSource | null;

    cols = [
        {
            fieldId: "reportCode",
            fieldName: "Report Code",
            key: "reportCode"
        },
        {
            fieldId: "reportHeading",
            fieldName: "Report Heading",
            key: "reportHeading"
        }
    ];

    constructor() { }

    ngOnInit() {
        this.dataSource = new ShaneDataSource(this.shaneDatabase, this.paginator);
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) {
                    return
                }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }
}

export const CODES = ['maroon', '@red', '@orange', 'yellow', 'olive', '+&green', 'purple',
    'fuchsia', 'lime', 'teal', '+@aqua', '+@blue', '+&navy', 'black', 'gray'];
export const HEADINGS = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
    'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
    'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface Portfolio {
    reportCode: string;
    reportHeading: string;
}

export class ShaneDatabase {
    dataChange: BehaviorSubject<Portfolio[]> = new BehaviorSubject<Portfolio[]>([]);

    get data(): Portfolio[] {
        return this.dataChange.value;
    }

    constructor() {
        for (let i = 0; i < 10000; i++) {
            this.addPortfolio();
        }
    }

    addPortfolio() {
        const copiedData = this.data.slice();
        copiedData.push(createPortfolio());
        this.dataChange.next(copiedData);
    }
}

export function createPortfolio(): any {
    const code = CODES[Math.round(Math.random() * (CODES.length - 1))] + Math.round(Math.random() * 100) + HEADINGS[Math.round(Math.random() * (HEADINGS.length - 1))];
    const heading = HEADINGS[Math.round(Math.random() * (HEADINGS.length - 1))] + " " + HEADINGS[Math.round(Math.random() * (HEADINGS.length - 1))];
    return {
        reportCode: code,
        reportHeading: heading
    };
}

export class ShaneDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');

    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    constructor(
        private _shaneDatabase: ShaneDatabase,
        private _paginator: MdPaginator) {
        super();
    }

    connect(): Observable<Portfolio[]> {
        const displayDataChanges = [
            this._shaneDatabase.dataChange,
            this._filterChange,
            this._paginator.page,
        ];
        return Observable.merge(...displayDataChanges).map(() => {
            const data = this._shaneDatabase.data.slice();
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            const pageData = data.splice(startIndex, this._paginator.pageSize);

            return pageData.slice().filter((item: Portfolio) => {
                let filter = this.filter.toLowerCase();
                if (filter.startsWith("\"")) {
                    let searchStr = item.reportHeading.toLowerCase();
                    return searchStr.startsWith(filter.slice(1, -1));
                } else {
                    let searchStr = item.reportCode.toLowerCase();
                    return searchStr.startsWith(filter);
                }
            });
        });
    }

    disconnect() { }

    // getSortedData(): Portfolio[] {
    //     const data = this._shaneDatabase.data.slice();
    //     if (!this._sort.active || this._sort.direction == '') { return data; }

    //     return data.sort((a, b) => {
    //         let propertyA: number | string = '';
    //         let propertyB: number | string = '';

    //         switch (this._sort.active) {
    //             case 'reportCode': [propertyA, propertyB] = [a.reportCode, b.reportCode]; break;
    //             case 'reportHeading': [propertyA, propertyB] = [a.reportHeading, b.reportHeading]; break;
    //         }

    //         let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
    //         let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

    //         return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    //     });

}