#region Header

// /*------------------------------------------------------------
//   <copyright file ="AuactionBuilder.cs" company="DATA IFX">
//   </copyright>
//   <Summary>
//   Clase qe construye un objeto Auction
//   </Summary>
// ------------------------------------------------------------*/

#endregion

#region Dependencies



#endregion

using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Infrastructure.Builders
{
    public class GasLoggerBuilder
    {
       
        public static GasLog Build(UserAutentication objUser,string Descripcion,int TipoMovimiento, bool esCorrecto)
        {
           GasLog gaslogger = new GasLog();
            if (objUser != null)
            {
                gaslogger.IdUsuario = objUser.IdSegas == null ? 0 : objUser.IdSegas;
                gaslogger.Nombre = objUser.Nombre;
                gaslogger.NombreUsuario = objUser.username;
                gaslogger.User = objUser;
            }
            else
            {
                gaslogger.IdUsuario = 0;
                gaslogger.Nombre = "Indefinido";
                gaslogger.NombreUsuario = "Indefinido";
            }
            gaslogger.Descripcion = Descripcion;
            gaslogger.TipoMovimiento = Descripcion;
            gaslogger.IdTipoAccion = TipoMovimiento;
            gaslogger.EstadoTransaccion = esCorrecto;

            return gaslogger;
        }

     
    }
}