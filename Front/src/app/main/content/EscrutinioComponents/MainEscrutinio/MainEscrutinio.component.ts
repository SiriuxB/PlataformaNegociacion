import { Component, OnInit } from '@angular/core';
import { E_Reunion } from 'app/Models/E_Reunion';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { ImageService } from 'app/ApiServices/ImageServices';
import { E_Imagen } from 'app/Models/E_Imagen';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ReunionService } from 'app/ApiServices/ReunionService';
import { E_Comentarios } from 'app/Models/E_Comentarios';
import { UserService } from 'app/ApiServices/UserService';
import { E_Usuario } from 'app/Models/E_Usuario';
import { Router } from '@angular/router';

@Component({
    selector: 'MainEscrutinio',
    templateUrl: './MainEscrutinio.component.html',
    styleUrls: ['./MainEscrutinio.component.scss']
})
export class MainEscrutinioComponent implements OnInit {

    registerForm: FormGroup;
    imageUrl: string
    dataEvento: E_Reunion = new E_Reunion()
    ImagenGeneral: E_Imagen = new E_Imagen()
    ListComentarios: Array<E_Comentarios> = new Array<E_Comentarios>()
    registerFormErrors: any;
    constructor(private NavigationData: NavigationInfoService,
        private Router: Router
    ) {


    }


    ngOnInit(): void {
      
    }

 
}
