// Angular Imports
import { NgModule } from '@angular/core';
import { ParamSectoresComponent } from './ParamSectores.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule,MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';
import { AdminGuard } from 'app/Guards/AdminGuard';
import { FuseConfirmDialogModule } from '@fuse/components';

const routes: Routes = [
    {
        path: 'paramsectores',
        component: ParamSectoresComponent,
        canActivate:[AdminGuard]
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
        ParamSectoresComponent,
    ],
    exports: [
        ParamSectoresComponent,
    ]
})
export class  ParamSectoresModule {

}
