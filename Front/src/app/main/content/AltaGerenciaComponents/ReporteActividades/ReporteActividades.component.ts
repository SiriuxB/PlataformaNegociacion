import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_TipoReunion } from 'app/Models/E_TipoReunion';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';

import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AppSettings } from 'app/app.settings';
import { ImageService } from 'app/ApiServices/ImageServices';
import { ReunionBuilder } from 'app/Builders/Reunion.model.builder';
import { ReunionService } from 'app/ApiServices/ReunionService';
import { Router } from '@angular/router';
import { E_Municipios } from 'app/Models/E_Municipios';
import { AdminServices } from 'app/ApiServices/AdminServices';

@Component({
    moduleId: module.id,
    selector: 'ReporteActividades',
    templateUrl: 'ReporteActividades.component.html',
    styleUrls: ['ReporteActividades.component.scss']
})
export class ReporteActividadesComponent implements OnInit {
    SelectedDepto: any;
    Actividades2Show: E_Reunion[];
    TipoReunion: E_TipoReunion[];
    Actividades: E_Reunion[];
    DepartamentosPivot: E_Departamentos[];
    FechaInicio: any
    FechaFin: any
    rows = [];
    public DepartamentoSeleccionado: string = ""
    public MunicipioSeleccionado: string = ""
    public ListDepartamentos: Array<E_Departamentos> = new Array<E_Departamentos>()
    public ListMunicipiosBase: Array<E_Municipios> = new Array<E_Municipios>()
    public ListMunicipiosGroup: Array<E_Municipios> = new Array<E_Municipios>()
    public nombrefil: string;
    public cedula: string;
    public Aprobada: number;
    selected = [];
    loadingIndicator = true;
    reorderable = true;
    DeptoName = ""
    DatoDepto: any
    ListImage: Array<E_Imagen> = new Array<E_Imagen>();
    constructor(private NavigationData: NavigationInfoService,
        private ParameterService: ParameterService,
        private ReunionService: ReunionService,
        private Router: Router,
        private dialog: MatDialog,
        private ImageService: AdminServices) {
    }

    Filter() {


        if (this.FechaInicio == undefined
            || this.FechaInicio == undefined
            || this.FechaFin == null
            || this.FechaFin == null) {
            this.chargeGrid()
            return
        }
        else {
            debugger
            this.Actividades2Show =
                this.Actividades.filter((x) => {
                    return (new Date(x.FechaCreacion) >= new Date(this.FechaInicio)) &&
                        (new Date(x.FechaCreacion) <= new Date(this.FechaFin))
                })


        }

    }
    SelectedDepartamento(selected) {
        if (selected.value == 0) {
            this.Actividades2Show = this.Actividades
        }
        else {
            this.Actividades2Show = this.Actividades.filter((x) => x.Id_Departamento == selected.value)
        }


    }
    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/mainpagealtagerencia'])
    }
    ngOnInit(): void {
        this.ParameterService.listarDepartamentos()
            .subscribe((y: Array<E_Departamentos>) => {
                this.DepartamentosPivot = y
            })
    }

    chargeGrid() {


        this.loadingIndicator = true
        this.ParameterService.listarDepartamentos()
            .mergeMap((y: Array<E_Departamentos>) => {
                this.DepartamentosPivot = y
                var ObjReu: E_TipoReunion = new E_TipoReunion()
                return this.ParameterService.ListarTipoReunion(ObjReu)
            }).mergeMap((z: Array<E_TipoReunion>) => {
                this.TipoReunion = z
                var ObjReunion: E_Reunion = new E_Reunion()
                ObjReunion.Id_Departamento = this.SelectedDepto
                ObjReunion.fechaini = this.FechaInicio
                ObjReunion.fechafin = this.FechaFin
                return this.ReunionService.ListarReuniones(ObjReunion)
            }).subscribe((x: Array<E_Reunion>) => {
                x.forEach(element => {
                    if (this.DepartamentosPivot.filter((x) => x.Id == element.Id_Departamento).length > 0) {
                        element.NombreDepartamento = this.DepartamentosPivot.find((x) => x.Id == element.Id_Departamento).Nombre
                    }
                    if (this.TipoReunion.filter((x) => x.Id == element.Id_TipoReunion).length > 0) {
                        element.NombreTipoReunion = this.TipoReunion.find((x) => x.Id == element.Id_TipoReunion).Descripcion
                    }
                });
                this.Actividades = x
                this.Actividades2Show = x
                this.loadingIndicator = false;
                console.log(this.Actividades)
            })

    }
}
