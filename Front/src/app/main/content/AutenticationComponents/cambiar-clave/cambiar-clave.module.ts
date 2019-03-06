// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { CambiarClaveComponent } from './cambiar-clave.component';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';



const routes: Routes = [
    {
        path: 'cambiarClave',
        component: CambiarClaveComponent
    }
];


@NgModule({
    declarations: [
        CambiarClaveComponent
        
    ],
    exports: [
        CambiarClaveComponent,
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
        MatCheckboxModule,
        MatProgressSpinnerModule

    ]//, entryComponents: [AceptImageComponent,OkImageComponent]

})

export class CambiarClaveModule {

}
