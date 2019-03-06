import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_TipoReunion } from 'app/Models/E_TipoReunion';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AdminServices } from 'app/ApiServices/AdminServices';
import { E_Municipios } from 'app/Models/E_Municipios';
import { Router } from '@angular/router';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
    moduleId: module.id,
    selector: 'ParamSectores',
    templateUrl: 'ParamSectores.component.html',
    styleUrls: ['ParamSectores.component.scss']
})
export class ParamSectoresComponent implements OnInit {
    SucceSave: boolean;
    ListMunicipio: Array<E_Municipios> = new Array<E_Municipios>()
    ListMunicipiosGroup: Array<E_Municipios> = new Array<E_Municipios>()
    MunicipioSeleccionado: any
    dataURL: any;
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    DepartamentoSeleccionado: any
    TipoEventoSeleccionado: any
    ListDepartamentos: Array<E_Departamentos> = new Array<E_Departamentos>()
    ListTipoEvento: Array<E_TipoReunion> = new Array<E_TipoReunion>()
    public Nombre: string;
    public descripcion: string;
    public checked;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private AdminServices: AdminServices,
        private Router: Router,
        private Matdialog: MatDialog,
    ) {
        this.ParameterService.ListarTipoReunion(new E_TipoReunion())
            .subscribe((x: Array<E_TipoReunion>) => {
                console.log(x)
                this.ListTipoEvento = x
            })
        this.formErrors = {
            checked: {},
            Nombre: {},
            Descripcion: {},
        };

    }

    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/mainpageadmin'])
    }
    ngOnInit() {
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal


        this.form = this.formBuilder.group({
            checked: ['', Validators.required],
            Nombre: ['', Validators.required],
            Descripcion: ['', Validators.required],
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
        this.confirmDialogRef = this.Matdialog.open(FuseConfirmDialogComponent, {})
        this.confirmDialogRef.componentInstance.confirmMessage = '¿Estas seguro de realizar esta acción?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {


                var objEvento: E_TipoReunion = new E_TipoReunion()
                objEvento.Nombre = this.form.value.Nombre
                objEvento.Descripcion = this.form.value.Descripcion
                objEvento.Estado = this.form.value.checked
                objEvento.Fecha = new Date();
                this.AdminServices.crearTipoReunion(objEvento).subscribe((x: boolean) => { this.SucceSave = x })


            }
            this.confirmDialogRef = null;
        });


    }


}

