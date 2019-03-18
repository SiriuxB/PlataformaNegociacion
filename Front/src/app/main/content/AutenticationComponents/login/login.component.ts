import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { AppSettings } from '../../../../app.settings';
import { LoginService } from 'app/ApiServices/login.service';
import { infodialogComponent } from '@fuse/components/info-dialog/info-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
//import { AppSettings } from '../../../../models/AppSettings.model';
import * as _ from 'lodash';
import { UserAutentication } from 'app/models/UserAutentication';
import { AppEnumerations } from 'app/enumerations/appEnumerations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'fuse-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations
})
export class FuseLoginComponent implements OnInit {
    IsAdmin: boolean
    Loading: boolean;
    errorLogin: boolean;
    @ViewChild("jojo") jojo: ElementRef
    loginForm: FormGroup;
    loginFormErrors: any;
    public jey: string;
    User: UserAutentication;
    confirmDialogRef: MatDialogRef<infodialogComponent>;
    confirmDialogRefConfirm: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private Router: Router,
        private RouterActive: ActivatedRoute,
        private LoginService: LoginService,
        private Matdialog: MatDialog,
    ) {
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });
    }


    onLoginFormValuesChanged() {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }

        //   ;
    }
    ngOnInit() {
        sessionStorage.removeItem('currentUser')
        var x = this.RouterActive.root.snapshot.queryParamMap.get("tk")
        if (_.isNil(x)) {
            this.MostrarMensaje("Usuario no permitido", true);
        }
        else {
            this.logInWithTokenExternal(x)
        }

        // this.Router.routerState.root.queryParamMap.subscribe(
        //     data => this.logInWithTokenExternal(data),
        //     errno => console.log(errno)
        // )
        //http://localhost:4200/login?tk=c042e11f-b9d8-4f94-9e98-d95f36345384

        /*   var Params :Array<string> = []
           let word = "login?"
           var urlAccess = this.route.url.substring(this.route.url.indexOf(word)+word.length,this.route.url.length) 
           urlAccess = urlAccess.replace("=","")
        
           Params=atob(urlAccess).split(";") 
           alert(Params)
           console.log(Params)
           
       */
    }

    private MostrarMensaje(mensaje: string, expulsar: boolean = false) {
        this.confirmDialogRef = this.Matdialog.open(infodialogComponent, {});
        this.confirmDialogRef.componentInstance.confirmMessage = mensaje;
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (expulsar) {
                window.location.replace("https://www.bolsamercantil.com.co");
            }
        });
    }

    private logInWithTokenExternal(params: any): void {
        if (params) {
            console.log(params)
            this.LoginService.SearchToken(params)
                .subscribe(
                    (resp: boolean) => {
                        this.accessHome(resp)
                    },
                )
        }
    }
    /*
    else {
      if (localStorage.getItem('currentUser')) {
        this.accessHome(true)
      }
    }*/



    public accessHome(LoginAccessRequest: boolean) {
        if (LoginAccessRequest == true) {
            this.User = JSON.parse(sessionStorage.getItem('currentUser'));
            debugger
            if (this.User.Activo) {
                this.RedirigirPerfil(this.User.Roll);
            } else if (this.User.Roll == AppEnumerations.GasProfile.Administrador || this.User.Roll == AppEnumerations.GasProfile.Subastador) {
                this.User.Activo = true;
                this.LoginService.CrearUsuario(this.User).subscribe(x => {
                    if (x.Id > 0) {
                        sessionStorage.setItem('currentUser', JSON.stringify(this.User))
                        this.RedirigirPerfil(this.User.Roll);
                    }
                })
            }
            else if (this.User.Id == 0 && (this.User.Roll == AppEnumerations.GasProfile.Comprador || this.User.Roll == AppEnumerations.GasProfile.Vendedor)) {

                this.confirmDialogRefConfirm = this.Matdialog.open(FuseConfirmDialogComponent, {});
                this.confirmDialogRefConfirm.componentInstance.confirmMessage = AppSettings.Global().MensajeNoregistrado;
                this.confirmDialogRefConfirm.afterClosed().subscribe(result => {
                    if (result) {
                        this.LoginService.CrearUsuario(this.User).subscribe(x => {
                            if (x) {
                                this.MostrarMensaje(AppSettings.Global().MensajeAprobacion, true)
                            }
                            else {
                                window.location.replace("https://www.bolsamercantil.com.co");
                            }
                        })
                    }
                    else {
                        window.location.replace("https://www.bolsamercantil.com.co");
                    }
                });
            } else if (this.User.Id > 0 && this.User.Activo == false && (this.User.Roll == AppEnumerations.GasProfile.Comprador || this.User.Roll == AppEnumerations.GasProfile.Vendedor)) {
                this.MostrarMensaje(AppSettings.Global().MensajeAprobacion, true)
            }
        }




    }
    private RedirigirPerfil(Roll) {
        if (Roll == AppEnumerations.GasProfile.Administrador || Roll == AppEnumerations.GasProfile.Subastador) {
            this.Router.navigate(['/Participantes']);
        } else if (Roll == AppEnumerations.GasProfile.Comprador || Roll == AppEnumerations.GasProfile.Vendedor) {
            this.Router.navigate(['/LayoutMercado']);
        }
    }

    returnLogin() {
        // localStorage.clear()
        sessionStorage.clear()
        // window.location.replace(AppSettings.UrlSegas);
        //this.route.navigate(['/Select'])
    }
}
