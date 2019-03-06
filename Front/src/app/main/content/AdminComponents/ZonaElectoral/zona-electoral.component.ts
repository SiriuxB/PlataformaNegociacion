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
import { E_ZonaElectoral } from '../../../../Models/E_ZonaElectoral';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_Municipios } from 'app/Models/E_Municipios';

@Component({
    moduleId: module.id,
    selector: 'zona-electoral',
    templateUrl: 'zona-electoral.component.html',
    styleUrls: ['zona-electoral.component.scss']
})
export class ZonaElectoralComponent implements OnInit {
    SaveInProgress: boolean;
    EstadoFormulario: boolean = false
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
    public Nombre: string;
    public descripcion: string;
    public checkedActivo: boolean;
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
            Municipios: {},
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
        this.ParameterService.ListarMunicipios()
            .subscribe((x: Array<E_Municipios>) => {
                this.ListMunicipiosBase = x
            })

        this.form = this.formBuilder.group({
            Nombre: ['', [Validators.required]],
            Departamentos: [undefined, [Validators.required]],
            Municipios: [undefined, [Validators.required]],

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
        var objZonaElectoral: E_ZonaElectoral = new E_ZonaElectoral()
        objZonaElectoral.Nombre = this.form.value.Nombre
        objZonaElectoral.Estado = this.checkedActivo
        objZonaElectoral.FechaCreacion = new Date();
        objZonaElectoral.Id_Municipio = this.form.value.Municipios
        this.SaveInProgress = true
        this.AdminServices.crearZonaElectoral(objZonaElectoral).subscribe((x: boolean) => {
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
        this.form.setValue({ Nombre: "", Departamentos: 0, Municipios: 0 })
    }

}

