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

import {RcNl2BrPipe} from '../../pipe/rc-nl2br.pipe';

@Component({
    templateUrl: './app/admin/chamada/chamada-detail.component.html',
    styleUrls: ['./app/admin/chamada/chamada-detail.style.css'],
    directives: [
        FORM_DIRECTIVES,
        ControlMessages
    ],
    pipes: [RcNl2BrPipe]

})
export class ChamadaDetailComponent implements OnInit {

    slug: string;
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

        this.chamada = {
            'id': null,
            'slug': "",
            'titulo': "",
            'texto': "",
            'midia': "",
            'aceitaInscricao': false
        };

        if (this._routeParams.get('slug') != null) {
            this.slug = this._routeParams.get('slug');
            this._chamadaService.findChamadaBySlug(this.slug).subscribe(res => this.chamada = res);
        }

        this.captura = { idChamada: null, email: "" };

    }

    onSubmit(captura: Captura): void {

        if (this.capturaForm.dirty && this.capturaForm.valid) {
            //this._chamadaService.capturar(this.id, captura.email);
        }
    }

}
