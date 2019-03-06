// Angular Imports
import { NgModule } from '@angular/core';
import { DirectorDepartamentoComponent } from './director-departamento.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule,MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { FuseConfirmDialogModule } from '@fuse/components';

const routes: Routes = [
    {
        path: 'directordepartamento',
        component: DirectorDepartamentoComponent
    }
];

@NgModule({
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
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    declarations: [
        DirectorDepartamentoComponent,
    ],
    exports: [
        DirectorDepartamentoComponent,
    ]
})
export class DirectorDepartamentoModule {

}
