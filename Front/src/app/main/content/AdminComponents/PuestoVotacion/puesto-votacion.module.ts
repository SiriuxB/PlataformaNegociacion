// Angular Imports
import { NgModule } from '@angular/core';
import { PuestoVotacionComponent } from './puesto-votacion.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule,MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatSpinner, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { AdminGuard } from '../../../../Guards/AdminGuard';
import { FuseConfirmDialogModule } from '@fuse/components';


const routes: Routes = [
    {
        path: 'puestovotacion',
        component: PuestoVotacionComponent,
        canActivate:[AdminGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),

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
        MatProgressSpinnerModule,
        FuseConfirmDialogModule
    ],
    declarations: [
        PuestoVotacionComponent,
    ],
    exports: [
        PuestoVotacionComponent,
    ]
})
export class PuestoVotacionModule {

}
