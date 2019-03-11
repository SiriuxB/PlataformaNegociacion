import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppSettings } from '../app.settings';

@Injectable()
export class ClientGuard implements CanActivate {
    private UserService: any
    constructor(
        private Router: Router) { }
    canActivate() {
        if (this.UserService.GetCurrentCurrentUserNow() != null) {
            if (this.UserService.GetCurrentCurrentUserNow().Id != undefined) {
                if (this.UserService.GetCurrentCurrentUserNow().Id_Perfil == 1
                    && AppSettings.Global().TipoAplicacion == 1) {
                    return true;
                }
            }
        }

        this.Router.navigate(['/error-404'])
        return false
    }
}