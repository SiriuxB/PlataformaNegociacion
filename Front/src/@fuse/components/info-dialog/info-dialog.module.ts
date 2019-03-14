import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { infodialogComponent } from './info-dialog.component';

@NgModule({
    declarations: [
        infodialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    entryComponents: [
        infodialogComponent
    ],
})
export class infodialogModule
{
}
