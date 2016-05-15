import {Component, OnInit} from '@angular/core';
import { RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    RouteParams } from '@angular/router-deprecated';
    
@Component({
    template: '<h1>Pagina 2 | id: {{id}}</h1>',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS
    ]

})
export class PaginaDois implements OnInit {
    id: string;

    constructor(private _routeParams: RouteParams) {

    }

    ngOnInit() {
        this.id = this._routeParams.get('id');
    }
}