import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AdminServices } from 'app/ApiServices/AdminServices';
import { Router } from '@angular/router';
import { UserService } from '../../../../ApiServices/UserService';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_Metas } from 'app/Models/E_Metas';
import { E_Municipios } from 'app/Models/E_Municipios';
import { E_ItemsMetas } from '../../../../Models/E_ItemsMetas';
import { E_DirectorDepartamento } from '../../../../Models/E_DirectorDepartamento';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { E_GerenteSector } from '../../../../Models/E_GerenteSector';
import { E_Usuario } from 'app/Models/E_Usuario';
import { E_Canal } from '../../../../Models/E_Canal';
import { E_TipoCanal } from '../../../../Models/E_TipoCanal';
import { E_Llamadas } from '../../../../Models/E_Llamadas';
import { E_CallCenter } from '../../../../Models/E_CallCenter';
import { LlamadasBuilder } from '../../../../Builders/Llamadas.model.builder';
import { E_MetasCall } from '../../../../Models/E_MetasCall';


@Component({
    moduleId: module.id,
    selector: 'llamadas',
    templateUrl: 'llamadas.component.html',
    styleUrls: ['llamadas.component.scss']
})
export class LlamadasComponent implements OnInit {
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    SaveInProgress: boolean;
    SucceSave: boolean;
    form: FormGroup;
    formErrors: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    listCanal: Array<E_Canal> = new Array<E_Canal>()
    listTipoCanal: Array<E_TipoCanal> = new Array<E_TipoCanal>()
    listLlamadas: Array<E_Llamadas> = new Array<E_Llamadas>();
    listCallCenter: Array<E_CallCenter> = new Array<E_CallCenter>()
    listarMetasCall: Array<E_CallCenter> = new Array<E_CallCenter>()


    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private Matdialog: MatDialog,

        private AdminServices: AdminServices,
        private Router: Router,
        private UserService: UserService
    ) {
        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal

    }


    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/ListarLlamadas'])
    }

    ngOnInit() {



        this.AdminServices.listarCallCenter()
            .subscribe((x: Array<E_CallCenter>) => {
                this.listCallCenter = x
                var z = this.UserService.GetCurrentCurrentUserNow().Id;
                for (var i = 0; i < 10; i++) {
                    var y = new LlamadasBuilder().Build()
                   y.Id_Usuario=z;
                    y.ListCallCenter = this.listCallCenter
                    this.listLlamadas.push(y);
                }
            })





    }

    selectCall(y, IndexLLamada) {
        var call: E_MetasCall = new E_MetasCall()
        call.Id_CallCenter = y.value;
        this.AdminServices.listarMetasCallActivas(call)
            .subscribe((x: Array<E_MetasCall>) => {
                this.listLlamadas[IndexLLamada].ListMetasCall = x

            })
    }

    hohoho() {
        console.log(this.listLlamadas)
    }


    ConfirmData() {
        debugger;
        this.confirmDialogRef = this.Matdialog.open(FuseConfirmDialogComponent, {})
        this.confirmDialogRef.componentInstance.confirmMessage = '¿Estas seguro de realizar esta acción?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) { this.EnviarInfo() }
            this.confirmDialogRef = null;
        });

    }
    EnviarInfo() {


        this.SaveInProgress = true

        this.AdminServices.crearLlamada(this.listLlamadas).subscribe((x: boolean) => {
            if (x) {
                this.SucceSave = x
                this.SaveInProgress = false;
                this.listLlamadas = new Array<E_Llamadas>();
                for (var i = 0; i < 10; i++) {

                    var y = new LlamadasBuilder().Build()
                    y.ListCallCenter = this.listCallCenter
                    this.listLlamadas.push(y);
                }
            }
        })
    }
}
