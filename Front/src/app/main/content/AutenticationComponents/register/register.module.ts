import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';

import { FuseRegisterComponent } from './register.component';
import { MatIconModule } from '@angular/material/icon';
const routes = [
    {
        path: 'register',
        component: FuseRegisterComponent
    }
];

@NgModule({
    declarations: [
        FuseRegisterComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatSelectModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        TextMaskModule,
        FuseSharedModule,
        MatIconModule
    ]
})
export class RegisterModule {
}
