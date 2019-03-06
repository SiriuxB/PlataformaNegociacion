import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AdminServices } from 'app/ApiServices/AdminServices';
import { Router } from '@angular/router';
import { UserService } from '../../../../ApiServices/UserService';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_Metas } from 'app/Models/E_Metas';
import { E_Municipios } from 'app/Models/E_Municipios';
import { E_ItemsMetas } from '../../../../Models/E_ItemsMetas';
import { E_DirectorDepartamento } from '../../../../Models/E_DirectorDepartamento';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { E_GerenteSector } from '../../../../Models/E_GerenteSector';
import { E_Usuario } from 'app/Models/E_Usuario';
import { E_Canal } from '../../../../Models/E_Canal';
import { E_TipoCanal } from '../../../../Models/E_TipoCanal';
import { E_MetasCall } from '../../../../Models/E_MetasCall';
import { E_CallCenter } from '../../../../Models/E_CallCenter';

@Component({
    moduleId: module.id,
    selector: 'metas-call',
    templateUrl: 'metas-call.component.html',
    styleUrls: ['metas-call.component.scss']
})
export class MetasCallComponent implements OnInit{
    SaveInProgress: boolean;
    SucceSave: boolean;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    listCanal: Array<E_Canal> = new Array<E_Canal>()
    listTipoCanal: Array<E_TipoCanal> = new Array<E_TipoCanal>()
    listCallCenter: Array<E_CallCenter> = new Array<E_CallCenter>()
    

    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private Matdialog: MatDialog,

        private AdminServices: AdminServices,
        private Router: Router,
        private UserService: UserService
    ) {
        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal
        this.formErrors = {
            Nombre: {},
            Descripcion: {},
            Cantidad: {},
            CallCenter: {},
            Canal: {},
            TipoCanal: {},
            FechaInicio: {},
            FechaFin: {}
        };

    }


    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/mainpageadmin'])
    }

    ngOnInit() {

        var User: E_Usuario = this.UserService.GetCurrentCurrentUserNow()
        var objGerente: E_GerenteSector = new E_GerenteSector()
        objGerente.Correo = User.UserName
        var objDirectorDepartamento: E_DirectorDepartamento = new E_DirectorDepartamento()
        this.AdminServices.listarCanal()
            .subscribe((x: Array<E_Canal>) => {
                this.listCanal = x
            })

            this.AdminServices.listarTipoCanal()
            .subscribe((x: Array<E_TipoCanal>) => {
                this.listTipoCanal = x
            })

            this.AdminServices.listarCallCenter()
            .subscribe((x: Array<E_CallCenter>) => {
                this.listCallCenter = x
            })


        this.form = this.formBuilder.group({
            Nombre: ['', [Validators.required]],
            Descripcion: ['', [Validators.required]],
            Cantidad: ['', [Validators.required]],
            CallCenter: [undefined, [Validators.required]],
            Canal: [undefined, [Validators.required]],
            TipoCanal: [undefined, [Validators.required]],
            FechaInicio: ['', [Validators.required]],
            FechaFin: ['', [Validators.required]]
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

    ConfirmData() {
        debugger;
        this.confirmDialogRef = this.Matdialog.open(FuseConfirmDialogComponent, {})
        this.confirmDialogRef.componentInstance.confirmMessage = '¿Estas seguro de realizar esta acción?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) { this.EnviarInfo() }
            this.confirmDialogRef = null;
        });

    }
    EnviarInfo() {
        
        var objCliente: E_MetasCall = new E_MetasCall()
        objCliente.Nombre = this.form.value.Nombre;
        objCliente.Descripcion = this.form.value.Descripcion
        objCliente.Cantidad = this.form.value.Cantidad
        objCliente.Fechaini = this.form.value.FechaInicio
        objCliente.Fechafin = this.form.value.FechaFin
        objCliente.Id_CallCenter = this.form.value.CallCenter
        objCliente.Canal = this.form.value.Canal
        objCliente.TipoCanal = this.form.value.TipoCanal    
        objCliente.Id_Usuario = this.UserService.GetCurrentCurrentUserNow().Id;
        objCliente.Activo =true;
    
        this.SaveInProgress = true

        this.AdminServices.crearMetasCall(objCliente).subscribe((x: boolean) => {
            if (x) {              
                this.SucceSave = x                
                this.clearform()   
                this.SaveInProgress = false;                                       
            }
        })
    }
    clearform() {
        this.form.setValue({
            Nombre: "",
            Descripcion: "",
            Cantidad: 0,
            CallCenter: "",
            Canal: "",
            TipoCanal: "",
            FechaInicio: "",
            FechaFin: ""
        })

    }
}
