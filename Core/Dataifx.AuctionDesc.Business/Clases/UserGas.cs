using System;
using System.Collections.Generic;
using System.Data;
using System.Web.Configuration;
using Dataifx.AuctionDesc.Data.Clases;
using Dataifx.AuctionDesc.Infrastructure.Builders;
using Dataifx.AuctionDesc.Infrastructure.Enumerations;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Business.Clases
{
    public class UserGas
    {
        public static UserAutentication ResolveUserlogin(UserAutentication userobj)
        {
            UserAutentication obj = new UserAutentication();
            try
            {
                bool esCorrecto = true;
                obj = DataUser.ValidateUser(userobj);
                if (obj.access <= 0)
                    esCorrecto = false;
                string Descripcion = "Ingreso de usuario";
                int TipoAccion = (int)LogActionType.UserLogin;
                GasLog gasLogger = GasLoggerBuilder.Build(userobj, Descripcion, TipoAccion, esCorrecto);
                DataGasLog.InsertLogGas(gasLogger);
                return obj;
            }
            catch (Exception ex)
            {

                GasLogB.CrearLogError(ex);
            }
            return obj;
        }

        public static string GetToken(Token tokenObj)
        {
            try
            {
                string token = Guid.NewGuid().ToString();
                DateTime issuedOn = DateTime.Now;
                DateTime expiredOn = DateTime.Now.AddSeconds(Convert.ToDouble(10));
                tokenObj.IssuedOn = issuedOn;
                tokenObj.ExpiredOn = expiredOn;
                tokenObj.AuthToken = token;
                var ClientUrl = WebConfigurationManager.AppSettings["SubastaDescUrl"];


                if (DataUser.CreateToken(tokenObj))
                {
                    return ClientUrl + tokenObj.AuthToken;
                }
                else
                {
                    return "";
                }
            }
            catch (Exception ex)
            {

                GasLogB.CrearLogError(ex);
                return "";
            }


        }

        public static UserAutentication SearchToken(Token tokenObj)
        {
            UserAutentication User = new UserAutentication();
            try
            {
                DataTable dtSearch = new DataTable();
                dtSearch = DataUser.SearchToken(tokenObj);


                if (dtSearch.Rows.Count > 0)
                {
                    User.username = dtSearch.Rows[0]["UserName"].ToString();
                    User.password = dtSearch.Rows[0]["PasswordUser"].ToString();
                    User.IdSegas = dtSearch.Rows[0]["UserId"] == DBNull.Value ? 0 : Convert.ToInt32(dtSearch.Rows[0]["UserId"]); ;
                    User = DataUser.ValidateUser(User);
                }
                return User;
            }
            catch (Exception ex)
            {

                GasLogB.CrearLogError(ex);
            }
            return User;

        }

      
    }

}
