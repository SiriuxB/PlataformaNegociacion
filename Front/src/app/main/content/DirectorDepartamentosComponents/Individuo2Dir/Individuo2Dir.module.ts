// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { FuseConfirmDialogModule } from '@fuse/components';
import { Individuo2DirComponent } from 'app/main/content/DirectorDepartamentosComponents/Individuo2Dir/Individuo2Dir.component';


const routes: Routes = [
    {
        path: 'Individuo2Dir',
        component: Individuo2DirComponent
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
        Individuo2DirComponent,

    ], entryComponents: [],
    exports: [
        Individuo2DirComponent,

    ]
})
export class Individuo2DirModule {

}
