import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSpinner, MatProgressSpinnerModule, MatIconModule, MatListModule, MatDividerModule, MatDialogModule, MatChipsModule, MatSelectModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { MapsGraphicComponent } from './MapsGraphic.component';
import { FuseDemoModule } from '@fuse/components';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MapContentComponent } from './Map-content/Map-content.component';
import { MapSidenavComponent } from './Map-sidenav/Map-sidenav.component';
import { MapDialogComponent } from './Map-Dialog-Options/Map-Dialog-Options.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ClientGuard } from 'app/Guards/ClientGuard';
const routes: Routes = [
    {
        path: 'Maps',
        component: MapsGraphicComponent,
        canActivate: [ClientGuard]

    }
];

@NgModule({
    declarations: [
        MapsGraphicComponent,
        MapContentComponent,
        MapSidenavComponent,
        MapDialogComponent

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
        MatChipsModule,
        MatSelectModule

    ]
    , entryComponents: [MapDialogComponent]
})
export class MapsGraphicModule {
}
