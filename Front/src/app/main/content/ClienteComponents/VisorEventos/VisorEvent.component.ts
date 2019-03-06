import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_TipoReunion } from 'app/Models/E_TipoReunion';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';
import { E_Imagen } from 'app/Models/E_Imagen';
import { DetailDialogComponent } from './DetailDialog/DetailDialog.component';
import { Router } from '@angular/router';
import { E_Reunion } from 'app/Models/E_Reunion';
import { ReunionService } from 'app/ApiServices/ReunionService';
import { ImageService } from 'app/ApiServices/ImageServices';



@Component({
    selector: 'VisorEvent',
    templateUrl: './VisorEvent.component.html',
    styleUrls: ['./VisorEvent.component.scss']
})
export class VisorEventComponent implements OnInit {
    rows = [];

    selected = [];
    loadingIndicator = true;
    reorderable = true;
    DeptoName = ""
    DatoDepto: any
    constructor(private NavigationData: NavigationInfoService,
        private ReunionService: ReunionService,
        private Router: Router,
        private dialog: MatDialog,
        private ImageService: ImageService, ) {

        if (this.NavigationData.storage == undefined) { this.Router.navigate(["/Maps"]) }
        else {
            if (this.NavigationData.storage.IdDepto != undefined) {
                this.DatoDepto = this.NavigationData.storage.IdDepto
            } else {
                this.DatoDepto = this.NavigationData.storage.Id_Departamento
            }
        }




        // NumeroEventos: NUmero, Nombre: TextX, CodigoDepto: CodigoDepto ,IdDepto:IdDepto
    }
    ObtenerReuniones() {
        var ObjReu: E_Reunion = new E_Reunion()
        ObjReu.Id_Departamento = this.DatoDepto
        this.ReunionService.ReunionesxDepto(ObjReu).subscribe((x: Array<E_Reunion>) => {
            x.forEach(element => {
                element.NombreCliente = element.NombrexAnonimo
            });
            this.rows = x;
            this.loadingIndicator = false;
        }


        )
    }
    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/Maps'])
    }

    ngOnInit() {


        this.loadingIndicator = true;
        this.ObtenerReuniones()

    }
    selectedEvent(x) {

        var ImaObj: E_Imagen = new E_Imagen()
        ImaObj.Id_Reunion = x.selected[0].Id
        this.ImageService.ImagenxReunion(ImaObj).subscribe((y) => {
            
            x.selected[0].Estado = y.Id == undefined ? false : true

            const dialogRef = this.dialog.open(DetailDialogComponent, {
                data: x
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result != undefined) {

                }

            });

        })



    }
}
