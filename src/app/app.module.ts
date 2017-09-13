import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiselectDropdownModule } from 'angular2-dropdown-multiselect';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CdkTableModule } from '@angular/cdk';
import { GridModule } from '@progress/kendo-angular-grid';
import { TagInputModule } from 'ngx-chips';
import { ResizableModule } from 'angular-resizable-element';
import { DragulaModule } from 'ng2-dragula';

import { 
  MdTableModule, 
  MdInputModule, 
  MdPaginatorModule, 
  MdSortModule 
} from '@angular/material';

import {
  TreeModule,
  MenuModule,
  DataTableModule,
  SharedModule,
  InputTextModule,
  DragDropModule,
  SlideMenuModule,
  OverlayPanelModule,
  ListboxModule,
  DropdownModule,
  CalendarModule,
  ButtonModule
} from 'primeng/primeng';

import {
  DxDataGridModule,
  DxTextBoxModule,
  DxDropDownBoxModule,
  DxSelectBoxModule,
  DxDateBoxModule,
  DxMenuModule,
  DxRadioGroupModule
} from 'devextreme-angular';

import { AppComponent } from './app.component';
import { TextAreaExpandedComponent } from './textarea-expanded.component';
import { TableComponent } from './table.component';
import { PortfolioComponent } from './portfolio.component';
import { FormTestComponent } from './form-test.component';
import { DropdownTestComponent } from './dropdown-test.component';
import { ReportingComponent } from './reporting.component';
import { ReportingGridComponent } from './reporting-grid.component';
import { 
  ReportingTextboxComponent , 
  ReportingDatepickerComponent, 
  ReportingDropdownComponent,
  ReportingRadioGroupComponent,
  ReportingTextinputComponent
} from './reporting-textbox.component';

import { CategoriesService } from './portfolio.service';

@NgModule({
  declarations: [
    AppComponent,
    TextAreaExpandedComponent,
    TableComponent,
    PortfolioComponent,
    FormTestComponent,
    DropdownTestComponent,
    ReportingComponent,
    ReportingGridComponent,
    ReportingTextboxComponent,
    ReportingDatepickerComponent, 
    ReportingDropdownComponent,
    ReportingRadioGroupComponent,
    ReportingTextinputComponent
  ],
  exports: [
    TextAreaExpandedComponent,
    TableComponent,
    PortfolioComponent,
    FormTestComponent,
    DropdownTestComponent,
    ReportingComponent,
    ReportingGridComponent,
    ReportingTextboxComponent,
    ReportingDatepickerComponent, 
    ReportingDropdownComponent,
    ReportingRadioGroupComponent,
    ReportingTextinputComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MultiselectDropdownModule,
    CdkTableModule,
    MdTableModule,
    MdInputModule,
    MdPaginatorModule,
    MdSortModule,
    NgxDatatableModule,
    GridModule,
    OverlayPanelModule,
    TagInputModule,
    ButtonModule,
    ListboxModule,
    TreeModule,
    MenuModule,
    DropdownModule,
    CalendarModule,
    DataTableModule,
    SharedModule,
    InputTextModule,
    ResizableModule,
    DragDropModule,
    DxDataGridModule,
    DxTextBoxModule,
    DxRadioGroupModule,
    DragulaModule
  ],
  providers: [CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
