import { Component } from '@angular/core';
import { AgRendererComponent } from "ag-grid-angular";
import { LoginService } from 'app/ApiServices/login.service';
import { Usuario } from 'app/models/Usuario';

@Component({
    moduleId: module.id,
    selector: 'CheckBoxRender',
    templateUrl: 'CheckBoxRender.component.html',
    styleUrls: ['CheckBoxRender.component.css']
})
export class CheckBoxRenderComponent implements AgRendererComponent {
    constructor(private LoginService: LoginService) {

    }
    public Activo: boolean
    state: any;

    agInit(params: any): void {
        this.state = params
        this.Activo = params.value
    }
    public refresh(params: any): boolean {
        return true
    }
    UpdateUser() {
        var usuario = new Usuario()
        usuario = this.state.data
        usuario.Activo = this.Activo;
        this.LoginService.ActivarUsuario(usuario).subscribe(() => {

        })

    }
}
