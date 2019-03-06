import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AdminServices } from 'app/ApiServices/AdminServices';
import { Router } from '@angular/router';
import { UserService } from '../../../../ApiServices/UserService';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_ItemsMetas } from 'app/Models/E_ItemsMetas';
import { E_Municipios } from 'app/Models/E_Municipios';

@Component({
    moduleId: module.id,
    selector: 'items-metas',
    templateUrl: 'items-metas.component.html',
    styleUrls: ['items-metas.component.scss']
})
export class ItemsMetasComponent implements OnInit {
    SucceSave: boolean;   
    checked:any
    dataURL: any;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    public Nombre: string;
    public descripcion: string;
    public checkedActivo;
    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private dialog: MatDialog,
        private AdminServices: AdminServices,
        private Router: Router,
        private UserService: UserService
    ) {
                
        this.formErrors = {           
            Nombre: {}
        };

    }

    ReturnPage(event:Event){
        event.preventDefault();
        this.Router.navigate(['/mainpageadmin'])
     }
    ngOnInit() {
        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal
      
       
        this.form = this.formBuilder.group({
            Nombre: ['', [Validators.required]]       
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

    }

    onFormValuesChanged() {

        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }  

   

    EnviarInfo() {
        var objItemsMetas: E_ItemsMetas = new E_ItemsMetas()        
        objItemsMetas.Nombre = this.form.value.Nombre          
        objItemsMetas.Activo = this.form.value.checkedActivo
        objItemsMetas.FechaCreacion = new Date();
                       
        this.AdminServices.crearItemsMetas(objItemsMetas).subscribe((x: boolean) => { this.SucceSave = x })

    }


}

