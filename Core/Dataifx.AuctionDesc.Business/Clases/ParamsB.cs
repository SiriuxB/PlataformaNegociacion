using System;
using System.Collections.Generic;
using System.Data;
using Dataifx.AuctionDesc.Data.Clases;
using Dataifx.AuctionDesc.Infrastructure.Builders;
using Dataifx.AuctionDesc.Infrastructure.Enumerations;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Business.Clases
{
    public class ParamsB
    {

        public static List<Params> SearchParams(Params paramsObj)
        {
            List<Params> objectParams = new List<Params>();
            try
            {
                DataTable parametros = DataParams.SearchParams(paramsObj);

                foreach (DataRow dr in parametros.Rows)
                {
                    Params newObj = new Params();
                    newObj.Id = Convert.ToInt32(dr["Id"]);
                    newObj.NombreParametro = dr["NombreParametro"].ToString();
                    newObj.Parametro = dr["Parametro"].ToString();
                    newObj.Valor = dr["Valor"] == DBNull.Value ? 0 : Convert.ToDecimal(dr["Valor"]);
                    newObj.Tipo = dr["Tipo"].ToString();
                    newObj.Texto = dr["Texto"].ToString();
                    objectParams.Add(newObj);
                }
                return objectParams;
            }
            catch (Exception ex)
            {
                GasLogB.CrearLogError(ex);
            }
            return objectParams;
        }

        public static bool SaveParams(List<Params> listParamsObj)
        {
            try
            {
                foreach (Params objectParams in listParamsObj)
                {
                    bool esCorrecto = DataParams.SaveParams(objectParams);
                    string Descripcion = "Registro Parametro: " + objectParams.Parametro + " Nombre:" + objectParams.NombreParametro + " descripcion:" + objectParams.Texto + " Tipo:" + objectParams.Tipo + " Valor:" + objectParams.Valor;
                    int TipoAccion = (int)LogActionType.SaveParams;
                    GasLog gasLogger = GasLoggerBuilder.Build(objectParams.User, Descripcion, TipoAccion, esCorrecto);
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

        public static DateTime GetBDTime()
        {
            DateTime TimeBD = new DateTime();
            try
            {

                return DataParams.GetBDTime();
            }
            catch (Exception ex)
            {
              //  GasLogB.CrearLogError(ex, paramsobj);
            }
            return TimeBD;

        }


    }
    //
}
