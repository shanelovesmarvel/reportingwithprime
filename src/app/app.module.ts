import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragulaModule } from 'ng2-dragula';
import { NgDraggableWidgetModule } from 'ngx-draggable-widget';


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
  DxRadioGroupModule,
  DxChartModule,
  DxPieChartModule,
  DxTooltipModule
} from 'devextreme-angular';

import { AppComponent } from './app.component';
import { ReportingComponent } from './reporting.component';
import { ReportingChartComponent } from './reporting-chart.component';
import { ReportingEditorComponent } from './reporting-editor.component';
import { ReportingGridComponent } from './reporting-grid.component';

import { 
  ReportingTextboxComponent , 
  ReportingDatepickerComponent, 
  ReportingDropdownComponent,
  ReportingRadioGroupComponent,
  ReportingTextinputComponent
} from './reporting-textbox.component';


@NgModule({
  declarations: [
    AppComponent,
    ReportingComponent,
    ReportingGridComponent,
    ReportingTextboxComponent,
    ReportingDatepickerComponent, 
    ReportingDropdownComponent,
    ReportingEditorComponent,
    ReportingRadioGroupComponent,
    ReportingTextinputComponent,
    ReportingChartComponent
  ],
  exports: [
    ReportingComponent,
    ReportingGridComponent,
    ReportingTextboxComponent,
    ReportingDatepickerComponent, 
    ReportingDropdownComponent,
    ReportingRadioGroupComponent,
    ReportingTextinputComponent,
    ReportingChartComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    OverlayPanelModule,
    ButtonModule,
    ListboxModule,
    TreeModule,
    MenuModule,
    DropdownModule,
    CalendarModule,
    DataTableModule,
    SharedModule,
    InputTextModule,
    DragDropModule,
    DxChartModule,
    DxDataGridModule,
    DxTextBoxModule,
    DxRadioGroupModule,
    DxPieChartModule,
    DxTooltipModule,
    DragulaModule,
    NgDraggableWidgetModule
  ],
  providers: [],
  entryComponents: [ ReportingComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
