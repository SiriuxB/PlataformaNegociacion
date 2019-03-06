import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_GerenteSector } from 'app/Models/E_GerenteSector';
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
import { E_Usuario } from 'app/Models/E_Usuario';
import { E_Cliente } from 'app/Models/E_Cliente';
import { ProfileConfig } from '../../../../Tools/ProfileConfig';
import { E_Email } from '../../../../Models/E_Email';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
    moduleId: module.id,
    selector: 'gerente-sector',
    templateUrl: 'gerente-sector.component.html',
    styleUrls: ['gerente-sector.component.scss']
})
export class GerenteSectorComponent implements OnInit {
    SaveInProgress: boolean;
    PasswordTemp: string;
    UserNameTemp: string;
    SucceSave: boolean;
    dataURL: any;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    DepartamentoSeleccionado: any
    ListDepartamentos: Array<E_Departamentos> = new Array<E_Departamentos>()
    ListSector: Array<E_Sector> = new Array<E_Sector>()
    ListSectorGroup: Array<E_Sector> = new Array<E_Sector>()
    Sectoreleccionado: any
    public Nombre: string;
    public descripcion: string;
    public checked;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private AdminServices: AdminServices,
        private Router: Router,
        private UserService: UserService,
        private Matdialog: MatDialog,

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
            Departamentos: {},
            Direccion: {},
            Sector: {}
        };

    }

    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/mainpageadmin'])
    }
    ngOnInit() {
        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal
        this.ParameterService.listarDepartamentos()
            .subscribe((x: Array<E_Departamentos>) => {
                this.ListDepartamentos = x
            })
        //   this.ParameterService.ListarSector()
        //      .subscribe((x: Array<E_Sector>) => {
        //          this.ListSector = x
        //     })

        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            Cedula: ['', [Validators.required]],
            Telefonof: [''],
            Celular: ['', [Validators.required]],
            Nombre: ['', [Validators.required]],
            Apellido: ['', [Validators.required]],
            Direccion: ['', [Validators.required]],
            Departamentos: [undefined, [Validators.required]],
            Sector: [undefined, [Validators.required]],

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
        var depObj = this.ListDepartamentos.find(x => x.Id == y.value)
        var objSector: E_Sector = new E_Sector()
        objSector.Id_departamento = Number(y.value)
        this.ParameterService.ListarSector(objSector)
            .subscribe((x: Array<E_Sector>) => {
                this.ListSectorGroup = x
            })

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

        var objGerenteSector: E_GerenteSector = new E_GerenteSector()
        var objUsuario: E_Usuario = new E_Usuario()
        var objCliente: E_Cliente = new E_Cliente()
        objGerenteSector.Cedula = this.form.value.Cedula.replace(/\./g, "");
        objGerenteSector.Nombres = this.form.value.Nombre
        objGerenteSector.Apellidos = this.form.value.Apellido
        objGerenteSector.Direccion = this.form.value.Direccion
        objGerenteSector.Correo = this.form.value.email.toLowerCase()
        objGerenteSector.Telefono = this.form.value.Telefono
        objGerenteSector.Celular = this.form.value.Celular
        objGerenteSector.Id_Departamento = this.form.value.Departamentos
        objGerenteSector.Activo = true
        objGerenteSector.FechaCreacion = new Date();
        objGerenteSector.Id_Sector = this.form.value.Sector
        objGerenteSector.CambiarClave = true
        objGerenteSector.CreadoPor = this.UserService.GetCurrentCurrentUserNow().Id;

        var passTemp = Math.random().toString(36).slice(2).substring(0, 6);
        objUsuario.Passwordd = btoa(passTemp)
        objUsuario.UserName = objGerenteSector.Correo
        objUsuario.Email = objGerenteSector.Correo
        objUsuario.Estado = true
        objUsuario.Id_Perfil = 7// Correponde a Gerente Sector 
        objCliente.Nombre = objGerenteSector.Nombres
        objCliente.Correo = objGerenteSector.Correo
        objCliente.Cedula = objGerenteSector.Cedula
        objCliente.Telefono = objGerenteSector.Telefono
        objCliente.Celular = objGerenteSector.Celular
        objCliente.Id_Departamento = objGerenteSector.Id_Departamento
        objCliente.Apellido = objGerenteSector.Apellidos
        objCliente.Estado = true
        objCliente.Direccion = objGerenteSector.Direccion
        objCliente.usuario = objUsuario


        this.SaveInProgress = true

        this.AdminServices.crearGerenteSector(objGerenteSector).subscribe((x: boolean) => {
            if (x) {
                this.UserService.crearCliente(objCliente).subscribe((y: boolean) => {
                    if (y) {
                        this.SucceSave = x
                        this.UserNameTemp = objUsuario.UserName
                        this.PasswordTemp = passTemp
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

    }
    clearform() {
        this.form.setValue({
            email: "",
            Cedula: "",
            Telefonof: "",
            Celular: "",
            Nombre: "",
            Apellido: "",
            Direccion: "",
            Departamentos: 0,
            Sector: 0,
        })

    }


    cuerpo(usuario: string, pass: string): string {
        var cuerpo: string;
        cuerpo = "<!DOCTYPE html>" +
            "<html lang=\"es\">" +
            "<head>" +
            "<style type=\"text/css\">" +
            "body{" +
            "margin:0px;" +
            "padding:0px;" +
            "}" +

            ".header{" +
            "   width: 100%;" +
            "    height: 150px;" +

            "    color: white;" +
            "    background-color: #c84c43;" +
            "}" +

            ".conten{" +
            "    width: 100%;" +

            "    padding-left:50px;" +
            "    padding-top:20px;" +
            "    padding-bottom:50px;" +
            "    background-color:#f0d8d844;" +
            "    font-size:20px;" +
            "}" +


            "</style>" +
            "</head>" +

            "<body>" +
            "    <div fxLayout=\"column\">" +
            "    <div class=\"header\">" +
            "        <div style=\"float:left;width: 149px;\">" +
            "       </div>" +
            "        <div style=\"float:right;width: 250px;margin-top:40px;\">" +
            "           <b><h2>Asignacion de Usuario</h2></b>" +
            "        </div>" +
            "    </div>" +

            "<div class=\"conten\">" +
            "<p>Cordial saludo.</p>" +
            "<p>Esta es la asignacion de su perfil de usuario en la plataforma.</p>" +
            "<b><p Style=\"margin-left:30px;\">Nombre Usuario: " + usuario + "</p></b>" +
            "<b><p Style=\"margin-left:30px;\">Password: " + pass + "</p></b>" +
            "<p>Gracias por su atencion.</p>" +
            "</div>" +
            "</div>" +
            "</body>" +
            "</html>";
        return cuerpo;
    }

}

