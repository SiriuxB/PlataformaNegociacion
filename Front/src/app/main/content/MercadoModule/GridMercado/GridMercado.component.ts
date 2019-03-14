import { Component, OnInit } from '@angular/core';
import { LicenseManager } from 'ag-grid-enterprise';
import { GridOptions } from 'ag-grid-community';
import { licence_ag } from 'app/Tools/licence.agGrid';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BoletaVentaComponent } from '../Boleta-Venta/Boleta-Venta.component';

@Component({
    moduleId: module.id,
    selector: 'GridMercado',
    templateUrl: 'GridMercado.component.html',
    styleUrls: ['GridMercado.component.scss']
})
export class GridMercadoComponent implements OnInit {

    // Horizontal Stepper
    boletaDialog: MatDialogRef<BoletaVentaComponent>;
    public gridOptions: GridOptions = {};
    gridApi: any;
    constructor( private Matdialog: MatDialog,
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
        this.gridApi = params.api;
    }

    ReturnPage(event: Event) {
        event.preventDefault();
    }

    MostrarFormulario()
    {
        this.boletaDialog = this.Matdialog.open(BoletaVentaComponent, {panelClass: 'my-panel'})     
        this.boletaDialog.afterClosed().subscribe(result => {
            //this.ShowDenegateAccess = true
        })
    }

}

