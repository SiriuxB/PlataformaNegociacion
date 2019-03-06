// Angular Imports
import { NgModule } from '@angular/core';
import { ZonaElectoralComponent } from './zona-electoral.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule,MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { AdminGuard } from 'app/Guards/AdminGuard';


const routes: Routes = [
    {
        path: 'zonaelectoral',
        component: ZonaElectoralComponent,
        canActivate:[AdminGuard]
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
        MatProgressSpinnerModule
    ],
    declarations: [
        ZonaElectoralComponent,
    ],
    exports: [
        ZonaElectoralComponent,
    ]
})
export class ZonaElectoralModule {

}
