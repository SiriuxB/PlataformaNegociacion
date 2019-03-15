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
    User: any;
    confirmDialogRef: MatDialogRef<infodialogComponent>;
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
            this.IngresoInvalido();
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

    private IngresoInvalido() {
        this.confirmDialogRef = this.Matdialog.open(infodialogComponent, {});
        this.confirmDialogRef.componentInstance.confirmMessage = 'Usuario no permitido';
        this.confirmDialogRef.afterClosed().subscribe(result => {
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
            if (this.User != undefined) {
                this.Router.navigate(['/LayoutMercado'])
            }
        }
        else {
            this.IngresoInvalido();

        }
    }
    returnLogin() {
        // localStorage.clear()
        sessionStorage.clear()
        // window.location.replace(AppSettings.UrlSegas);
        //this.route.navigate(['/Select'])
    }
}
