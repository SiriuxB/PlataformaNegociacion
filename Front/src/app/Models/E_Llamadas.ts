import { E_CallCenter } from "./E_CallCenter";
import { E_MetasCall } from "./E_MetasCall";

export class E_Llamadas {
    public Id: number
    public Total: number
    public Descripcion: string
    public Id_Usuario: number
    public Id_MetaCall: number
    public Id_CallCenter: number
    public FechaCreacion: Date
    public ListCallCenter:Array<E_CallCenter>
    public ListMetasCall:Array<E_MetasCall>
    public nombreCA:string
    public nombreMC:string;
    constructor() { }
}