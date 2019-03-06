import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_TipoIndividuo1 } from 'app/Models/E_TipoIndividuo1';
import { E_Individuo1, E_UsuarioSACxIndividuo1 } from 'app/Models/E_Individuo1';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AdminServices } from 'app/ApiServices/AdminServices';
import { Router } from '@angular/router';
import { UserService } from '../../../../ApiServices/UserService';
import { E_Usuario } from '../../../../Models/E_Usuario';
import { E_Cliente } from '../../../../Models/E_Cliente';
import { E_DirectorDepartamento } from '../../../../Models/E_DirectorDepartamento';
import { ProfileConfig } from '../../../../Tools/ProfileConfig';
import { E_Email } from '../../../../Models/E_Email';

@Component({
    moduleId: module.id,
    selector: 'individuo-1',
    templateUrl: 'individuo-1.component.html',
    styleUrls: ['individuo-1.component.scss']
})
export class Individuo1Component implements OnInit {

    PasswordTemp: string;
    UserNameTemp: string;
    SucceSave: boolean;
    dataURL: any;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    TipoIndividuo1Seleccionado: any
    ListTipoIndividuo1: Array<E_TipoIndividuo1> = new Array<E_TipoIndividuo1>()
    public Nombre: string;
    public descripcion: string;
    public checked;
    public ClienteInfo: E_Cliente = new E_Cliente()
    public IdDirectorDepto: number
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
            email: {},
            Cedula: {},
            Telefonof: {},
            Nombre: {},
            Apellido: {},
            Celular: {},
            TipoIndividuo1: {},
            Direccion: {}
        };

    }

    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/mainpagedirector'])
    }
    ngOnInit() {
        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal
        this.ParameterService.listarTipoIndividuo1()
            .subscribe((x: Array<E_TipoIndividuo1>) => {
                this.ListTipoIndividuo1 = x
            })
        var objCliente: E_Cliente = new E_Cliente()
        objCliente.Id = this.UserService.GetCurrentCurrentUserNow().Id_Cliente
        this.UserService.ClientexId(objCliente)
            .subscribe((x: E_Cliente) => {
                this.ClienteInfo = x
                var objDirector: E_DirectorDepartamento = new E_DirectorDepartamento()
                objDirector.Id_departamento = this.ClienteInfo.Id_Departamento
                this.AdminServices.ListarDirectorDepto(objDirector).subscribe((x: Array<E_DirectorDepartamento>) => {
                    if (x.filter((z) => z.Correo == this.ClienteInfo.Correo).length > 0) {
                        this.IdDirectorDepto = x.find((z) => z.Correo == this.ClienteInfo.Correo).Id
                    }
                }
                )

            })
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            Cedula: ['', [Validators.required]],
            Telefonof: [''],
            Celular: ['', [Validators.required]],
            Nombre: ['', [Validators.required]],
            Apellido: ['', [Validators.required]],
            Direccion: ['', [Validators.required]],
            TipoIndividuo1: [undefined, [Validators.required]]

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
        
        var objIndividuo1: E_Individuo1 = new E_Individuo1()
        var objUsuario: E_Usuario = new E_Usuario()
        var objCliente: E_Cliente = new E_Cliente()


        objIndividuo1.Cedula = this.form.value.Cedula.replace(/\./g, "");
        objIndividuo1.Nombre = this.form.value.Nombre
        objIndividuo1.Apellido = this.form.value.Apellido
        objIndividuo1.Direccion = this.form.value.Direccion
        objIndividuo1.correo = this.form.value.email.toLowerCase()
        objIndividuo1.Telefono = this.form.value.Telefono
        objIndividuo1.Celular = this.form.value.Celular
        objIndividuo1.Activo = true
        objIndividuo1.FechaCreacion = new Date();
        objIndividuo1.Id_Departamento = this.ClienteInfo.Id_Departamento
        objIndividuo1.Id_tipoindividuo = this.form.value.TipoIndividuo1
        objIndividuo1.Id_DirectorDepto = this.IdDirectorDepto
        objIndividuo1.Id_tipoestadorevision = 1 //Pendiente revision por SAC
        objIndividuo1.cambiarclave = true
        objIndividuo1.Id_Departamento = this.ClienteInfo.Id_Departamento
        objIndividuo1.usuariosac = new E_UsuarioSACxIndividuo1()
        var passTemp = Math.random().toString(36).slice(2).substring(0, 6);
        objUsuario.Passwordd = btoa(passTemp)
        objUsuario.UserName = objIndividuo1.correo
        objUsuario.Email = objIndividuo1.correo
        objUsuario.Estado = true
        switch (this.form.value.TipoIndividuo1) {
            case 1:
                objUsuario.Id_Perfil = 4  // Coodinardor Electoral
                break;
            case 2:
                objUsuario.Id_Perfil = 5  // IT y Auditoria
                break;
            case 3:
                objUsuario.Id_Perfil = 6  // Transporte y Logistica
                break;

            default:
                break;
        }
        objCliente.Nombre = objIndividuo1.Nombre
        objCliente.Correo = objIndividuo1.correo
        objCliente.Cedula = objIndividuo1.Cedula
        objCliente.Telefono = objIndividuo1.Telefono
        objCliente.Celular = objIndividuo1.Celular
        objCliente.Id_Departamento = this.ClienteInfo.Id_Departamento
        objCliente.Apellido = objIndividuo1.Apellido
        objCliente.Estado = true
        objCliente.Direccion = objIndividuo1.Direccion
        objCliente.usuario = objUsuario

        this.AdminServices.crearIndividuo1(objIndividuo1).subscribe((x: boolean) => {
            if (x) {
                this.UserService.crearCliente(objCliente).subscribe((y: boolean) => {
                    if (y) {
                        this.UserNameTemp = objUsuario.UserName
                        this.PasswordTemp = passTemp
                        this.SucceSave = x
                        this.clearform()
                        var cl : E_Cliente=new E_Cliente();
                        cl.Correo =objUsuario.UserName;                       
                        cl.EmailObjeto= new E_Email();
                        cl.EmailObjeto.cuerpo=ProfileConfig.cuerpo(objUsuario.UserName,passTemp)
                        this.AdminServices.enviarEmail(cl).subscribe((x: boolean) => {
                            ;
                        });
                    }
                })
            }
        })


    }

    clearform(): any {
        this.form.setValue({
            email: '',
            Cedula: '',
            Telefonof: '',
            Nombre: '',
            Apellido: '',
            Celular: '',
            TipoIndividuo1: 0,
            Direccion: ''
        })
    }

}

