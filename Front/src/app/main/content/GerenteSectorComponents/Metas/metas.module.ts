// Angular Imports
import { NgModule } from '@angular/core';
import { MetasComponent } from './metas.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule,MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { FuseConfirmDialogModule } from '@fuse/components';


const routes: Routes = [
    {
        path: 'metas',
        component: MetasComponent
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
        MatProgressSpinnerModule
    ],
    declarations: [
        MetasComponent,
    ],
    exports: [
        MetasComponent,
    ]
})
export class MetasModule {

}
