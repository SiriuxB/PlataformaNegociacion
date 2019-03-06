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
import { E_SitioEscrutino } from 'app/Models/E_SitioEscrutino';
import { E_Municipios } from 'app/Models/E_Municipios';

@Component({
    moduleId: module.id,
    selector: 'sitio-escrutino',
    templateUrl: 'sitio-escrutino.component.html',
    styleUrls: ['sitio-escrutino.component.scss']
})
export class SitioEscrutinoComponent implements OnInit {
    checked: any
    MunicipioSeleccionado: any
    SucceSave: boolean;
    dataURL: any;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    DepartamentoSeleccionado: any
    ListDepartamentos: Array<E_Departamentos> = new Array<E_Departamentos>()
    public Nombre: string;
    public descripcion: string;
    public checkedActivo;
    public ListMunicipiosBase: Array<E_Municipios> = new Array<E_Municipios>()
    public ListMunicipiosGroup: Array<E_Municipios> = new Array<E_Municipios>()
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
            Nombre: {},
            Departamentos: {},
            Municipios: {}
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
            Municipios: [undefined, [Validators.required]]
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

    EnviarInfo() {
        var objSitioEscrutino: E_SitioEscrutino = new E_SitioEscrutino()
        objSitioEscrutino.Nombre = this.form.value.Nombre
        objSitioEscrutino.Activo = this.form.value.checkedActivo
        objSitioEscrutino.FechaCreacion = new Date();
        objSitioEscrutino.Id_Departamento = this.form.value.Departamentos
        objSitioEscrutino.Id_Municipio = this.form.value.Municipios

        this.AdminServices.crearSitioEscrutino(objSitioEscrutino).subscribe((x: boolean) => { this.SucceSave = x })

    }


}

