import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



@Injectable()
export class GithubService {
    private userName: string;
    // private clientId: string = '<Client Id>';
    // private clientSecret: string = '<Client Secret Key>';
    private clientId: string = '62bed69aeaad71609698';
    private clientSecret: string = 'a019bbd4bc0f3b6a11a517bf01ba6fdb41d1d5fa';

    constructor(private http: Http) {
        // console.log('Github Service Ready.');
        this.userName = '';
    }


    getUser() {
        if (this.userName) {
            return this.http.get(environment.httpsUrl + this.userName
                + '?client_id=' + this.clientId
                + '&client_secret=' + this.clientSecret)
                .pipe(map((res: any) => res.json()))
                .pipe(catchError(this.handleError));
        }
    }

    getRepos() {
        if (this.userName) {
            return this.http.get(environment.httpsUrl + this.userName
                + '/repos?client_id=' + this.clientId
                + '&client_secret=' + this.clientSecret)
                .pipe(map(res => res.json()))
                .pipe(catchError(this.handleError));
        }

    }

    updateUser(userName: string) {
        this.userName = userName;
    }

    private handleError(error: any) {

        if (error.status === 401) {
            return throwError(error.status);
        } else {
            return throwError(error.status || 'Server error');
        }
    }
}