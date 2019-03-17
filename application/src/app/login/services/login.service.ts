import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Credential} from '../models/login-models';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	baseUrl = 'http://localhost:8085';

	constructor(private http: HttpClient) { }

	login(credential: Credential): Observable<any> {
		return new Observable(observer => {
			this.http.post(this.baseUrl + '/login', credential).subscribe(
				(data) => {
					observer.next();
					observer.complete();
				},
				(error) => console.log(error)
			);
		});
	}
}
