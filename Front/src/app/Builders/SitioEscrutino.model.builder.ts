import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_SitioEscrutino } from "../Models/E_SitioEscrutino";

export class SitioEscrutinoBuilder {    
    public Id: number
    public Nombre: string
    public Activo: boolean
    public FechaCreacion: Date
    public Id_Departamento: number
    public Id_Municipio: number
    
    buildFromObject(x: any): SitioEscrutinoBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }       
        if (x.Activo != undefined) { this.Activo = x.Activo }  
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.Id_Departamento != undefined) { this.Id_Departamento = x.Id_Departamento }       
        if (x.Id_Municipio != undefined) { this.Id_Municipio = x.Id_Municipio }    
        
        return this
    }
    Build(): E_SitioEscrutino {
        var obj: E_SitioEscrutino = new E_SitioEscrutino()
        obj.Id = this.Id
        obj.Nombre = this.Nombre      
        obj.Activo = this.Activo  
        obj.FechaCreacion = this.FechaCreacion
        obj.Id_Departamento = this.Id_Departamento      
        obj.Id_Municipio = this.Id_Municipio     

        return obj
    }

}
