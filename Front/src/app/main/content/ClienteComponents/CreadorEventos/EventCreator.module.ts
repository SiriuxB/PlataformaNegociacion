import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseConfirmDialogModule } from '@fuse/components';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { EventCreatorComponent } from './EventCreator.component';
import { TextMaskModule } from 'angular2-text-mask';
import { fotoDialogComponent } from './fotoDialog/fotoDialog.component';
import { ClientGuard } from 'app/Guards/ClientGuard';

const routes: Routes = [
    {
        path: 'eventcreator',
        component: EventCreatorComponent,
        canActivate: [ClientGuard]
    }
];

@NgModule({
    declarations: [
        EventCreatorComponent,
        fotoDialogComponent
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
        MatProgressSpinnerModule
    ], entryComponents: [fotoDialogComponent]

})
export class EventCreatorModule {
}
