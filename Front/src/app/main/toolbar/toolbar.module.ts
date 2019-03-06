import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatToolbarModule, MatDialog, MatDialogModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseToolbarComponent } from 'app/main/toolbar/toolbar.component';
import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { UserInfoComponent } from 'app/main/content/AutenticationComponents/UserInfo/UserInfo.component';

@NgModule({
    declarations: [
        FuseToolbarComponent
    ],
    imports     : [
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        MatDialogModule
    ],
    exports     : [
        FuseToolbarComponent
    ],entryComponents : [UserInfoComponent]
})
export class FuseToolbarModule
{
}
