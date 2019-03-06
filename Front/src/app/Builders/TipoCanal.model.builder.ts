import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Departamentos } from "../Models/E_Departamentos";
import { E_CallCenter } from "../Models/E_CallCenter";
import { E_TipoCanal } from "../Models/E_TipoCanal";

export class TipoCanalBuilder {
    public Id: number
    public Activo: boolean
    public Nombre: string
    public Canal: number;
   
    buildFromObject(x: any): TipoCanalBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Activo != undefined) { this.Activo = x.Activo }
        if (x.Canal != undefined) { this.Canal = x.Canal }
        
        return this
    }
    Build(): E_TipoCanal {
        var obj: E_TipoCanal = new E_TipoCanal()
        obj.Id = this.Id
        obj.Activo = this.Activo
        obj.Nombre = this.Nombre
        obj.Canal = this.Canal
        return obj
    }


}
