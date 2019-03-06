import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Departamentos } from "../Models/E_Departamentos";
import { E_Metas } from "../Models/E_Metas";

export class MetasBuilder {    
    public Id: number
    public Nombre: string
    public Observacion: string
    public cantidad: number
    public Id_Item: number
    public id_gerentesector: number
    public id_directordepto: number
    public fechainicio: Date
    public fechafin: Date
    public porcentajecumplimiento: string
    public metacumplida: boolean
    public activo: boolean
    public FechaCreacion: Date
        
    buildFromObject(x: any): MetasBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Observacion != undefined) { this.Observacion = x.Observacion }
        if (x.cantidad != undefined) { this.cantidad = x.cantidad }
        if (x.Id_Item != undefined) { this.Id_Item = x.Id_Item }
        if (x.id_gerentesector != undefined) { this.id_gerentesector = x.id_gerentesector }
        if (x.id_directordepto != undefined) { this.id_directordepto = x.id_directordepto }
        if (x.fechainicio != undefined) { this.fechainicio = x.fechainicio }
        if (x.fechafin != undefined) { this.fechafin = x.fechafin }
        if (x.porcentajecumplimiento != undefined) { this.porcentajecumplimiento = x.porcentajecumplimiento }
        if (x.metacumplida != undefined) { this.metacumplida = x.metacumplida }
        if (x.activo != undefined) { this.activo = x.activo }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        
        return this
    }
    Build(): E_Metas {
        var obj: E_Metas = new E_Metas()
        obj.Id = this.Id
        obj.Nombre = this.Nombre
        obj.Observacion = this.Observacion
        obj.cantidad = this.cantidad
        obj.Id_Item = this.Id_Item
        obj.id_gerentesector = this.id_gerentesector
        obj.id_directordepto = this.id_directordepto
        obj.fechainicio = this.fechainicio
        obj.fechafin = this.fechafin
        obj.porcentajecumplimiento = this.porcentajecumplimiento
        obj.metacumplida = this.metacumplida
        obj.activo = this.activo
        obj.FechaCreacion = this.FechaCreacion

        return obj
    }


}
