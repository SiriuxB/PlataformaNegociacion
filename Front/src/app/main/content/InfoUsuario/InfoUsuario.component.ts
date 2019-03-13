import { Component, OnInit } from '@angular/core';
import { LicenseManager } from 'ag-grid-enterprise';
import { GridOptions } from 'ag-grid-community';
import { licence_ag } from 'app/Tools/licence.agGrid';

@Component({
    moduleId: module.id,
    selector: 'InfoUsuario',
    templateUrl: 'InfoUsuario.component.html',
    styleUrls: ['InfoUsuario.component.scss']
})
export class InfoUsuarioComponent implements OnInit {

    // Horizontal Stepper
    public gridOptions: GridOptions = {};
    gridApi: any;
    constructor(
    ) { }

    columnDefs = [
        { headerName: 'Make', field: 'make', headerClass: 'my-css-class' },
        { headerName: 'Model', field: 'model', headerClass: 'my-css-class' },
        { headerName: 'Price', field: 'price', headerClass: 'my-css-class' }
    ];

    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
    ngOnInit() {

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
        //LicenseManager.setLicenseKey(licence_ag)

    }
    onGridReady(params) {
        debugger
        this.gridApi = params.api;
    }

    ReturnPage(event: Event) {
        event.preventDefault();
    }



}

