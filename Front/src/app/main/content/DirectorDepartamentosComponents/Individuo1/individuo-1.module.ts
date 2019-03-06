// Angular Imports
import { NgModule } from '@angular/core';
import { Individuo1Component } from './individuo-1.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule,MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';


const routes: Routes = [
    {
        path: 'individuo1',
        component: Individuo1Component
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
    ],
    declarations: [
        Individuo1Component,
    ],
    exports: [
        Individuo1Component,
    ]
})
export class Individuo1Module {

}
