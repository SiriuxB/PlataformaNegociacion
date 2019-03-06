import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_TipoAntecedente } from "../Models/E_TipoAntecedente";

export class TipoAntecedenteBuilder {
    public Id: number
    public Nombre: string
    public Activo: boolean
    public FechaCreacion: Date    
    public valuee: boolean;    
    buildFromObject(x: any): TipoAntecedenteBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Activo != undefined) { this.Activo = x.Activo }       
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.valuee != undefined) { this.valuee = x.valuee }else{this.valuee = false}
        
        return this
    }
    Build(): E_TipoAntecedente {
        var obj: E_TipoAntecedente = new E_TipoAntecedente()
        obj.Id = this.Id
        obj.Nombre = this.Nombre
        obj.Activo = this.Activo        
        obj.FechaCreacion = this.FechaCreacion
        obj.valuee = this.valuee
        return obj
    }


}
