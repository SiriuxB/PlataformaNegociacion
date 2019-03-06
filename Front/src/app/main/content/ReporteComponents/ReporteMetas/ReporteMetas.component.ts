import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



import { MatDialog, MatDialogRef } from '@angular/material';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_TipoReunion } from 'app/Models/E_TipoReunion';
import { GenerateMask } from '../../../../Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { PhotoTool } from '../../../../Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';

import { ImageService } from 'app/ApiServices/ImageServices';
import { Router } from '@angular/router';
import { debug } from 'util';
import { AppSettings } from '../../../../app.settings';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Sector } from '../../../../Models/E_Sector';
import { E_DirectorDepartamento } from '../../../../Models/E_DirectorDepartamento';
import { AdminServices } from 'app/ApiServices/AdminServices';
import { E_GerenteSector } from '../../../../Models/E_GerenteSector';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import * as shape from 'd3-shape';
import { E_Metas } from '../../../../Models/E_Metas';
import { UserService } from '../../../../ApiServices/UserService';
@Component({
    selector: 'ReporteMetas',
    templateUrl: './ReporteMetas.component.html',
    styleUrls: ['./ReporteMetas.component.scss']
})
export class ReporteMetasComponent implements OnInit {

    single: any[] = [];
    SaveInProgress: boolean;
    DirectorTecnicoSector: string;
    SucceSave: boolean;

    dataURL: any;
    MaskedNumberNoDecimal: any[]
    MaskPrice: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    DepartamentoSeleccionado: any
    sectorseleccionado: any
    gerenteseleccionado: any
    departaseleccionado: any
    TipoEventoSeleccionado: any
    ListSector: Array<E_Sector> = new Array<E_Sector>()
    ListGerSec: Array<E_GerenteSector> = new Array<E_GerenteSector>()
    listDirectDep: Array<E_DirectorDepartamento> = new Array<E_DirectorDepartamento>()
    ListDepartamentos: Array<E_Departamentos> = new Array<E_Departamentos>()
    ListTipoEvento: Array<E_TipoReunion> = new Array<E_TipoReunion>()
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    widget5: any = {};
    multi: any[];

    // view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = false;
    showXAxisLabel = false;
    xAxisLabel = '# Metas';
    showYAxisLabel = true;
    yAxisLabel = '# Metas';

    colorScheme = {
        domain: ['#224e9c', '#d0544b', '#C7B42C', '#AAAAAA']
    };

    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private dialog: MatDialog,
        private ImageService: ImageService,
        private Router: Router,
        private AdminServices: AdminServices,
        private userservices: UserService
    ) { }

    ngOnInit(): void {
        var Objger: E_GerenteSector = new E_GerenteSector()
        var ObjReu: E_Metas = new E_Metas()

        var xxx = this.userservices.GetCurrentCurrentUserNow().UserName
        Objger.Correo = xxx;
        this.AdminServices.gerentexCorreo(Objger).subscribe((x) => {

            ObjReu.id_gerentesector = x.Id
            this.AdminServices.listarMetasxGerente(ObjReu).subscribe((x: Array<E_Metas>) => {

                if (x.length) {
                    var countComplete = x.filter((y) => y.metacumplida == true).length
                    var countIncomplete = x.filter((y) => y.metacumplida == false).length
                    this.single = [
                        {
                            "name": "Cumplidas",
                            "value": countComplete
                        },
                        {
                            "name": "Pendientes",
                            "value": countIncomplete
                        },
                    ]
                }

            })
        }
        )


        this.widget5 = {
            currentRange: 'TW',
            xAxis: true,
            yAxis: true,
            gradient: false,
            legend: false,
            showXAxisLabel: false,
            xAxisLabel: 'Days',
            showYAxisLabel: false,
            yAxisLabel: 'Isues',
            scheme: {
                //  domain: ['#224e9c', '#C6ECFD', '#C7B42C', '#AAAAAA']
                domain: ['#224e9c', '#224e9c', '#224e9c', '#AAAAAA']

            },
            onSelect: (ev) => {
                console.log(ev);
            },
            supporting: {
                currentRange: '',
                xAxis: false,
                yAxis: false,
                gradient: false,
                legend: false,
                showXAxisLabel: false,
                xAxisLabel: 'Days',
                showYAxisLabel: false,
                yAxisLabel: 'Isues',
                scheme: {
                    domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
                },
                curve: shape.curveBasis
            }
        };

    }

    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/maingerente'])
    }
}

