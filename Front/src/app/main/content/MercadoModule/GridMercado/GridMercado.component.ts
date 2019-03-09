import { Component, OnInit } from '@angular/core';
import { LicenseManager } from 'ag-grid-enterprise';
import { GridOptions } from 'ag-grid-community';
import { licence_ag } from 'app/Tools/licence.agGrid';

@Component({
    moduleId: module.id,
    selector: 'GridMercado',
    templateUrl: 'GridMercado.component.html',
    styleUrls: ['GridMercado.component.scss']
})
export class GridMercadoComponent implements OnInit {
   
    // Horizontal Stepper
    public gridOptions: GridOptions = {};
    constructor(
    ) { }

    columnDefs = [
        {headerName: 'Make', field: 'make' },
        {headerName: 'Model', field: 'model' },
        {headerName: 'Price', field: 'price'}
    ];

    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
    ngOnInit() {

        LicenseManager.setLicenseKey(licence_ag)
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
			rowHeight: 32,
		};
    }
    ReturnPage(event: Event) {
        event.preventDefault();
    }


       
}

