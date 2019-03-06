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

@Component({
    moduleId: module.id,
    selector: 'metas',
    templateUrl: 'metas.component.html',
    styleUrls: ['metas.component.scss']
})
export class MetasComponent implements OnInit {
    SaveInprogress: boolean;
    GerenteLogeado: E_GerenteSector;
    SucceSave: boolean;
    minDate = new Date()
    dataURL: any;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    public Nombre: string;
    public descripcion: string;
    public checkedActivo;
    ItemMetaSeleccionado: any
    ListItemsMetas: Array<E_ItemsMetas> = new Array<E_ItemsMetas>()
    DirectorDeptoSeleccionado: Array<E_DirectorDepartamento> = new Array<E_DirectorDepartamento>()
    ListDirectorDepto: Array<E_DirectorDepartamento> = new Array<E_DirectorDepartamento>()
    // Horizontal Stepper
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

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
            Observacion: {},
            Cantidad: {},
            ItemsMetas: {},
            DirectorDepto: {},
            FechaInicio: {},
            FechaFin: {}
        };

    }

    hola() {
        console.log(this.DirectorDeptoSeleccionado)
    }
    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/maingerente'])
    }
    ngOnInit() {

        var User: E_Usuario = this.UserService.GetCurrentCurrentUserNow()
        var objGerente: E_GerenteSector = new E_GerenteSector()
        objGerente.Correo = User.UserName
        var objDirectorDepartamento: E_DirectorDepartamento = new E_DirectorDepartamento()
        this.ParameterService.ListarItemsMetas()
            .subscribe((x: Array<E_ItemsMetas>) => {
                this.ListItemsMetas = x
            })

        this.AdminServices.gerentexCorreo(objGerente).subscribe((y: E_GerenteSector) => {
            this.GerenteLogeado = y
            objDirectorDepartamento.Id_GerenteSector = this.GerenteLogeado.Id;
            this.ParameterService.ListarDirectorDepartamentoxIdGerenteSector(objDirectorDepartamento)
                .subscribe((x: Array<E_DirectorDepartamento>) => {
                    this.ListDirectorDepto = x
                })

        })




        this.form = this.formBuilder.group({
            Nombre: ['', [Validators.required]],
            Observacion: ['', [Validators.required]],
            Cantidad: ['', [Validators.required]],
            ItemsMetas: [undefined, [Validators.required]],
            DirectorDepto: [undefined, [Validators.required]],
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
        this.confirmDialogRef = this.Matdialog.open(FuseConfirmDialogComponent, {})
        this.confirmDialogRef.componentInstance.confirmMessage = '¿Estas seguro de realizar esta acción?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) { this.EnviarInfo() }
            this.confirmDialogRef = null;
        });
    }


    EnviarInfo() {
        var objMetas: E_Metas = new E_Metas()
        objMetas.Nombre = this.form.value.Nombre
        objMetas.Observacion = this.form.value.Observacion
        objMetas.cantidad = this.form.value.Cantidad
        objMetas.Id_Item = this.form.value.ItemsMetas
        objMetas.id_gerentesector = this.GerenteLogeado.Id

        objMetas.fechainicio = this.form.value.FechaInicio
        objMetas.fechafin = this.form.value.FechaFin
        objMetas.porcentajecumplimiento = "0"
        objMetas.metacumplida = false
        objMetas.activo = true
        var counter = 0
        var counterSave = this.DirectorDeptoSeleccionado.length
        this.SaveInprogress = true
        this.SucceSave = false
        objMetas.FechaCreacion = new Date();
        this.DirectorDeptoSeleccionado.forEach(element => {
            objMetas.id_directordepto = element.Id
            this.AdminServices.crearMetas(objMetas).subscribe((x: boolean) => {
                counter += 1
                if (x && counter == counterSave) {
                    this.SucceSave = true
                    this.SaveInprogress = false
                }
            })
        });
        this.form.setValue({
            Nombre: '',
            Observacion: '',
            Cantidad: '',
            ItemsMetas: 0,
            DirectorDepto: 0,
            FechaInicio: '',
            FechaFin: ''
        })


    }
}

