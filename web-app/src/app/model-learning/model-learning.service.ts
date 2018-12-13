import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ModelLearningService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            'Access-Control-Allow-Methods': ['Access-Control-Allow-Headers,',
                ' Access-Control-Request-Method,',
                ' Access-Control-Request-Headers,',
                ' HEAD, GET, POST, PUT, PATCH, DELETE'].join(''),
        })
    };

    constructor(private http: HttpClient) {
    }

    getData(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/read_data`,
            this.httpOptions);
    }

    getStats(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/get-stats`,
            this.httpOptions);
    }

    getTree(params: { max_depth }): Observable<any> {
        return this.http.post(`${environment.apiUrl}/model-learning`,
            params, this.httpOptions);
    }

    modelComplexity(): Observable<any> {
        return this.http.post(`${environment.apiUrl}/model-complexity`,
            {}, this.httpOptions);

    }
}
