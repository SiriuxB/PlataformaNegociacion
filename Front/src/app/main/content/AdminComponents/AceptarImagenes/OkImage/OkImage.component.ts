import { Component, AfterViewChecked, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { Router } from '@angular/router';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { ImageService } from '../../../../../ApiServices/ImageServices';
import { E_Imagen } from '../../../../../Models/E_Imagen';

@Component({
    selector: 'OkImage',
    templateUrl: './OkImage.component.html',
    styleUrls: ['./OkImage.component.scss']
})
export class OkImageComponent implements OnInit {
    SaveInProgress: boolean;
    public imagee: string;
    public resultado: string;
    constructor(
        private ImageService: ImageService,
        public dialogRef: MatDialogRef<OkImageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private NavigationInfoService: NavigationInfoService
        , private Router: Router) { }
    ngOnInit(): void {

        this.imagee = this.data.Ruta;
    }
    onNoClick(): void {

    }


    GotoDetailsNow() {
        this.Router.navigate(["/detailevent"])

        this.NavigationInfoService.dataEvento = this.data.selected[0]
        this.dialogRef.close(true);
    }

    aprobar() {
        ;
        var x: E_Imagen = new E_Imagen()
        x = this.data;
        x.Aprobada = true;
        this.SaveInProgress = true
        this.ImageService.aprobarImagen(x).subscribe((x) => {
            this.SaveInProgress = false
            if (x) {
                this.resultado = "Imagen aprobada.";
                setTimeout(() => {
                    this.dialogRef.close(true);
                }, 1000)
            } else {
                this.resultado = "Ocurrio un error.";
                setTimeout(() => {
                    this.dialogRef.close(true);
                }, 1000)
            }
        });

    }

}