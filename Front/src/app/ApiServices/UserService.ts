
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app.settings';
import { E_Usuario } from '../Models/E_Usuario';
import { UsuarioBuilder } from '../Builders/Usuario.model.builder';
import { E_Cliente } from '../Models/E_Cliente';
import { HeaderBuilder } from '../Tools/HeaderBuilder';
import { ClienteBuilder } from '../Builders/Cliente.model.builder';

@Injectable()
export class UserService {
    constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder) { }
    private UrlNow: string = AppSettings.Global().API
    private textarea: HTMLTextAreaElement;

    /** Copy the text value to the clipboard. */
    Login(User: E_Usuario): Observable<E_Usuario> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(User)
        return this.Http.post(this.UrlNow + "Usuario/UsuarioxNombreyPass"
            , request, httpOptions).map(this.ExtractDataUserValid)
    }

    validarEmail(User: E_Usuario): Observable<E_Usuario> {
        //var IdUser = this.GetCurrentCurrentUserNow().Id
        ;
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(User)
        return this.Http.post(this.UrlNow + "Usuario/UsuarioxEmail"
            , request, httpOptions).map(this.ExtractDataUserValid)
    }

    
    UsuarioxNombre(User: E_Usuario): Observable<E_Usuario> {
        //var IdUser = this.GetCurrentCurrentUserNow().Id
        ;
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(User)
        return this.Http.post(this.UrlNow + "Usuario/UsuarioxNombre"
            , request, httpOptions).map(this.ExtractDataUser)
    }


    cambiarClave(User: E_Usuario): Observable<boolean> {
        var IdUser = this.GetCurrentCurrentUserNow().Id
            ;
        const httpOptions = this.HeaderBuilder.HeadNow(IdUser)
        var request = JSON.stringify(User)
        return this.Http.post(this.UrlNow + "Usuario/cambiarContrasena"
            , request, httpOptions).map(this.EvalBool)
    }

    ClientexId(User: E_Cliente): Observable<E_Cliente> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(User)
        return this.Http.post(this.UrlNow + "Cliente/ClientexId"
            , request, httpOptions).map(this.ExtractDataClient)
    }

    crearCliente(CLient: E_Cliente): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Cliente/crearCliente"
            , request, httpOptions).map(this.EvalBool)
    }

    ClientexCedula(CLient: E_Cliente): Observable<E_Cliente> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Cliente/ClientexCedula"
            , request, httpOptions).map(this.ExtractDataClient)
    }

    crearUsuario(User: E_Usuario): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(User)
        return this.Http.post(this.UrlNow + "Usuario/crearUsuario"
            , request, httpOptions).map(this.EvalBool)
    }

    ExtractDataClient(res: Response): E_Cliente {

        var x: E_Cliente = new E_Cliente()

        if (res != null) { x = new ClienteBuilder().buildFromObject(res).Build() }
        return x
    }

    EvalBool(res: any): boolean {
        var a: boolean = res
        return a
    }


    ExtractDataUser(res: Response): E_Usuario {

        var x: E_Usuario = new E_Usuario()
        if (res != null) { x = new UsuarioBuilder().buildFromObject(res).Build() }
        return x
    }
    ExtractDataUserValid(res: object): E_Usuario {
        
        var x: E_Usuario = new E_Usuario()

        if (res != null) { x = new UsuarioBuilder().buildFromObject(res).Build() }
        if (x.error != undefined) {
            if (x.error.Id == 1) {
                sessionStorage.removeItem("CurrentUser")
                return x
            }
        }
        sessionStorage.setItem("CurrentUser", JSON.stringify(x))
        return x
    }

    GetCurrentCurrentUserNow(): E_Usuario {
        var retrievedObject = sessionStorage.getItem('CurrentUser');
        var x: E_Usuario = JSON.parse(retrievedObject)
        return x
    }
    ClearCurrentCurrentUserNow() {
        sessionStorage.removeItem("CurrentUser")
    }


}


