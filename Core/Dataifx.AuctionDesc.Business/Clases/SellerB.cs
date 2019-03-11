using System;
using System.Collections.Generic;
using System.Data;
using Dataifx.AuctionDesc.Data.Clases;
using Dataifx.AuctionDesc.Infrastructure.Builders;
using Dataifx.AuctionDesc.Infrastructure.Enumerations;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Business.Clases
{
    public class SellerB
    {
        public static Seller SellerSave(Seller sellerObj)
        {
            Seller objSave = new Seller();
            try
            {
                bool esCorrecto = true;
                objSave = DataSeller.SellerSave(sellerObj);
                if (objSave.IdSegas <= 0)
                    esCorrecto = false;
                string Descripcion = "Registró vendedor: Usuario SEGAS:" + sellerObj.IdSegas + " PTDVF:" + sellerObj.PTDVF + " CIFVF:" + sellerObj.CIFVF + " subasta:" + sellerObj.IdSubasta + " Nombre:" + sellerObj.Nombre;
                int TipoAccion = (int)LogActionType.SellerSave;
                GasLog gasLogger = GasLoggerBuilder.Build(sellerObj.User, Descripcion, TipoAccion, esCorrecto);
                DataGasLog.InsertLogGas(gasLogger);
                return objSave;
            }
            catch (Exception ex)
            {

                GasLogB.CrearLogError(ex);
            }

            return objSave;

        }


     
      


        public static List<Seller> SellersInfo(Auction obj)
        {
            List<Seller> SellerList = new List<Seller>();
            try
            {
                DataTable dtVendedores = new DataTable();

                dtVendedores = DataSeller.SellersInfo(obj);
                foreach (DataRow dr in dtVendedores.Rows)
                {
                    Seller seller = new Seller();
                    seller.IdSegas = dr["IdSegas"] == DBNull.Value ? 0 : Convert.ToInt32(dr["IdSegas"]); ;
                    seller.Nombre = dr["Nombre"].ToString();
                    seller.CIFVF = dr["CIFVF"] == DBNull.Value ? 0 : Convert.ToDecimal(dr["CIFVF"]);
                    seller.PTDVF = dr["PTDVF"] == DBNull.Value ? 0 : Convert.ToDecimal(dr["PTDVF"]);
                    seller.Estado = dr["Estado"] == DBNull.Value ? false : Convert.ToBoolean(dr["Estado"]);
                    seller.Cubrimiento = dr["Cubrimiento"] == DBNull.Value ? false : Convert.ToBoolean(dr["Cubrimiento"]);
                    seller.Listas = dr["Listas"] == DBNull.Value ? false : Convert.ToBoolean(dr["Listas"]);
                    seller.IdSubasta = dr["IdSubasta"] == DBNull.Value ? 0 : Convert.ToInt32(dr["IdSubasta"]);
                    seller.IdOperador = dr["IdOperador"] == DBNull.Value ? 0 : Convert.ToInt32(dr["IdOperador"]);
                    SellerList.Add(seller);
                }
                return SellerList;
            }
            catch (Exception ex)
            {
                GasLogB.CrearLogError(ex);
            }
            return SellerList;
        }

        public static Seller SellersInfoById(Seller obj)
        {
            Seller seller = new Seller();
            try
            {
                DataTable dtVendedores = new DataTable();

                dtVendedores = DataSeller.SellersInfoById(obj);
                if (dtVendedores.Rows.Count > 0)
                {

                    seller.IdSegas = dtVendedores.Rows[0]["IdSegas"] == null ? 0 : Convert.ToInt32(dtVendedores.Rows[0]["IdSegas"]);
                    seller.Nombre = dtVendedores.Rows[0]["Nombre"].ToString();
                    seller.CIFVF = dtVendedores.Rows[0]["CIFVF"] == null ? 0 : Convert.ToDecimal(dtVendedores.Rows[0]["CIFVF"]);
                    seller.PTDVF = dtVendedores.Rows[0]["PTDVF"] == null ? 0 : Convert.ToDecimal(dtVendedores.Rows[0]["PTDVF"]);
                    seller.Estado = dtVendedores.Rows[0]["Estado"] == DBNull.Value ? false : Convert.ToBoolean(dtVendedores.Rows[0]["Estado"]);
                    seller.Cubrimiento = dtVendedores.Rows[0]["Cubrimiento"] == DBNull.Value ? false : Convert.ToBoolean(dtVendedores.Rows[0]["Cubrimiento"]);
                    seller.Listas = dtVendedores.Rows[0]["Listas"] == DBNull.Value ? false : Convert.ToBoolean(dtVendedores.Rows[0]["Listas"]);
                    seller.IdSubasta = dtVendedores.Rows[0]["IdSubasta"] == DBNull.Value ? 0 : Convert.ToInt32(dtVendedores.Rows[0]["IdSubasta"]);
                }
                return seller;
            }
            catch (Exception ex)
            {
                GasLogB.CrearLogError(ex);
            }
            return seller;
        }

     
        public static bool SellersSaveState(List<Seller> sellerObj)
        {
            try
            {
                foreach (Seller obj in sellerObj)
                {
                    bool esCorrecto = DataSeller.SellersSaveState(obj);
                    string Descripcion = "Actualizó estado: vendedor:" + obj.IdSegas + " Esatdo:" + obj.Estado + " subasta:" + obj.IdSubasta;
                    int TipoAccion = (int)LogActionType.SellersSaveState;
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

