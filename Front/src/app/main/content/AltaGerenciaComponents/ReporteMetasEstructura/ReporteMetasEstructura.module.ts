// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule, MatNativeDateModule, MatDatepickerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AdminGuard } from 'app/Guards/AdminGuard';
import { ReporteMetasEstructuraComponent } from './ReporteMetasEstructura.component';

const routes: Routes = [
    {
        path: 'ReporteMetasEstructura',
        component: ReporteMetasEstructuraComponent
//       , canActivate:[AdminGuard]
    }
];

@NgModule({
    declarations: [
        ReporteMetasEstructuraComponent
        
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

    ]

})
export class ReporteMetasEstructuraModule {

}
