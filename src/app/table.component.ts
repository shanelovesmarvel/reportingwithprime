import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

    displayedColumns = ['reportCode', 'reportHeading'];

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

