import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { MainPageAdminComponent } from './MainPageAdmin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminGuard } from 'app/Guards/AdminGuard';
const routes: Routes = [
    {
        path: 'mainpageadmin',
        component: MainPageAdminComponent,
    }
];

@NgModule({
    declarations: [

        MainPageAdminComponent
    ],
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
        MatToolbarModule
    ], entryComponents: []

})
export class MainPageAdminModule {
}
