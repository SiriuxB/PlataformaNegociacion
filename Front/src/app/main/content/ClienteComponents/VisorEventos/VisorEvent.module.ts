import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { VisorEventComponent } from './VisorEvent.component';
import { DetailDialogComponent } from './DetailDialog/DetailDialog.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClientGuard } from 'app/Guards/ClientGuard';

const routes: Routes = [
    {
        path: 'eventvisor',
        component: VisorEventComponent,
        canActivate: [ClientGuard]
    }
];

@NgModule({
    declarations: [
        VisorEventComponent,
        DetailDialogComponent
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

    ], entryComponents: [DetailDialogComponent]

})
export class VisorEventModule {
}
