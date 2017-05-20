import {Injectable, Inject} from '@angular/core';
import {Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AuthService {
    
    isLoggedin: boolean;
    AuthToken;
    
    constructor(public http: Http) {
        this.http = http;
        this.isLoggedin = false;
        this.AuthToken = null;
    }
    
    storeUserCredentials(token) {
        window.localStorage.setItem('raja', token);
        this.useCredentials(token);
        
    }
    
    useCredentials(token) {
        this.isLoggedin = true;
        this.AuthToken = token;
    }
    
    loadUserCredentials() {
        var token = window.localStorage.getItem('raja');
        this.useCredentials(token);
    }
    
    destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        window.localStorage.clear();
    }
    
    authenticate(user) {
        var creds = "email=" + user.email + "&password=" + user.password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        return new Promise(resolve => {
            this.http.post('http://tukasservice.azurewebsites.net/api/user/login', creds, {headers: headers}).subscribe(data => {
            console.log(data.json().Result);
                if(!(data.json().Result.indexOf("Error") >= 0)){
                    this.storeUserCredentials(data.json().Result);
                    resolve(true);
                }
                else
                    resolve(false);
            });
        });
    }
    adduser(user) {
        var creds = "email=" + user.email + "&password=" + user.password + "&name=" + user.name + "&department=" + user.department;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        return new Promise(resolve => {
            this.http.post('http://tukasservice.azurewebsites.net/api/user/register', creds, {headers: headers}).subscribe(data => {
                if(!(data.json().Result.indexOf("Error") >= 0)){
                    this.storeUserCredentials(data.json().Result);
                    resolve(true);
                }
                else
                    resolve(false);
            });
        });
    }
    
    getinfo() {
        return new Promise(resolve => {
            var headers = new Headers();
            this.loadUserCredentials();
            console.log('tokenı buldum: ' + this.AuthToken);

                  headers.append('Token', this.AuthToken);
                 var options = new RequestOptions({ headers: headers });
            this.http.get('http://bookbookservice.azurewebsites.net/api/user/getinfo', options).subscribe(data => {

                if(data.json())
                {
                    console.log(data.json());
                    resolve(data.json());
                }
                else
                    resolve(false);
            });
        })
    }
    
    logout() {
        this.destroyUserCredentials();
    }
}