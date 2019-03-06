// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ListarVehiculosxDirComponent } from './listar-vehiculosx-dir.component';
// Angular Imports

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';

// This Module's Components


const routes: Routes = [
    {
        path: 'ListarVehiculosxDir',
        component: ListarVehiculosxDirComponent
    }
];


@NgModule({
    declarations: [
        ListarVehiculosxDirComponent
        
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

    ],//, entryComponents: [AceptImageComponent,OkImageComponent]
    exports: [
        ListarVehiculosxDirComponent,
    ]
})
export class ListarVehiculosxDirModule {

}
