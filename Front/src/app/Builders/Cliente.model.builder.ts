import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Cliente } from "../Models/E_Cliente";
import { UsuarioBuilder } from "./Usuario.model.builder";

export class ClienteBuilder {
    public Id: number
    public Cedula: string
    public Nombre: string
    public Apellido: string
    public Telefono: string
    public Celular: string
    public Correo: string
    public Direccion: string
    public Id_Departamento: number
    public Id_Municipio: number
    public Estado: boolean
    public FechaCreacion: Date
    public usuario: E_Usuario
    public error: E_Error
    constructor() { }
    buildFromObject(x: any): ClienteBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Cedula != undefined) { this.Cedula = x.Cedula }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Apellido != undefined) { this.Apellido = x.Apellido }
        if (x.Telefono != undefined) { this.Telefono = x.Telefono }
        if (x.Celular != undefined) { this.Celular = x.Celular }
        if (x.Correo != undefined) { this.Correo = x.Correo }
        if (x.Direccion != undefined) { this.Direccion = x.Direccion }
        if (x.Id_Departamento != undefined) { this.Id_Departamento = x.Id_Departamento }
        if (x.Id_Municipio != undefined) { this.Id_Municipio = x.Id_Municipio }
        if (x.Estado != undefined) { this.Estado = x.Estado }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.error != undefined) { this.error = x.error }

        if (x.usuario != undefined) {
            this.usuario = new UsuarioBuilder().buildFromObject(x.usuario).Build()
        }
        return this
    }
    Build(): E_Cliente {
        var obj: E_Cliente = new E_Cliente()
        obj.Id = this.Id
        obj.Cedula = this.Cedula
        obj.Nombre = this.Nombre
        obj.Apellido = this.Apellido
        obj.Telefono = this.Telefono
        obj.Celular = this.Celular
        obj.Correo = this.Correo
        obj.Direccion = this.Direccion
        obj.Id_Departamento = this.Id_Departamento
        obj.Id_Municipio = this.Id_Municipio
        obj.Estado = this.Estado
        obj.FechaCreacion = this.FechaCreacion
        obj.usuario = this.usuario
        obj.error = this.error
        return obj
    }


}
