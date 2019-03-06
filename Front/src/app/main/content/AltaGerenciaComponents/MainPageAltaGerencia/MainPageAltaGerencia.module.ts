import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { MainPageAltaGerenciaComponent } from './MainPageAltaGerencia.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AltaGerenciaGuard } from 'app/Guards/AltaGerencia';
const routes: Routes = [
    {
        path: 'mainpagealtagerencia',
        component: MainPageAltaGerenciaComponent,
        canActivate: [AltaGerenciaGuard]
    }
];

@NgModule({
    declarations: [

        MainPageAltaGerenciaComponent
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
export class MainPageAltaGerenciaModule {
}
