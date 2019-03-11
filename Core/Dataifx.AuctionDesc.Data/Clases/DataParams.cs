using System;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Reflection;
using Dapper;
using Dataifx.AuctionDesc.Infrastructure.Models;
using Microsoft.Practices.EnterpriseLibrary.Data;

namespace Dataifx.AuctionDesc.Data.Clases
{
    public class DataParams
    {
        public static DataTable SearchParams(Params paramsobj)
        {
            DataSet datos;
            DataTable parametros = new DataTable();
            string tipoConsulta = "A";
            try
            {
                var ConectStr = Tools.ConectionNow.BuildConection(paramsobj.User);
                Database dbeAuction = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(ConectStr);
                //  Database dbeAuction = DatabaseFactory.CreateDatabase("Auction");
                // Crear objeto SP
                DbCommand spParametros = dbeAuction.GetStoredProcCommand("SP_PARAMETROS");
                if (!String.IsNullOrEmpty(paramsobj.NombreParametro))
                {
                    tipoConsulta = "B";
                }

                dbeAuction.AddInParameter(spParametros, "@i_operation", DbType.String, "S");
                dbeAuction.AddInParameter(spParametros, "@i_option", DbType.String, tipoConsulta);
                dbeAuction.AddInParameter(spParametros, "@NombreParametro", DbType.String, paramsobj.NombreParametro);
                spParametros.CommandTimeout = 900000000;
                datos = dbeAuction.ExecuteDataSet(spParametros);
                if (datos.Tables[0].Rows.Count > 0)
                {
                    parametros = datos.Tables[0];
                }


                return parametros;


            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));
                throw new Exception((string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name)));
            }
        }

        public static bool SaveParams(Params paramsobj)
        {
            int datos;
            DataTable parametros = new DataTable();
            try
            {

                Database dbeAuction = DatabaseFactory.CreateDatabase("Auction");
                DbCommand spParametros = dbeAuction.GetStoredProcCommand("SP_PARAMETROS");
                dbeAuction.AddInParameter(spParametros, "@i_operation", DbType.String, "IU");
                dbeAuction.AddInParameter(spParametros, "@i_option", DbType.String, "A");
                dbeAuction.AddInParameter(spParametros, "@NombreParametro", DbType.String, paramsobj.NombreParametro);
                dbeAuction.AddInParameter(spParametros, "@Valor", DbType.Decimal, paramsobj.Valor);
                dbeAuction.AddInParameter(spParametros, "@Tipo", DbType.String, paramsobj.Tipo);
                dbeAuction.AddInParameter(spParametros, "@Texto", DbType.String, paramsobj.Texto);
                spParametros.CommandTimeout = 900000000;
                datos = dbeAuction.ExecuteNonQuery(spParametros);
                return true;




            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));
                throw new Exception((string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name)));
            }
        }


        public static DateTime GetBDTime()
        {
            DataSet datos;
            DataTable parametros = new DataTable();
            try
            {
                var sqlVerHora = "Select Getdate() as Hora";
                Database db = DatabaseFactory.CreateDatabase("Auction");
                using (var connection = new SqlConnection(db.ConnectionString))
                {
                    var x = connection.ExecuteScalar(sqlVerHora);

                    return Convert.ToDateTime(x);
                }





            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));
                throw new Exception((string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name)));
            }

        }
    }
}

//SearchParams

