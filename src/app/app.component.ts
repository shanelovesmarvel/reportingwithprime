import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
    <div style="overflow: hidden;">
      <r-main></r-main>
      <my-table *ngIf="false"></my-table>
      <my-grid *ngIf="false"></my-grid>
      <my-form *ngIf="false"></my-form>
      <my-dropdown *ngIf="false"></my-dropdown>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular';

  ngOnInit() { }
}
