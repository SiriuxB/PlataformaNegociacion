import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Mesa } from "../Models/E_Mesa";

export class MesaBuilder {
    public Id: number
    public Nombre: string
    public Activo: boolean
    public FechaCreacion: Date   
    public Id_puestoVotacion: number 
    buildFromObject(x: any): MesaBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Activo != undefined) { this.Activo = x.Activo }       
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.Id_puestoVotacion != undefined) { this.Id_puestoVotacion = x.Id_puestoVotacion }     
        
        return this
    }
    Build(): E_Mesa {
        var obj: E_Mesa = new E_Mesa()
        obj.Id = this.Id
        obj.Nombre = this.Nombre
        obj.Activo = this.Activo        
        obj.FechaCreacion = this.FechaCreacion
        obj.Id_puestoVotacion = this.Id_puestoVotacion        
       
        return obj
    }


}
