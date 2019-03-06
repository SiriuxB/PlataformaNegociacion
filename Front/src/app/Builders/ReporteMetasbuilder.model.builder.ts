import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Mesa } from "../Models/E_Mesa";
import { E_ReporteMetas } from "../Models/E_ReporteMetas";

export class ReporteMetasbuilder {
    public Id: number
    public NombreMetas: string
    public ObservacionMetas: string
    public PorcentCantidad: number
    public Cantidad: number
    public Acumulada: number
    public NombreGerente: string
    public NombreDirector: string
    public PorcentajeFecha: number
    public fechainicio: Date
    public fechafin: Date
    public metacumplida: boolean
    public FechaCreacion: Date
    public NombreDepartamento: string
    public Param_id_director: number
    public Param_id_gerente: number
    public Param_i_fechain: Date
    public Param_i_fechafin: Date
    public Param_DeptoSeleccionado: string
    public CantidadVsTiempo: string
    buildFromObject(x: any): ReporteMetasbuilder {

        if (x.Id != undefined) { this.Id = x.Id }
        if (x.NombreMetas != undefined) { this.NombreMetas = x.NombreMetas }
        if (x.ObservacionMetas != undefined) { this.ObservacionMetas = x.ObservacionMetas }
        if (x.PorcentCantidad != undefined) { this.PorcentCantidad = x.PorcentCantidad }
        if (x.Cantidad != undefined) { this.Cantidad = x.Cantidad }
        if (x.Acumulada != undefined) { this.Acumulada = x.Acumulada }
        if (x.NombreGerente != undefined) { this.NombreGerente = x.NombreGerente }
        if (x.NombreDirector != undefined) { this.NombreDirector = x.NombreDirector }
        if (x.PorcentajeFecha != undefined) { this.PorcentajeFecha = x.PorcentajeFecha }
        if (x.fechainicio != undefined) { this.fechainicio = x.fechainicio }
        if (x.fechafin != undefined) { this.fechafin = x.fechafin }
        if (x.metacumplida != undefined) { this.metacumplida = x.metacumplida }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.NombreDepartamento != undefined) { this.NombreDepartamento = x.NombreDepartamento }
        if (x.Param_id_director != undefined) { this.Param_id_director = x.Param_id_director }
        if (x.Param_id_gerente != undefined) { this.Param_id_gerente = x.Param_id_gerente }
        if (x.Param_i_fechain != undefined) { this.Param_i_fechain = x.Param_i_fechain }
        if (x.Param_i_fechafin != undefined) { this.Param_i_fechafin = x.Param_i_fechafin }
        if (x.PorcentajeFecha != undefined && x.PorcentCantidad != undefined) {
            this.CantidadVsTiempo =
                x.PorcentCantidad.toString() + ' %' + ' / ' + x.PorcentajeFecha.toString() + ' %'
        }
        if (x.Param_DeptoSeleccionado != undefined) { this.Param_DeptoSeleccionado = x.Param_DeptoSeleccionado }

        return this
    }
    Build(): E_ReporteMetas {
        var obj: E_ReporteMetas = new E_ReporteMetas()

        obj.Id = this.Id
        obj.NombreMetas = this.NombreMetas
        obj.ObservacionMetas = this.ObservacionMetas
        obj.PorcentCantidad = this.PorcentCantidad
        obj.Cantidad = this.Cantidad
        obj.Acumulada = this.Acumulada
        obj.NombreGerente = this.NombreGerente
        obj.NombreDirector = this.NombreDirector
        obj.PorcentajeFecha = this.PorcentajeFecha
        obj.fechainicio = this.fechainicio
        obj.fechafin = this.fechafin
        obj.metacumplida = this.metacumplida
        obj.FechaCreacion = this.FechaCreacion
        obj.NombreDepartamento = this.NombreDepartamento
        obj.Param_id_director = this.Param_id_director
        obj.Param_id_gerente = this.Param_id_gerente
        obj.Param_i_fechain = this.Param_i_fechain
        obj.Param_i_fechafin = this.Param_i_fechafin
        obj.Param_DeptoSeleccionado = this.Param_DeptoSeleccionado
        obj.CantidadVsTiempo = this.CantidadVsTiempo
        return obj
    }


}
