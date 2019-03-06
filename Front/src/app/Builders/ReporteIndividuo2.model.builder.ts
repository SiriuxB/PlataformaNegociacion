import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Mesa } from "../Models/E_Mesa";
import { E_ReporteIndividuo2 } from "../Models/E_ReporteIndividuo2";

export class ReporteIndividuo2builder {
    public NombreTipoIndividuo2: string
    public NombreDirectorDepartamento: string
    public NombreGerente: string
    public Id: string
    public Cedula: string
    public NombreIndividuo: string
    public Direccion: string
    public Correo: string
    public Telefono: string
    public Celular: string
    public Id_departamento: string
    public Id_individuo1: string
    public Id_tipoestadorevision: string
    public Id_tipoindividuo2: string
    public observacionsac: string
    public CambiarClave: string
    public FechaCreacion: string
    public Activo: string
    public NombreEstadoRevision: string
    public NombreDepartamento: string
    buildFromObject(x: any): ReporteIndividuo2builder {

        if (x.NombreTipoIndividuo2 != undefined) { this.NombreTipoIndividuo2 = x.NombreTipoIndividuo2 }
        if (x.NombreDirectorDepartamento != undefined) { this.NombreDirectorDepartamento = x.NombreDirectorDepartamento }
        if (x.NombreGerente != undefined) { this.NombreGerente = x.NombreGerente }
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Cedula != undefined) { this.Cedula = x.Cedula }
        if (x.NombreIndividuo != undefined) { this.NombreIndividuo = x.NombreIndividuo }
        if (x.Direccion != undefined) { this.Direccion = x.Direccion }
        if (x.Correo != undefined) { this.Correo = x.Correo }
        if (x.Telefono != undefined) { this.Telefono = x.Telefono }
        if (x.Celular != undefined) { this.Celular = x.Celular }
        if (x.Id_departamento != undefined) { this.Id_departamento = x.Id_departamento }
        if (x.Id_individuo1 != undefined) { this.Id_individuo1 = x.Id_individuo1 }
        if (x.Id_tipoestadorevision != undefined) { this.Id_tipoestadorevision = x.Id_tipoestadorevision }
        if (x.Id_tipoindividuo2 != undefined) { this.Id_tipoindividuo2 = x.Id_tipoindividuo2 }
        if (x.observacionsac != undefined) { this.observacionsac = x.observacionsac }
        if (x.CambiarClave != undefined) { this.CambiarClave = x.CambiarClave }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.Activo != undefined) { this.Activo = x.Activo }
        if (x.NombreEstadoRevision != undefined) { this.NombreEstadoRevision = x.NombreEstadoRevision }
        if (x.NombreDepartamento != undefined) { this.NombreDepartamento = x.NombreDepartamento }

        return this
    }
    Build(): E_ReporteIndividuo2 {
        var obj: E_ReporteIndividuo2 = new E_ReporteIndividuo2()
        obj.NombreTipoIndividuo2 = this.NombreTipoIndividuo2
        obj.NombreDirectorDepartamento = this.NombreDirectorDepartamento
        obj.NombreGerente = this.NombreGerente
        obj.Id = this.Id
        obj.Cedula = this.Cedula
        obj.NombreIndividuo = this.NombreIndividuo
        obj.Direccion = this.Direccion
        obj.Correo = this.Correo
        obj.Telefono = this.Telefono
        obj.Celular = this.Celular
        obj.Id_departamento = this.Id_departamento
        obj.Id_individuo1 = this.Id_individuo1
        obj.Id_tipoestadorevision = this.Id_tipoestadorevision
        obj.Id_tipoindividuo2 = this.Id_tipoindividuo2
        obj.observacionsac = this.observacionsac
        obj.CambiarClave = this.CambiarClave
        obj.FechaCreacion = this.FechaCreacion
        obj.Activo = this.Activo
        obj.NombreEstadoRevision = this.NombreEstadoRevision
        obj.NombreDepartamento = this.NombreDepartamento

        return obj
    }


}
