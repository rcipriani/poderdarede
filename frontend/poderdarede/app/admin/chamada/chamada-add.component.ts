import {Component, OnInit} from '@angular/core';
import { FORM_DIRECTIVES,
    FormBuilder,
    ControlGroup,
    Validators,
    AbstractControl } from '@angular/common';
import { Router,
    RouteConfig,
    ROUTER_DIRECTIVES,
    RouteParams } from '@angular/router-deprecated';

import {ControlMessages} from './control-messages.component';
import {ValidationService} from './validation.service';
import {Observable} from 'rxjs/Observable';
import {Chamada} from './chamada';
import {ChamadaService} from './chamada.service';
import {ChamadaListComponent} from './chamada-list.component';


@Component({
    templateUrl: './app/admin/chamada/chamada-add.component.html',
    directives: [
        FORM_DIRECTIVES,
        ControlMessages,
        ChamadaListComponent
    ]
})
export class ChamadaAddComponent implements OnInit {

    chamadaForm: ControlGroup;
    id: number = null;
    chamada: Chamada;

    constructor(
        private _formBuilder: FormBuilder,
        private _chamadaService: ChamadaService,
        private _routeParams: RouteParams
    ) {
        this.chamadaForm = _formBuilder.group({
            'id': [''],
            'slug': ['', Validators.required],
            'titulo': ['', Validators.required],
            'texto': ['', Validators.required],
            'midia': ['', Validators.compose([Validators.required])],
            'aceitaInscricao': ['', Validators.required]
        });


        /*
                this.chamadaForm.valueChanges.subscribe(
                    (value: string) => {
                        console.log('form changed to: ', value);
                    }
                );
        */
    }

    ngOnInit() {

        if (this._routeParams.get('id') != null) {
            this.id = parseInt(this._routeParams.get('id'));
        }
        this.chamada = {
            'id': null,
            'slug': "",
            'titulo': "",
            'texto': "",
            'midia': "",
            'aceitaInscricao': false
        };

        if (this.id != null) {
            this._chamadaService.findChamadaById(this.id).subscribe(res => this.chamada = res);
        } else {
            this.chamada = {
                'id': null,
                'slug': "",
                'titulo': "",
                'texto': "",
                'midia': "",
                'aceitaInscricao': false
            };
        }

        //TODO Mudar de Chamada add para algo que funcione com add e update

    }

    onSubmit(chamada: Chamada): void {


        if (this.chamadaForm.dirty && this.chamadaForm.valid) {

            if (this.id != null) {
                chamada.id = this.id;
                this._chamadaService.updateChamada(chamada);
            } else {
                this._chamadaService.createChamada(chamada);
            }
        }
    }


}
