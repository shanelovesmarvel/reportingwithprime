import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular2-dropdown-multiselect';

@Component({
    selector: 'my-dropdown',
    template: `
    <ss-multiselect-dropdown
          [options]="mdOptions"
          [texts]="mdTexts"
          [settings]="mdSettings"
          [(ngModel)]="mdModel">
      </ss-multiselect-dropdown>
    `
})

export class DropdownTestComponent implements OnInit {
    // Default selection
    mdModel: number[] = [1, 2];

    // Settings configuration
    mdSettings: IMultiSelectSettings = {
        enableSearch: true,
        checkedStyle: 'fontawesome',
        buttonClasses: 'btn btn-default btn-block',
        dynamicTitleMaxItems: 3,
        displayAllSelectedText: true
    };

    // Text configuration
    mdTexts: IMultiSelectTexts = {
        checkAll: 'Select all',
        uncheckAll: 'Unselect all',
        checked: 'item selected',
        checkedPlural: 'items selected',
        searchPlaceholder: 'Find',
        defaultTitle: 'Select',
        allSelected: 'All selected',
    };

    // Labels / Parents
    mdOptions: IMultiSelectOption[] = [
        {
            id: 1,
            name: "Shane",
            isLabel: false
        },
        {
            id: 2,
            name: "Jenny",
            isLabel: false
        },
        {
            id: 3,
            name: "Eric",
            isLabel: false
        },
        {
            id: 4,
            name: "Tom",
            isLabel: false
        },
        {
            id: 5,
            name: "Shane",
            isLabel: false
        }
    ];
    constructor() { }

    ngOnInit() {
        
    }
}