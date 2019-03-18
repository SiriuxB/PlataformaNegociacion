import { Component, OnInit, ElementRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';

import { Router } from '@angular/router';
import * as GoldenLayout from 'golden-layout';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { RealtimeService } from 'app/ApiServices/realtime.service';
import { LoginService } from 'app/ApiServices/login.service';
import { InfoUsuarioComponent } from '../../InfoUsuario/InfoUsuario.component';
import { AppSettings } from 'app/app.settings';
import { Usuario } from 'app/models/Usuario';
import { Column, ColDef, CheckboxSelectionComponent } from 'ag-grid-community';
import { CheckBoxRenderComponent } from '../../Renders/CheckBoxRender/CheckBoxRender.component';

@Component({
    selector: 'Participantes',
    templateUrl: './Participantes.component.html',
    styleUrls: ['./Participantes.component.scss']
})
export class ParticipantesComponent implements OnInit {
    gridOptions: { rowSelection: string; enableColResize: boolean; enableRangeSelection: boolean; suppressHorizontalScroll: boolean; rowData: any; animateRows: boolean; columnDefs: any; overlayNoRowsTemplate: string; toolPanelSuppressRowGroups: boolean; toolPanelSuppressValues: boolean; toolPanelSuppressPivots: boolean; toolPanelSuppressPivotMode: boolean; };

    columnDefs = [
        { headerName: 'Codigo Segas', field: 'IdSegas', headerClass: 'my-css-class' },
        { headerName: 'Nombre Usuario', field: 'NombreUsuario', headerClass: 'my-css-class' },
        { headerName: 'Nombre Operador', field: 'Empresa', headerClass: 'my-css-class' },
        { headerName: 'Rol', field: 'NombreRol', headerClass: 'my-css-class' },
        { headerName: 'Activo', field: 'Activo', headerClass: 'my-css-class', cellRenderer: 'CheckBoxRenderComponent' }
    ];
    rowData: Array<Usuario> = new Array<Usuario>();
    gridApi: any;
    frameworkComponents: any;
    constructor(private NavigationData: NavigationInfoService,
        private Router: Router, public el: ElementRef,
        private CommunicationService: CommunicationService,
        public componentFactoryResolver: ComponentFactoryResolver,
        public viewContainer: ViewContainerRef,
        public RealTimeService: RealtimeService,
        private LoginService: LoginService

    ) {
        this.frameworkComponents = { CheckBoxRenderComponent: CheckBoxRenderComponent }
        this.LoginService.VerUsuarios().subscribe(x => {
            this.rowData = x

        })
    }




    ngOnInit(): void {
        this.gridOptions = {
            rowSelection: 'single',
            enableColResize: true,
            enableRangeSelection: true,
            suppressHorizontalScroll: false,
            rowData: this.rowData,
            animateRows: true,
            columnDefs: this.columnDefs,
            overlayNoRowsTemplate: ' ',
            toolPanelSuppressRowGroups: true,
            toolPanelSuppressValues: true,
            toolPanelSuppressPivots: true,
            toolPanelSuppressPivotMode: true,
        };
    }

    onGridReady(params) {
        this.gridApi = params.api;
    }

}
