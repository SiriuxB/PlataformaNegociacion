
// This Module's Components
import { CorreoComponent } from './correo.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSpinner, MatProgressSpinnerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { AdminGuard } from 'app/Guards/AdminGuard';


const routes = [
    {
        path: 'correo',
        component: CorreoComponent,
        canActivate:[AdminGuard]
    }
];

@NgModule({
    declarations: [
        CorreoComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseSharedModule
    ]
})
export class CorreoModule {

}
