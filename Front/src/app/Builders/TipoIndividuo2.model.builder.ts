import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_TipoIndividuo1 } from "../Models/E_TipoIndividuo1";
import { E_TipoIndividuo2 } from "../Models/E_TipoIndividuo2";

export class TipoIndividuo2Builder {
    public Id: number
    public Nombre: string
    public Activo: boolean
    public FechaCreacion: Date   
    public Id_tipoindividuo1: number 
    buildFromObject(x: any): TipoIndividuo2Builder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Activo != undefined) { this.Activo = x.Activo }       
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.Id_tipoindividuo1 != undefined) { this.Id_tipoindividuo1 = x.Id_tipoindividuo1 }     
        
        return this
    }
    Build(): E_TipoIndividuo2 {
        var obj: E_TipoIndividuo2 = new E_TipoIndividuo2()
        obj.Id = this.Id
        obj.Nombre = this.Nombre
        obj.Activo = this.Activo        
        obj.FechaCreacion = this.FechaCreacion
        obj.Id_tipoindividuo1 = this.Id_tipoindividuo1        
       
        return obj
    }


}
