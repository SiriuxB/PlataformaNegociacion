import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_TipoIndividuo2 } from 'app/Models/E_TipoIndividuo2';
import { E_Individuo2 } from 'app/Models/E_Individuo2';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AdminServices } from 'app/ApiServices/AdminServices';
import { Router } from '@angular/router';
import { UserService } from '../../../../../ApiServices/UserService';
import { E_Departamentos } from '../../../../../Models/E_Departamentos';
import { E_Municipios } from 'app/Models/E_Municipios';
import { E_Cliente } from 'app/Models/E_Cliente';
import { E_Sector } from '../../../../../Models/E_Sector';
import { E_TipoAntecedente } from '../../../../../Models/E_TipoAntecedente';
import { E_TipoEstadoRevision } from '../../../../../Models/E_TipoEstadoRevision';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { E_antecedentesxindividuo2 } from '../../../../../Models/E_antecedentesxindividuo2';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ProfileConfig } from '../../../../../Tools/ProfileConfig';


@Component({
    moduleId: module.id,
    selector: 'admin-individuo2',
    templateUrl: 'admin-individuo2.component.html',
    styleUrls: ['admin-individuo2.component.scss']
})
export class AdminIndividuo2Component implements OnInit {
    ListSector: E_Sector[];
    idindividuo: number;
    formDinamic: FormGroup;
    public resultado: string;
    indi: E_Individuo2;
    ListMunicipiosBase: E_Municipios[];
    listTipoAntecedente: E_TipoAntecedente[];
    listTipoRevision: E_TipoEstadoRevision[];
    ListDepartamentos: E_Departamentos[];
    SucceSave: boolean;
    dataURL: any;
    observaciones: any
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    TipoIndividuo2Seleccionado: any
    tiporevisionselec: any
    ListTipoIndividuo2: Array<E_TipoIndividuo2> = new Array<E_TipoIndividuo2>()
    public Nombre: string;
    public descripcion: string;
    public checked;
    public xx: E_Individuo2;
    public departaseleccionado: number;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private AdminServices: AdminServices,
        private Router: Router,
        private UserService: UserService,
        private navigation: NavigationInfoService,

        private Matdialog: MatDialog,
    ) {

        this.formErrors = {
            email: {},
            Cedula: {},
            Telefonof: {},
            Nombre: {},
            Apellido: {},
            Celular: {},
            TipoIndividuo2: {},
            Direccion: {}
        };

        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            Cedula: ['', []],
            Telefonof: [''],
            Celular: ['', [Validators.required]],
            Nombre: [''],
            Apellido: [''],
            Direccion: ['', [Validators.required]],
            TipoIndividuo2: [undefined],
            Departamento: [undefined]

        });


        this.xx = this.navigation.dataIndividuo2;
        console.log(this.xx);

        this.AdminServices.Individuo2xCorreo(this.xx).subscribe((x) => {
            this.xx = x

            this.form.setValue({
                email: this.xx.Correo,
                Cedula: this.xx.Cedula,
                Telefonof: this.xx.Telefono,
                Nombre: this.xx.Nombres,
                Apellido: this.xx.Apellidos,
                Celular: this.xx.Celular,
                TipoIndividuo2: this.xx.Id_tipoindividuo2,
                Direccion: this.xx.Direccion,
                Departamento: this.xx.Id_departamento
            })

            this.observaciones = this.xx.observacionsac
            this.tiporevisionselec = this.xx.Id_tipoestadorevision
            this.idindividuo = this.xx.Id;
            this.cargador(this.xx);
        })


    }

    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/mainpageindividuo1'])
    }

    cargador(para: E_Individuo2) {

        this.ParameterService.listarTipoAntecedente().subscribe((x) => {
            ;
            this.listTipoAntecedente = x
            var ante: E_TipoAntecedente;

            this.listTipoAntecedente.forEach(function (part, index, Source) {
                ;

                Source[index].valuee =

                    ((para.antecedendes.find((z) => z.Id_tipoantecedentes == Source[index].Id)) != undefined) ? para.antecedendes.find((z) => z.Id_tipoantecedentes == Source[index].Id).AntecendetesOk : false;
            });

        })



        this.ParameterService.listarTipoEstadoRevision().subscribe((x) => {

            this.listTipoRevision = x
        })

        //this.MaskedNumber = GenerateMask.numberMask
        //this.MaskedNumberNoDecimal = GenerateMask.Nodecimal
        this.ParameterService.listarTipoIndividuo2()
            .subscribe((x: Array<E_TipoIndividuo2>) => {

                this.ListTipoIndividuo2 = x.filter((y) => y.Id == para.Id_tipoindividuo2)
                this.TipoIndividuo2Seleccionado = para.Id_tipoindividuo2

            })


        this.formDinamic = this.formBuilder.group({
            Municipio: [undefined, [Validators.required]],
            Nombre: [undefined, [Validators.required]],
            Sector: [undefined, [Validators.required]],
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });



        var ObjSector: E_Sector = new E_Sector()
        ObjSector.Id_departamento = para.Id_departamento
        this.ParameterService.ListarSector(ObjSector).subscribe((x) => {

            this.ListSector = x
        })

        this.ParameterService.listarDepartamentos().subscribe((x) => {
            ;
            this.ListDepartamentos = x
            this.departaseleccionado = 5
        })
    }
    ngOnInit() {

        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal


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

    confirmData() {
        this.confirmDialogRef = this.Matdialog.open(FuseConfirmDialogComponent, {})
        this.confirmDialogRef.componentInstance.confirmMessage = '¿Estas seguro de realizar esta acción?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) { this.EnviarInfo() }
            this.confirmDialogRef = null;
        });

    }
    EnviarInfo() {
        ;
        var lista = this.listTipoAntecedente
        var cantidad: number;


        if (this.tiporevisionselec == undefined) {
            this.resultado = "Por favor ingrese una descripcion en el campo Observacion";
            return;
        }


        var objIndividuo2: E_Individuo2 = new E_Individuo2()
        objIndividuo2.Id = this.idindividuo;
        objIndividuo2.Direccion = this.form.value.Direccion
        objIndividuo2.Correo = this.form.value.email
        objIndividuo2.Telefono = this.form.value.Telefonof
        objIndividuo2.Celular = this.form.value.Celular
        objIndividuo2.observacionsac = this.observaciones;
        objIndividuo2.Id_tipoestadorevision = this.tiporevisionselec;
        var ante: E_antecedentesxindividuo2 = new E_antecedentesxindividuo2();
        objIndividuo2.antecedendes = new Array<E_antecedentesxindividuo2>();
        this.listTipoAntecedente.forEach(element => {
            ante = new E_antecedentesxindividuo2();
            ante.Id_individuo2 = objIndividuo2.Id;
            ante.AntecendetesOk = (element.valuee == undefined) ? false : true;
            ante.FechaAprobado = new Date();
            ante.Id_tipoantecedentes = element.Id;
            objIndividuo2.antecedendes.push(ante);
        });

        this.AdminServices.modificarIndividuo2(objIndividuo2).subscribe((x: boolean) => {
            ;
            this.SucceSave = x;
            this.resultado = "Exito al modificar!";
            if(this.tiporevisionselec==3){
                var cl : E_Cliente = new E_Cliente();
                cl.EmailObjeto.cuerpo = ProfileConfig.cuerpo2(this.form.value.Cedula, this.form.value.Nombre)
                        this.AdminServices.enviarEmail(cl).subscribe((x: boolean) => {
                            
                        });
            }
            
        })

    }



}
