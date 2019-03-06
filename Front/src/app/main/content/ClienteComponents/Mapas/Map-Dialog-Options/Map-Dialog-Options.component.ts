import { Component, AfterViewChecked, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { Router } from '@angular/router';
import { ReunionService } from 'app/ApiServices/ReunionService';
import { E_Reunion } from 'app/Models/E_Reunion';

@Component({
    selector: 'Map-dialog',
    templateUrl: './Map-Dialog-Options.component.html',
    styleUrls: ['./Map-Dialog-Options.component.scss']
})
export class MapDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<MapDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private NavigationInfoService: NavigationInfoService,
        private ReunionService: ReunionService
        , private Router: Router) { }
    ngOnInit(): void {
        var objreunion: E_Reunion = new E_Reunion()
        objreunion.Id_Departamento = this.data.IdDepto

        this.ReunionService.ReunionesxDepto(objreunion).subscribe((x) => {
            this.data.NumeroEventos = x.length;
        })
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    CreateEvent() {
        this.NavigationInfoService.storage = this.data
        this.dialogRef.close();
        this.Router.navigate(["/eventcreator"])
    }
    VisorEvent() {
        this.NavigationInfoService.storage = this.data
        this.dialogRef.close();
        this.Router.navigate(["/eventvisor"])
    }

}