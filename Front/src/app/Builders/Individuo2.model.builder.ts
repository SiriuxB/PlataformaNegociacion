import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Individuo2 } from "../Models/E_Individuo2";
import { UsuarioBuilder } from "./Usuario.model.builder";
import { E_antecedentesxindividuo2 } from "../Models/E_antecedentesxindividuo2";
import { antecedentesxindividuo2builder } from "./antecedentesxindividuo2.model.builder";

export class Individuo2Builder {
    public Id: number
    public Cedula: string
    public Nombres: string
    public Apellidos: string
    public Direccion: string
    public Correo: string
    public Telefono: string
    public Celular: string   
    public Id_departamento: number
    public Id_individuo1: number
    public Id_tipoestadorevision: number
    public Id_tipoindividuo2: number
    public Activo: boolean
    public FechaCreacion: Date
    public observacionsac: string
    public CambiarClave: boolean
    public antecedendes:Array<E_antecedentesxindividuo2> =  new Array<E_antecedentesxindividuo2>();
     
    constructor() { }
    buildFromObject(x: any): Individuo2Builder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Cedula != undefined) { this.Cedula = x.Cedula }
        if (x.Nombres != undefined) { this.Nombres = x.Nombres }
        if (x.Apellidos != undefined) { this.Apellidos = x.Apellidos }
        if (x.Telefono != undefined) { this.Telefono = x.Telefono }
        if (x.Celular != undefined) { this.Celular = x.Celular }
        if (x.Correo != undefined) { this.Correo = x.Correo }
        if (x.Direccion != undefined) { this.Direccion = x.Direccion }
        if (x.Id_departamento != undefined) { this.Id_departamento = x.Id_departamento }
        if (x.Id_individuo1 != undefined) { this.Id_individuo1 = x.Id_individuo1 }
        if (x.Id_tipoestadorevision != undefined) { this.Id_tipoestadorevision = x.Id_tipoestadorevision }
        if (x.Id_tipoindividuo2 != undefined) { this.Id_tipoindividuo2 = x.Id_tipoindividuo2 }
        if (x.Activo != undefined) { this.Activo = x.Activo }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.CambiarClave != undefined) { this.CambiarClave = x.CambiarClave }
        if (x.observacionsac != undefined) { this.observacionsac = x.observacionsac }
        if (x.antecedendes != undefined) { 

            x.antecedendes.forEach(element => {
                this.antecedendes.push(new antecedentesxindividuo2builder().buildFromObject(element).Build()  )                
            });           
            
        }

       
        return this
    }
    Build(): E_Individuo2 {
        var obj: E_Individuo2 = new E_Individuo2()
        obj.Id = this.Id
        obj.Cedula = this.Cedula
        obj.Nombres = this.Nombres
        obj.Apellidos = this.Apellidos
        obj.Telefono = this.Telefono
        obj.Celular = this.Celular
        obj.Correo = this.Correo
        obj.Direccion = this.Direccion
        obj.Id_departamento = this.Id_departamento
        obj.Id_individuo1 = this.Id_individuo1
        obj.Id_tipoestadorevision = this.Id_tipoestadorevision
        obj.Id_tipoindividuo2 = this.Id_tipoindividuo2
        obj.Activo = this.Activo
        obj.FechaCreacion = this.FechaCreacion
        obj.CambiarClave = this.CambiarClave
        obj.observacionsac = this.observacionsac
        obj.antecedendes = this.antecedendes
        return obj
    }


}
