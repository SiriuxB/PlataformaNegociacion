
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app.settings';
import { E_Usuario } from '../Models/E_Usuario';
import { UsuarioBuilder } from '../Builders/Usuario.model.builder';
import { E_Cliente } from '../Models/E_Cliente';
import { HeaderBuilder } from '../Tools/HeaderBuilder';
import { E_Imagen } from '../Models/E_Imagen';
import { E_Reunion } from '../Models/E_Reunion';
import { UserService } from './UserService';
import { ImagenBuilder } from '../Builders/Imagen.model.builder';
import { E_Like } from '../Models/E_Like';

@Injectable()
export class ImageService {
    constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder
        , private UserService: UserService) { }
    private UrlNow: string = AppSettings.Global().API
    private textarea: HTMLTextAreaElement;

    private setOptions() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
            })
        };
        return httpOptions;
    }




    UploadJsonFile(file): Observable<boolean> {
        const httpOptions = {
            headers: new HttpHeaders({
            })
        };
        return this.Http.post(this.UrlNow + "Imagen/UploadJsonFile"
            , file, this.setOptions()).map((x) => { return true })
    }

    RegistrarImagen(obImg: E_Imagen): Observable<number> {

        var IdUser = this.UserService.GetCurrentCurrentUserNow().Id
        obImg.Id_Usuario = IdUser
        const httpOptions = this.HeaderBuilder.HeadNow(IdUser)
        var request = JSON.stringify(obImg)
        return this.Http.post(this.UrlNow + "Imagen/crearImagen"
            , request, httpOptions).map((x) => { return Number(x) })
    }

    crearReunion(obImg: E_Reunion): Observable<number> {
        var IdUser = this.UserService.GetCurrentCurrentUserNow().Id

        obImg.Id_Usuario = IdUser
        const httpOptions = this.HeaderBuilder.HeadNow(IdUser)
        var request = JSON.stringify(obImg)
        return this.Http.post(this.UrlNow + "Reunion/crearReunion"
            , request, httpOptions).map((x) => { return Number(x) })
    }

    ImagenxReunion(obImg: E_Imagen): Observable<E_Imagen> {
        var IdUser = this.UserService.GetCurrentCurrentUserNow().Id
        const httpOptions = this.HeaderBuilder.HeadNow(IdUser)
        var request = JSON.stringify(obImg)
        return this.Http.post(this.UrlNow + "Imagen/ImagenxReunion"
            , request, httpOptions).map(this.ExtractImageClient)
    }

    ExtractImageClient(res: any): E_Imagen {
        var x: E_Imagen = new E_Imagen()
        if (res[0] != undefined) {
            if (res != null) { x = new ImagenBuilder().buildFromObject(res[0]).Build() }
        }
        return x
    }





    LikesxImagen(x: E_Like): Observable<Array<E_Like>> {
        var IdUser = this.UserService.GetCurrentCurrentUserNow().Id
        const httpOptions = this.HeaderBuilder.HeadNow(IdUser)
        var request = JSON.stringify(x)
        return this.Http.post(this.UrlNow + "Likes/LikesxImagen"
            , request, httpOptions).map(this.ExtractLikes)
    }

    ImagenRandom(): Observable<Array<E_Imagen>> {
        var IdUser = this.UserService.GetCurrentCurrentUserNow().Id
        const httpOptions = this.HeaderBuilder.HeadNow(IdUser)
        return this.Http.post(this.UrlNow + "Imagen/ImagenRandom"
            , "", httpOptions).map(this.ExtractListImageClient)
    }

    ListarImagenesPendientes(): Observable<Array<E_Imagen>> {
        var IdUser = this.UserService.GetCurrentCurrentUserNow().Id
        const httpOptions = this.HeaderBuilder.HeadNow(IdUser)
        return this.Http.post(this.UrlNow + "Imagen/ListarImagenesPendientes"
            , "", httpOptions).map(this.ExtractListImageClient)
    }

    imagenesFiltro(CLient: E_Imagen): Observable<Array<E_Imagen>> {
        ;
        var IdUser = this.UserService.GetCurrentCurrentUserNow().Id
        const httpOptions = this.HeaderBuilder.HeadNow(IdUser)
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Imagen/ImagenFiltrar"
            , request, httpOptions).map(this.ExtractListImageClient)
    }

    ExtractListImageClient(res: any): Array<E_Imagen> {

        var x: Array<E_Imagen> = new Array<E_Imagen>()
        res.forEach(element => {
            x.push(new ImagenBuilder().buildFromObject(element).Build())
        });
        return x
    }

    ExtractLikes(res: any): Array<E_Like> {
        
        var x: Array<E_Like> = new Array<E_Like>()
        x = res
        return x
    }


    aprobarImagen(CLient: E_Imagen): Observable<boolean> {
        ;
        var IdUser = this.UserService.GetCurrentCurrentUserNow().Id
        CLient.Aprobada = true;
        CLient.Id_Usuario = IdUser;
        const httpOptions = this.HeaderBuilder.HeadNow(IdUser)
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Imagen/AprobarImagen", request, httpOptions).map(this.EvalBool)
    }

    EvalBool(res: any): boolean {
        var a: boolean = res
        return a
    }
}


