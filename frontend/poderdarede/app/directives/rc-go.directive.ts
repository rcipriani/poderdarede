import {Directive, ElementRef, Input} from '@angular/core';
import { Router } from '@angular/router-deprecated';

@Directive({
    selector: '[rcGo]',
    host: {
        '(click)': 'click()'
    }
})
export class RcGoDirective {


    private _params : any[] = [];

    @Input() set usiGo(params: any[]) {
        this._params = params;
    }

    constructor(private _el: ElementRef, private _router: Router) {
    }

    ngAfterViewInit() {
        //        this._inicarSlide();
    }

    click() {

//        event.preventDefault();
        if(this._params[0] == "_blank"){
             window.open(this._params[1].url, '_blank');
        }else{
          this._router.navigate([this._params[0], this._params[1]]);
        }

    }

}
