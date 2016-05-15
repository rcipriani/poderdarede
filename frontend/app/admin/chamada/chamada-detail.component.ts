import {Component, OnInit} from '@angular/core';
import { FORM_DIRECTIVES,
    FormBuilder,
    ControlGroup,
    Validators,
    AbstractControl } from '@angular/common';
import {RouteParams} from '@angular/router-deprecated';

import {Chamada} from './chamada';
import {Captura} from './captura';
import {ChamadaService} from './chamada.service';
import {ControlMessages} from './control-messages.component';
import {ValidationService} from './validation.service';

import {Nl2BrPipe} from '../../pipe/nl2br.pipe';

@Component({
    templateUrl: './app/admin/chamada/chamada-detail.component.html',
    styleUrls: ['./app/admin/chamada/chamada-detail.style.css'],
    directives: [
        FORM_DIRECTIVES,
        ControlMessages
    ],
    pipes: [Nl2BrPipe]

})
export class ChamadaDetailComponent implements OnInit {

    id: number;
    chamada: Chamada;
    capturaForm: ControlGroup;
    captura: Captura

    constructor(
        private _formBuilder: FormBuilder,
        private _routeParams: RouteParams,
        private _chamadaService: ChamadaService) {

        this.capturaForm = _formBuilder.group({
            'email': ['', Validators.required]
        });

    }

    ngOnInit() {
        if (this._routeParams.get('id') != null) {
            this.id = parseInt(this._routeParams.get('id'));
        }

        this.captura = { idChamada: null, email: "" };

        this.chamada = {
            'id': null,
            'titulo': "",
            'texto': "",
            'midia': "",
            'aceitaInscricao': false
        };
        this._chamadaService.findChamadaById(this.id).subscribe(res => this.chamada = res);
    }

    onSubmit(captura: Captura): void {

        if (this.capturaForm.dirty && this.capturaForm.valid) {
            this._chamadaService.capturar(this.id, captura.email);
        }
    }

}
