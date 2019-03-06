
import { E_Comentarios } from "../Models/E_Comentarios";

export class ComentariosBuilder {
    public Id: number
    public Descripcion: string
    public Id_Imagen: number
    public Id_usuario: number
    public Estado: boolean
    public FechaCreacion: Date
    public nombrecliente: string
    public apellidocliente: string
    public NombreCliente: string
    constructor() { }
    buildFromObject(x: any): ComentariosBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Descripcion != undefined) { this.Descripcion = x.Descripcion }
        if (x.Id_Imagen != undefined) { this.Id_Imagen = x.Id_Imagen }
        if (x.Id_usuario != undefined) { this.Id_usuario = x.Id_usuario }
        if (x.Estado != undefined) { this.Estado = x.Estado }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.nombrecliente != undefined) { this.nombrecliente = x.nombrecliente }
        if (x.apellidocliente != undefined) { this.apellidocliente = x.apellidocliente }

    


        return this
    }
    Build(): E_Comentarios {
        var obj: E_Comentarios = new E_Comentarios()
        obj.Id = this.Id
        obj.Descripcion = this.Descripcion
        obj.Id_Imagen = this.Id_Imagen
        obj.Id_usuario = this.Id_usuario
        obj.Estado = this.Estado
        obj.FechaCreacion = this.FechaCreacion
        obj.nombrecliente = this.nombrecliente
        obj.apellidocliente = this.apellidocliente
   
        return obj
    }


}
