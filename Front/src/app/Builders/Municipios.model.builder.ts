import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Departamentos } from "../Models/E_Departamentos";
import { E_Municipios } from "../Models/E_Municipios";

export class MunicipiosBuilder {
    public Id: number
    public Codigo: string
    public Nombre: string
    public Id_Departamento: number
    buildFromObject(x: any): MunicipiosBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Codigo != undefined) { this.Codigo = x.Codigo }
        if (x.Id_Departamento != undefined) { this.Id_Departamento = x.Id_Departamento }

        return this
    }
    Build(): E_Municipios {
        var obj: E_Municipios = new E_Municipios()
        obj.Id = this.Id
        obj.Codigo = this.Codigo
        obj.Nombre = this.Nombre
        obj.Id_Departamento = this.Id_Departamento
        return obj
    }


}
