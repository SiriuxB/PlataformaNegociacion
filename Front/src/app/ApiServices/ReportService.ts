
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app.settings';
import { E_Usuario } from '../Models/E_Usuario';
import { UsuarioBuilder } from '../Builders/Usuario.model.builder';
import { E_Departamentos } from '../Models/E_Departamentos';
import { DepartamentosBuilder } from '../Builders/Departamentos.model.builder';
import { E_Municipios } from '../Models/E_Municipios';
import { MunicipiosBuilder } from '../Builders/Municipios.model.builder';
import { E_TipoReunion } from '../Models/E_TipoReunion';

import { E_Sector } from '../Models/E_Sector';
import { SectorBuilder } from '../Builders/Sector.model.builder';
import { E_TipoIndividuo1 } from '../Models/E_TipoIndividuo1';
import { TipoIndividuo1Builder } from '../Builders/TipoIndividuo1.model.builder';
import { E_TipoIndividuo2 } from '../Models/E_TipoIndividuo2';
import { TipoIndividuo2Builder } from '../Builders/TipoIndividuo2.model.builder';
import { E_ZonaElectoral } from '../Models/E_ZonaElectoral';
import { ZonaElectoralBuilder } from '../Builders/ZonaElectoral.model.builder';
import { E_PuestoVotacion } from '../Models/E_PuestoVotacion';
import { PuestoVotacionBuilder } from '../Builders/PuestoVotacion.model.builder';
import { E_Mesa } from '../Models/E_Mesa';
import { MesaBuilder } from 'app/Builders/Mesa.model.builder';
import { UserService } from 'app/ApiServices/UserService';
import { HeaderBuilder } from 'app/Tools/HeaderBuilder';
import { E_ConfiguracionTipoIndividuo } from '../Models/E_ConfiguracionTipoIndividuo';
import { ConfiguracionTipoIndividuoBuilder } from '../Builders/ConfiguracionTipoIndividuo.model.builder';
import { E_TipoAntecedente } from '../Models/E_TipoAntecedente';
import { TipoAntecedenteBuilder } from '../Builders/TipoAntecedente.model.builder';
import { E_TipoEstadoRevision } from '../Models/E_TipoEstadoRevision';
import { E_ItemsMetas } from '../Models/E_ItemsMetas';
import { ItemsMetasBuilder } from '../Builders/ItemsMetas.model.builder';
import { E_DirectorDepartamento } from '../Models/E_DirectorDepartamento';
import { DirectorDepartamentoBuilder } from '../Builders/DirectorDepartamento.model.builder';
import { E_Metas } from '../Models/E_Metas';
import { MetasBuilder } from '../Builders/Metas.model.builder';
import { E_TipoImpugnacion } from '../Models/E_TipoImpugnacion';
import { E_SitioEscrutino } from '../Models/E_SitioEscrutino';
import { SitioEscrutinoBuilder } from '../Builders/SitioEscrutino.model.builder';

@Injectable()
export class ParameterService {
    constructor(private Http: HttpClient, private UserService: UserService, private HeaderBuilder: HeaderBuilder) { }
    private UrlNow: string = AppSettings.Global().API
    private textarea: HTMLTextAreaElement;

