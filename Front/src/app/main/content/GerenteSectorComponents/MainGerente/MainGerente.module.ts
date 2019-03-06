import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { MainGerenteComponent } from './MainGerente.component';
import { MatToolbarModule } from '@angular/material/toolbar';
const routes: Routes = [
    {
        path: 'maingerente',
        component: MainGerenteComponent
    }
];
 
@NgModule({
    declarations: [

        MainGerenteComponent
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
export class MainGerenteModule {
}
