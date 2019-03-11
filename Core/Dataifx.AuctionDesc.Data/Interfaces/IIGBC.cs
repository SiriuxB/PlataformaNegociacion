using System;
using System.Data;

namespace Dataifx.AuctionDesc.Data.Interfaces
{
    public interface IIGBC
    {
        DataTable Consultar(DateTime fecha);
        DataTable ConsultarCOLCAP(DateTime fecha);
        DataTable ConsultarCOL20(DateTime fecha);
    }
}