    /** Copy the text value to the clipboard. */
    listarDepartamentos(): Observable<Array<E_Departamentos>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Admin/listarDepartamentos"
            , request, httpOptions).map(this.ExtractDeparatamentos)
    }

    ListarMunicipios(): Observable<Array<E_Municipios>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Admin/ListarMunicipios"
            , request, httpOptions).map(this.ExtractMunicipios)
    }

    listarTipoIndividuo1(): Observable<Array<E_TipoIndividuo1>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Individuo/listarTipoIndividuo1"
            , request, httpOptions).map(this.ExtractTipoIndividuo1)
    }
    listarTipoIndividuo2(): Observable<Array<E_TipoIndividuo2>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Individuo/ListarTipoIndividuo2"
            , request, httpOptions).map(this.ExtractTipoIndividuo2)
    }

    listarTipoAntecedente(): Observable<Array<E_TipoAntecedente>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Admin/listarTipoAntecedente"
            , request, httpOptions).map(this.ExtractTipoAntecedente)
    }


    ListarSector(objSector: E_Sector): Observable<Array<E_Sector>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(objSector)
        return this.Http.post(this.UrlNow + "Admin/listarSector"
            , request, httpOptions).map(this.ExtractSector)
    }

    ListarZonaElectoral(): Observable<Array<E_ZonaElectoral>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Admin/ListarZonaElectoral"
            , request, httpOptions).map(this.ExtractZonaElectoral)
    }

    listarZonasxMunicipio(obj: E_ZonaElectoral): Observable<Array<E_ZonaElectoral>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(obj)
        return this.Http.post(this.UrlNow + "Admin/listarZonasxMunicipio"
            , request, httpOptions).map(this.ExtractZonaElectoral)
    }
    listarMesasxPuesto(obj: E_Mesa): Observable<Array<E_Mesa>> {
        var IdUser = this.UserService.GetCurrentCurrentUserNow().Id
        const httpOptions = this.HeaderBuilder.HeadNow(IdUser)
        var request = JSON.stringify(obj)
        return this.Http.post(this.UrlNow + "Admin/listarMesasxPuesto"
            , request, httpOptions).map(this.ExtractMesas)
    }
    listarPuestosVotacionxZona(obj: E_PuestoVotacion): Observable<Array<E_PuestoVotacion>> {
        var IdUser = this.UserService.GetCurrentCurrentUserNow().Id
        const httpOptions = this.HeaderBuilder.HeadNow(IdUser)
        var request = JSON.stringify(obj)
        return this.Http.post(this.UrlNow + "Admin/listarPuestosVotacionxZona"
            , request, httpOptions).map(this.ExtractPuestoVotacion)
    }

    ListarConfTipoIndividuo(): Observable<Array<E_ConfiguracionTipoIndividuo>> {
        var IdUser = this.UserService.GetCurrentCurrentUserNow().Id
        const httpOptions = this.HeaderBuilder.HeadNow(IdUser)
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Admin/ListarConfTipoIndividuo"
            , request, httpOptions).map(this.ExtraerConfiguracionIndividuo)
    }
    


    ListarPuestoVotacion(): Observable<Array<E_PuestoVotacion>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Admin/ListarPuestoVotacion"
            , request, httpOptions).map(this.ExtractPuestoVotacion)
    }

    ListarTipoReunion(E_TipoReunion: E_TipoReunion): Observable<Array<E_TipoReunion>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(E_TipoReunion)
        return this.Http.post(this.UrlNow + "Admin/ListarTipoReunion"
            , request, httpOptions).map(this.ExtractTipoReunion)
    }


    ExtraerConfiguracionIndividuo(res: any): Array<E_ConfiguracionTipoIndividuo> {
        var x: Array<E_ConfiguracionTipoIndividuo> = new Array<E_ConfiguracionTipoIndividuo>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new ConfiguracionTipoIndividuoBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }
    ExtractMesas(res: any): Array<E_Mesa> {
        var x: Array<E_Mesa> = new Array<E_Mesa>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new MesaBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }
    listarTipoEstadoRevision(): Observable<Array<E_TipoEstadoRevision>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(E_TipoReunion)
        return this.Http.post(this.UrlNow + "Admin/ListarTipoEstadoRevision"
            , "", httpOptions).map(this.ExtractTipoEstadoRevision)
    }

    ExtractTipoEstadoRevision(res: any): Array<E_TipoEstadoRevision> {

        var x: Array<E_TipoEstadoRevision> = new Array<E_TipoEstadoRevision>()
        if (res != null) {

            res.forEach((element) => {
                var y: E_TipoEstadoRevision = new E_TipoEstadoRevision()
                y = element
                x.push(y)
            });

        }
        return x
    }

    ExtractTipoReunion(res: any): Array<E_TipoReunion> {

        var x: Array<E_TipoReunion> = new Array<E_TipoReunion>()
        if (res != null) {

            res.forEach((element) => {
                var y: E_TipoReunion = new E_TipoReunion()
                y = element
                x.push(y)
            });

        }
        return x
    }

    ExtractMunicipios(res: any): Array<E_Municipios> {

        var x: Array<E_Municipios> = new Array<E_Municipios>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new MunicipiosBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }
    ExtractDeparatamentos(res: any): Array<E_Departamentos> {

        var x: Array<E_Departamentos> = new Array<E_Departamentos>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new DepartamentosBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }
    ExtractSector(res: any): Array<E_Sector> {

        var x: Array<E_Sector> = new Array<E_Sector>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new SectorBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }
    ExtractTipoIndividuo1(res: any): Array<E_TipoIndividuo1> {

        var x: Array<E_TipoIndividuo1> = new Array<E_TipoIndividuo1>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new TipoIndividuo1Builder().buildFromObject(element).Build())
            });

        }
        return x
    }
    ExtractTipoAntecedente(res: any): Array<E_TipoAntecedente> {

        var x: Array<E_TipoAntecedente> = new Array<E_TipoAntecedente>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new TipoAntecedenteBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }
    ExtractTipoIndividuo2(res: any): Array<E_TipoIndividuo2> {

        var x: Array<E_TipoIndividuo2> = new Array<E_TipoIndividuo2>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new TipoIndividuo2Builder().buildFromObject(element).Build())
            });

        }
        return x
    }
    ExtractZonaElectoral(res: any): Array<E_ZonaElectoral> {

        var x: Array<E_ZonaElectoral> = new Array<E_ZonaElectoral>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new ZonaElectoralBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }
    ExtractPuestoVotacion(res: any): Array<E_PuestoVotacion> {

        var x: Array<E_PuestoVotacion> = new Array<E_PuestoVotacion>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new PuestoVotacionBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }
    ExtractItemsMetas(res: any): Array<E_ItemsMetas> {

        var x: Array<E_ItemsMetas> = new Array<E_ItemsMetas>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new ItemsMetasBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }

    ExtractDirectorDepartamento(res: any): Array<E_DirectorDepartamento> {

        var x: Array<E_DirectorDepartamento> = new Array<E_DirectorDepartamento>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new DirectorDepartamentoBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }

    ExtractMetas(res: any): Array<E_Metas> {

        var x: Array<E_Metas> = new Array<E_Metas>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new MetasBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }    

