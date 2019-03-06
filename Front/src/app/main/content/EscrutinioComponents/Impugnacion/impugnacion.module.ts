// Angular Imports
import { NgModule } from '@angular/core';
import { ImpugnacionComponent } from './impugnacion.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule,MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { AgmCoreModule } from '@agm/core';
import { fotoDialogComponent } from '../../ClienteComponents/CreadorEventos/fotoDialog/fotoDialog.component';

const routes: Routes = [
    {
        path: 'impugnacion',
        component: ImpugnacionComponent
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
        MatProgressSpinnerModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDzERwfU7OYLtncywxekwOcmR6r9Js_O7I'
        }),
    ],
    declarations: [
        ImpugnacionComponent,
    ],
    entryComponents:[fotoDialogComponent],
    exports: [
        ImpugnacionComponent,
    ]
})
export class ImpugnacionModule {

}
