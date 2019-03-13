// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { FuseConfirmDialogModule } from '@fuse/components';
import { AgGridModule } from 'ag-grid-angular';
import { InfoUsuarioComponent } from './InfoUsuario.component';


const routes: Routes = [
    {
        path: 'CompraVenta',
        component: InfoUsuarioComponent
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
        InfoUsuarioComponent,

    ], entryComponents: [],
    exports: [
        InfoUsuarioComponent,

    ]
})
export class InfoUsuarioModule {

}
