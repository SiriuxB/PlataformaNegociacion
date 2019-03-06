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
import { E_Mesa } from 'app/Models/E_Mesa';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_Municipios } from 'app/Models/E_Municipios';
import { E_ZonaElectoral } from 'app/Models/E_ZonaElectoral';
import { E_PuestoVotacion } from 'app/Models/E_PuestoVotacion';

import { MatDialogRef } from '@angular/material';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
@Component({
    moduleId: module.id,
    selector: 'mesa',
    templateUrl: 'mesa.component.html',
    styleUrls: ['mesa.component.scss']
})
export class MesaComponent implements OnInit {
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    SaveInProgress: boolean;
    SucceSave: boolean;
    dataURL: any;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    MunicipioSeleccionado: any
    ListMunicipios: Array<E_Municipios> = new Array<E_Municipios>()
    public DepartamentoSeleccionado: string = ""
    public ListDepartamentos: Array<E_Departamentos> = new Array<E_Departamentos>()
    public ListMunicipiosBase: Array<E_Municipios> = new Array<E_Municipios>()
    public ListMunicipiosGroup: Array<E_Municipios> = new Array<E_Municipios>()
    public ListZonaElectoralBase: Array<E_ZonaElectoral> = new Array<E_ZonaElectoral>()
    public ListZonaElectoralGroup: Array<E_ZonaElectoral> = new Array<E_ZonaElectoral>()
    public ListPuestoVotacionBase: Array<E_PuestoVotacion> = new Array<E_PuestoVotacion>()
    public ListPuestoVotacionGroup: Array<E_PuestoVotacion> = new Array<E_PuestoVotacion>()
    public Nombre: string;
    public descripcion: string;
    public checkedActivo: boolean;
    EstadoFormulario: boolean
    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private AdminServices: AdminServices,
        private Matdialog: MatDialog,
        private Router: Router,
        private UserService: UserService
    ) {

        this.formErrors = {
            Nombre: {},
            Departamentos: {},
            Municipios: {},
            ZonaElectoral: {},
            PuestoVotacion: {}
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
        this.ParameterService.ListarMunicipios()
            .subscribe((x: Array<E_Municipios>) => {
                this.ListMunicipiosBase = x
            })

        this.form = this.formBuilder.group({
            Nombre: ['', [Validators.required]],
            Departamentos: [undefined, [Validators.required]],
            Municipios: [undefined, [Validators.required]],
            ZonaElectoral: [undefined, [Validators.required]],
            PuestoVotacion: [undefined, [Validators.required]],
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

    SelectedDepartamento(y) {

        var depObj = this.ListDepartamentos.find(x => x.Id == y.value)
        this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
    }

    SelectedMunicipio(y) {

        var objzona: E_ZonaElectoral = new E_ZonaElectoral()
        objzona.Id_Municipio = y.value
        this.ParameterService.listarZonasxMunicipio(objzona)
            .subscribe((x: Array<E_ZonaElectoral>) => {
                this.ListZonaElectoralGroup = x
            })

    }
    SelectedZonaElectoral(y) {

        //  var depObj = this.ListZonaElectoralBase.find(x => x.Id == y.value)

        var objPuesto: E_PuestoVotacion = new E_PuestoVotacion()
        objPuesto.Id_ZonaElectoral = y.value
        this.ParameterService.listarPuestosVotacionxZona(objPuesto).subscribe((x: Array<E_PuestoVotacion>) => {
            this.ListPuestoVotacionGroup = x
        })

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
        var objMesa: E_Mesa = new E_Mesa()
        objMesa.Nombre = this.form.value.Nombre
        objMesa.Activo = this.EstadoFormulario
        objMesa.FechaCreacion = new Date();
        objMesa.Id_puestoVotacion = this.form.value.PuestoVotacion
        this.SaveInProgress = true
        this.AdminServices.crearMesa(objMesa).subscribe((x: boolean) => {
            if (x) {
                this.SucceSave = x
                this.CleanForm()
            }
            setTimeout(() => {
                this.SucceSave = false
            }, 4000)
            this.SaveInProgress = false
        })

    }


    CleanForm() {
        this.form.setValue({
            Nombre: "",
            Departamentos: 0,
            Municipios: 0,
            ZonaElectoral: 0,
            PuestoVotacion: 0,
        })
    }
}

