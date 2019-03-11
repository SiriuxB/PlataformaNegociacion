using System;
using System.Data;
using System.Data.Common;
using System.Reflection;
using Dataifx.AuctionDesc.Infrastructure.Models;
using Microsoft.Practices.EnterpriseLibrary.Data;

namespace Dataifx.AuctionDesc.Data.Clases
{
    public class DataPurchaser
    {
       
        public static bool SavePurchaserUser(Purchaser purchaserobj)
        {
            int datos;
            bool SafeSave;
            try
            {

                var ConectStr = Tools.ConectionNow.BuildConection(purchaserobj.User);
                Database dbeAuction = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(ConectStr);
                //  Database dbeAuction = DatabaseFactory.CreateDatabase("Auction");
                // Crear objeto SP
                DbCommand spComprador = dbeAuction.GetStoredProcCommand("SP_COMPRADORES");

                dbeAuction.AddInParameter(spComprador, "@i_operation", DbType.String, "IU");
                dbeAuction.AddInParameter(spComprador, "@i_option", DbType.String, "C");
                dbeAuction.AddInParameter(spComprador, "@id_Comprador", DbType.Int32, purchaserobj.IdSegas);
                dbeAuction.AddInParameter(spComprador, "@Nombre", DbType.String, purchaserobj.Nombre);
                dbeAuction.AddInParameter(spComprador, "@IdSubasta", DbType.Int32, purchaserobj.IdSubasta);
                dbeAuction.AddInParameter(spComprador, "@DemandaMaxima", DbType.Int32, purchaserobj.DemandaMaximaTotal);
                dbeAuction.AddInParameter(spComprador, "@IdOperador", DbType.Int32, purchaserobj.User.CodigoOperador);
                

                spComprador.CommandTimeout = 900000000;
                datos = dbeAuction.ExecuteNonQuery(spComprador);
                SafeSave = true;

            }
            catch (Exception ex)
            {
                SafeSave = false;
                System.Diagnostics.Trace.WriteLine(string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));

                throw new Exception((string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name)));

            }
            return SafeSave;
        }
        public static DataTable PurchasersInfo(Auction obj)
        {
            DataSet dsDatos;
            DataTable dtDatos = new DataTable();
            try
            {
                var ConectStr = Tools.ConectionNow.BuildConection(obj.User);
                Database dbeAuction = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(ConectStr);
                //  Database dbeAuction = DatabaseFactory.CreateDatabase("Auction");
                // Crear objeto SP
                DbCommand spComprador = dbeAuction.GetStoredProcCommand("SP_COMPRADORES");
                dbeAuction.AddInParameter(spComprador, "@i_operation", DbType.String, "S");
                dbeAuction.AddInParameter(spComprador, "@i_option", DbType.String, "A");
                dbeAuction.AddInParameter(spComprador, "@IdSubasta", DbType.Int32, obj.Id);
                spComprador.CommandTimeout = 900000000;
                dsDatos = dbeAuction.ExecuteDataSet(spComprador);
                if (dsDatos.Tables[0].Rows.Count > 0)
                {
                    dtDatos = dsDatos.Tables[0];
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));

                throw new Exception((string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name)));
            }
            return dtDatos;
        }
        public static DataTable PurchaserInfoById(Purchaser obj)
        {
            DataSet dsDatos;
            DataTable dtDatos = new DataTable();
            try
            {
                var ConectStr = Tools.ConectionNow.BuildConection(obj.User);
                Database dbeAuction = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(ConectStr);
                //  Database dbeAuction = DatabaseFactory.CreateDatabase("Auction");
                // Crear objeto SP
                DbCommand spComprador = dbeAuction.GetStoredProcCommand("SP_COMPRADORES");
                dbeAuction.AddInParameter(spComprador, "@i_operation", DbType.String, "S");
                dbeAuction.AddInParameter(spComprador, "@i_option", DbType.String, "B");
                dbeAuction.AddInParameter(spComprador, "@id_Comprador", DbType.Int32, obj.IdSegas);
                dbeAuction.AddInParameter(spComprador, "@IdSubasta", DbType.Int32, obj.IdSubasta);
                spComprador.CommandTimeout = 900000000;
                dsDatos = dbeAuction.ExecuteDataSet(spComprador);
                if (dsDatos.Tables[0].Rows.Count > 0)
                {
                    dtDatos = dsDatos.Tables[0];
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));

                throw new Exception((string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name)));
            }
            return dtDatos;
        }
        public static DataTable SourcePurchaserInfoById(Purchaser obj)
        {
            DataSet dsDatos;
            DataTable dtDatos = new DataTable();
            try
            {
                var ConectStr = Tools.ConectionNow.BuildConection(obj.User);
                Database dbeAuction = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(ConectStr);
                //  Database dbeAuction = DatabaseFactory.CreateDatabase("Auction");
                // Crear objeto SP
                // Crear objeto SP
                DbCommand spComprador = dbeAuction.GetStoredProcCommand("SP_COMPRADORES");
                dbeAuction.AddInParameter(spComprador, "@i_operation", DbType.String, "S");
                dbeAuction.AddInParameter(spComprador, "@i_option", DbType.String, "C");
                dbeAuction.AddInParameter(spComprador, "@id_Comprador", DbType.Int32, obj.IdSegas);
                dbeAuction.AddInParameter(spComprador, "@IdSubasta", DbType.Int32, obj.IdSubasta);
                spComprador.CommandTimeout = 900000000;
                dsDatos = dbeAuction.ExecuteDataSet(spComprador);
                if (dsDatos.Tables[0].Rows.Count > 0)
                {
                    dtDatos = dsDatos.Tables[0];
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));

                throw new Exception((string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name)));
            }
            return dtDatos;
        }




        public static bool PurchasersSaveState(Purchaser pucharserobj)
        {
            bool transOk = false;
            int datos;
            try
            {
                var ConectStr = Tools.ConectionNow.BuildConection(pucharserobj.User);
                Database dbeAuction = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(ConectStr);
                //  Database dbeAuction = DatabaseFactory.CreateDatabase("Auction");
                // Crear objeto SP
                DbCommand spComprador = dbeAuction.GetStoredProcCommand("SP_COMPRADORES");
                dbeAuction.AddInParameter(spComprador, "@i_operation", DbType.String, "IU");
                dbeAuction.AddInParameter(spComprador, "@i_option", DbType.String, "B");
                dbeAuction.AddInParameter(spComprador, "@id_Comprador", DbType.Int32, pucharserobj.IdSegas);
                dbeAuction.AddInParameter(spComprador, "@IdSubasta", DbType.Int32, pucharserobj.IdSubasta);
                dbeAuction.AddInParameter(spComprador, "@Estado", DbType.Boolean, pucharserobj.Estado);
                dbeAuction.AddInParameter(spComprador, "@Cubrimiento", DbType.Boolean, pucharserobj.Cubrimiento);
                dbeAuction.AddInParameter(spComprador, "@Listas", DbType.Boolean, pucharserobj.Listas);
                

                spComprador.CommandTimeout = 900000000;
                datos = dbeAuction.ExecuteNonQuery(spComprador);
                transOk = true;
            }
            catch (Exception ex)
            {
                transOk = false;
                System.Diagnostics.Trace.WriteLine(string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));

                throw new Exception((string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name)));
            }
            return transOk;
        }
    }
}
