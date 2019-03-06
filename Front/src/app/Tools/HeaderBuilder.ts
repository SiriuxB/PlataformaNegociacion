import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class HeaderBuilder {
    public HeadNow(UserId?: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Userid': UserId == undefined ? btoa("0") : btoa(UserId.toString()),
            })
        };
        return httpOptions
    }


}
