import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Mesa } from "../Models/E_Mesa";
import { E_antecedentesxindividuo2 } from "../Models/E_antecedentesxindividuo2";

export class antecedentesxindividuo2builder {
    public Id: number
    public AntecendetesOk: boolean
    public FechaAprobado: Date
    public Id_tipoantecedentes: number   
    public Id_individuo2: number 
    buildFromObject(x: any): antecedentesxindividuo2builder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.AntecendetesOk != undefined) { this.AntecendetesOk = x.AntecendetesOk }
        if (x.FechaAprobado != undefined) { this.FechaAprobado = x.FechaAprobado }       
        if (x.Id_tipoantecedentes != undefined) { this.Id_tipoantecedentes = x.Id_tipoantecedentes }
        if (x.Id_individuo2 != undefined) { this.Id_individuo2 = x.Id_individuo2 }     
        
        return this
    }
    Build(): E_antecedentesxindividuo2 {
        var obj: E_antecedentesxindividuo2 = new E_antecedentesxindividuo2()
        obj.Id = this.Id
        obj.AntecendetesOk = this.AntecendetesOk
        obj.FechaAprobado = this.FechaAprobado        
        obj.Id_individuo2 = this.Id_individuo2
        obj.Id_tipoantecedentes = this.Id_tipoantecedentes        
       
        return obj
    }


}
