import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject, Observable } from 'rxjs';
import { ResizeEvent } from 'angular-resizable-element/dist/esm/src/interfaces/resizeEvent.interface';

export const source = [
  {
    "name": "测试1",
    "children": []
  },
  {
    "name": "测试2",
    "children": [
      {
        "name": "A区",
        "children": [
          {
            "name": "a1",
            "children": null
          },
          {
            "name": "a2",
            "children": null
          },
        ]
      },
      {
        "name": "B区",
        "children": [
          {
            "name": "b1",
            "children": null
          },
          {
            "name": "b2",
            "children": null
          }
        ]
      }
    ]
  }
];

export const changePos = [
  {
    level: 1,
    expanded: false,
    node: {
      name: "x"
    },
    parent: {
      level: 0,
      node: {
        name: "y"
      }
    }
  },
  {
    level: 2,
    expanded: true,
    node: {
      name: "y"
    },
    parent: {
      level: 1,
      node: {
        name: "z"
      }
    }
  }];


@Component({
  selector: 'app-root',
  template: `
    <div style="overflow: hidden;">
      <r-main></r-main>
      <r-fieldset *ngIf="false"></r-fieldset>
      <div class="form-group row" [formGroup]="formGroup" *ngIf="false">
          <div class="col-md-8">
              <input type="text" id="title" placeholder="Please input article title" [(ngModel)]="article.title" formControlName="title">
          </div>
          <button class="btn btn-primary" (click)="onCancel()">Cancel</button>
      </div>
      <r-seat *ngIf="false"></r-seat>
      <my-grid *ngIf="false"></my-grid>
      <my-form *ngIf="false"></my-form>
      <my-dropdown *ngIf="false"></my-dropdown>
      <button *ngIf="false" class="btn btn-primary" [style.fontSize]="fontSize" [ngStyle]="myStyle" [ngClass]="{'myBtn': addBtnClass}">Style Binding</button>
    </div>
    <div class="vertical-form-container" *ngIf="false">
      <form #taskForm>
          <mat-form-field>
            <input matInput #title type="text" name="title" placeholder="Title" required [(ngModel)]="taskData.title">
          </mat-form-field>

          <mat-form-field class="example-full-width">
            <input matInput #deadlineDate name='deadlineDate' [matDatepicker]="picker" placeholder="Deadline Date" required [(ngModel)]="taskData.deadlineDate">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker touchUi="true" #picker></mat-datepicker>
          </mat-form-field>
            
          <mat-form-field class="example-full-width">
              <textarea matInput matTextareaAutosize minRows='2' maxRows='10' #description name='description' placeholder="Task Description" [(ngModel)]="taskData.description"></textarea>
            </mat-form-field>
          <button mat-raised-button color="primary" type="button" (click)='submitTask()'>ADD</button>
          <button mat-raised-button color="primary" type="button" (click)='setTask()'>Set</button>    
      </form>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular';

  sSubject: Subject<number> = new Subject<number>();
  bSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1000);
  rSubject: ReplaySubject<number> = new ReplaySubject<number>();
  aSubject: AsyncSubject<number> = new AsyncSubject<number>();

  fontSize: string = "2em";
  myStyle: any = {
    borderRadius: "10px",
    fontWeight: "bold",
    fontSize: "1em"
  };

  myBtn: string = "myBtn";
  addBtnClass: boolean = true;

  formGroup: FormGroup;
  article: any = {
    title: ""
  };

  taskData: any = {
    title: "",
    deadlineDate: "",
    description: ""
  };

  ngOnInit() {
    Observable.fromEvent(window, "resize")
      .debounceTime(100)
      .subscribe((event: any) => {
        //console.warn(event.target.innerWidth);
      });

    
    //this.compareObservable();
    //console.warn(changePosition(changePos, "expanded", "parent"));
    //console.warn(flattenArray([[0, 1], [2, 3, 4], [5, 6, 7, 8, 9], [10]]));

    this.formGroup = new FormGroup({});
    this.formGroup.addControl("title", new FormControl());

    Object.keys(this.formGroup.controls).forEach((key: string) => {
      this.formGroup.controls[key].setErrors(null);
    });

    this.compareSubject();

  }

  submitTask(): void {
    console.warn(this.taskData);
  }

  setTask(): void {
    this.getTask(2).subscribe((res: any) => {
      this.taskData = res;
    });
  }

  getTask(id: number): Observable<any> {
    return Observable.of({
      title: id,
      deadlineDate: new Date(id + 100),
      description: id + 200
    });
  }

  onCancel(): void {
    this.article.title = "";
    console.warn(this.article);
    this.article = Object.assign({}, this.article);
    console.info(this.article);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    //console.info("inner", window.innerWidth);
    //console.warn("outer", window.outerWidth);
  }

  constructor() {

  }

  compareSubject(): void {
    //subject
    this.sSubject.next(100);
    this.sSubject.subscribe((res: number) => console.error("subjectA", res));
    this.sSubject.subscribe((res: number) => console.error("subjectB", res));
    this.sSubject.next(200);
    this.sSubject.next(300);


    //behavior subject
    //this.bSubject.subscribe((res: number) => console.info("behavior-subjectA", res));
    this.bSubject.next(2000);
    this.bSubject.subscribe((res: number) => console.info("behavior-subjectB", res));
    this.bSubject.next(3000);

    //replay subject
    this.rSubject.next(1);
    this.rSubject.next(2);
    this.rSubject.subscribe((res: number) => console.warn("replay-subjectA", res));
    this.rSubject.next(3);
    this.rSubject.subscribe((res: number) => console.warn("replay-subjectB", res));
    this.rSubject.next(4);

    //async subject
    this.aSubject.next(10000);
    this.aSubject.next(20000);
    this.aSubject.subscribe((res: number) => console.log("async-subjectA", res));
    this.aSubject.next(30000);
    this.aSubject.subscribe((res: number) => console.log("async-subjectB", res));
    this.aSubject.next(40000);
    this.aSubject.subscribe((res: number) => console.log("async-subjectC", res));
    this.aSubject.complete();
    this.aSubject.subscribe((res: number) => console.log("async-subjectD", res));
    this.aSubject.next(50000);
    this.aSubject.subscribe((res: number) => console.log("async-subjectE", res));
  }

  compareObservable(): void {
    const baseObsevable: Observable<number> = Observable.interval(1000).take(2);
    baseObsevable.switchMap((x: number) => Observable.interval(500).take(3).map(y => `switchMap ~ ${x}:${y}`)).subscribe(res => console.warn(res));
    //baseObsevable.flatMap((x: number) => Observable.interval(1000).take(3).map(y => `flatMap ~ ${x}:${y}`)).subscribe(res => console.warn(res));
    //baseObsevable.concatMap((x: number) => Observable.interval(1000).take(3).map(y => `concatMap ~ ${x}:${y}`)).subscribe(res => console.warn(res));
    //baseObsevable.exhaustMap((x: number) => Observable.interval(1000).take(3).map(y => `exhaustMap ~ ${x}:${y}`)).subscribe(res => console.warn(res));
  }

  zipSubject(): Observable<any> {
    return Observable.zip(this.sSubject.asObservable, this.bSubject.asObservable, this.rSubject.asObservable, this.aSubject.asObservable);
  }
}

export function findTarget(source: any[], targetName: string): void {
  if (source && source.length && targetName) {
    for (let item of source) {
      if (item.name === targetName) {
        item.expand = true;
      } else if (item.children && item.children.length) {
        findTarget(item.children, targetName);
      }
    }
  }
}

export function changePosition(source: any[], orginalKey: string, changedKey: string): Array<any> {
  let tempArr: any[] = [];
  for (let obj of source) {
    let tempObj: any = {};
    let orginalValue: boolean;
    Object.keys(obj).forEach((key: string) => {
      if (key === orginalKey) {
        orginalValue = obj[key];
      } else {
        tempObj[key] = obj[key];
      }
    });
    tempObj[changedKey][orginalKey] = orginalValue;
    tempArr.push(tempObj);
  }
  return tempArr;
}

function flattenArray(arr: Array<any>): Array<any> {
  let tempArr: Array<any> = [];
  for (let subarr of arr) {
    tempArr.push(...subarr);
  }
  return tempArr;
}

function deleteEmptyObject(obj: any): any {
  Object.keys(obj).forEach((key: string) => {
    let value: any = obj[key];
    if (value !== null && value !== undefined && Object.prototype.toString.call(value) === "[object Object]" && Object.keys(value).length === 0) {
      delete obj[key];
    }
  });
  return obj;
}






