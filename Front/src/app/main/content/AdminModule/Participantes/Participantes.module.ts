import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AgGridModule } from 'ag-grid-angular';
import { ParticipantesComponent } from './Participantes.component';
import { CheckBoxRenderComponent } from '../../Renders/CheckBoxRender/CheckBoxRender.component';

const routes: Routes = [
    {
        path: 'Participantes',
        component: ParticipantesComponent
    }
];

@NgModule({
    declarations: [

        ParticipantesComponent,
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
        MatToolbarModule,
        AgGridModule.withComponents([CheckBoxRenderComponent])

    ], entryComponents: []

})
export class ParticipantesModule {
}
