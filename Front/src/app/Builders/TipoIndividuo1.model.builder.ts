import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_TipoIndividuo1 } from "../Models/E_TipoIndividuo1";

export class TipoIndividuo1Builder {
    public Id: number
    public Nombre: string
    public Activo: boolean
    public FechaCreacion: Date    
    buildFromObject(x: any): TipoIndividuo1Builder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Activo != undefined) { this.Activo = x.Activo }       
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        
        return this
    }
    Build(): E_TipoIndividuo1 {
        var obj: E_TipoIndividuo1 = new E_TipoIndividuo1()
        obj.Id = this.Id
        obj.Nombre = this.Nombre
        obj.Activo = this.Activo        
        obj.FechaCreacion = this.FechaCreacion
       
        return obj
    }


}