/*    ExtractTipoImpugnacion(res: any): Array<E_TipoImpugnacion> {

        var x: Array<E_TipoImpugnacion> = new Array<E_TipoImpugnacion>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new MetasBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }*/

    ExtractSitioEscrutino(res: any): Array<E_SitioEscrutino> {

        var x: Array<E_SitioEscrutino> = new Array<E_SitioEscrutino>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new SitioEscrutinoBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }

    ExtractMesa(res: any): Array<E_Mesa> {

        var x: Array<E_Mesa> = new Array<E_Mesa>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new MesaBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }

   listarMetasxDirexFechasxActiva(obj :E_Metas): Observable<Array<E_Metas>> {
        ;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }; 
        var request = JSON.stringify(obj)
        return this.Http.post(this.UrlNow + "Admin/listarMetasxDirexFechasxActiva"
            , request, httpOptions).map(this.ExtractMetas)
    }
      ListarItemsMetas(): Observable<Array<E_ItemsMetas>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Admin/listarItems"
            , request, httpOptions).map(this.ExtractItemsMetas)
    }

    ListarDirectorDepartamento(): Observable<Array<E_DirectorDepartamento>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Admin/listarDirectorDepartamento"
            , request, httpOptions).map(this.ExtractDirectorDepartamento)
    }

    ListarDirectorDepartamentoxIdGerenteSector(obj :E_DirectorDepartamento): Observable<Array<E_DirectorDepartamento>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(obj)
        return this.Http.post(this.UrlNow + "Admin/ListarDirectorDeptoxGerente"
            , request, httpOptions).map(this.ExtractDirectorDepartamento)
    }

    

 /*   listarTipoImpugnacion(): Observable<Array<E_TipoImpugnacion>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };    
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Admin/listarTipoImpugnacion"
            , request, httpOptions).map(this.ExtractMetas)
    }*/

    listarSitioEscrutino(): Observable<Array<E_SitioEscrutino>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Admin/listarSitioEscrutino"
            , request, httpOptions).map(this.ExtractSitioEscrutino)
    }

    listarMesasxIdPuestoVotacion(obj :E_Mesa): Observable<Array<E_Mesa>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(obj)
        return this.Http.post(this.UrlNow + "Admin/listarMesasxIdPuestoVotacion"
            , request, httpOptions).map(this.ExtractMesa)
    }

}


