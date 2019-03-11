using System.Data;

namespace Dataifx.AuctionDesc.Data.Interfaces
{
    public interface IPuntasProfundidad
    {
        DataTable ConsultarPuntas();
        DataTable Consultar(string nemotecnico, char tipoNegocio);
        DataTable Consultar(string nemotecnico);
    }
}
