using System;
using System.Data;
using System.Data.Common;
using System.Reflection;
using Dataifx.AuctionDesc.Infrastructure.Models;
using Microsoft.Practices.EnterpriseLibrary.Data;

namespace Dataifx.AuctionDesc.Data.Clases
{
    public class DataSeller
    {
   
        public static DataTable SellersInfo(Auction obj)
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
                DbCommand spVendedor = dbeAuction.GetStoredProcCommand("SP_VENDEDORES");
                dbeAuction.AddInParameter(spVendedor, "@i_operation", DbType.String, "S");
                dbeAuction.AddInParameter(spVendedor, "@i_option", DbType.String, "A");
                dbeAuction.AddInParameter(spVendedor, "@IdSubasta", DbType.Int32, obj.Id);
                spVendedor.CommandTimeout = 900000000;
                dsDatos = dbeAuction.ExecuteDataSet(spVendedor);
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
        public static DataTable SellersInfoById(Seller obj)
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
                DbCommand spVendedor = dbeAuction.GetStoredProcCommand("SP_VENDEDORES");
                dbeAuction.AddInParameter(spVendedor, "@i_operation", DbType.String, "S");
                dbeAuction.AddInParameter(spVendedor, "@i_option", DbType.String, "B");
                dbeAuction.AddInParameter(spVendedor, "@id_Vendedor", DbType.Int32, obj.IdSegas);
                dbeAuction.AddInParameter(spVendedor, "@IdSubasta", DbType.Int32, obj.IdSubasta);

                spVendedor.CommandTimeout = 900000000;
                dsDatos = dbeAuction.ExecuteDataSet(spVendedor);
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

        public static DataTable SourceSellerInfoById(Seller obj)
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
                DbCommand spVendedor = dbeAuction.GetStoredProcCommand("SP_VENDEDORES");
                dbeAuction.AddInParameter(spVendedor, "@i_operation", DbType.String, "S");
                dbeAuction.AddInParameter(spVendedor, "@i_option", DbType.String, "C");
                dbeAuction.AddInParameter(spVendedor, "@id_Vendedor", DbType.Int32, obj.IdSegas);
                dbeAuction.AddInParameter(spVendedor, "@IdSubasta", DbType.Int32, obj.IdSubasta);

                spVendedor.CommandTimeout = 900000000;
                dsDatos = dbeAuction.ExecuteDataSet(spVendedor);
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
        public static bool SellersSaveState(Seller sellerobj)
        {
            bool transOk = false;
            int datos;
            try
            {
                var ConectStr = Tools.ConectionNow.BuildConection(sellerobj.User);
                Database dbeAuction = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(ConectStr);
                //  Database dbeAuction = DatabaseFactory.CreateDatabase("Auction");
                // Crear objeto SP
                DbCommand spVendedor = dbeAuction.GetStoredProcCommand("SP_VENDEDORES");
                dbeAuction.AddInParameter(spVendedor, "@i_operation", DbType.String, "IU");
                dbeAuction.AddInParameter(spVendedor, "@i_option", DbType.String, "C");
                dbeAuction.AddInParameter(spVendedor, "@id_Vendedor", DbType.Int32, sellerobj.IdSegas);
                dbeAuction.AddInParameter(spVendedor, "@Estado", DbType.Boolean, sellerobj.Estado);
                dbeAuction.AddInParameter(spVendedor, "@IdSubasta", DbType.Int32, sellerobj.IdSubasta);
                dbeAuction.AddInParameter(spVendedor, "@Listas", DbType.Int32, sellerobj.Listas);
                dbeAuction.AddInParameter(spVendedor, "@Cubrimiento", DbType.Int32, sellerobj.Cubrimiento);

                spVendedor.CommandTimeout = 900000000;
                datos = dbeAuction.ExecuteNonQuery(spVendedor);
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

 
        public static Seller SellerSave(Seller sellerobj)
        {
            int datos;
            try
            {
                var ConectStr = Tools.ConectionNow.BuildConection(sellerobj.User);
                Database dbeAuction = new Microsoft.Practices.EnterpriseLibrary.Data.Sql.SqlDatabase(ConectStr);
                //  Database dbeAuction = DatabaseFactory.CreateDatabase("Auction");
                // Crear objeto SP
                // Crear objeto SP
                DbCommand spVendedor = dbeAuction.GetStoredProcCommand("SP_VENDEDORES");

                dbeAuction.AddInParameter(spVendedor, "@i_operation", DbType.String, "IU");
                dbeAuction.AddInParameter(spVendedor, "@i_option", DbType.String, "A");
                dbeAuction.AddInParameter(spVendedor, "@id_Vendedor", DbType.Int32, sellerobj.IdSegas);
                dbeAuction.AddInParameter(spVendedor, "@PTDVF", DbType.Decimal, sellerobj.PTDVF);
                dbeAuction.AddInParameter(spVendedor, "@CIFVF", DbType.Decimal, sellerobj.CIFVF);
                dbeAuction.AddInParameter(spVendedor, "@IdSubasta", DbType.Int32, sellerobj.IdSubasta);
                dbeAuction.AddInParameter(spVendedor, "@Nombre", DbType.String, sellerobj.Nombre);
                dbeAuction.AddInParameter(spVendedor, "@IdOperador", DbType.Int32, sellerobj.User.CodigoOperador); 
                spVendedor.CommandTimeout = 900000000;
                datos = dbeAuction.ExecuteNonQuery(spVendedor);
                return sellerobj;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Trace.WriteLine(string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));
                throw new Exception((string.Format("AuctionGas ApiWebServices Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name)));
            }
        }
     
    }
}


