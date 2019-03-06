import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainEscrutinioComponent } from './MainEscrutinio.component';
const routes: Routes = [
    {
        path: 'MainEscrutinio',
        component: MainEscrutinioComponent
    }
];
 
@NgModule({
    declarations: [

        MainEscrutinioComponent
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
export class MainEscrutinioModule {
}
