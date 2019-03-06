import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Reunion } from "../Models/E_Reunion";
import { UsuarioBuilder } from "./Usuario.model.builder";

export class ReunionBuilder {
    public NombreTipoReunion: string;
    public Id: number
    public Descripcion: string
    public Titulo: string
    public Id_Departamento: number
    public Id_Municipio: number
    public Id_TipoReunion: number
    public Id_gerentesector: number
    public Id_directorDepto: number
    public CantidadPersonas: number
    public Estado: boolean
    public FechaCreacion: Date
    public total: number
    public NombreDepartamento: string
    public Id_Usuario: number
    public NombreCliente: string
    public ApellidoCliente: string
    public Id_Sector: number
    public Costo: number
    public NombrexAnonimo: string
    constructor() { }
    buildFromObject(x: any): ReunionBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Titulo != undefined) { this.Titulo = x.Titulo }

        if (x.Id_Usuario != undefined) { this.Id_Usuario = x.Id_Usuario }
        if (x.NombreCliente != undefined) { this.NombreCliente = x.NombreCliente }
        if (x.ApellidoCliente != undefined) { this.ApellidoCliente = x.ApellidoCliente }

        if (x.Descripcion != undefined) { this.Descripcion = x.Descripcion }
        if (x.Id_Departamento != undefined) { this.Id_Departamento = x.Id_Departamento }
        if (x.Id_Municipio != undefined) { this.Id_Municipio = x.Id_Municipio }
        if (x.Id_TipoReunion != undefined) { this.Id_TipoReunion = x.Id_TipoReunion }
        if (x.Id_gerentesector != undefined) { this.Id_gerentesector = x.Id_gerentesector }
        if (x.Id_directorDepto != undefined) { this.Id_directorDepto = x.Id_directorDepto }
        if (x.CantidadPersonas != undefined) { this.CantidadPersonas = x.CantidadPersonas }
        if (x.Estado != undefined) { this.Estado = x.Estado }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.total != undefined) { this.total = x.total }
        if (x.NombreDepartamento != undefined) { this.NombreDepartamento = x.NombreDepartamento }
        if (x.NombrexAnonimo != undefined) { this.NombrexAnonimo = x.NombrexAnonimo }

        if (x.NombreCliente != undefined) { this.NombreCliente = x.NombreCliente + ' ' + x.ApellidoCliente }

        if (x.ApellidoCliente != undefined) { this.ApellidoCliente = x.ApellidoCliente }
        if (x.Id_Sector != undefined) { this.Id_Sector = x.Id_Sector }
        if (x.Costo != undefined) { this.Costo = x.Costo }
        if (x.NombreTipoReunion != undefined) { this.NombreTipoReunion = x.NombreTipoReunion }
        return this
    }
    Build(): E_Reunion {
        var obj: E_Reunion = new E_Reunion()


        obj.Id = this.Id
        obj.Id_Usuario = this.Id_Usuario
        obj.NombreCliente = this.NombreCliente
        obj.ApellidoCliente = this.ApellidoCliente

        obj.Descripcion = this.Descripcion
        obj.Titulo = this.Titulo
        obj.Id_Departamento = this.Id_Departamento
        obj.Id_Municipio = this.Id_Municipio
        obj.Id_TipoReunion = this.Id_TipoReunion

        obj.Id_gerentesector = this.Id_gerentesector
        obj.Id_directorDepto = this.Id_directorDepto

        obj.CantidadPersonas = this.CantidadPersonas
        obj.Estado = this.Estado
        obj.FechaCreacion = this.FechaCreacion
        obj.total = this.total
        obj.NombreDepartamento = this.NombreDepartamento
        obj.Id_Sector = this.Id_Sector
        obj.Costo = this.Costo
        obj.NombrexAnonimo = this.NombrexAnonimo
        obj.NombreTipoReunion = this.NombreTipoReunion
        return obj
    }


}
