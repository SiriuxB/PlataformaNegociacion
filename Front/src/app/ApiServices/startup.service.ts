import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StartupService {

    private _startupData: any;

    private jsonFileURL: string = "assets/Data/AppSettings.Json";
    private static jsonFileURLStatic: string = "assets/Data/AppSettings.Json";
    constructor(private http: Http) { }


    public static loadParametry(EsMobile: boolean = false) {
        return new Promise((resolve, reject) => {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', this.jsonFileURLStatic, true);
            xobj.onreadystatechange = () => {
                if (xobj.readyState == 4) {
                    if (xobj.status == 200) {
                        
                        const Parameters = JSON.parse(xobj.responseText).Firmas[JSON.parse(xobj.responseText).IndexSeleccionado]
                        sessionStorage.setItem("Global", JSON.stringify(Parameters));
                        resolve();
                    }
                    else {
                        reject("error al cargar parametros");
                    }
                }
            }
            xobj.send(null);
        });
    }


 
    private handleError(errorResponse: Response) {
        console.log(errorResponse.statusText);
        return Observable.throw(errorResponse.json().error || "error al cargar parametros");
    }
    private extractParameter(Response: Response, EsMobile: boolean) {
        const Parameters = Response.json().Firmas[Response.json().FirmaSeleccionada]
        Parameters.Global[0].EsMobile = EsMobile
        sessionStorage.setItem("Global", JSON.stringify(Parameters.Global));
        sessionStorage.setItem("LookAndFeel", JSON.stringify(Parameters.LookAndFeel));
        return true
    }

    get startupData(): any {
        return this._startupData;
    }
}