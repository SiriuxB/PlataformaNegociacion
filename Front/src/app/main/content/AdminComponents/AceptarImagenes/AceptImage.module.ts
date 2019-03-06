import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { OkImageComponent } from './OkImage/OkImage.component';
import { AceptImageComponent } from './AceptImage.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AdminGuard } from 'app/Guards/AdminGuard';

const routes: Routes = [
    {
        path: 'aceptimage',
        component: AceptImageComponent,
        canActivate:[AdminGuard]
    }
];

@NgModule({
    declarations: [
        AceptImageComponent,
        OkImageComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatProgressSpinnerModule,
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

    ], entryComponents: [AceptImageComponent, OkImageComponent]

})
export class AceptImageModule {
}
