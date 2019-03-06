import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Individuo1, E_UsuarioSACxIndividuo1 } from "../Models/E_Individuo1";
import { UsuarioBuilder } from "./Usuario.model.builder";

export class Individuo1Builder {
    public Id: number
    public Cedula: string
    public Nombre: string
    public Apellido: string
    public Direccion: string
    public correo: string
    public Telefono: string
    public Celular: string
    public Activo: boolean
    public FechaCreacion: Date
    public Id_Departamento: number
    public Id_tipoindividuo: number
    public Id_tipoestadorevision: number
    public cambiarclave: boolean
    public usuariosac: E_UsuarioSACxIndividuo1
    public antecedendes: any
    public Id_DirectorDepto: number
    constructor() { }
    buildFromObject(x: any): Individuo1Builder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Cedula != undefined) { this.Cedula = x.Cedula }
        if (x.Nombres != undefined) { this.Nombre = x.Nombres }
        if (x.Apellidos != undefined) { this.Apellido = x.Apellidos }
        if (x.Telefono != undefined) { this.Telefono = x.Telefono }
        if (x.Celular != undefined) { this.Celular = x.Celular }
        if (x.correo != undefined) { this.correo = x.correo }
        if (x.Direccion != undefined) { this.Direccion = x.Direccion }
        if (x.Id_Departamento != undefined) { this.Id_Departamento = x.Id_Departamento }
        if (x.Id_tipoestadorevision != undefined) { this.Id_tipoestadorevision = x.Id_tipoestadorevision }
        if (x.Id_tipoindividuo != undefined) { this.Id_tipoindividuo = x.Id_tipoindividuo }
        if (x.Activo != undefined) { this.Activo = x.Activo }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.CambiarClave != undefined) { this.cambiarclave = x.CambiarClave }
        if (x.antecedendes != undefined) { this.antecedendes = x.antecedendes }
        if (x.usuariosac != undefined) { this.usuariosac = x.usuariosac }
        if (x.Id_DirectorDepto != undefined) { this.Id_DirectorDepto = x.Id_DirectorDepto }


        return this
    }
    Build(): E_Individuo1 {
        var obj: E_Individuo1 = new E_Individuo1()
        obj.Id = this.Id
        obj.Cedula = this.Cedula
        obj.Nombre = this.Nombre
        obj.Apellido = this.Apellido
        obj.Telefono = this.Telefono
        obj.Celular = this.Celular
        obj.correo = this.correo
        obj.Direccion = this.Direccion
        obj.Id_tipoestadorevision = this.Id_tipoestadorevision
        obj.Id_tipoindividuo = this.Id_tipoindividuo
        obj.Activo = this.Activo
        obj.FechaCreacion = this.FechaCreacion
        obj.cambiarclave = this.cambiarclave
        obj.Id_Departamento = this.Id_Departamento
        obj.usuariosac = this.usuariosac
        obj.antecedendes = this.antecedendes
        obj.Id_DirectorDepto = this.Id_DirectorDepto
        return obj
    }


}
