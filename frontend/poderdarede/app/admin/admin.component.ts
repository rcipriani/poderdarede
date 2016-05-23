import {Component, OnInit} from '@angular/core';
import { Router, RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import {ChamadaAddComponent} from './chamada/chamada-add.component';
import {ChamadaListComponent} from './chamada/chamada-list.component';
import {ChamadaDetailComponent} from './chamada/chamada-detail.component';

@Component({
    templateUrl: './app/admin/admin.component.html',
    directives: [ ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path: '/add',
        name: 'ChamadaAdd',
        component: ChamadaAddComponent
    },
    {
        path: '/update/:id',
        name: 'ChamadaUpdate',
        component: ChamadaAddComponent
    },
    {
        path: '/listar',
        name: 'ChamadaList',
        component: ChamadaListComponent,
        useAsDefault: true
    },
    {
        path: '/c/:slug',
        name: 'ChamadaDetail',
        component: ChamadaDetailComponent
    }
])

export class AdminComponent implements OnInit {

    constructor(private _router: Router) {

    }

    ngOnInit(){

    }

    listar() {
        console.log("Clicou em listar2");
        //this._router.navigate(['ChamadaList']);
    }

}
