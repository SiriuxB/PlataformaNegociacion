// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ListarGerenteComponent } from './listar-gerente.component';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AdminGuard } from 'app/Guards/AdminGuard';

const routes: Routes = [
    {
        path: 'listarGerente',
        component: ListarGerenteComponent
//       , canActivate:[AdminGuard]
    }
];

@NgModule({
    declarations: [
        ListarGerenteComponent
        
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

    ]

})
export class ListarGerenteModule {

}
