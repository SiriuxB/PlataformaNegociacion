import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_DirectorDepartamento } from 'app/Models/E_DirectorDepartamento';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog, MatDialogRef } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AdminServices } from 'app/ApiServices/AdminServices';
import { E_Sector } from 'app/Models/E_Sector';
import { Router } from '@angular/router';
import { UserService } from '../../../../ApiServices/UserService';
import { E_Usuario } from '../../../../Models/E_Usuario';
import { E_Cliente } from '../../../../Models/E_Cliente';
import { E_GerenteSector } from '../../../../Models/E_GerenteSector';
import { ProfileConfig } from '../../../../Tools/ProfileConfig';
import { E_Email } from '../../../../Models/E_Email';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
    moduleId: module.id,
    selector: 'director-departamento',
    templateUrl: 'director-departamento.component.html',
    styleUrls: ['director-departamento.component.scss']
})
export class DirectorDepartamentoComponent implements OnInit {
    ErrorSave: boolean;
    SaveInProgress: boolean;
    PasswordTemp: string;
    UserNameTemp: string;
    CurrentGerente: E_GerenteSector = new E_GerenteSector()
    DirectorTecnicoSector: string
    SucceSave: boolean;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    DepartamentoSeleccionado: any
    ListDepartamentos: Array<E_Departamentos> = new Array<E_Departamentos>()
    ListSector: Array<E_Sector> = new Array<E_Sector>()
    ListSectorGroup: Array<E_Sector> = new Array<E_Sector>()
    Sectoreleccionado: any
    public Nombre: string;
    public descripcion: string;
    public checked;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private Matdialog: MatDialog, private AdminServices: AdminServices,
        private Router: Router,
        private UserService: UserService
    ) {

        this.formErrors = {
            email: {},
            password: {},
            passwordConfirm: {},
            Cedula: {},
            Telefonof: {},
            Nombre: {},
            Apellido: {},
            Celular: {},
            Direccion: {},
            Sector: {}
        };


    }

    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/maingerente'])
    }
    ngOnInit() {
        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal
        this.ParameterService.listarDepartamentos()
            .subscribe((x: Array<E_Departamentos>) => {
                this.ListDepartamentos = x
            })

        var ob: E_GerenteSector = new E_GerenteSector()
        ob.Correo = this.UserService.GetCurrentCurrentUserNow().UserName

        this.AdminServices.ListarGerentesSectorxCorreo(ob).subscribe((x: E_GerenteSector) => {
            this.CurrentGerente = x
        })

        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            Cedula: ['', [Validators.required]],
            Telefonof: [''],
            Celular: ['', [Validators.required]],
            Nombre: ['', [Validators.required]],
            Apellido: ['', [Validators.required]],
            Direccion: ['', [Validators.required]],


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

    SelectedDepartamento(y) {

        var objSector: E_Sector = new E_Sector()
        objSector.Id_departamento = y.value.Id
        this.ParameterService.ListarSector(objSector)
            .subscribe((x: Array<E_Sector>) => {
                this.ListSectorGroup = x
            })

    }


    ConfirmData() {
        this.confirmDialogRef = this.Matdialog.open(FuseConfirmDialogComponent, {})
        this.confirmDialogRef.componentInstance.confirmMessage = '¿Estas seguro de realizar esta acción?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) { this.EnviarInfo() }
            this.confirmDialogRef = null;
        });
    }

    EnviarInfo() {

        this.SaveInProgress = true

        var objDirectorDepartamento: E_DirectorDepartamento = new E_DirectorDepartamento()
        objDirectorDepartamento.Cedula = this.form.value.Cedula.replace(/\./g, "");
        objDirectorDepartamento.Nombres = this.form.value.Nombre
        objDirectorDepartamento.Apellidos = this.form.value.Apellido
        objDirectorDepartamento.Direccion = this.form.value.Direccion
        objDirectorDepartamento.Correo = this.form.value.email.toLowerCase()
        objDirectorDepartamento.Telefono = this.form.value.Telefonof
        objDirectorDepartamento.Celular = this.form.value.Celular
        objDirectorDepartamento.Id_departamento = this.CurrentGerente.Id_Departamento
        objDirectorDepartamento.Estado = true
        objDirectorDepartamento.FechaCreacion = new Date();
        objDirectorDepartamento.CambiarClave = true
        objDirectorDepartamento.CreadoPor = this.UserService.GetCurrentCurrentUserNow().Id;
        objDirectorDepartamento.Id_Sector = this.CurrentGerente.Id_Sector
        objDirectorDepartamento.Id_GerenteSector = this.CurrentGerente.Id

        var objUsuario: E_Usuario = new E_Usuario()
        var objCliente: E_Cliente = new E_Cliente()
        var passTemp = Math.random().toString(36).slice(2).substring(0, 6);
        objUsuario.Passwordd = btoa(passTemp)
        objUsuario.UserName = objDirectorDepartamento.Correo
        objUsuario.Email = objDirectorDepartamento.Correo
        objUsuario.Estado = true
        objUsuario.Id_Perfil = 3 // Correponde a Director Depratamento
        objCliente.Nombre = objDirectorDepartamento.Nombres
        objCliente.Correo = objDirectorDepartamento.Correo
        objCliente.Cedula = objDirectorDepartamento.Cedula
        objCliente.Telefono = objDirectorDepartamento.Telefono
        objCliente.Celular = objDirectorDepartamento.Celular
        objCliente.Id_Departamento = objDirectorDepartamento.Id_departamento
        objCliente.Apellido = objDirectorDepartamento.Apellidos
        objCliente.Estado = true
        objCliente.Direccion = objDirectorDepartamento.Direccion
        objCliente.usuario = objUsuario
        this.ErrorSave = false
        this.SucceSave = false
        this.UserService.UsuarioxNombre(objUsuario).subscribe((x: E_Usuario) => {

            if (x.UserName == undefined) {
                this.AdminServices.crearDirectorDepartamento(objDirectorDepartamento).subscribe((x: boolean) => {
                    if (x) {
                        this.UserService.crearCliente(objCliente).subscribe((y: boolean) => {
                            if (y) {
                                this.UserNameTemp = objUsuario.UserName
                                this.PasswordTemp = passTemp
                                this.SucceSave = x
                                this.clearform()
                                var cl: E_Cliente = new E_Cliente();
                                cl.Correo = objUsuario.UserName;
                                cl.EmailObjeto = new E_Email();
                                cl.EmailObjeto.cuerpo = ProfileConfig.cuerpo(objUsuario.UserName, passTemp)
                                this.AdminServices.enviarEmail(cl).subscribe((x: boolean) => {

                                });
                            }
                            this.SaveInProgress = false
                        })
                    }

                })
            } else {
                console.log('no existe')
                this.ErrorSave = true
            }
        })

    }

    clearform() {
        this.form.setValue({
            Cedula: '',
            Nombre: '',
            Apellido: '',
            Direccion: '',
            email: '',
            Telefonof: '',
            Celular: '',
        })

    }

}

