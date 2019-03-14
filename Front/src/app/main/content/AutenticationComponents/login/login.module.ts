import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSpinner, MatProgressSpinnerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseLoginComponent } from './login.component';
import { infodialogModule } from '@fuse/components/info-dialog/info-dialog.module';

const routes = [
    {
        path: 'login',
        component: FuseLoginComponent
    }
];

@NgModule({
    declarations: [
        FuseLoginComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseSharedModule,infodialogModule
    ]
})
export class LoginModule {
}
