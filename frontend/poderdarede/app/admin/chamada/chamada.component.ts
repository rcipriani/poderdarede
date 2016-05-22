
import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import { Router, RouteConfig, RouterOutlet, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import {Observable} from 'rxjs/Observable';

import {Chamada} from './chamada';
import {ChamadaService} from './chamada.service';
import {ChamadaListComponent} from './chamada-list.component';
import {ChamadaDetailComponent} from './chamada-detail.component';


@Component({
    templateUrl: './app/admin/chamada/chamada.component.html',
    providers: [ChamadaService, RouterOutlet, ROUTER_DIRECTIVES]

})

@RouteConfig([
    {
        path: '/listar',
        name: 'ChamadaList',
        component: ChamadaListComponent,
        useAsDefault: true
    },
    {
        path: '/:id',
        name: 'ChamadaDetail',
        component: ChamadaDetailComponent
    }
])

export class ChamadaComponent implements OnInit {

    constructor(private _chamadaService: ChamadaService) { }

    ngOnInit() {
    }
    
   
}
