import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_TipoImpugnacion } from "../Models/E_TipoImpugnacion";

export class TipoImpugnacionBuilder {    
    Descripcion: string;
    public Id: number
    public Estado: boolean 
    
    buildFromObject(x: any): TipoImpugnacionBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Descripcion != undefined) { this.Descripcion = x.Descripcion }       
        if (x.Estado != undefined) { this.Estado = x.Estado }     
        
        return this
    }
    Build(): E_TipoImpugnacion {
        var obj: E_TipoImpugnacion = new E_TipoImpugnacion()
        obj.Id = this.Id
        obj.Descripcion = this.Descripcion      
        obj.Estado = this.Estado       

        return obj
    }

}
