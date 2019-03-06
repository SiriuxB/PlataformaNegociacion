import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';

import { UserInfoComponent } from './UserInfo.component';
import { MatIconModule } from '@angular/material/icon';
const routes = [
    {
        path: 'userinfo',
        component: UserInfoComponent
    }
];

@NgModule({
    declarations: [
        UserInfoComponent
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
export class  UserInfoModule {
}
