import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../ApiServices/UserService';
import { AppSettings } from '../app.settings';

@Injectable()
export class AltaGerenciaGuard implements CanActivate {
    constructor(private UserService: UserService,
        private Router: Router) { }
    canActivate() {
        if (this.UserService.GetCurrentCurrentUserNow() != null) {
            if (this.UserService.GetCurrentCurrentUserNow().Id != undefined) {
                if (this.UserService.GetCurrentCurrentUserNow().Id_Perfil == 14) {
                    return true;
                }
            }
        }

        this.Router.navigate(['/error-404'])
        return false
    }
}