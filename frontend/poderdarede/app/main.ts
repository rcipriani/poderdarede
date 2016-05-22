import {bootstrap}              from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS}       from '@angular/router-deprecated';
import {HTTP_PROVIDERS}         from '@angular/http';

import {AppComponent}           from './app.component';
import {ChamadaService}         from './admin/chamada/chamada.service';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS, 
    HTTP_PROVIDERS,
    ChamadaService
]);
