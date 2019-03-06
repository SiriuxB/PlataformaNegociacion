import { E_DetalleIndividuo } from "app/Models/E_DetalleIndividuo";
import { E_TipoAntecedente } from "./E_TipoAntecedente";
import { E_antecedentesxindividuo2 } from "./E_antecedentesxindividuo2";

export class E_Individuo2 {
    public Id: number
    public Cedula: string
    public Nombres: string
    public Apellidos: string
    public Direccion: string
    public Correo: string
    public Telefono: string
    public Celular: string       
    public nombreTR: string   
    public Activo: boolean
    public FechaCreacion: Date
    public Id_departamento: number
    public Id_individuo1: number
    public Id_tipoestadorevision: number
    public Id_tipoindividuo2: number
    public CambiarClave: boolean
    public Detalleindividuo:Array<E_DetalleIndividuo> 
    public observacionsac: string
    public Estado: string
    public antecedendes:Array<E_antecedentesxindividuo2>
    
    constructor() { }
}