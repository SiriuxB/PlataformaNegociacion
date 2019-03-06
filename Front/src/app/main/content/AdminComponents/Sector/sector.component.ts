import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AdminServices } from 'app/ApiServices/AdminServices';
import { Router } from '@angular/router';
import { UserService } from '../../../../ApiServices/UserService';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_Sector } from '../../../../Models/E_Sector';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
@Component({
    moduleId: module.id,
    selector: 'sector',
    templateUrl: 'sector.component.html',
    styleUrls: ['sector.component.scss']
})
export class SectorComponent implements OnInit {
    SucceSave: boolean;
    dataURL: any;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    DepartamentoSeleccionado: any
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    ListDepartamentos: Array<E_Departamentos> = new Array<E_Departamentos>()
    public Nombre: string;
    public descripcion: string;
    public checkedActivo;
    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private Matdialog: MatDialog,
        private AdminServices: AdminServices,
        private Router: Router,
        private UserService: UserService
    ) {

        this.formErrors = {
            Nombre: {},
            Departamentos: {},
            checkedActivo: {}
        };

    }

    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/mainpageadmin'])
    }
    ngOnInit() {
        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal
        this.ParameterService.listarDepartamentos()
            .subscribe((x: Array<E_Departamentos>) => {
                this.ListDepartamentos = x
            })

        this.form = this.formBuilder.group({
            Nombre: ['', [Validators.required]],
            Departamentos: [undefined, [Validators.required]],
            checkedActivo: [undefined, [Validators.required]]
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

        var objSector: E_Sector = new E_Sector()
        objSector.Nombre = this.form.value.Nombre
        objSector.Activo = this.form.value.checkedActivo
        objSector.FechaCreacion = new Date();
        objSector.Id_departamento = this.form.value.Departamentos
        this.confirmDialogRef = this.Matdialog.open(FuseConfirmDialogComponent, {})
        this.confirmDialogRef.componentInstance.confirmMessage = '¿Estas seguro de realizar esta acción?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.AdminServices.crearSector(objSector).subscribe((x: boolean) => {
                    this.SucceSave = x
                    this.CleanForm()
                })
            }
            this.confirmDialogRef = null;
        });



    }
    CleanForm() {
        this.form.setValue({ Nombre: "", checkedActivo: false, Departamentos: 0 })
    }


}

