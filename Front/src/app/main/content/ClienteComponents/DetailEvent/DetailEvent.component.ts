import { Component, OnInit } from '@angular/core';
import { E_Reunion } from 'app/Models/E_Reunion';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { ImageService } from 'app/ApiServices/ImageServices';
import { E_Imagen } from 'app/Models/E_Imagen';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ReunionService } from 'app/ApiServices/ReunionService';
import { E_Comentarios } from 'app/Models/E_Comentarios';
import { UserService } from 'app/ApiServices/UserService';
import { E_Usuario } from 'app/Models/E_Usuario';
import { Router } from '@angular/router';
import { E_Like } from '../../../../Models/E_Like';
import { AdminServices } from '../../../../ApiServices/AdminServices';

@Component({
    selector: 'DetailEvent',
    templateUrl: './DetailEvent.component.html',
    styleUrls: ['./DetailEvent.component.scss']
})
export class DetailEventComponent implements OnInit {

    LikeCounter: number;
    registerForm: FormGroup;
    imageUrl: string
    dataEvento: E_Reunion = new E_Reunion()
    ImagenGeneral: E_Imagen = new E_Imagen()
    ListComentarios: Array<E_Comentarios> = new Array<E_Comentarios>()
    registerFormErrors: any;
    likesForshow: Array<E_Like> = new Array<E_Like>()
    public MobileApp: boolean
    constructor(private NavigationData: NavigationInfoService,
        private ImageService: ImageService,
        private formBuilder: FormBuilder,
        private ReunionService: ReunionService,
        private UserService: UserService,
        private Router: Router,
        public Adminservice: AdminServices
    ) {


    }

    ReturnPage() {
        this.Router.navigate(['/eventvisor'])
    }
    ngOnInit(): void {
        var ImaObj: E_Imagen = new E_Imagen()
        this.MobileApp = false;
        if (this.NavigationData.dataEvento == undefined) { this.Router.navigate(['/Maps']) }
        else {
            this.dataEvento = this.NavigationData.dataEvento != undefined ? this.NavigationData.dataEvento : new E_Reunion()
            ImaObj.Id_Reunion = this.dataEvento.Id
            this.ImageService.ImagenxReunion(ImaObj).subscribe((x) => {
                this.ImagenGeneral = x
                this.imageUrl = x.Ruta
                var Comentario: E_Comentarios = new E_Comentarios()
                var LikeObj: E_Like = new E_Like()
                LikeObj.Id_Imagen = x.Id
                Comentario.Id_Imagen = x.Id
                this.ReunionService.ComentariosXImagen(Comentario)
                    .subscribe((x) => { this.ListComentarios = x })
                this.ImageService.LikesxImagen(LikeObj).subscribe((x: Array<E_Like>) => {
                    this.likesForshow = x
                    this.LikeCounter = x.length
                }
                )
            })

        }
        this.registerFormErrors = {
            Nombre: {},
            Comentario: {}
        }
        this.registerForm = this.formBuilder.group({
            Comentario: ['', [Validators.required]],
            Nombre: ['', [Validators.required]],
        })

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
    }

    EnviarInfo() {
        var Comentario: E_Comentarios = new E_Comentarios()
        var Usuario: E_Usuario = this.UserService.GetCurrentCurrentUserNow()
        Comentario.Descripcion = this.registerForm.value.Comentario
        Comentario.NombreUsuario = this.registerForm.value.Nombre
        Comentario.Id_Imagen = this.ImagenGeneral.Id
        Comentario.Id_usuario = Usuario.Id
        Comentario.Estado = true
        this.registerForm.get('Comentario').setValue('');
        this.ReunionService.crearComentario(Comentario).subscribe((x: number) => {
            console.log(x)
            if (x != 0) {

                this.ReunionService.ComentariosXImagen(Comentario)
                    .subscribe((x) => { this.ListComentarios = x })
            }
        })
    }

    crearlike() {

        var lik: E_Like = new E_Like()
        lik.Id_usuario = this.UserService.GetCurrentCurrentUserNow().Id
        lik.FechaCreacion = new Date;
        lik.Id_Imagen = this.ImagenGeneral.Id
        this.Adminservice.crearLike(lik).subscribe((x: boolean) => {
            ;
            if (x) {
                 this.MobileApp = true;
                this.ImageService.LikesxImagen(lik).subscribe((x: Array<E_Like>) => {
                    this.likesForshow = x
                    this.LikeCounter = x.length
                })
            }
        })
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
}
