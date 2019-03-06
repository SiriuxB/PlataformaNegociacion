export class E_GerenteSector {
    public Id: number
    public Cedula: string
    public Nombres: string
    public Apellidos: string
    public Direccion: string
    public Correo: string
    public Telefono: string
    public Celular: string   
    public Id_Departamento: number
    public NombreDepto: string   
    public Activo: boolean
    public FechaCreacion: Date
    public Id_Sector: number
    public CambiarClave: boolean
    public CreadoPor: number     
    constructor() { }
}