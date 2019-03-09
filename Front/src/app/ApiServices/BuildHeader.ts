
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
@Injectable()
export class BuildHeaderService {
    constructor() { }


    public Build(ObjUser?: any, Multipart: boolean = false, ) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let options = new RequestOptions({ headers: headers });
        return options;
    }


}
