import { AppSettings } from '../app.settings';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs/';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Router } from '@angular/router'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UserAutentication } from '../models/UserAutentication';
import { Usuario } from 'app/models/Usuario';
import { TokenBuilder } from 'app/Builders/Token.model.builder';
import { Token } from '@angular/compiler';
import { BuildHeaderService } from './BuildHeader';
import { HttpClient } from '@angular/common/http';
import { HeaderBuilder } from 'app/Tools/HeaderBuilder';


@Injectable()
export class LoginService {



    private actionUrl: string;
    private headers: Headers;
    private GetParameterController: string;
    private LoginParametersMethod: string;
    constructor(private http: HttpClient, public _Router: Router, private HeaderBuilder: HeaderBuilder
    ) {
        this.GetParameterController = '/UserAutenticationGas/';

    }
    public SearchToken(tokenStr: string): Observable<boolean> {
        this.LoginParametersMethod = 'SearchToken';
        const Authenticate: boolean = false;
        const TokenAccessRequest = new TokenBuilder().BuildWithToken(tokenStr).Build()
        const params = JSON.stringify(TokenAccessRequest)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });


        const httpOptions = this.HeaderBuilder.HeadNow()
        return this.http.post(`${AppSettings.Global().API}` + this.GetParameterController + this.LoginParametersMethod
            , params, httpOptions).map(this.extractDataLogin)

    }


    public getLoginSession(): UserAutentication {
        if (sessionStorage.getItem('currentUser') != undefined) {
            const any: UserAutentication = JSON.parse(sessionStorage.getItem('currentUser'))
            return any
        }
        else {
            sessionStorage.removeItem('currentUser')

            //    this._Router.navigate(['/login'])
        }
    }


    public authenticateUser(user: any): Observable<boolean> {
        this.LoginParametersMethod = 'Login';
        const Authenticate: boolean = false;

        const params = JSON.stringify(user)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${AppSettings.Global().EndPoints.API}` + this.GetParameterController + this.LoginParametersMethod, params)
            .map(x => Boolean(x))
            .catch(this.catchError);

    }


    public AddUser(user: any): Observable<boolean> {
        this.LoginParametersMethod = 'AddUser';
        const Authenticate: boolean = false;

        const params = JSON.stringify(user)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${AppSettings.Global().EndPoints.API}` + this.GetParameterController + this.LoginParametersMethod, params)
            .map(this.extractBooleanData)
            .catch(this.catchError);

    }



    private extractDataLogin(res: any) {
        var AuthReturn: boolean = false
        sessionStorage.setItem('currentUser', JSON.stringify(res));
        if (res.access == true) AuthReturn = true
        return AuthReturn;
    }

    public extractToken(res: Response) {
        var TokenRequest = new TokenBuilder().BuilderFromObject(res.json()).Build()
        return TokenRequest
    }
    private extractBooleanData(res: Response) {
        var result: boolean = res.json()
        return result
    }



    private catchError(error) {
        let errMsg: string;
        const body = JSON.parse(error._body);
        if (body) {
            errMsg = body.error
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(error);
        return Promise.reject(errMsg);
    }


    public VerificarUsuarioCreado(usuario: UserAutentication): Observable<boolean> {
        this.LoginParametersMethod = 'VerificarUsuarioCreado';
        const Authenticate: boolean = false;
        const params = JSON.stringify(usuario)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${AppSettings.Global().EndPoints.API}` + this.GetParameterController + this.LoginParametersMethod, params)
            .map(x => { return Boolean(x); })
            .catch(this.catchError);

    }

    public VerificarUsuarioActivo(usuario: UserAutentication): Observable<boolean> {
        this.LoginParametersMethod = 'VerificarUsuarioActivo';
        const Authenticate: boolean = false;
        const params = JSON.stringify(usuario)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`${AppSettings.Global().EndPoints.API}` + this.GetParameterController + this.LoginParametersMethod, params)
            .map(x => { return Boolean(x); })
            .catch(this.catchError);

    }

    public CrearUsuario(usuario: UserAutentication): Observable<UserAutentication> {
        this.LoginParametersMethod = 'CrearUsuario';
        const Authenticate: boolean = false;
        const params = JSON.stringify(usuario)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');



        const httpOptions = this.HeaderBuilder.HeadNow()
        return this.http.post<UserAutentication>(`${AppSettings.Global().API}` + this.GetParameterController + this.LoginParametersMethod, params, httpOptions)
            .catch(this.catchError);

    }
    public VerUsuarios(): Observable<Array<Usuario>> {
        this.LoginParametersMethod = 'VerUsuarios';
        const params = JSON.stringify("")
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const httpOptions = this.HeaderBuilder.HeadNow()
        return this.http.post<Array<Usuario>>(`${AppSettings.Global().API}` + '/Subasta/' + this.LoginParametersMethod, params, httpOptions)
            .catch(this.catchError);

    }

    ActivarUsuario(Usuario):  Observable<Usuario> {
        this.LoginParametersMethod = 'ActivarUsuario';
        const params = JSON.stringify(Usuario)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const httpOptions = this.HeaderBuilder.HeadNow()
        return this.http.post<Usuario>(`${AppSettings.Global().API}` + this.GetParameterController + this.LoginParametersMethod, params, httpOptions)
            .catch(this.catchError);
    }





}


