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
import { UserService } from '../../../../ApiServices/UserService';
import { E_Departamentos } from '../../../../Models/E_Departamentos';
import { E_Municipios } from 'app/Models/E_Municipios';
import { E_Cliente } from 'app/Models/E_Cliente';
import { E_Sector } from '../../../../Models/E_Sector';
import { E_ZonaElectoral } from '../../../../Models/E_ZonaElectoral';
import { E_PuestoVotacion } from 'app/Models/E_PuestoVotacion';
import { E_Mesa } from '../../../../Models/E_Mesa';
import { E_ConfiguracionTipoIndividuo } from '../../../../Models/E_ConfiguracionTipoIndividuo';
import { E_DetalleIndividuo } from 'app/Models/E_DetalleIndividuo';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { IndividuoServices } from '../../../../ApiServices/IndividuoServices';
import { E_Individuo1 } from '../../../../Models/E_Individuo1';
import { E_Usuario } from '../../../../Models/E_Usuario';
import { Perfiles, TipoPersona2 } from '../../../../Enums/Enumerations';
import { ProfileConfig } from '../../../../Tools/ProfileConfig';
import { E_TipoIndividuo1 } from 'app/Models/E_TipoIndividuo1';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { E_DirectorDepartamento } from '../../../../Models/E_DirectorDepartamento';
import { E_ReporteIndividuo2 } from '../../../../Models/E_ReporteIndividuo2';
@Component({
    moduleId: module.id,
    selector: 'Individuo2Dir',
    templateUrl: 'Individuo2Dir.component.html',
    styleUrls: ['Individuo2Dir.component.scss']
})
export class Individuo2DirComponent implements OnInit {
    individuoGuardador: E_Individuo1;
    IndividuosDefault: E_Individuo1[];
    ListTipoIndividuo1: E_TipoIndividuo1[];
    PasswordTemp: string;
    UserNameTemp: string;
    SaveInProgress: boolean;
    ShowErrorSave: boolean;
    ShowSuccess: boolean;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    showError: boolean;
    errorMesage: string;
    countMesas: number = 0;
    countDepartamento: number = 0
    countZonaElectoral: number = 0
    countPuestoVotacion: number = 0
    countMunicipio: number = 0
    DepartamentoConfig: boolean
    MunicipioConfig: boolean
    ZonaElectoralConfig: boolean
    PuestoVotacionConfig: boolean
    MesaConfig: boolean
    showMesa: boolean;
    showPuestoVotacion: boolean;
    showZonaElectoral: boolean;
    showMunicipio: boolean;
    showDepartamento: boolean;
    public Detalleindividuo: Array<E_DetalleIndividuo> = new Array<E_DetalleIndividuo>();
    ListMunicipiosGroup: E_Municipios[];
    ListConfiguration: E_ConfiguracionTipoIndividuo[];
    ListMesas: E_Mesa[];
    formErrorsDynamic: any
    ListPuestoVotacionGroup: E_PuestoVotacion[];
    ListZonaElectoralGroup: E_ZonaElectoral[];
    ListSector: E_Sector[];
    formDinamic: FormGroup;
    ListMunicipiosBase: E_Municipios[];
    ListDepartamentos: E_Departamentos[];
    SucceSave: boolean;
    dataURL: any;
    editar:boolean;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    TipoIndividuo2Seleccionado: E_TipoIndividuo2
    ListTipoIndividuo2: Array<E_TipoIndividuo2> = new Array<E_TipoIndividuo2>()
    public Nombre: string;
    public descripcion: string;
    public checked;
    public xx: E_ReporteIndividuo2;
    public indi2 : E_Individuo2 ;
    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private dialog: MatDialog,
        private AdminServices: AdminServices,
        private Router: Router,
        private UserService: UserService,
        private Matdialog: MatDialog,
        private IndividuoServices: IndividuoServices,private navigation: NavigationInfoService
    ) { }


    ngOnInit() {
        this.chargeAllforms()
        this.ChargeAllParameters()
    }
    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/ReporteIndividuo2FromDirector'])
    }




    EnviarInfo() {
        this.showError = false
        if (this.Detalleindividuo.length == 0) {
            this.showError = true
            this.errorMesage = "Debe Haber al menos una asignacion"
            return
        }
        this.confirmDialogRef = this.Matdialog.open(FuseConfirmDialogComponent, {
        })
        this.confirmDialogRef.componentInstance.confirmMessage = '¿Estas seguro de realizar esta acción?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.GuardadoAsegurado()
            }
            this.confirmDialogRef = null;
        });

        //   this.AdminServices.crearIndividuo2(objIndividuo2).subscribe((x: boolean) => { this.SucceSave = x })

    }


    ConfirmData() {
        debugger;
        this.confirmDialogRef = this.Matdialog.open(FuseConfirmDialogComponent, {})
        this.confirmDialogRef.componentInstance.confirmMessage = '¿Estas seguro de realizar esta acción?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) { this.GuardadoAsegurado2() }
            this.confirmDialogRef = null;
        });

    }

    GuardadoAsegurado2() {
        debugger;
        this.SaveInProgress = true
        this.ShowErrorSave = false
        this.ShowSuccess = false
        var objIndividuo2: E_Individuo2 = new E_Individuo2()
        objIndividuo2.Cedula = this.form.value.Cedula.replace(/\./g, "");
        objIndividuo2.Nombres = this.form.value.Nombre
        objIndividuo2.Apellidos = this.form.value.Apellido
        objIndividuo2.Direccion = this.form.value.Direccion
        objIndividuo2.Correo = this.form.value.email.toLowerCase()
        objIndividuo2.Telefono = this.form.value.Telefonof
        objIndividuo2.Celular = this.form.value.Celular
        objIndividuo2.Activo = true
        objIndividuo2.FechaCreacion = new Date();  
        objIndividuo2.observacionsac = this.form.value.Observacion    
      

        this.AdminServices.modificarIndividuo22(objIndividuo2).subscribe((x: boolean) => {
            if (x) {
                
                        this.ShowSuccess = true
                        this.Clearforms()
                        this.clearDetail()                   
                    this.SaveInProgress = false
                
            }
            

        })

    }

    GuardadoAsegurado() {

        this.SaveInProgress = true
        this.ShowErrorSave = false
        this.ShowSuccess = false
        var objIndividuo2: E_Individuo2 = new E_Individuo2()
        objIndividuo2.Cedula = this.form.value.Cedula.replace(/\./g, "");
        objIndividuo2.Nombres = this.form.value.Nombre
        objIndividuo2.Apellidos = this.form.value.Apellido
        objIndividuo2.Direccion = this.form.value.Direccion
        objIndividuo2.Correo = this.form.value.email.toLowerCase()
        objIndividuo2.Telefono = this.form.value.Telefonof
        objIndividuo2.Celular = this.form.value.Celular
        objIndividuo2.Activo = true
        objIndividuo2.FechaCreacion = new Date();
        objIndividuo2.Id_individuo1 = this.individuoGuardador.Id
        objIndividuo2.Id_tipoestadorevision = 1 //Pendiente revision por SAC
        objIndividuo2.Id_tipoindividuo2 = this.form.value.TipoIndividuo2.Id
        objIndividuo2.CambiarClave = true
        objIndividuo2.Detalleindividuo = this.Detalleindividuo


        var objUsuario: E_Usuario = new E_Usuario()
        var objCliente: E_Cliente = new E_Cliente()
        var passTemp = Math.random().toString(36).slice(2).substring(0, 6);
        objUsuario.Passwordd = btoa(passTemp)
        objUsuario.UserName = objIndividuo2.Correo
        objUsuario.Email = objIndividuo2.Correo
        objUsuario.Estado = true
        objUsuario.Id_Perfil = ProfileConfig.ExtractProfilexTipo2(this.TipoIndividuo2Seleccionado.Id) // Correponde perfiles para tipo2
        objCliente.Nombre = objIndividuo2.Nombres
        objCliente.Correo = objIndividuo2.Correo
        objCliente.Cedula = objIndividuo2.Cedula
        objCliente.Telefono = objIndividuo2.Telefono
        objCliente.Celular = objIndividuo2.Celular
        objCliente.Id_Departamento = this.individuoGuardador.Id_Departamento
        objCliente.Apellido = objIndividuo2.Apellidos
        objCliente.Estado = true
        objCliente.Direccion = objIndividuo2.Direccion
        objCliente.usuario = objUsuario

        this.IndividuoServices.crearIndividuo2(objIndividuo2).subscribe((x: boolean) => {
            if (x) {
                this.UserService.crearCliente(objCliente).subscribe((y: boolean) => {
                    if (y) {
                        this.UserNameTemp = objUsuario.UserName
                        this.PasswordTemp = passTemp
                        this.ShowSuccess = true
                        this.Clearforms()
                        this.clearDetail()
                    }
                    this.SaveInProgress = false
                })
            }
            else {
                this.ShowErrorSave = true
            }

        })

    }

    SelectedDepartamento(y) {
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


    CargarIndividuo2(y) {
        this.clearDetail()
        this.showDepartamento = false
        this.showMunicipio = false
        this.showMesa = false
        this.showZonaElectoral = false
        this.showPuestoVotacion = false
        this.ParameterService.listarTipoIndividuo2()
            .subscribe((x: Array<E_TipoIndividuo2>) => {
                var objPerf = ProfileConfig.ExtractProfilexTipo1(y.value)
                switch (objPerf) {
                    case Perfiles.CoodinadorElectoral:
                        var objSelection = 1 // Coodinardor Electoral
                        if (this.IndividuosDefault.filter((x) => x.Id_tipoindividuo == 1).length > 0) {
                            this.individuoGuardador = this.IndividuosDefault.find((x) => x.Id_tipoindividuo == 1)
                        }

                        break;
                    case Perfiles.ITAuditoria:
                        var objSelection = 2 // IT y Auditoria   
                        if (this.IndividuosDefault.filter((x) => x.Id_tipoindividuo == 2).length > 0) {
                            this.individuoGuardador = this.IndividuosDefault.find((x) => x.Id_tipoindividuo == 2)
                        }
                        break;
                    case Perfiles.TransporteLogistica:
                        var objSelection = 3 //Transporte y Logistica
                        if (this.IndividuosDefault.filter((x) => x.Id_tipoindividuo == 3).length > 0) {
                            this.individuoGuardador = this.IndividuosDefault.find((x) => x.Id_tipoindividuo == 3)
                        }
                        break;
                    default:
                        break;
                }
                this.ListTipoIndividuo2 = x.filter((y) => y.Id_tipoindividuo1 == objSelection)
            })
    }
    AgregarItem(x: number) {

        var objDetalle: E_DetalleIndividuo = new E_DetalleIndividuo()
        switch (x) {
            case 2:
                if (this.formDinamic.value.Municipio != undefined) {
                    objDetalle.Id_Municipio = this.formDinamic.value.Municipio
                    if (!this.Detalleindividuo.some((x) => x.Id_Municipio == this.formDinamic.value.Municipio)) {
                        this.Detalleindividuo.push(objDetalle)
                        this.countMunicipio += 1
                    }
                }

                break;
            case 3:
                if (this.formDinamic.value.ZonaElectoral != undefined) {
                    objDetalle.Id_Municipio = this.formDinamic.value.Municipio
                    objDetalle.Id_ZonaElectoral = this.formDinamic.value.ZonaElectoral
                    if (!this.Detalleindividuo.some((x) => x.Id_ZonaElectoral == this.formDinamic.value.ZonaElectoral)) {
                        this.Detalleindividuo.push(objDetalle)
                        this.countZonaElectoral += 1
                    }
                }

                break;
            case 4:
                if (this.formDinamic.value.PuestoVotacion != undefined) {
                    objDetalle.Id_Municipio = this.formDinamic.value.Municipio
                    objDetalle.Id_ZonaElectoral = this.formDinamic.value.ZonaElectoral
                    objDetalle.Id_PuestoVotacion = this.formDinamic.value.PuestoVotacion
                    if (!this.Detalleindividuo.some((x) => x.Id_PuestoVotacion == this.formDinamic.value.PuestoVotacion)) {
                        this.Detalleindividuo.push(objDetalle)
                        this.countPuestoVotacion += 1

                    }
                }
                break;
            case 5:
                if (this.formDinamic.value.Mesa.Id != undefined) {
                    objDetalle.Id_Municipio = this.formDinamic.value.Municipio
                    objDetalle.Id_ZonaElectoral = this.formDinamic.value.ZonaElectoral
                    objDetalle.Id_PuestoVotacion = this.formDinamic.value.PuestoVotacion
                    objDetalle.Id_Mesa = this.formDinamic.value.Mesa.Id
                    if (!this.Detalleindividuo.some((x) => x.Id_Mesa == this.formDinamic.value.Mesa.Id)) {
                        this.Detalleindividuo.push(objDetalle)
                        this.countMesas += 1
                    }
                }
                break;
            default:
                break;
        }



    }
    onFormValuesChanged() {
        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }
            this.formErrors[field] = {};
            const control = this.form.get(field);
            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }

    onFormValuesChangedDinamyc() {

        for (const field in this.formErrorsDynamic) {
            if (!this.formErrorsDynamic.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formErrorsDynamic[field] = {};

            // Get the control
            const control = this.formDinamic.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrorsDynamic[field] = control.errors;
            }
        }
    }

    CargarPerfil(VarTipo: any) {
        this.clearDetail()


        var GroupConfig = this.ListConfiguration.filter((x) => x.Id_tipoindividuo2 == VarTipo.value.Id)
        if (GroupConfig.length > 0) {
            var flagActual = false
            var flagAnterior = false
            var valorVisibilidad = false
            this.showDepartamento = true
            this.DepartamentoConfig = false // por validar
            var TotalFalso = false
            GroupConfig.forEach(element => {

                flagActual = element.Activo
                valorVisibilidad = true
                if (flagAnterior == true && flagActual == false) {
                    valorVisibilidad = false
                    TotalFalso = true
                }
                flagAnterior = element.Activo
                if (TotalFalso == true) { valorVisibilidad = false }
                switch (element.NombreEstructura) {
                    case "Departamento":
                        this.DepartamentoConfig = flagActual
                        break;
                    case "Municipio":
                        this.showMunicipio = valorVisibilidad
                        this.MunicipioConfig = flagActual
                        break;
                    case "Zonas Electorales":
                        this.showZonaElectoral = valorVisibilidad
                        this.ZonaElectoralConfig = flagActual
                        break;
                    case "Puesto Votacion":
                        this.showPuestoVotacion = valorVisibilidad
                        this.PuestoVotacionConfig = flagActual
                        break;
                    case "Mesa":
                        this.showMesa = valorVisibilidad
                        this.MesaConfig = flagActual
                        break;
                    default:
                        break;
                }



                //  element.NombreEstructura == "Departamento"

            });
        }





    }

    ChargeAllParameters() {
        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal


        var obj: E_DirectorDepartamento = new E_DirectorDepartamento()
        obj.Correo = this.UserService.GetCurrentCurrentUserNow().UserName
        this.AdminServices.directorxCorreo(obj).mergeMap((x: E_DirectorDepartamento) => {
            debugger
            var objIndi: E_Individuo1 = new E_Individuo1()
            objIndi.Id_DirectorDepto = x.Id
            return this.IndividuoServices.Individuos1xDirectorEsp(objIndi)
        }).mergeMap((x: Array<E_Individuo1>) => {
            debugger
            this.IndividuosDefault = x
            return this.ParameterService.listarTipoIndividuo1()
        }).subscribe((x: Array<E_TipoIndividuo1>) => {
            debugger
            this.ListTipoIndividuo1 = x
        })
        this.ParameterService.ListarConfTipoIndividuo()
            .subscribe((x: Array<E_ConfiguracionTipoIndividuo>) => {
                this.ListConfiguration = x
            })

        this.ParameterService.listarDepartamentos()
            .subscribe((x: Array<E_Departamentos>) => {
                this.ListDepartamentos = x
            })
        this.ParameterService.ListarMunicipios()
            .subscribe((x: Array<E_Municipios>) => {
                this.ListMunicipiosBase = x
                
                this.xx = this.navigation.reporte2;
                console.log(this.xx);
                if(this.xx != undefined){
                   this.indi2 = new E_Individuo2();
                   this.indi2.Correo=this.xx.Correo;
                    this.AdminServices.Individuo2xCorreo(this.indi2)
                    .subscribe((x: E_Individuo2) => {
                        debugger;
                        this.indi2 = x

                        this.form = this.formBuilder.group({
                            email: [this.indi2.Correo, [Validators.required, Validators.email]],
                            Cedula: [this.indi2.Cedula, [Validators.required]],
                            Telefonof: [this.indi2.Telefono],
                            Celular: [this.indi2.Celular, [Validators.required]],
                            Nombre: [this.indi2.Nombres, [Validators.required]],
                            Apellido: [this.indi2.Apellidos, [Validators.required]],
                            Direccion: [this.indi2.Direccion, [Validators.required]],
                            TipoIndividuo2: [this.indi2.Id_tipoindividuo2, [Validators.required]],
                            TipoIndividuo1: [this.indi2.Id_individuo1, [Validators.required]]   ,                         
                            Observacion: [this.indi2.observacionsac, [Validators.required]] 
                        });

                        this.editar=true;                        
                        
                    })

                   
                }
            })

           








        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
        this.formDinamic.valueChanges.subscribe(() => {
            this.onFormValuesChangedDinamyc();
        });

        /*    var IdClienteDirector = this.UserService.GetCurrentCurrentUserNow().Id_Cliente
            var ObjClientDirector = new E_Cliente()
            ObjClientDirector.Id = IdClienteDirector
            this.UserService.ClientexId(ObjClientDirector)
                .subscribe((x: E_Cliente) => {
                    var ObjSector: E_Sector = new E_Sector()
                    ObjSector.Id_departamento = x.Id_Departamento
                    this.ParameterService.ListarSector(ObjSector).subscribe((x) => {
                        this.ListSector = x
                    })
                        this.ParameterService.listarDepartamentos()
                            .subscribe((y: Array<E_Departamentos>) => {
                                var codigoDepto = y.find((z) => z.Id == x.Id_Departamento).Codigo
                                this.ParameterService.ListarMunicipios()
                                    .subscribe((w: Array<E_Municipios>) => {
                                       this.ListMunicipiosBase = w.filter((w1) => w1.Id_Departamento == Number(codigoDepto))
                                    })
                            })
                })
    
    
    
    */

    }

    chargeAllforms() {
        this.formErrors = {
            email: {},
            Cedula: {},
            Telefonof: {},
            Nombre: {},
            Apellido: {},
            Celular: {},
            TipoIndividuo2: {},
            TipoIndividuo1: {},
            Direccion: {}
        };

        this.formErrorsDynamic = {
            Departamento: {},
            Municipio: {},
            Nombre: {},
            Sector: {},
            ZonaElectoral: {},
            PuestoVotacion: {},
            TipoIndividuo1: {},
            Mesa: {}
        };

        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            Cedula: ['', [Validators.required]],
            Telefonof: [''],
            Celular: ['', [Validators.required]],
            Nombre: ['', [Validators.required]],
            Apellido: ['', [Validators.required]],
            Direccion: ['', [Validators.required]],
            TipoIndividuo2: [undefined, [Validators.required]],
            TipoIndividuo1: [undefined, [Validators.required]],
            Observacion: [""],

        });
        var options = [Validators.required]
        var options1 = []
        this.formDinamic = this.formBuilder.group({
            Municipio: [undefined, options],
            ZonaElectoral: [undefined, options],
            PuestoVotacion: [undefined, options],
            Departamento: [undefined, options],
            Mesa: [undefined, options],
        });
    }
    clearDetail() {
        this.Detalleindividuo = new Array<E_DetalleIndividuo>()
        this.countMesas = 0
        this.countPuestoVotacion = 0
        this.countZonaElectoral = 0
        this.countMunicipio = 0
        this.countDepartamento = 0
    }

    Clearforms() {
        this.form.setValue({
            email: '',
            Cedula: '',
            Telefonof: '',
            Celular: '',
            Nombre: '',
            Apellido: '',
            Direccion: '',
            TipoIndividuo2: 0,
            TipoIndividuo1: 0,
            Observacion: ''
        })
    }
}

