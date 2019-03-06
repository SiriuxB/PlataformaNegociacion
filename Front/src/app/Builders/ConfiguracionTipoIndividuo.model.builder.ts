import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_ConfiguracionTipoIndividuo } from "../Models/E_ConfiguracionTipoIndividuo";

export class ConfiguracionTipoIndividuoBuilder {
    public Id: number
    public Id_tipoindividuo2: number
    public NombreEstructura: string
    public Activo: boolean
    buildFromObject(x: any): ConfiguracionTipoIndividuoBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Id_tipoindividuo2 != undefined) { this.Id_tipoindividuo2 = x.Id_tipoindividuo2 }
        if (x.Activo != undefined) { this.Activo = x.Activo }       
        if (x.NombreEstructura != undefined) { this.NombreEstructura = x.NombreEstructura }   
        
        return this
    }
    Build(): E_ConfiguracionTipoIndividuo {
        var obj: E_ConfiguracionTipoIndividuo = new E_ConfiguracionTipoIndividuo()
        obj.Id = this.Id
        obj.Id_tipoindividuo2 = this.Id_tipoindividuo2
        obj.Activo = this.Activo        
        obj.NombreEstructura = this.NombreEstructura     
       
        return obj
    }


}
