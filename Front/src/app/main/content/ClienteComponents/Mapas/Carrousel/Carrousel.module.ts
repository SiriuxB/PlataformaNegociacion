import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSpinner, MatProgressSpinnerModule, MatIconModule, MatListModule, MatDividerModule, MatDialogModule, MatChipsModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseDemoModule } from '@fuse/components';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CorrouselComponent } from 'app/main/content/ClienteComponents/Mapas/Carrousel/Carrousel.component';
import { ClientGuard } from 'app/Guards/ClientGuard';
const routes = [
    {
        path: 'Carrousel',
        component: CorrouselComponent,
        canActivate: [ClientGuard]
    }
];

@NgModule({
    declarations: [
        CorrouselComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatDividerModule,
        MatListModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseSharedModule,
        MatIconModule,
        MatSidenavModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatChipsModule

    ]
    , entryComponents: []
})
export class CarrouselModule {
}
