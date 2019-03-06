import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AdminServices } from 'app/ApiServices/AdminServices';
import { Router } from '@angular/router';
import { UserService } from '../../../../ApiServices/UserService';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_Vehiculo } from 'app/Models/E_Vehiculo';
import { E_Municipios } from 'app/Models/E_Municipios';

@Component({
    moduleId: module.id,
    selector: 'vehiculo',
    templateUrl: 'vehiculo.component.html',
    styleUrls: ['vehiculo.component.scss']
})
export class VehiculoComponent implements OnInit {
    SucceSave: boolean;   
    dataURL: any;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    MunicipioSeleccionado:any
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
            TipoVehiculo: {},
            Capacidad: {},
            Placa: {},
            Soat: {},
            Pase: {},
            Conductor: {},
            Modelo: {},
            Color: {},
            ValorServicio: {},
            Departamentos: {},
            Municipios: {}
        };

    }

    ReturnPage(event:Event){
        event.preventDefault();
        this.Router.navigate(['/maintransportadorcarro'])
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
            TipoVehiculo: ['', [Validators.required]],
            Capacidad: ['', [Validators.required]],
            Placa: ['', [Validators.required]],
            Soat: ['', [Validators.required]],
            Pase: ['', [Validators.required]],
            Conductor: ['', [Validators.required]],
            Modelo: ['', [Validators.required]],
            Color: ['', [Validators.required]],
            ValorServicio: ['', [Validators.required]],
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
        var objVehiculo: E_Vehiculo = new E_Vehiculo()        
        objVehiculo.Nombre = this.form.value.Nombre 
        objVehiculo.TipoVehiculo = this.form.value.TipoVehiculo 
        objVehiculo.Capacidad = this.form.value.Capacidad 
        objVehiculo.Placa = this.form.value.Placa 
        objVehiculo.Soat = this.form.value.Soat          
        objVehiculo.Pase = this.form.value.Pase 
        objVehiculo.Conductor = this.form.value.Conductor 
        objVehiculo.Modelo = this.form.value.Modelo 
        objVehiculo.Color = this.form.value.Color 
        objVehiculo.ValorServicio = this.form.value.ValorServicio 
        objVehiculo.Id_Usuario = this.UserService.GetCurrentCurrentUserNow().Id_Cliente
        objVehiculo.Id_individuo2 = this.UserService.GetCurrentCurrentUserNow().Id_Cliente
        objVehiculo.Estado = true
        objVehiculo.FechaCreacion = new Date();
        objVehiculo.Id_Departamento = this.form.value.Departamentos
        objVehiculo.Id_Municipio = this.form.value.Municipios

                      
        this.AdminServices.crearVehiculo(objVehiculo).subscribe((x: boolean) => { this.SucceSave = x })

    }


}

