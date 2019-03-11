using System;
using System.Reflection;
using System.Web;

namespace Dataifx.AuctionDesc.Services.RealTime
{
    public class RealTimeHandler : IHttpHandler
    {
        /// <summary>
        /// You will need to configure this handler in the Web.config file of your 
        /// web and register it with IIS before being able to use it. For more information
        /// see the following link: http://go.microsoft.com/?linkid=8101007
        /// </summary>
        #region IHttpHandler Members

        public bool IsReusable
        {
            // Return false in case your Managed Handler cannot be reused for another request.
            // Usually this would be false in case you have some state information preserved per request.
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            //write your handler implementation here.
            HttpRequest Request = context.Request;
            HttpResponse Response = context.Response;
            try
            {
                if (Request.Params["cmd"] != null)
                {
                    switch (Request.Params["cmd"].ToString())
                    {
                        case "TRANS":

                           // TransactionSummarized tran = new TransactionSummarized();
                           // String date = Request.Params["Hora"].ToString();
                           // tran.Date = DateTime.ParseExact(Request.Params["Hora"].ToString(), "yyyy-MM-dd HH:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                           // tran.Quantity = Convert.ToInt64(Request.Params["Cantidad"].ToString());
                           // tran.ClosingPrice = Convert.ToDouble(Request.Params["Precio"].ToString());
                           // tran.Minimum = Convert.ToDouble(Request.Params["Minimo"].ToString());
                           // tran.Maximum = Convert.ToDouble(Request.Params["Maximo"].ToString());
                           // tran.Average = Convert.ToDouble(Request.Params["Promedio"].ToString());
                           // tran.Variation = Convert.ToDouble(Request.Params["Variacion"].ToString());
                           // tran.state = Request.Params["Estado"].ToString();
                           // tran.TotalTrading = Convert.ToDouble(Request.Params["TotalNegociado"].ToString());
                           // //tran.Instrument = new Instrument { mnemonic = Request.Params["Nemotecnico"].ToString() };
                           //// ExternalTickerNotifier.BroadCastTransaction(tran);
                            Response.Write("OK");

                            break;

       
                        case "ORDERCANCEL":
                            break;

                        case "NEWS":
                            break;

                        case "ALARM":
                            break;

                    }
                }
            }
            catch (Exception ex)
            { //todo manejo de la exception
                System.Diagnostics.Trace.WriteLine(string.Format("DATAIFX Services Auditoria: {0} , NameSpace: {1}, Clase: {2}, Metodo: {3} ", ex.Message, MethodBase.GetCurrentMethod().DeclaringType.Namespace, MethodBase.GetCurrentMethod().DeclaringType.Name, MethodBase.GetCurrentMethod().Name));
                Response.Write(ex.ToString());
            }
            finally
            {
                Response.End();
            }
        }

        #endregion
    }
}
