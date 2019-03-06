import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_ZonaElectoral } from "../Models/E_ZonaElectoral";

export class ZonaElectoralBuilder {
    public Id: number
    public Nombre: string
    public Estado: boolean
    public FechaCreacion: Date   
    public Id_Municipio: number 
    buildFromObject(x: any): ZonaElectoralBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Estado != undefined) { this.Estado = x.Estado }       
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.Id_Municipio != undefined) { this.Id_Municipio = x.Id_Municipio }     
        
        return this
    }
    Build(): E_ZonaElectoral {
        var obj: E_ZonaElectoral = new E_ZonaElectoral()
        obj.Id = this.Id
        obj.Nombre = this.Nombre
        obj.Estado = this.Estado        
        obj.FechaCreacion = this.FechaCreacion
        obj.Id_Municipio = this.Id_Municipio        
       
        return obj
    }


}
