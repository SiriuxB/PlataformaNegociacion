// Angular Imports
import { NgModule } from '@angular/core';
import { GerenteSectorComponent } from './gerente-sector.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule,MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { AdminGuard } from 'app/Guards/AdminGuard';
import { FuseConfirmDialogModule } from '@fuse/components';

const routes: Routes = [
    {
        path: 'gerentesector',
        component: GerenteSectorComponent,
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
        GerenteSectorComponent,
    ],
    exports: [
        GerenteSectorComponent,
    ]
})
export class GerenteSectorModule {

}
