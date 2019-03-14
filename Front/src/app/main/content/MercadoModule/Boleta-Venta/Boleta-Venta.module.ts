// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { FuseConfirmDialogModule } from '@fuse/components';
import { AgGridModule } from 'ag-grid-angular';
import { BoletaVentaComponent } from './Boleta-Venta.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

const routes: Routes = [
    {
        path: 'BoletaVenta',
        component: BoletaVentaComponent
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
        MatProgressSpinnerModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    declarations: [
        BoletaVentaComponent,

    ], entryComponents: [],
    exports: [
        BoletaVentaComponent,

    ],
    providers:[ {provide: OWL_DATE_TIME_LOCALE, useValue: 'es'},]
})
export class BoletaVentaModule {

}
