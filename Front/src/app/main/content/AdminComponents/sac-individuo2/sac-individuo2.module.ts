import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';



// This Module's Components
import { SacIndividuo2Component } from './sac-individuo2.component';
import { AdminGuard } from 'app/Guards/AdminGuard';

const routes: Routes = [
    {
        path: 'SacIndividuo2',
        component: SacIndividuo2Component,
        canActivate:[AdminGuard]
    }
];

@NgModule({
    declarations: [
        SacIndividuo2Component
        
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
        NgxDatatableModule,
        MatCheckboxModule

    ], 
    exports: [
        SacIndividuo2Component
        
    ]
})
export class SacIndividuo2Module {

}
