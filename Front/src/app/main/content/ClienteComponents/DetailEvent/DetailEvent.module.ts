import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { DetailEventComponent } from './DetailEvent.component';
import { ClientGuard } from 'app/Guards/ClientGuard';

const routes: Routes = [
    {
        path: 'detailevent',
        component: DetailEventComponent,
        canActivate: [ClientGuard]
    }
];

@NgModule({
    declarations: [
        
        DetailEventComponent
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
    ], entryComponents: []

})
export class DetailEventModule {
}
