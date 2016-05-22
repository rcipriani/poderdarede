import {Directive, ElementRef, Input} from '@angular/core';
import { Router,
        RouteConfig,
        ROUTER_DIRECTIVES,
        RouteParams } from '@angular/router-deprecated';

@Directive({
    selector: '[usiGo]',
    host: {
        '(click)': 'click()',
        '[class.fade]': '_fade'
    }
})
export class RcGoDirective {

    private _el: HTMLElement;
    private _router: Router;
    private _params : any[] = [];

    @Input() set usiGo(params: any[]) {
        this._params = params;
    }

    constructor(el: ElementRef, _router: Router) {
        this._el = el.nativeElement;
        this._router = _router;
    }

    ngAfterViewInit() {
        //        this._inicarSlide();
    }

    click() {

//        event.preventDefault();

//        console.log("this._params[1].url", this._params[1].url);
        if(this._params[0] == "_blank"){
             window.open(this._params[1].url, '_blank');
        }
//        this._router.navigate(['Busca', { s: paramBusca }]);
    }

}
