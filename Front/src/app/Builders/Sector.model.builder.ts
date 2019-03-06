import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Departamentos } from "../Models/E_Departamentos";
import { E_Sector } from "../Models/E_Sector";

export class SectorBuilder {
    public Id: number
    public Activo: boolean
    public FechaCreacion: Date
    public Id_departamento: number
    public Nombre: string
    buildFromObject(x: any): SectorBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Id_departamento != undefined) { this.Id_departamento = x.Id_departamento }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.Activo != undefined) { this.Activo = x.Activo }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }

        return this
    }
    Build(): E_Sector {
        var obj: E_Sector = new E_Sector()
        obj.Id = this.Id
        obj.Id_departamento = this.Id_departamento
        obj.FechaCreacion = this.FechaCreacion
        obj.Activo = this.Activo
        obj.Nombre = this.Nombre
        return obj
    }


}
