import {Component, OnInit} from '@angular/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Observable} from 'rxjs/Observable';

import {Chamada} from './chamada';
import {ChamadaService} from './chamada.service';
import {RcGoDirective} from '../../directives/rc-go.directive';

@Component({
    selector: 'chamada-list',
    templateUrl: './app/admin/chamada/chamada-list.component.html',
    directives: [RcGoDirective, ROUTER_DIRECTIVES]
})
export class ChamadaListComponent implements OnInit  {

    chamadas : Observable<Chamada[]>;

    constructor(
        private _router: Router,
        private _chamadaService: ChamadaService
        ){
    }

    ngOnInit() {
        console.log("TA aqui2");
        this.chamadas = this._chamadaService.chamadas$;
        this._chamadaService.loadChamadas();
    }

    onSelect(chamada: Chamada) {
        console.log("teste");
        this._router.navigate(['ChamadaUpdate', { id: chamada.id }]);
    }

    deleteChamada(chamada: Chamada){
        this._chamadaService.deleteChamada(chamada);
    }

}
