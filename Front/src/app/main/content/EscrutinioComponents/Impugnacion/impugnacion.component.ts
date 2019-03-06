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
import { E_Impugnacion } from 'app/Models/E_Impugnacion';
import { E_Metas } from 'app/Models/E_Metas';
import { E_TipoImpugnacion } from '../../../../Models/E_TipoImpugnacion';
import { E_Mesa } from 'app/Models/E_Mesa';
import { E_PuestoVotacion } from 'app/Models/E_PuestoVotacion';
import { E_ZonaElectoral } from 'app/Models/E_ZonaElectoral';
import { E_Municipios } from '../../../../Models/E_Municipios';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ImageService } from 'app/ApiServices/ImageServices';
import { fotoDialogComponent } from 'app/main/content/ClienteComponents/CreadorEventos/fotoDialog/fotoDialog.component';
import { AppSettings } from 'app/app.settings';

@Component({
    moduleId: module.id,
    selector: 'impugnacion',
    templateUrl: 'impugnacion.component.html',
    styleUrls: ['impugnacion.component.scss']
})
export class ImpugnacionComponent implements OnInit {

    lat: number = -34.397;
    lng: number = 150.644;
    SaveInProgress: boolean;
    ListMunicipiosBase: any;
    ListMesas: E_Mesa[];
    DepartamentoSeleccionado: any
    SucceSave: boolean;
    dataURL: any;
    ListDepartamentos: any
    MunicipioSeleccionado: any
    ListMunicipiosGroup: any
    ListZonaElectoralGroup: any
    ListPuestoVotacionGroup: any
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    TipoImpugnacionSeleccionado: any
    ListTipoImpugnacion: Array<E_TipoImpugnacion> = new Array<E_TipoImpugnacion>()
    SitioEscrutinoSeleccionado: any
    MesaSeleccionado: any
    ListMesa: Array<E_Mesa> = new Array<E_Mesa>()
    PuestoVotacionSeleccionado: any
    public Nombre: string;
    public descripcion: string;
    public checkedActivo;
    // Horizontal Stepper
    public hola: any
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private dialog: MatDialog,
        private AdminServices: AdminServices,
        private Router: Router,
        private UserService: UserService,
        private Matdialog: MatDialog,
        private ImageService: ImageService

    ) {

        this.formErrors = {

            TipoImpugnacion: {},
            Observacion: {},
            Departamentos: {},
            Municipios: {},
            ZonaElectoral: {},
            PuestoVotacion: {},
            Mesa: {}
        };

    }
    AbrirCamara() {
        const dialogRef = this.dialog.open(fotoDialogComponent, {
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined) {
                this.dataURL = result
                this.noFoto = false
            }

        });
    }
    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/MainEscrutinio'])
    }
    ngOnInit() {
        if (navigator.geolocation) {
            var that = this
            this.lat = 0
            this.lng = 0

            navigator.geolocation.getCurrentPosition((position) => {
                this.lat = position.coords.latitude
                this.lng = position.coords.longitude
            });

        } else {

        }
        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal

        this.ParameterService.ObtenerTipoInpugnacion()
            .subscribe((x: Array<E_TipoImpugnacion>) => {
                this.ListTipoImpugnacion = x
            })
        this.ParameterService.listarDepartamentos()
            .subscribe((x: Array<E_Departamentos>) => {
                this.ListDepartamentos = x
            })
        this.ParameterService.ListarMunicipios()
            .subscribe((x: Array<E_Municipios>) => {
                this.ListMunicipiosBase = x
            })



        this.form = this.formBuilder.group({

            TipoImpugnacion: [undefined, [Validators.required]],
            Observacion: ['', [Validators.required]],
            Departamentos: [undefined, [Validators.required]],
            Municipios: [undefined, [Validators.required]],
            ZonaElectoral: [undefined, [Validators.required]],
            PuestoVotacion: [undefined, [Validators.required]],
            Mesa: [undefined, [Validators.required]]
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

        var objImpugnacion: E_Impugnacion = new E_Impugnacion()
        debugger
        objImpugnacion.Id_Usuario = this.UserService.GetCurrentCurrentUserNow().Id//TODO: Poner el Id del testigo en sesion.
        objImpugnacion.Id_TipoImpugnacion = this.form.value.TipoImpugnacion
        objImpugnacion.Observacion = this.form.value.Observacion
        objImpugnacion.Id_Depto = this.form.value.Departamentos.Id
        objImpugnacion.Id_Municipio = this.form.value.Municipios
        objImpugnacion.Id_ZonaElectoral = this.form.value.ZonaElectoral
        objImpugnacion.Id_PuestoVotacion = this.form.value.PuestoVotacion
        objImpugnacion.Id_Mesa = this.form.value.Mesa
        objImpugnacion.Latitud = this.lat.toString()
        objImpugnacion.Longitud = this.lng.toString()
        //*objImpugnacion.FechaCreacion = new Date();      
        this.SaveInProgress = true
        var ImageBaseUrl = AppSettings.Global().API_ImageContent
        var ImagenObj: E_Imagen = new E_Imagen()

        if (this.dataURL != undefined) {
            var formdata = new FormData();
            //  var blob = PhotoTool.dataURItoBlob(this.dataURL);
            var fd = new FormData(document.forms[0]);
            ImagenObj.Nombre = btoa(((new Date().getMilliseconds()) * Math.random()).toString())
            ImagenObj.Ruta = ImageBaseUrl + ImagenObj.Nombre + '.jpeg'
            ImagenObj.Aprobada = false
            fd.append("canvasImage", this.dataURL, ImagenObj.Nombre);
            this.ImageService.UploadJsonFile(fd).subscribe((x) => {
                if (x) {
                    this.ImageService.RegistrarImagen(ImagenObj).subscribe((x => {
                        if (x) {
                            this.SucceSave = true
                            objImpugnacion.Id_Imagen = x
                            this.AdminServices.crearImpugnacion(objImpugnacion).subscribe((x: boolean) => {
                                this.SucceSave = x
                                this.CleanForm()
                                this.SaveInProgress = false
                            })
                        }
                    }))
                }
            })
        } else {

            this.AdminServices.crearImpugnacion(objImpugnacion).subscribe((x: boolean) => {
                this.SucceSave = x
                this.CleanForm()
                this.SaveInProgress = false
            })


        }

        /*      this.ImageService.RegistrarImagen(ImagenObj).subscribe((x => {
                  if (x) {
                      this.SucceSave = true
                      setTimeout(() => {
                          this.Router.navigate(["/Maps/"])
                      }, 2000)
                  }
              }))  */



    }


    confirmData() {
        this.confirmDialogRef = this.Matdialog.open(FuseConfirmDialogComponent, {})
        this.confirmDialogRef.componentInstance.confirmMessage = '¿Estas seguro de realizar esta acción?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) { this.EnviarInfo() }
            this.confirmDialogRef = null;
        });

    }


    CleanForm() {
        this.form.setValue({
            TipoImpugnacion: 0,
            Observacion: "",
            Departamentos: 0,
            Municipios: 0,
            ZonaElectoral: 0,
            PuestoVotacion: 0,
            Mesa: 0
        })
    }


    SelectedDepartamento(y) {
        debugger
        this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(y.value.Codigo))
    }

    SelectedMunicipio(y) {
        var objzona: E_ZonaElectoral = new E_ZonaElectoral()
        objzona.Id_Municipio = y.value
        this.ParameterService.listarZonasxMunicipio(objzona)
            .subscribe((x: Array<E_ZonaElectoral>) => {
                this.ListZonaElectoralGroup = x
            })

    }
    SelectedZonaElectoral(y) {
        var objPuesto: E_PuestoVotacion = new E_PuestoVotacion()
        objPuesto.Id_ZonaElectoral = y.value
        this.ParameterService.listarPuestosVotacionxZona(objPuesto).subscribe((x: Array<E_PuestoVotacion>) => {
            this.ListPuestoVotacionGroup = x
        })
    }

    SelectedPuestoVotacion(y) {
        var objPuesto: E_Mesa = new E_Mesa()
        objPuesto.Id_puestoVotacion = y.value
        this.ParameterService.listarMesasxPuesto(objPuesto).subscribe((x: Array<E_Mesa>) => {

            this.ListMesas = x
        })

    }

}

