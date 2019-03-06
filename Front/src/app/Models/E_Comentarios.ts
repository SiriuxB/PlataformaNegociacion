import { E_Usuario } from "./E_Usuario";
import { E_Error } from "./E_Error";

export class E_Comentarios {
    public Id: number
    public Descripcion: string
    public Id_Imagen: number
    public Id_usuario: number
    public Estado: boolean
    public FechaCreacion: Date
    public nombrecliente:string
    public apellidocliente:string
    public NombreUsuario:string
    constructor() { }
}