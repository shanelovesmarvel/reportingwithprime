import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiselectDropdownModule } from 'angular2-dropdown-multiselect';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { GridModule } from '@progress/kendo-angular-grid';
import { TagInputModule } from 'ngx-chips';
import { ResizableModule } from 'angular-resizable-element';
import { DragulaModule } from 'ng2-dragula';


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

import {
  MatButtonModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { TextAreaExpandedComponent } from './textarea-expanded.component';
import { TableComponent } from './table.component';
import { PortfolioComponent } from './portfolio.component';
import { FormTestComponent } from './form-test.component';
import { DropdownTestComponent } from './dropdown-test.component';
import { ReportingComponent } from './reporting.component';
import { ReportingGridComponent } from './reporting-grid.component';
import { ReportingFieldsetComponent } from './reporting-fieldset.component';
import { SetSeatComponent } from './seat.component';

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
    PortfolioComponent,
    FormTestComponent,
    DropdownTestComponent,
    ReportingComponent,
    ReportingGridComponent,
    ReportingTextboxComponent,
    ReportingDatepickerComponent, 
    ReportingDropdownComponent,
    ReportingRadioGroupComponent,
    ReportingTextinputComponent,
    ReportingFieldsetComponent,
    SetSeatComponent
  ],
  exports: [
    TextAreaExpandedComponent,
    PortfolioComponent,
    FormTestComponent,
    DropdownTestComponent,
    ReportingComponent,
    ReportingGridComponent,
    ReportingTextboxComponent,
    ReportingDatepickerComponent, 
    ReportingDropdownComponent,
    ReportingRadioGroupComponent,
    ReportingTextinputComponent,
    ReportingFieldsetComponent,
    SetSeatComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MultiselectDropdownModule,
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
    DragulaModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [CategoriesService],
  entryComponents: [ ReportingComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
