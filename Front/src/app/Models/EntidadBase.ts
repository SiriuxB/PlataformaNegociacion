
import { UserAutentication } from './UserAutentication';


export class EntidadBase {
    public Id: number;
    public EstadoPeticionOK: boolean
    public ErrorMensaje: string
    public UserAutentication: UserAutentication
    constructor() { }
}

