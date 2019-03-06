import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Departamentos } from "../Models/E_Departamentos";

export class DepartamentosBuilder {
    public Id: number
    public Codigo: string
    public Nombre: string
   
    buildFromObject(x: any): DepartamentosBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Codigo != undefined) { this.Codigo = x.Codigo }
        
        return this
    }
    Build(): E_Departamentos {
        var obj: E_Departamentos = new E_Departamentos()
        obj.Id = this.Id
        obj.Codigo = this.Codigo
        obj.Nombre = this.Nombre
        return obj
    }


}
