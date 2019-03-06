import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Departamentos } from "../Models/E_Departamentos";
import { E_ItemsMetas } from "../Models/E_ItemsMetas";

export class ItemsMetasBuilder {
    public Id: number
    public Nombre: string
    public Activo: boolean
    public FechaCreacion: Date
    
    buildFromObject(x: any): ItemsMetasBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.Activo != undefined) { this.Activo = x.Activo }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }

        return this
    }
    Build(): E_ItemsMetas {
        var obj: E_ItemsMetas = new E_ItemsMetas()
        obj.Id = this.Id
        obj.FechaCreacion = this.FechaCreacion
        obj.Activo = this.Activo
        obj.Nombre = this.Nombre
        return obj
    }


}
