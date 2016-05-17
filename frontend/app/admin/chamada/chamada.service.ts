import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {Chamada} from './chamada';
import {SERVER_URL} from '../../config';

@Injectable()
export class ChamadaService {

    private _dataStore: {
        chamadas: Chamada[],
        chamada: Chamada
    };

    chamadas$: Observable<Chamada[]>;
    private _chamadasObserver: Observer<Chamada[]>;

    chamada$: Observable<Chamada>;
    private _chamadaObserver: Observer<Chamada>;

    private _baseUrl: string;
    private _capturaUrl: string;
    private count: number = 0;

    //constructor(private _http: Http) {
    constructor(private _http: Http) {

        this.count++;
        console.log("count", this.count);

        this._baseUrl = SERVER_URL + '/chamada';
        this._capturaUrl = SERVER_URL + '/captura';

        this._dataStore = { chamadas: [], chamada: {
            'id': null,
            'slug': "",
            'titulo': "",
            'texto': "",
            'midia': "",
            'aceitaInscricao': false
        } };

        this.chamadas$ = new Observable(observer => this._chamadasObserver = observer)
            .startWith(this._dataStore.chamadas)
            .share();

        this.chamada$ = new Observable(observer => this._chamadaObserver = observer)
            .startWith(this._dataStore.chamada)
            .share();

    }

    loadChamadas() {
        this._http.get(`${this._baseUrl}/`).map(response => response.json()).subscribe(data => {
            this._dataStore.chamadas = data;
            this._chamadasObserver.next(this._dataStore.chamadas);
        }, error => console.log('Could not load todos.'));
    }

    findChamadaById(id: number) {

        // return an observable
        return this._http.get(`${this._baseUrl}/get/` + id)
            .map( (responseData) => {
                let data =  responseData.json();
                if (data) {
                    return this.buildChamada(data);
                }
            });

    }

    findChamadaBySlug(slug: string) {

        // return an observable
        return this._http.get(`${this._baseUrl}/find/slug/` + slug)
            .map( (responseData) => {
                let data =  responseData.json();
                if (data) {
                    return this.buildChamada(data);
                }
            });

    }

    private buildChamada(data){
      let result: Chamada = new Chamada(data.id,
                          data.slug,
                          data.titulo,
                          data.texto,
                          data.midia,
                          data.aceitaInscricao);;
      return result;
    }

    capturar(chamadaId : number, email : string) {
        // TODO falta criar a route /createRandom. *Esta aqui só de exemplo
        this._http.post(`${this._capturaUrl}/${chamadaId}/${email}`, null)
            .map(response => response.json()).subscribe(data => {
              console.log();
            }, error => console.log('Capturado com sucesso.'));
    }

    createChamadaRandonComId(chamada: Chamada) {
        // TODO falta criar a route /createRandom. *Esta aqui só de exemplo
        this._http.post(`${this._baseUrl}/createRandom/` + chamada.id, null)
            .map(response => response.json()).subscribe(data => {
                this._dataStore.chamadas.push(data);
                this._chamadasObserver.next(this._dataStore.chamadas);
            }, error => console.log('Could not create todo.'));
    }

    createChamada(chamada: Chamada) {

        console.log("console.log(this._chamadasObserver); CREATE", this._chamadasObserver);

        let chamadaJson = JSON.stringify(chamada);

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this._http.post(`${this._baseUrl}/create`, chamadaJson, {
            headers: headers
        }).map(response => response.json()).subscribe(data => {
            this._dataStore.chamadas.push(data);
            this._chamadasObserver.next(this._dataStore.chamadas);
        }, error => console.log('Could not create todo.'));

    }

    updateChamada(chamada: Chamada) {


        let chamadaJson = JSON.stringify(chamada);

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this._http.put(`${this._baseUrl}/update/${chamada.id}`, chamadaJson, {
            headers: headers
        }).map(response => response.json()).subscribe(data => {
              console.log("Update Cahmada", data);

// TODO Colocar aqui que se não fizer update tem que avisar o usuario

                this._dataStore.chamadas.forEach((chamada, i) => {
                    if (chamada.id === data.id) {
                        this._dataStore.chamadas[i] = data;
                    }
                });

                this._chamadasObserver.next(this._dataStore.chamadas);
            }, error => console.log('Could not update todo.'));
    }

    deleteChamada(chamada: Chamada) {
        this._http.get(`${this._baseUrl}/delete/` + chamada.id)
            .map(response => response.json()).subscribe(data => {
                this._dataStore.chamadas.forEach((t, index) => {
                    if (t.id === chamada.id) { this._dataStore.chamadas.splice(index, 1); }
                });
                this._chamadasObserver.next(this._dataStore.chamadas);
            }, error => console.log('Could not create todo.'));
    }

    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
