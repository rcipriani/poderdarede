import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import {Page} from './page.class';
import {USI_URL} from '../../configs/config';

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
    private count: number = 0;

    constructor(private _http: Http) {

        this._baseUrl = USI_URL + '/page';

        this._dataStore = { pages: [], page: {
            'id': null,
            'slug': "",
			'titulo': "",
			'texto': "",
            'html': "",
            'midia': "",
			'apps': []
        } };

        this.pages$ = new Observable<Page[]>(observer => this._pagesObserver = observer)
            .startWith(this._dataStore.pages)
            .share();

        this.page$ = new Observable<Page>(observer => this._pageObserver = observer)
            .startWith(this._dataStore.page)
            .share();

    }

    loadPages(_includeApps: boolean) {
       
        let params: URLSearchParams = new URLSearchParams();
        if (typeof _includeApps !== "undefined") {
        
            params = new URLSearchParams();
            params.set('includeapps', _includeApps+"");
            
        }
        
        let headers = new Headers();
//        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        
        this._http.get(`${this._baseUrl}/findAll`, {
                    search: params,
                    headers: headers
                 }).map(response => response.json()).subscribe(data => {
                     
            this._dataStore.pages = data;
            this._pagesObserver.next(this._dataStore.pages);
                     
        }, error => console.log('Falha ao carregar Pages.'));
    }
	
    findPageBySlug(_slug: string, _includeApps: boolean) {
        
        let params: URLSearchParams = new URLSearchParams();
        params.set('includeapps', _includeApps+"");
        
        return this._http.get(`${this._baseUrl}/slug/` + _slug, {
                   search: params
                 }).map( (responseData) => {
			
                let data =  responseData.json();
                if (data) {
                    let result: Page = new Page(data.id, 
                                        data.slug,
                                        data.titulo,
                                        data.texto,
                                        data.html,
                                        data.midia,
										data.Apps);
                    return result;
                }
				
        });
        
    }
	
    findPageById(id: number) {
	
        return this._http.get(`${this._baseUrl}/` + id)
            .map( (responseData) => {
			
                let data =  responseData.json();
				
                if (data) {
                    let result: Page = new Page(data.id, 
                                        data.slug,
                                        data.titulo,
                                        data.texto,
                                        data.html,
                                        data.midia,
                                        data.Apps);
                    return result;
                }
				
            });
        
    }

    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
