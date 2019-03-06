import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_Municipios } from 'app/Models/E_Municipios';

import { PhotoTool } from 'app/Tools/PhotoTool';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'app/ApiServices/UserService';

import { E_Usuario } from 'app/Models/E_Usuario';
import { Router } from '@angular/router';
import { ImageService } from 'app/ApiServices/ImageServices';
import { E_Imagen } from 'app/Models/E_Imagen';

import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Cliente } from 'app/Models/E_Cliente';
import { AppSettings } from 'app/app.settings';
import { GenerateMask } from 'app/Tools/MaskedLibrary';


@Component({
    selector: 'fuse-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    animations: fuseAnimations
})
export class FuseRegisterComponent implements OnInit {
    showerrorFile: boolean;
    descEnable: boolean;
    fileName: any;
    ErrorText: boolean;
    successText: boolean = false;
    CapturedPhoto: boolean;
    public dataURL: any
    form: FormGroup;
    registerForm: FormGroup;
    registerFormErrors: any;
    fakeObservable: any;
    public ShowCamara: boolean = false
    public DepartamentoSeleccionado: string = ""
    public MunicipioSeleccionado: string = ""
    public ListDepartamentos: Array<E_Departamentos> = new Array<E_Departamentos>()
    public ListMunicipiosBase: Array<E_Municipios> = new Array<E_Municipios>()
    public ListMunicipiosGroup: Array<E_Municipios> = new Array<E_Municipios>()
    public MaskedNumber: any[]
    @ViewChild('fileInput') fileInput: ElementRef;
    public MaskedNumberNoDecimal: any[]
    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private UserService: UserService,
        private Router: Router,
        private ImageService: ImageService,
        private fb: FormBuilder
    ) {
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });

        this.registerFormErrors = {
            email: {},
            password: {},
            passwordConfirm: {},
            Cedula: {},
            Telefonof: {},
            Nombre: {},
            Apellido: {},
            Celular: {},
            Departamentos: {},
            Municipios: {}
        };

        this.form = this.fb.group({
            name: [{ value: '', disabled: true }, Validators.required],
            description: [{ value: '', disabled: this.descEnable }, Validators.required],
            file: null
        });
    }


    ngOnInit() {

        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal
        this.ParameterService.listarDepartamentos()
            .subscribe((x: Array<E_Departamentos>) => {
                this.ListDepartamentos = x
            })
        this.ParameterService.ListarMunicipios()
            .subscribe((x: Array<E_Municipios>) => {
                this.ListMunicipiosBase = x
            })

        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, confirmValidatePassword]],
            passwordConfirm: ['', [Validators.required, confirmPassword]],
            Cedula: ['', [Validators.required]],
            Telefonof: [''],
            Celular: ['', [Validators.required]],
            Nombre: ['', [Validators.required]],
            Apellido: ['', [Validators.required]],
            Departamentos: [undefined, [Validators.required]],
            Municipios: [undefined, [Validators.required]],

        });

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });



    }

    onRegisterFormValuesChanged() {

        for (const field in this.registerFormErrors) {
            if (!this.registerFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.registerFormErrors[field] = {};

            // Get the control
            const control = this.registerForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.registerFormErrors[field] = control.errors;
            }
        }
    }
    SelectedDepartamento(y) {

        var depObj = this.ListDepartamentos.find(x => x.Id == y.value)
        this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
    }
    Continuar() {
        this.ShowCamara = true
        setTimeout(() => {
            PhotoTool.plauvideo()
        }, 200)
    }
    RegisterPhoto() {

        var canvas: any = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var video: any = document.getElementById('video');
        context.drawImage(video, 0, 0, 640, 480);
        this.dataURL = canvas.toDataURL('image/jpeg', 0.5);
        this.CapturedPhoto = true

        //  this.ImageService.UploadJsonFile(fd).subscribe((x) => console.log(true))

    }

    CancelPhoto() {
        this.CapturedPhoto = false
    }
    EnviarInfo() {
        var ClientObj: E_Cliente = new E_Cliente()
        var UserObj: E_Usuario = new E_Usuario()
        var ImagenObj: E_Imagen = new E_Imagen()
        var ImageBaseUrl = AppSettings.Global().API_ImageContent
        var password = btoa(this.registerForm.value.password)
        ClientObj.Nombre = this.registerForm.value.Nombre
        ClientObj.Correo = this.registerForm.value.email.toLowerCase()
        ClientObj.Cedula = this.registerForm.value.Cedula.replace(/\./g, "");
        ClientObj.Telefono = this.registerForm.value.Telefonof
        ClientObj.Celular = this.registerForm.value.Celular
        ClientObj.Id_Departamento = this.registerForm.value.Departamentos
        ClientObj.Id_Municipio = this.registerForm.value.Municipios
        ClientObj.Apellido = this.registerForm.value.Apellido
        ClientObj.Estado = true
        ClientObj.Direccion = ""

        UserObj.Email = ClientObj.Correo
        UserObj.Estado = true
        UserObj.Passwordd = password
        UserObj.Id_Perfil = 1
        UserObj.UserName = ClientObj.Correo
        
        var file = undefined
        const fileBrowser = this.fileInput.nativeElement;

        if (fileBrowser.files && fileBrowser.files[0]) {

            this.fileName = fileBrowser.files[0].name;
            file = fileBrowser.files[0];
        }

        if (file != undefined) {
            var formdata = new FormData();
            //    var blob = PhotoTool.dataURItoBlob(this.dataURL);
            var fd = new FormData(document.forms[0]);
            ImagenObj.Nombre = btoa(((new Date().getMilliseconds()) * Math.random()).toString())
            ImagenObj.Ruta = ImageBaseUrl + ImagenObj.Nombre + '.jpeg'
            ImagenObj.Aprobada = true
            UserObj.Imagen = ImagenObj.Ruta
            fd.append("canvasImage", file, ImagenObj.Nombre);
            this.ImageService.UploadJsonFile(fd).subscribe((x) => {
                if (x) {

                    this.RegistrarDatos(UserObj, ClientObj)

                }
            })
        }
        else {
            this.RegistrarDatos(UserObj, ClientObj)
        }

    }

    RegistrarDatos(User: E_Usuario, Client: E_Cliente) {
        Client.usuario = User
        this.UserService.crearCliente(Client).subscribe((x: boolean) => {
            if (x) {

                setTimeout(() => {
                    this.Router.navigate(["/login/"])
                }, 4000)

            }
        })
    }
    fileChange($event) {
        const fileBrowser = this.fileInput.nativeElement;
        this.showerrorFile = false
        const newFile: any = {};
        if (fileBrowser.files && fileBrowser.files[0]) {
            this.fileName = fileBrowser.files[0].name;
            const file = fileBrowser.files[0];
            if (file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/jpg") {
                this.showerrorFile = false
            }
            else {
                this.showerrorFile = true
                this.fileInput.nativeElement.value = ""
            }

        }
        else {
            this.showerrorFile = true
            this.fileInput.nativeElement.value = ""
        }

    }




}




function confirmPassword(control: AbstractControl) {
    if (!control.parent || !control) {
        return;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return;
    }

    if (passwordConfirm.value === '') {
        return;
    }

    if (password.value !== passwordConfirm.value) {
        return {
            passwordsNotMatch: true
        };
    }

}
function confirmValidatePassword(control: AbstractControl) {
    if (!control.parent || !control) {
        return;
    }
    const password = control.parent.get('password');
    var texto = password.value
    var validateABC: boolean = false
    var validateLength: boolean = false
    var validateNumber: boolean = false
    var numeros = "0123456789";
    var letras = "abcdefghyjklmnñopqrstuvwxyz";
    var i
    if (texto.length > 5 && texto.length < 11) { validateLength = true }
    for (i = 0; i < texto.length; i++) {
        if (numeros.indexOf(texto.charAt(i), 0) != -1) {
            validateNumber = true
        }
    }
    texto = texto.toLowerCase();
    for (i = 0; i < texto.length; i++) {
        if (letras.indexOf(texto.charAt(i), 0) != -1) {
            validateABC = true
        }
    }
    if (validateABC && validateLength && validateNumber) {
        return;
    }
    else {
        return { passwordNotOk: true }
    }
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}


