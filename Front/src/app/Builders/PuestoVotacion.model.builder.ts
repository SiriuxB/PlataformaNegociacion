import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_PuestoVotacion } from "../Models/E_PuestoVotacion";

export class PuestoVotacionBuilder {
    public Id: number
    public Nombre: string
    public Activo: boolean
    public FechaCreacion: Date   
    public Id_ZonaElectoral: number 
    buildFromObject(x: any): PuestoVotacionBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Activo != undefined) { this.Activo = x.Activo }       
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.Id_ZonaElectoral != undefined) { this.Id_ZonaElectoral = x.Id_ZonaElectoral }     
        
        return this
    }
    Build(): E_PuestoVotacion {
        var obj: E_PuestoVotacion = new E_PuestoVotacion()
        obj.Id = this.Id
        obj.Nombre = this.Nombre
        obj.Activo = this.Activo        
        obj.FechaCreacion = this.FechaCreacion
        obj.Id_ZonaElectoral = this.Id_ZonaElectoral        
       
        return obj
    }


}
