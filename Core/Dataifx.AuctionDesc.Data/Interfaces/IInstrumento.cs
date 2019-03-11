using System;
using System.Data;

namespace Dataifx.AuctionDesc.Data.Interfaces
{
    public interface IInstrumento
    {
        DataTable ConsultarComportamientoMercado(DateTime fecha);
        DataTable ConsultarCierresDiaAnterior(DateTime fecha);
        DataTable ConsultarInformacionGraficos(DateTime fecha);
        DataTable ConsultarInformacionGraficosUltimoDiaHabil();
        DataTable ConsultarInformacionGraficoPorNemo(string Nemotecnico, DateTime fecha);
        DataTable Consultarcierres(DateTime fecha, string instrumento);
    }
}
