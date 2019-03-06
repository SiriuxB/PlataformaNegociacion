import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_Municipios } from 'app/Models/E_Municipios';

import { PhotoTool } from 'app/Tools/PhotoTool';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'app/ApiServices/UserService';

import { E_Usuario } from 'app/Models/E_Usuario';
import { Router } from '@angular/router';
import { ImageService } from 'app/ApiServices/ImageServices';
import { E_Imagen } from 'app/Models/E_Imagen';

import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Cliente } from 'app/Models/E_Cliente';
import { AppSettings } from 'app/app.settings';
import { GenerateMask } from 'app/Tools/MaskedLibrary';


@Component({
    selector: 'UserInfo',
    templateUrl: './UserInfo.component.html',
    styleUrls: ['./UserInfo.component.scss'],
    animations: fuseAnimations
})
export class UserInfoComponent implements OnInit {
    image: string;
    showerrorFile: boolean;
    ClienteInfo: E_Cliente = new E_Cliente()
    constructor(
        private userservice: UserService
    ) {

    }


    ngOnInit() {
    
        this.image= this.userservice.GetCurrentCurrentUserNow().Imagen
        var x: number = this.userservice.GetCurrentCurrentUserNow().Id_Cliente
        var y: E_Cliente = new E_Cliente()
        y.Id = x
        this.userservice.ClientexId(y).subscribe((x: E_Cliente) => {
            this.ClienteInfo = x
        })


    }

}
