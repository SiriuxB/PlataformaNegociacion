using System;
using System.Data;
using System.Data.Common;
using System.Reflection;
using Dataifx.AuctionDesc.Infrastructure.Models;
using Microsoft.Practices.EnterpriseLibrary.Data;

namespace Dataifx.AuctionDesc.Data.Clases
{
   public class DataGasLog
    {
        public static int InsertLogGas(GasLog gasobj)
        {
            int datos;
            DataTable clientes = new DataTable();
            try
            {

                var ConectStr = Tools.ConectionNow.BuildConection(gasobj.User);
                Database dbAuction = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(ConectStr);
                //  Database dbeAuction = DatabaseFactory.CreateDatabase("Auction");
                // Crear objeto SP
                DbCommand spInsertarLog = dbAuction.GetStoredProcCommand("SP_GASLOG");

                dbAuction.AddInParameter(spInsertarLog, "@i_operation", DbType.String, "I");
                dbAuction.AddInParameter(spInsertarLog, "@i_option", DbType.String, "A");              
                dbAuction.AddInParameter(spInsertarLog, "@Descripcion", DbType.String,gasobj.Descripcion);
                dbAuction.AddInParameter(spInsertarLog, "@NombreUsuario", DbType.String, gasobj.NombreUsuario);
                dbAuction.AddInParameter(spInsertarLog, "@IdUsuario", DbType.Int16, gasobj.IdUsuario);
                dbAuction.AddInParameter(spInsertarLog, "@TipoMovimiento", DbType.String, gasobj.Descripcion);
                dbAuction.AddInParameter(spInsertarLog, "@IdTipoAccion", DbType.Int16, gasobj.IdTipoAccion);
                dbAuction.AddInParameter(spInsertarLog, "@Nombre", DbType.String, gasobj.Nombre);
                dbAuction.AddInParameter(spInsertarLog, "@EstadoTrans", DbType.Boolean, gasobj.EstadoTransaccion);

                spInsertarLog.CommandTimeout = 900000000;
                datos = dbAuction.ExecuteNonQuery(spInsertarLog);


                return datos;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));

                throw new Exception("Excepcion en la funcion LogGas" + ex.StackTrace);
            }
        }

        public static void InsertLogGasError(GasLog gasobj)
        {
            int datos;
            DataTable clientes = new DataTable();
            try
            {
                Database dbAuction = null;
                string ConectStr="";
                //if (gasobj.User == null)
                //{
                    dbAuction = DatabaseFactory.CreateDatabase("Auction");
                //}
                //else {
                //     ConectStr = Tools.ConectionNow.BuildConection(gasobj.User);
                //    dbAuction = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(ConectStr);
                //}
                
                
                //  Database dbeAuction = DatabaseFactory.CreateDatabase("Auction");
                // Crear objeto SP
                DbCommand spInsertarLog = dbAuction.GetStoredProcCommand("SP_GASLOG");

                dbAuction.AddInParameter(spInsertarLog, "@i_operation", DbType.String, "I");
                dbAuction.AddInParameter(spInsertarLog, "@i_option", DbType.String, "B");
                dbAuction.AddInParameter(spInsertarLog, "@Descripcion", DbType.String, gasobj.Descripcion);
                dbAuction.AddInParameter(spInsertarLog, "@NombreUsuario", DbType.String, gasobj.NombreUsuario);
                dbAuction.AddInParameter(spInsertarLog, "@IdUsuario", DbType.Int16, gasobj.IdUsuario);
                dbAuction.AddInParameter(spInsertarLog, "@TipoMovimiento", DbType.String, gasobj.Descripcion);
                dbAuction.AddInParameter(spInsertarLog, "@IdTipoAccion", DbType.Int16, gasobj.IdTipoAccion);
                dbAuction.AddInParameter(spInsertarLog, "@Nombre", DbType.String, gasobj.Nombre);
                dbAuction.AddInParameter(spInsertarLog, "@EstadoTrans", DbType.Boolean, gasobj.EstadoTransaccion);

                spInsertarLog.CommandTimeout = 900000000;
                datos = dbAuction.ExecuteNonQuery(spInsertarLog);
              
            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));

                throw new Exception("Excepcion en la funcion LogGas" + ex.StackTrace);
            }
        }

        public static DataTable SearchLog(GasLogSearch search)
        {
            DataSet dsDatos;
            DataTable dtDatos = new DataTable();
            try
            {
                //Database dbAuction = DatabaseFactory.CreateDatabase("Auction");

                var ConectStr = Tools.ConectionNow.BuildConection(search.User);
                Database dbAuction = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(ConectStr);


                // Crear objeto SP
                DbCommand spConsultarLog = dbAuction.GetStoredProcCommand("SP_GASLOG");

                dbAuction.AddInParameter(spConsultarLog, "@i_operation", DbType.String, "S");
                dbAuction.AddInParameter(spConsultarLog, "@i_option", DbType.String, "A");
                if (search.IdUsuario > 0)
                    dbAuction.AddInParameter(spConsultarLog, "@IdUsuario", DbType.Int16, search.IdUsuario);
                if (search.IdTipoAccion > 0)
                    dbAuction.AddInParameter(spConsultarLog, "@IdTipoAccion", DbType.Int16, search.IdTipoAccion);

                if (search.FechaInicio != null && search.FechaInicio.Length > 0) { 
                    string fechain = search.FechaInicio.Substring(0, 10)+" 00:00";
                    DateTime ffin = Convert.ToDateTime(fechain);               
                    dbAuction.AddInParameter(spConsultarLog, "@FechaInicio", DbType.DateTime, ffin);
                }
                if (search.FechaFin != null && search.FechaFin.Length > 0) {
                    string fechaout = search.FechaFin.Substring(0, 10) + " 23:59";
                    DateTime ffout = Convert.ToDateTime(fechaout);
                    dbAuction.AddInParameter(spConsultarLog, "@FechaFin", DbType.DateTime, ffout);
                }
                if (search.EstadoTransaccion != null && search.EstadoTransaccion.Trim().Length > 0)
                    dbAuction.AddInParameter(spConsultarLog, "@EstadoTrans", DbType.Boolean, search.EstadoTransaccion == "SI" ? true: false);

                spConsultarLog.CommandTimeout = 900000000;
                dsDatos = dbAuction.ExecuteDataSet(spConsultarLog);
                if (dsDatos.Tables[0].Rows.Count > 0)
                {
                    dtDatos = dsDatos.Tables[0];
                }
                //return datos;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));

                throw new Exception("Excepcion en la funcion LogGas" + ex.StackTrace);
            }

            return dtDatos;
        }
    }
}
