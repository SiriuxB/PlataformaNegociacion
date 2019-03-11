using System;
using System.Collections.Generic;
using System.Data;
using Dataifx.AuctionDesc.Data.Clases;
using Dataifx.AuctionDesc.Infrastructure.Builders;
using Dataifx.AuctionDesc.Infrastructure.Enumerations;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Business.Clases
{
    public class PurchaserB
    {
     

        
        public static List<Purchaser> PurchasersInfo(Auction obj)
        {
            List<Purchaser> PurchaserList = new List<Purchaser>();
            try
            {
                DataTable dtCompradores = new DataTable();
                
                dtCompradores = DataPurchaser.PurchasersInfo(obj);
                foreach (DataRow dr in dtCompradores.Rows)
                {
                    Purchaser Purchaser = new Purchaser();
                    Purchaser.IdSegas = dr["IdSegas"] == null ? 0 : Convert.ToInt32(dr["IdSegas"]); ;
                    Purchaser.Nombre = dr["Nombre"].ToString();
                    Purchaser.DemandaMaximaTotal = dr["DemandaMaximaTotal"] == DBNull.Value ? 0 : Convert.ToDecimal(dr["DemandaMaximaTotal"]);
                    Purchaser.Estado = dr["Estado"] == DBNull.Value ? false : Convert.ToBoolean(dr["Estado"]);
                    Purchaser.Cubrimiento = dr["Cubrimiento"] == DBNull.Value ? false : Convert.ToBoolean(dr["Cubrimiento"]);
                    Purchaser.Listas = dr["Listas"] == DBNull.Value ? false : Convert.ToBoolean(dr["Listas"]);
                    Purchaser.IdSubasta = dr["IdSubasta"] == DBNull.Value ? 0 : Convert.ToInt32(dr["IdSubasta"]);
                    Purchaser.IdOperador = dr["IdOperador"] == DBNull.Value ? 0 : Convert.ToInt32(dr["IdOperador"]);
                    PurchaserList.Add(Purchaser);
                }
                return PurchaserList;
            }
            catch (Exception ex)
            {

                GasLogB.CrearLogError(ex);
            }
            return PurchaserList;
        }

        public static Purchaser PurchaserInfoById(Purchaser obj)
        {
            Purchaser Purchaser = new Purchaser();
            try
            {
                DataTable dtCompradores = new DataTable();
                
                dtCompradores = DataPurchaser.PurchaserInfoById(obj);
                if (dtCompradores.Rows.Count > 0)
                {

                    Purchaser.IdSegas = dtCompradores.Rows[0]["IdSegas"] == null ? 0 : Convert.ToInt32(dtCompradores.Rows[0]["IdSegas"]); ;
                    Purchaser.Nombre = dtCompradores.Rows[0]["Nombre"].ToString();
                    Purchaser.Estado = dtCompradores.Rows[0]["Estado"] == DBNull.Value ? false : Convert.ToBoolean(dtCompradores.Rows[0]["Estado"]);
                    Purchaser.Cubrimiento = dtCompradores.Rows[0]["Cubrimiento"] == DBNull.Value ? false : Convert.ToBoolean(dtCompradores.Rows[0]["Cubrimiento"]);
                    Purchaser.Listas = dtCompradores.Rows[0]["Listas"] == DBNull.Value ? false : Convert.ToBoolean(dtCompradores.Rows[0]["Listas"]);
                    Purchaser.IdSubasta = dtCompradores.Rows[0]["IdSubasta"] == DBNull.Value ? 0 : Convert.ToInt32(dtCompradores.Rows[0]["IdSubasta"]);
                    Purchaser.DemandaMaximaTotal = dtCompradores.Rows[0]["DemandaMaximaTotal"] == DBNull.Value ? 0 : Convert.ToDecimal(dtCompradores.Rows[0]["DemandaMaximaTotal"]);
                }
                return Purchaser;
            }
            catch (Exception ex)
            {

                GasLogB.CrearLogError(ex);
            }
            return Purchaser;

        }

    

        public static bool SavePurchaserUser(Purchaser purchaserObj)
        {
            try
            {
                bool esCorrecto = DataPurchaser.SavePurchaserUser(purchaserObj);
                string Descripcion = "Registró Comprador: Subasta:" + purchaserObj.IdSubasta + " Nombre:" + purchaserObj.Nombre + " Demanda maxima total:" + purchaserObj.DemandaMaximaTotal + " Usuario SEGAS:" + purchaserObj.IdSegas;
                int TipoAccion = (int)LogActionType.SavePurchaserUser;
                GasLog gasLogger = GasLoggerBuilder.Build(purchaserObj.User, Descripcion, TipoAccion, esCorrecto);
                DataGasLog.InsertLogGas(gasLogger);
                return true;
            }
            catch (Exception ex)
            {

                GasLogB.CrearLogError(ex);
                return false;
            }
            
        }


        public static bool PurchasersSaveState(List<Purchaser> purchaserObj)
        {
            try
            {
                foreach (Purchaser obj in purchaserObj)
                {
                    bool esCorrecto = DataPurchaser.PurchasersSaveState(obj);
                    string Descripcion = "Registró estado comprador: Subasta:" + obj.IdSubasta + " Estado:" + obj.Estado + "  Usuario SEGAS:" + obj.IdSegas;
                    int TipoAccion = (int)LogActionType.PurchasersSaveState;
                    GasLog gasLogger = GasLoggerBuilder.Build(obj.User, Descripcion, TipoAccion, esCorrecto);
                    DataGasLog.InsertLogGas(gasLogger);
                }
                return true;
            }
            catch (Exception ex)
            {

                GasLogB.CrearLogError(ex);
                return false;
            }
            
        }




    }
}
