import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Departamentos } from "../Models/E_Departamentos";
import { E_MetasCall } from "../Models/E_MetasCall";

export class MetasCallBuilder {    
    public Id: number
    public Nombre: string
    public Descripcion: string
    public Cantidad: number
    public Id_CallCenter: number
    public TipoCanal: number
    public Canal: number
    public Acumulado: number
    public Fechaini: Date
    public Fechafin: Date
    public Porcentaje: number
    public PorcentajeFecha: number
    public Id_Usuario: number
    public Activo: boolean
    public FechaCreacion: Date
        
    buildFromObject(x: any): MetasCallBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Descripcion != undefined) { this.Descripcion = x.Descripcion }
        if (x.Cantidad != undefined) { this.Cantidad = x.Cantidad }
        if (x.Id_CallCenter != undefined) { this.Id_CallCenter = x.Id_CallCenter }
        if (x.TipoCanal != undefined) { this.TipoCanal = x.TipoCanal }
        if (x.Canal != undefined) { this.Canal = x.Canal }
        if (x.Acumulado != undefined) { this.Acumulado = x.Acumulado }
        if (x.Fechaini != undefined) { this.Fechaini = x.Fechaini }
        if (x.Fechafin != undefined) { this.Fechafin = x.Fechafin }
        if (x.Porcentaje != undefined) { this.Porcentaje = x.Porcentaje }
        if (x.PorcentajeFecha != undefined) { this.PorcentajeFecha = x.PorcentajeFecha }
        if (x.Id_Usuario != undefined) { this.Id_Usuario = x.Id_Usuario }
        if (x.Activo != undefined) { this.Activo = x.Activo }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        
        return this
    }
    Build(): E_MetasCall {
        var obj: E_MetasCall = new E_MetasCall()
        obj.Id = this.Id
        obj.Nombre = this.Nombre
        obj.Descripcion = this.Descripcion
        obj.Cantidad = this.Cantidad
        obj.Id_CallCenter = this.Id_CallCenter
        obj.Id_Usuario = this.Id_Usuario
        obj.Acumulado = this.Acumulado
        obj.Fechaini = this.Fechaini
        obj.Fechafin = this.Fechafin
        obj.TipoCanal = this.TipoCanal
        obj.Canal = this.Canal
        obj.Activo = this.Activo
        obj.FechaCreacion = this.FechaCreacion
        obj.Porcentaje = this.Porcentaje
        obj.PorcentajeFecha = this.PorcentajeFecha

        return obj
    }


}
