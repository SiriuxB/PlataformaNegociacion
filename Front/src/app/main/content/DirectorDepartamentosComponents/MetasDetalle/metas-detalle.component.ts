import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AdminServices } from 'app/ApiServices/AdminServices';
import { Router } from '@angular/router';
import { UserService } from '../../../../ApiServices/UserService';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_MetasDetalle } from 'app/Models/E_MetasDetalle';
import { E_Metas } from 'app/Models/E_Metas';
import { E_DirectorDepartamento } from '../../../../Models/E_DirectorDepartamento';

@Component({
    moduleId: module.id,
    selector: 'metas-detalle',
    templateUrl: 'metas-detalle.component.html',
    styleUrls: ['metas-detalle.component.scss']
})
export class MetasDetalleComponent implements OnInit {
    DirectorGuardador: E_DirectorDepartamento;
    SucceSave: boolean;
    dataURL: any;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    MetaSeleccionado: any
    ListMetas: Array<E_Metas> = new Array<E_Metas>()
    public Nombre: string;
    public descripcion: string;
    public checkedActivo;
    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private dialog: MatDialog,
        private AdminServices: AdminServices,
        private Router: Router,
        private UserService: UserService
    ) {

        this.formErrors = {

            Meta: {},
            CantidadRecolectada: {},
            Observacion: {}
        };

    }

    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/mainpagedirector'])
    }
    ngOnInit() {
        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal
        var User = this.UserService.GetCurrentCurrentUserNow()
        var DriObj: E_DirectorDepartamento = new E_DirectorDepartamento()
        DriObj.Correo = User.UserName
        this.AdminServices.directorxCorreo(DriObj).mergeMap((x: E_DirectorDepartamento) => {
            this.DirectorGuardador = x
            var objMetas: E_Metas = new E_Metas()
            objMetas.id_directordepto = x.Id
            return this.ParameterService.listarMetasxDirexFechasxActiva(objMetas)
        }).subscribe((x: Array<E_Metas>) => {
            this.ListMetas = x
        })

        this.form = this.formBuilder.group({

            Meta: [undefined, [Validators.required]],
            CantidadRecolectada: ['', [Validators.required]],
            Observacion: ['', [Validators.required]],
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

    }

    onFormValuesChanged() {

        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }

    EnviarInfo() {

        var objMetasDetalle: E_MetasDetalle = new E_MetasDetalle()
        objMetasDetalle.Id_Meta = this.form.value.Meta
        objMetasDetalle.CantidadRecolectada = this.form.value.CantidadRecolectada
        objMetasDetalle.Observacion = this.form.value.Observacion
        objMetasDetalle.Id_GerenteSector = this.DirectorGuardador.Id_GerenteSector
        objMetasDetalle.FechaCreacion = new Date();

        this.AdminServices.crearMetasDetalle(objMetasDetalle).subscribe((x: boolean) => {
            this.SucceSave = x
            this.CleanForm()
        })

    }
    CleanForm() {
        this.form.setValue({ Meta: 0, CantidadRecolectada: "", Observacion: "" })
    }


}

