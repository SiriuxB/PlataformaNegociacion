import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Imagen } from "../Models/E_Imagen";

export class ImagenBuilder {
    public Id: number
    public Nombre: string
    public Ruta: string
    public FechaCreacion: Date
    public Id_Reunion: number
    public aprobada: boolean
    public Id_Usuario: number;
    public Cedula: string
    constructor() { }
    buildFromObject(x: any): ImagenBuilder {
        
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Ruta != undefined) { this.Ruta = x.Ruta }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.Id_Reunion != undefined) { this.Id_Reunion = x.Id_Reunion }
        if (x.aprobada != undefined) { this.aprobada = x.aprobada }
        if (x.Id_Usuario != undefined) { this.Id_Usuario = x.Id_Usuario }
        if (x.Cedula != undefined) { this.Cedula = x.Cedula }


        return this
    }
    Build(): E_Imagen {
        var obj: E_Imagen = new E_Imagen()
        obj.Id = this.Id
        obj.Nombre = this.Nombre
        obj.Aprobada = this.aprobada
        obj.FechaCreacion = this.FechaCreacion
        obj.Id_Reunion = this.Id_Reunion
        obj.Ruta = this.Ruta
        obj.FechaCreacion = this.FechaCreacion
        obj.Id_Usuario = this.Id_Usuario
        obj.Cedula = this.Cedula
        return obj
    }


}
