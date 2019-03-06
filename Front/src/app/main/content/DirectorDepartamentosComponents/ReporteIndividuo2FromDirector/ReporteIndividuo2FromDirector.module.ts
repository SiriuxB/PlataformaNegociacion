// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components


import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule, MatNativeDateModule, MatDatepickerModule, MAT_DATE_LOCALE } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AdminGuard } from 'app/Guards/AdminGuard';
import { ReporteIndividuo2FromDirectorComponent } from './ReporteIndividuo2FromDirector.component';

const routes: Routes = [
    {
        path: 'ReporteIndividuo2FromDirector',
        component: ReporteIndividuo2FromDirectorComponent
        //       , canActivate:[AdminGuard]
    }
];

@NgModule({
    declarations: [
        ReporteIndividuo2FromDirectorComponent

    ],
    imports: [
        RouterModule.forChild(routes),
        MatProgressSpinnerModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatDialogModule,
        FuseSharedModule,
        TextMaskModule,
        NgxDatatableModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatDatepickerModule

    ],providers:[{provide: MAT_DATE_LOCALE, useValue: 'es-ES'},]

})
export class ReporteIndividuo2FromDirectorModule {

}
