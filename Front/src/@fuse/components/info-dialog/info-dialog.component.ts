import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector   : 'infodialog',
    templateUrl: './info-dialog.component.html',
    styleUrls  : ['./info-dialog.component.scss']
})
export class infodialogComponent
{
    public confirmMessage: string;

    constructor(public dialogRef: MatDialogRef<infodialogComponent>)
    {
    }

}
