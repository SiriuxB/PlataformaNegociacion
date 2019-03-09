// Angular Imports
import { NgModule } from '@angular/core';
import { GridMercadoComponent } from './GridMercado.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { FuseConfirmDialogModule } from '@fuse/components';
import { AgGridModule } from 'ag-grid-angular';


const routes: Routes = [
    {
        path: 'GridMercado',
        component: GridMercadoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        AgGridModule.withComponents([]),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatDialogModule,
        FuseSharedModule,
        TextMaskModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FuseConfirmDialogModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        GridMercadoComponent,

    ], entryComponents: [],
    exports: [
        GridMercadoComponent,

    ]
})
export class GridMercadoModule {

}
