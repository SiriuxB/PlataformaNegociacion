import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";

export class UsuarioBuilder {
    public Id: number
    public UserName: string
    public Passwordd: string
    public Salt: string
    public Hash: string
    public Email: string
    public Id_Cliente: number
    public Id_Perfil: number
    public Estado: boolean
    public CambiarClave: boolean
    public FechaCreacion: Date
    public error: E_Error
    public Imagen: string
    buildFromObject(x: any): UsuarioBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.UserName != undefined) {
            this.UserName = x.UserName
            this.Email = x.UserName
        }
        if (x.Passwordd != undefined) { this.Passwordd = x.Passwordd }
        if (x.Salt != undefined) { this.Salt = x.Salt }
        if (x.Hash != undefined) { this.Hash = x.Hash }

        if (x.Id_Cliente != undefined) { this.Id_Cliente = x.Id_Cliente }
        if (x.Id_Perfil != undefined) { this.Id_Perfil = x.Id_Perfil }
        if (x.Estado != undefined) { this.Estado = x.Estado }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.error != undefined) { this.error = x.error }
        if (x.imagen != undefined) { this.error = x.imagen }
        if (x.CambiarClave != undefined) { this.CambiarClave = x.CambiarClave }

        return this
    }
    Build(): E_Usuario {
        var obj: E_Usuario = new E_Usuario()
        obj.Id = this.Id
        obj.UserName = this.UserName
        obj.Passwordd = this.Passwordd
        obj.Salt = this.Salt
        obj.Hash = this.Hash
        obj.Email = this.Email
        obj.Id_Cliente = this.Id_Cliente
        obj.Id_Perfil = this.Id_Perfil
        obj.Estado = this.Estado
        obj.FechaCreacion = this.FechaCreacion
        obj.error = this.error
        obj.Imagen = this.Imagen
        obj.CambiarClave = this.CambiarClave

        return obj
    }


}
