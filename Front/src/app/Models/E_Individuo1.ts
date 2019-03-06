export class E_Individuo1 {
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
    public Id_DirectorDepto:number
    constructor() { }
}

export class E_UsuarioSACxIndividuo1 {
    public Id: number
    public Id_individuo1: number
    public FechaUltimaModificacion: Date
    public observacionsac: string
    constructor() { }
}