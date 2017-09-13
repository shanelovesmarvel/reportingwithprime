import { Component, ViewChild, ElementRef, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const EXPANDED_TEXTAREA_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextAreaExpandedComponent), //Allows to refer to references which are not yet defined.
    multi: true
}

@Component({
    selector: 'textarea-expanded',
    template: `
    <div contenteditable="true" #textarea tabindex="1"  role="textarea"
        (input)="change($event)">
    </div>
    `,
    providers: [EXPANDED_TEXTAREA_VALUE_ACCESSOR],
    styles: [`
      div {
          width: 200px;
          min-height: 50px;
          border: 1px solid lightgray;
      }
      div.disabled {
          cursor: not-allowed;
          opacity: 0.5;
          pointer-events: none;
      }
    `]
})

export class TextAreaExpandedComponent implements ControlValueAccessor {
    //ControlValueAccessor: A bridge between a control and a native element.
    @ViewChild('textarea') textarea: ElementRef;
    onChange: any;
    onTouched: any;

    constructor(private renderer: Renderer2) {

    }

    ngOnInit() { }

    writeValue(value: any): void {
        const div: any = this.textarea.nativeElement;
        this.renderer.setProperty(div, 'textContent', value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        const div: any = this.textarea.nativeElement;
        const action: string = isDisabled ? 'addClass' : 'removeClass';
        this.renderer[action](div, 'disabled');
    }

    change($event) {
        //Angular does not know that the value has changed from our component,
        //so we need to update it with new value.
        this.onChange($event.target.textContent);
        this.onTouched($event.target.textContent);
    }

}

