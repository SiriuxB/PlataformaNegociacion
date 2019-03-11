using System;
using System.Data;
using System.Data.Common;
using System.Reflection;
using Dataifx.AuctionDesc.Infrastructure.Models;
using Microsoft.Practices.EnterpriseLibrary.Data;

namespace Dataifx.AuctionDesc.Data.Clases
{
    public class DataNotification
    {
        public static Notification SearchNotification(Notification notiobj)
        {
            DataSet datos;
            DataTable clientes = new DataTable();
            try
            {
                var ConectStr = Tools.ConectionNow.BuildConection(notiobj.User);
                Database dbeAuction = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(ConectStr);
                //  Database dbeAuction = DatabaseFactory.CreateDatabase("Auction");
                // Crear objeto SP

                // Crear objeto SP
                DbCommand spConsultarNotificaciones = dbeAuction.GetStoredProcCommand("SP_NOTIFICACIONES");

                dbeAuction.AddInParameter(spConsultarNotificaciones, "@i_operation", DbType.String, "S");
                dbeAuction.AddInParameter(spConsultarNotificaciones, "@i_option", DbType.String, "A");

                spConsultarNotificaciones.CommandTimeout = 900000000;
                datos = dbeAuction.ExecuteDataSet(spConsultarNotificaciones);
                if (datos.Tables[0].Rows.Count > 0)
                {
                    clientes = datos.Tables[0];
                    notiobj.Mensaje = clientes.Rows[0]["Mensaje"].ToString();
                    if (clientes.Rows[0]["Fecha"] != DBNull.Value)
                    {
                        notiobj.Fecha = Convert.ToDateTime(clientes.Rows[0]["Fecha"]);
                    }
                }

                return notiobj;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));

                throw new Exception((string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name)));
            }
        }
        public static DataTable SearchMessages(UserAutentication objUser)
        {
            DataSet datos;
            DataTable clientes = new DataTable();
            try
            {
                var ConectStr = Tools.ConectionNow.BuildConection(objUser);
                Database dbeAuction = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(ConectStr);
                //  Database dbeAuction = DatabaseFactory.CreateDatabase("Auction");
                // Crear objeto SP

                // Crear objeto SP
                DbCommand spConsultarNotificaciones = dbeAuction.GetStoredProcCommand("SP_NOTIFICACIONES");

                dbeAuction.AddInParameter(spConsultarNotificaciones, "@i_operation", DbType.String, "S");
                dbeAuction.AddInParameter(spConsultarNotificaciones, "@i_option", DbType.String, "B");

                spConsultarNotificaciones.CommandTimeout = 900000000;
                datos = dbeAuction.ExecuteDataSet(spConsultarNotificaciones);
                if (datos.Tables[0].Rows.Count > 0)
                {
                    clientes = datos.Tables[0];                
                }

                return clientes;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));

                throw new Exception((string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name)));
            }
        }
    }
}