import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {Page} from './page.class';
import {API_URL} from '../../configs/config';

@Injectable()
export class PageService {

    private _dataStore: {
        pages: Page[],
        page: Page
    };

    pages$: Observable<Page[]>;
    private _pagesObserver: Observer<Page[]>;

    page$: Observable<Page>;
    private _pageObserver: Observer<Page>;

    private _baseUrl: string;

    constructor(private _http: Http) {

        this._baseUrl = API_URL + '/page';

        this._dataStore = {
            pages: [], page: {
                'id': null,
                'slug': "",
                'titulo': "",
                'texto': "",
                'html': "",
                'midia': ""
            }
        };

        this.pages$ = new Observable<Page[]>(observer => this._pagesObserver = observer)
            .startWith(this._dataStore.pages)
            .share();

        this.page$ = new Observable<Page>(observer => this._pageObserver = observer)
            .startWith(this._dataStore.page)
            .share();

    }

    loadPages() {

        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');

        this._http.get(`${this._baseUrl}/findAll`, {
            headers: headers
        }).map(response => response.json()).subscribe(data => {

            this._dataStore.pages = data;
            this._pagesObserver.next(this._dataStore.pages);

        }, error => console.log('Falha ao carregar Pages.'));
    }

    findPageBySlug(_slug: string) {

        return this._http.get(`${this._baseUrl}/slug/` + _slug).map((responseData) => {

            let data = responseData.json();
            if (data) {
                let result: Page = new Page(data.id,
                    data.slug,
                    data.titulo,
                    data.texto,
                    data.html,
                    data.midia
                );
                return result;
            }

        });

    }

    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
