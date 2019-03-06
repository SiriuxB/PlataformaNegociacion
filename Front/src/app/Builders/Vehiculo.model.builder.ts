import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Departamentos } from "../Models/E_Departamentos";
import { E_Metas } from "../Models/E_Metas";
import { E_Vehiculo } from "../Models/E_Vehiculo";

export class VehiculoBuilder {    
    public Id: number
    public Nombre: string
    public TipoVehiculo: string
    public Capacidad: number
    public Placa: string
    public Soat: string
    public Pase: string
    public Conductor: string
    public Modelo: string
    public Color: string
    public ValorServicio: number
    public Id_Usuario: number
    public Id_Departamento: number
    public Id_Municipio: number
    public Estado: boolean
    public FechaCreacion: Date
    public Id_directordepto: number
    public Id_individuo2: number
    
    buildFromObject(x: any): VehiculoBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.TipoVehiculo != undefined) { this.TipoVehiculo = x.TipoVehiculo }
        if (x.Capacidad != undefined) { this.Capacidad = x.Capacidad }
        if (x.Placa != undefined) { this.Placa = x.Placa }
        if (x.Soat != undefined) { this.Soat = x.Soat }
        if (x.Pase != undefined) { this.Pase = x.Pase }
        if (x.Conductor != undefined) { this.Conductor = x.Conductor }
        if (x.Modelo != undefined) { this.Modelo = x.Modelo }
        if (x.Color != undefined) { this.Color = x.Color }
        if (x.ValorServicio != undefined) { this.ValorServicio = x.ValorServicio }
        if (x.Id_Usuario != undefined) { this.Id_Usuario = x.Id_Usuario }
        if (x.Id_Departamento != undefined) { this.Id_Departamento = x.Id_Departamento }
        if (x.Id_Municipio != undefined) { this.Id_Municipio = x.Id_Municipio }
        if (x.Estado != undefined) { this.Estado = x.Estado }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.Id_directordepto != undefined) { this.Id_directordepto = x.Id_directordepto }
        if (x.Id_individuo2 != undefined) { this.Id_individuo2 = x.Id_individuo2 }        
        return this
    }
    Build(): E_Vehiculo {
        var obj: E_Vehiculo = new E_Vehiculo()
        obj.Id = this.Id
        obj.Nombre = this.Nombre
        obj.TipoVehiculo = this.TipoVehiculo
        obj.Capacidad = this.Capacidad
        obj.Placa = this.Placa
        obj.Soat = this.Soat
        obj.Pase = this.Pase
        obj.Conductor = this.Conductor
        obj.Modelo = this.Modelo
        obj.Color = this.Color
        obj.ValorServicio = this.ValorServicio
        obj.Id_Usuario = this.Id_Usuario
        obj.Id_Departamento = this.Id_Departamento
        obj.Id_Municipio = this.Id_Municipio
        obj.Estado = this.Estado
        obj.FechaCreacion = this.FechaCreacion
        obj.Id_directordepto = this.Id_directordepto
        obj.Id_individuo2 = this.Id_individuo2

        return obj
    }


}
