import { E_Error } from "./E_Error";

export class E_Usuario {
    public Id: number
    public UserName: string
    public Passwordd: string
    public Salt: string
    public Hash: string
    public Email: string
    public Id_Cliente: number
    public Id_Perfil: number
    public Estado: boolean
    public CambiarClave: boolean
    public FechaCreacion: Date
    public Imagen :string
    public error: E_Error
    constructor() { }
}

