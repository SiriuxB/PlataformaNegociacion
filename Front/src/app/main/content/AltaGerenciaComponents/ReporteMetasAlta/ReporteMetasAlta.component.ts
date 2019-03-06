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
import { E_ReporteMetas } from '../../../../Models/E_ReporteMetas';

@Component({
    moduleId: module.id,
    selector: 'ReporteMetasAlta',
    templateUrl: 'ReporteMetasAlta.component.html',
    styleUrls: ['ReporteMetasAlta.component.scss']
})
export class ReporteMetasAltaComponent implements OnInit {
    MetasGrid: E_ReporteMetas[];
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
        private AdminServices: AdminServices) {
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
        var Multiple: string = ''
        if (this.SelectedDepto != undefined &&
            this.SelectedDepto.length > 0) {
            this.SelectedDepto.forEach(element => {
                Multiple += element.toString() + ','
            });
        }

        this.loadingIndicator = true
        var objReport: E_ReporteMetas = new E_ReporteMetas()
        objReport.Param_i_fechain = this.FechaInicio
        objReport.Param_i_fechain = this.FechaFin
        objReport.Param_DeptoSeleccionado = Multiple
        this.AdminServices.ObtenerReporteMetas(objReport)
            .subscribe((x: Array<E_ReporteMetas>) => {
                this.loadingIndicator = false

                this.MetasGrid = x
            })

    }
    getRowClass(row) {
        if(row.metacumplida == true){return 'Cumplido'}
        if(row.PorcentCantidad > row.PorcentajeFecha){return 'Cumplido'}
        else{ return 'InCumplido'}
      }
}
