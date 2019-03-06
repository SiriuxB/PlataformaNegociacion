

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { UserService } from 'app/ApiServices/UserService';
import { E_Usuario } from 'app/Models/E_Usuario';
import { PhotoTool } from 'app/Tools/PhotoTool';

@Component({
    moduleId: module.id,
    selector: 'cambiar-clave',
    templateUrl: 'cambiar-clave.component.html',
    styleUrls: ['cambiar-clave.component.scss'],
    animations: fuseAnimations
})
export class CambiarClaveComponent {
    public email:string;
    public usu:E_Usuario;
    public clave:string;
    public clave2:string;
    public divclaves:boolean;
    public resultado:string;
    public Loading:boolean;
    constructor(public UserService:UserService,private fuseConfig: FuseConfigService,private Router:Router
    ) {
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });
if(this.UserService.GetCurrentCurrentUserNow() != undefined){
            if(this.UserService.GetCurrentCurrentUserNow().CambiarClave){
                this.email=this.UserService.GetCurrentCurrentUserNow().UserName;
                this.divclaves=true;;
    
                var user: E_Usuario = new E_Usuario();
                user.Email = this.email.trim(); 
                this.Loading=true;
                this.UserService.validarEmail(user).subscribe((x: E_Usuario) => {
                    ;
                    if (x.UserName != undefined) {
                        this.usu = x;
                        this.divclaves=true;
                        this.resultado="";
                        this.Loading=false;
                    }else{
                        this.resultado="EL usuario no existe.";
                        this.Loading=false;
                    }            
                })
                
            }else{
                this.divclaves=false;;
            }
        }else{
            this.divclaves=false;;
        }
     
    }


    validar(){
        ;
        var user: E_Usuario = new E_Usuario();
        user.Email = this.email.trim();
        this.Loading=true;
        this.UserService.validarEmail(user).subscribe((x: E_Usuario) => {
            ;
            if (x.UserName != undefined) {
                this.usu = x;
                this.divclaves=true;
                this.resultado="";
                this.Loading=false;
            }else{
                this.resultado="EL usuario no existe.";
                this.Loading=false;
            }            
        })
    }

    validarclave(){
        ;
        if(this.clave != this.clave2){
            this.resultado="Las constraseñas no coinciden.";
        }else{
            this.resultado=""
        }

    }
    cambiar(){
        ; 
        if(this.clave != this.clave2){
            this.resultado="Las constraseñas no coinciden.";
            return;
        }else{
            this.resultado=""
        }       
        this.usu.Passwordd = btoa(this.clave)
        this.usu.CambiarClave=false;
        this.Loading=true;
        this.UserService.cambiarClave(this.usu).subscribe((x: boolean) => {
            ;
            if (x) {
                this.Loading=false;
                this.resultado="Contraseña Actualizada"
                setTimeout(() => {
                    this.Router.navigate(["/login/"])
                }, 2000)
            }else{
                this.resultado="Ocurrio un error. intente de nuevo";
                this.Loading=false;
            }            
        })
    }
}
