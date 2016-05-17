import {Component, OnInit}      from '@angular/core';
import { Router,
        RouteConfig,
        ROUTER_DIRECTIVES,
        RouteParams }           from '@angular/router-deprecated';
import {PaginaUm}               from './paginas/pagina1';
import {PaginaDois}             from './paginas/pagina2';
import {ChamadaComponent}       from './admin/chamada/chamada.component';
import {ChamadaDetailComponent} from './admin/chamada/chamada-detail.component';
import {AdminComponent}         from './admin/admin.component';


@Component({
    selector: 'my-app',
    templateUrl: './app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        PaginaUm
    ]

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
        path: '/pagina1',
        name: 'PaginaUm',
        component: PaginaUm
    },
    {
        path: '/pagina2/:id',
        name: 'PaginaDois',
        component: PaginaDois
    }
])

export class AppComponent implements OnInit {
    title: string = 'Teste de app'


    constructor(private _router: Router) {

    }

    ngOnInit() {

    }

    gotoPaginaDois() {
        console.log("entrou");
        this._router.navigate(['PaginaDois', { id: 54321 }]);
    }

    listar() {
        console.log("Clicou em listar3");
        //this._router.navigate(['ChamadaList']);
    }
}
