import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Departamentos } from "../Models/E_Departamentos";
import { E_CallCenter } from "../Models/E_CallCenter";

export class CallCenterBuilder {
    public Id: number
    public Activo: boolean
    public Nombre: string
   
    buildFromObject(x: any): CallCenterBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Activo != undefined) { this.Activo = x.Activo }
        
        return this
    }
    Build(): E_CallCenter {
        var obj: E_CallCenter = new E_CallCenter()
        obj.Id = this.Id
        obj.Activo = this.Activo
        obj.Nombre = this.Nombre
        return obj
    }


}
