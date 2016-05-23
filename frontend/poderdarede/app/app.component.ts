import {Component, OnInit}      from '@angular/core';
import { Router,
    RouteConfig,
    ROUTER_DIRECTIVES,
    RouteParams }           from '@angular/router-deprecated';

import {ChamadaComponent}       from './admin/chamada/chamada.component';
import {ChamadaDetailComponent} from './admin/chamada/chamada-detail.component';
import {AdminComponent}         from './admin/admin.component';
import {PagePage} from './pages/page/page.page';

@Component({
    selector: 'app',
    templateUrl: './app/app.component.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path: '/admin/...',
        name: 'Admin',
        component: AdminComponent,
        useAsDefault: true
    },
    {
        path: '/c/:slug',
        name: 'ChamadaDetail',
        component: ChamadaDetailComponent
    },
    {
        path: '/page/:slug',
        name: 'Page',
        component: PagePage
    },
    {
        path: '/page/sobre-nos',
        name: 'Page',
        component: PagePage
    }
])

export class AppComponent implements OnInit {
    title: string = 'Poder da rede'

    constructor(private _router: Router) {

    }

    ngOnInit() {

    }
}
