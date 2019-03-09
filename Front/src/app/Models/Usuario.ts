import { EntidadBase } from "./EntidadBase";

export class Usuario extends EntidadBase {

    public  Nombre : string
    public  Password : string
    public  Rol :number
    public  UserName : string
    public  FechaModificacion : Date
    public  Activo :boolean
    public  NombreRol : string
    constructor() {
        super();
    }

}
