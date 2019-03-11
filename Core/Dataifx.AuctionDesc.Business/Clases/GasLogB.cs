using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using Dataifx.AuctionDesc.Data.Clases;
using Dataifx.AuctionDesc.Infrastructure.Models;

namespace Dataifx.AuctionDesc.Business.Clases
{
    public class GasLogB
    {
      
        public static void CrearLogError(Exception ex)
        {
            try
            {
                GasLog juta = new GasLog
                {
                    Descripcion = string.Concat(ex.Message, " --> ", ex.StackTrace),
                    EstadoTransaccion = true,
                    IdTipoAccion = 1,
                    IdUsuario = 0,
                    Nombre ="",
                    NombreUsuario = "",
                    TipoMovimiento = "Error",
                 
                };
                AuctionDesc.Data.Clases.DataGasLog.InsertLogGasError(juta);
            }
            catch (Exception ex2)
            {
              //  LogError(string.Concat(ex2.Message, " --> ", ex2.StackTrace, " Error original --> ", ex.Message, " --> ", ex.StackTrace));
            }
        }

        public static void LogError(String logMessage, UserAutentication infoUser)
        {

            string PathErrorLog = System.Configuration.ConfigurationManager.AppSettings["PathErrorLog"].ToString();
            try
            {
                string strHostName = System.Net.Dns.GetHostName();
                System.Net.IPHostEntry ipEntry = System.Net.Dns.GetHostEntry(strHostName);
                string ip = Convert.ToString(ipEntry.AddressList[ipEntry.AddressList.Length - 1]);

                using (StreamWriter w = File.AppendText(string.Concat(PathErrorLog, @"\log", DateTime.Now.ToString("yyyyMMdd"), ".txt")))
                {
                    w.Write("\r\nLog Entry : ");
                    w.WriteLine("Usuario Uid {0} Username:{1} IpC:{2} {3} {4}",
                        infoUser.IdSegas.ToString(), infoUser.username,  DateTime.Now.ToLongTimeString(), DateTime.Now.ToLongDateString());
                    w.WriteLine("  :{0}", logMessage);
                    w.WriteLine("-------------------------------");
                    w.Flush();
                    w.Close();
                }

            }
            catch (Exception ex) { }

        }
    }
}
