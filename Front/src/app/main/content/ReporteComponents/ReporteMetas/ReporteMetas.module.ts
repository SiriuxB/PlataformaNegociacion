import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseConfirmDialogModule } from '@fuse/components';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { ClientGuard } from 'app/Guards/ClientGuard';
import { ReporteMetasComponent } from './ReporteMetas.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [
    {
        path: 'ReporteMetas',
        component: ReporteMetasComponent,
    }
];

@NgModule({
    declarations: [
        ReporteMetasComponent 
    ],
    imports: [
        RouterModule.forChild(routes),
        FuseConfirmDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatDialogModule,
        FuseSharedModule,
        TextMaskModule,
        MatProgressSpinnerModule,
        NgxChartsModule
    ], entryComponents: []

})
export class ReporteMetasModule {
}
