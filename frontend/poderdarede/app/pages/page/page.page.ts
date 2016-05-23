import {Component, OnInit} from '@angular/core';
import {RouteParams, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Observable} from 'rxjs/Observable';

import {Page} from './page.class';
import {PageService} from './page.service';

import {RcGoDirective} from '../../directives/rc-go.directive';

@Component({
    templateUrl: './app/pages/page/page.template.html',
    styleUrls: ['./app/pages/page/page.style.css'],
    directives: [ROUTER_DIRECTIVES, RcGoDirective]
})

export class PagePage implements OnInit {

    public pages: Observable<Page[]>;
    public page: Page;
    public subHeaderCover: string = "";
    public usuarioPreferenciaApps: number[];

    constructor(
        private _pageService: PageService,
        private _routeParams: RouteParams) {

          console.log("TesteEEEEEE11111111");
    }

    ngOnInit() {
console.log("TesteEEEEEE");

        if (this._routeParams.get('slug') != null) {

            let slug = this._routeParams.get('slug');

            this.page = {
                'id': null,
                'slug': "",
                'titulo': "",
                'texto': "",
                'html': "",
                'midia': "blank.png"
            }
            this._pageService.findPageBySlug(slug).subscribe(res => this.page = res);

        }

    }

}
