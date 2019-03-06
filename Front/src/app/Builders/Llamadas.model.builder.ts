import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Mesa } from "../Models/E_Mesa";
import { E_Llamadas } from "../Models/E_Llamadas";

export class LlamadasBuilder {
    public Id: number    
    public Total: number
    public Descripcion: string
    public Id_Usuario: number
    public Id_MetaCall: number  
    public Id_CallCenter: number;  
    public FechaCreacion: Date;
    public nombreCA:string
    public nombreMC:string

    buildFromObject(x: any): LlamadasBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Total != undefined) { this.Total = x.Total }
        if (x.Descripcion != undefined) { this.Descripcion = x.Descripcion }       
        if (x.Id_Usuario != undefined) { this.Id_Usuario = x.Id_Usuario }
        if (x.Id_MetaCall != undefined) { this.Id_MetaCall = x.Id_MetaCall }     
        if (x.Id_CallCenter != undefined) { this.Id_CallCenter = x.Id_CallCenter }    
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }    
        if (x.nombreCA != undefined) { this.nombreCA = x.nombreCA }    
        if (x.nombreMC != undefined) { this.nombreMC = x.nombreMC }    
        
        return this
    }
    Build(): E_Llamadas {
        var obj: E_Llamadas = new E_Llamadas()
        obj.Id = this.Id
        obj.Total = this.Total
        obj.Descripcion = this.Descripcion        
        obj.Id_Usuario = this.Id_Usuario
        obj.Id_MetaCall = this.Id_MetaCall        
        obj.Id_CallCenter = this.Id_CallCenter
        obj.nombreCA = this.nombreCA
        obj.FechaCreacion = this.FechaCreacion
        obj.nombreMC = this.nombreMC
       
        return obj
    }


}
