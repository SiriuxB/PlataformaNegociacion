// Angular Imports
import { NgModule } from '@angular/core';
import { Individuo2Component } from './individuo-2.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { FuseConfirmDialogModule } from '@fuse/components';


const routes: Routes = [
    {
        path: 'individuo2',
        component: Individuo2Component
    }
];

@NgModule({
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
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FuseConfirmDialogModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        Individuo2Component,

    ], entryComponents: [],
    exports: [
        Individuo2Component,

    ]
})
export class Individuo2Module {

}
