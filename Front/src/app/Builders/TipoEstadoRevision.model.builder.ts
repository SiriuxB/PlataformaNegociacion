import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_TipoAntecedente } from "../Models/E_TipoAntecedente";
import { E_TipoEstadoRevision } from "../Models/E_TipoEstadoRevision";

export class TipoEstadoRevision {
    public Id: number
    public Nombre: string
    public Activo: boolean
    public FechaCreacion: Date    
    buildFromObject(x: any): TipoEstadoRevision {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Activo != undefined) { this.Activo = x.Activo }       
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        
        return this
    }
    Build(): E_TipoEstadoRevision {
        var obj: E_TipoEstadoRevision = new E_TipoEstadoRevision()
        obj.Id = this.Id
        obj.Nombre = this.Nombre
        obj.Activo = this.Activo        
        obj.FechaCreacion = this.FechaCreacion
       
        return obj
    }


}
